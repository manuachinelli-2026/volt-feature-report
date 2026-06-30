/* Volt Feature Report — render layer (ECharts + vanilla JS) */
(function () {
  const D = window.VOLT_DATA;
  const M = D.meta;
  const ACTIVE = M.activeUsers;

  // chart registry (declared first so render fns can register during init)
  const charts = [];
  function register(c) { if (c) charts.push(c); }
  window.addEventListener("resize", () => charts.forEach(c => c && c.resize()));

  // palette
  const C = {
    volt: "#d6ff3d", voltDim: "#a9cc2f", cyan: "#3ad6ff", violet: "#9b8cff",
    green: "#46e08a", amber: "#ffcb45", red: "#ff5d6c", orange: "#ff944d",
    text: "#e9ecf5", muted: "#969eb3", faint: "#646c82", line: "#262a37", grid: "#20242f"
  };
  const VERDICT_COLOR = {
    CRITICAL: C.green, KEEP: C.cyan, GROW: C.violet, IMPROVE: C.amber,
    WATCH: C.orange, CONSOLIDATE: C.orange, RECONSIDER: C.red
  };

  const fmt = (n) => {
    if (n === null || n === undefined) return "—";
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "k";
    return n.toLocaleString("es-AR");
  };
  const fmtFull = (n) => (n == null ? "—" : n.toLocaleString("es-AR"));
  const pct = (u) => (100 * u / ACTIVE);

  const baseGrid = { left: 8, right: 24, top: 24, bottom: 8, containLabel: true };
  const axisCommon = {
    axisLine: { lineStyle: { color: C.line } },
    axisTick: { show: false },
    axisLabel: { color: C.muted, fontFamily: "Inter" },
    splitLine: { lineStyle: { color: C.grid } }
  };
  const tooltipStyle = {
    backgroundColor: "#14161f", borderColor: "#333848", borderWidth: 1,
    textStyle: { color: C.text, fontFamily: "Inter", fontSize: 13 },
    extraCssText: "border-radius:10px;padding:12px 14px;box-shadow:0 10px 30px rgba(0,0,0,.5)"
  };

  /* ---------- KPIs ---------- */
  (function renderKPIs() {
    const items = [
      { v: fmt(M.totalEvents), l: "Eventos analizados", s: "180 días · Volt Prd" },
      { v: fmtFull(ACTIVE), l: "Usuarios activos de producto", s: `de ${fmtFull(M.allUsers)} sesiones totales` },
      { v: D.groups.filter(g => !g.infra).length, l: "Áreas de features", s: "agrupando ~250 eventos" },
      { v: "21×", l: "Brecha media ÷ mediana", s: "ej. Chat Open: 3.338 vs 157" }
    ];
    document.getElementById("kpis").innerHTML = items.map(k =>
      `<div class="kpi"><div class="v">${k.v}</div><div class="l">${k.l}</div><div class="s">${k.s}</div></div>`
    ).join("");
  })();

  /* ---------- Outlier chart: mean vs trimmed vs median ---------- */
  (function renderOutlier() {
    const feats = D.features
      .filter(f => f.trimmedMean != null)
      .sort((a, b) => b.mean - a.mean)
      .slice(0, 9)
      .reverse();
    const names = feats.map(f => f.name);
    const chart = echarts.init(document.getElementById("chart-outlier"), null, { renderer: "canvas" });
    chart.setOption({
      grid: { ...baseGrid, left: 8, right: 40 },
      tooltip: {
        trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipStyle,
        formatter: (ps) => {
          const f = feats[ps[0].dataIndex];
          return `<b>${f.name}</b><br/>` +
            `Media (con outliers): <b>${fmtFull(f.mean)}</b><br/>` +
            `Media recortada (sin top 5%): <b>${fmtFull(f.trimmedMean)}</b><br/>` +
            `<span style="color:${C.volt}">Mediana (real): <b>${fmtFull(f.median)}</b></span><br/>` +
            `<span style="color:${C.faint}">${f.pctFromOutliers}% de eventos vienen del top 5%</span>`;
        }
      },
      legend: { show: false },
      xAxis: { type: "value", ...axisCommon, name: "usos por usuario", nameTextStyle: { color: C.faint }, nameLocation: "end", nameGap: 8 },
      yAxis: { type: "category", data: names, ...axisCommon, axisLabel: { color: C.text, fontFamily: "Inter", fontSize: 12.5 } },
      series: [
        { name: "Media", type: "bar", data: feats.map(f => f.mean), itemStyle: { color: "#3a3f52", borderRadius: [0, 4, 4, 0] }, barGap: "-100%", z: 1, barWidth: "62%" },
        { name: "Media recortada", type: "bar", data: feats.map(f => f.trimmedMean), itemStyle: { color: C.cyan, borderRadius: [0, 4, 4, 0] }, z: 2, barWidth: "62%" },
        { name: "Mediana", type: "bar", data: feats.map(f => f.median), itemStyle: { color: C.volt, borderRadius: [0, 4, 4, 0] }, z: 3, barWidth: "62%",
          label: { show: true, position: "right", color: C.volt, fontWeight: 700, fontFamily: "Space Grotesk", formatter: (p) => fmtFull(p.value) } }
      ]
    });
    register(chart);
  })();

  /* ---------- Top features (toggle reach / volume) ---------- */
  let topChart;
  function renderTop(mode) {
    const key = mode === "users" ? "users" : "total";
    const feats = [...D.features].sort((a, b) => b[key] - a[key]).slice(0, 16).reverse();
    const names = feats.map(f => f.name);
    const data = feats.map(f => ({
      value: f[key],
      itemStyle: { color: VERDICT_COLOR[(D.groups.find(g => g.name === f.group) || {}).verdict] || C.cyan, borderRadius: [0, 4, 4, 0] }
    }));
    if (!topChart) topChart = echarts.init(document.getElementById("chart-top"));
    topChart.setOption({
      grid: { ...baseGrid, left: 8, right: 70 },
      tooltip: {
        trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipStyle,
        formatter: (ps) => {
          const f = feats[ps[0].dataIndex];
          return `<b>${f.name}</b> <span style="color:${C.faint}">· ${f.group}</span><br/>` +
            `Usuarios distintos: <b>${fmtFull(f.users)}</b> (${pct(f.users).toFixed(1)}%)<br/>` +
            `Eventos totales: <b>${fmtFull(f.total)}</b><br/>` +
            `<span style="color:${C.volt}">Mediana/usuario: <b>${fmtFull(f.median)}</b></span>`;
        }
      },
      xAxis: { type: mode === "users" ? "value" : "log", ...axisCommon, min: mode === "users" ? 0 : 10 },
      yAxis: { type: "category", data: names, ...axisCommon, axisLabel: { color: C.text, fontSize: 12 } },
      series: [{
        type: "bar", data, barWidth: "64%",
        label: {
          show: true, position: "right", color: C.muted, fontFamily: "Space Grotesk", fontSize: 11.5,
          formatter: (p) => mode === "users" ? `${pct(p.value).toFixed(0)}%` : fmt(p.value)
        }
      }]
    });
  }
  (function initTop() {
    renderTop("users");
    register(topChart);
    document.querySelectorAll("#top-toggle button").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#top-toggle button").forEach(b => b.classList.remove("on"));
        btn.classList.add("on");
        renderTop(btn.dataset.mode);
      });
    });
  })();

  /* ---------- Groups table (sortable) ---------- */
  (function renderTable() {
    const tbody = document.querySelector("#groups-table tbody");
    const rows = D.groups.map(g => ({ ...g, adoption: pct(g.users) }));
    let sortKey = "totalEvents", sortDir = -1;
    const maxAdopt = Math.max(...rows.map(r => r.adoption));

    function draw() {
      const sorted = [...rows].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (typeof av === "string") return sortDir * av.localeCompare(bv);
        return sortDir * (av - bv);
      });
      tbody.innerHTML = sorted.map(r => {
        const w = Math.max(4, (r.adoption / maxAdopt) * 100);
        return `<tr>
          <td><span class="fname">${r.name}</span>${r.infra ? ' <span style="color:var(--faint);font-size:11px">· infra</span>' : ''}</td>
          <td class="num"><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${w}%"></div></div><span class="bar-num">${r.adoption.toFixed(1)}%</span></div></td>
          <td class="num">${fmtFull(r.users)}</td>
          <td class="num">${fmt(r.totalEvents)}</td>
          <td class="num" style="color:var(--volt);font-weight:600">${fmtFull(r.median)}</td>
          <td class="num" style="color:var(--muted)">${fmtFull(r.mean)}</td>
          <td><span class="badge b-${r.verdict}">${r.verdict}</span></td>
        </tr>`;
      }).join("");
    }
    document.querySelectorAll("#groups-table thead th").forEach(th => {
      th.addEventListener("click", () => {
        const k = th.dataset.k;
        if (k === sortKey) sortDir *= -1;
        else { sortKey = k; sortDir = (k === "name" || k === "verdict") ? 1 : -1; }
        draw();
      });
    });
    draw();
  })();

  /* ---------- Decision map (scatter quadrant) ---------- */
  (function renderMap() {
    const groups = D.groups.filter(g => !g.infra);
    const maxEv = Math.max(...groups.map(g => g.totalEvents));
    const data = groups.map(g => ({
      name: g.name,
      value: [pct(g.users), Math.max(1, g.median), g.totalEvents],
      symbolSize: 16 + 52 * Math.sqrt(g.totalEvents / maxEv),
      itemStyle: {
        color: VERDICT_COLOR[g.verdict] + "cc",
        borderColor: VERDICT_COLOR[g.verdict], borderWidth: 1.5,
        shadowBlur: 12, shadowColor: VERDICT_COLOR[g.verdict] + "55"
      }
    }));
    const chart = echarts.init(document.getElementById("chart-map"));
    chart.setOption({
      grid: { ...baseGrid, left: 8, right: 30, top: 30, bottom: 40 },
      tooltip: {
        ...tooltipStyle,
        formatter: (p) => {
          const g = groups[p.dataIndex];
          return `<b>${g.name}</b> <span class="badge b-${g.verdict}" style="margin-left:4px">${g.verdict}</span><br/>` +
            `Alcance: <b>${pct(g.users).toFixed(1)}%</b> (${fmtFull(g.users)} usuarios)<br/>` +
            `Mediana/usuario: <b style="color:${C.volt}">${fmtFull(g.median)}</b> · Eventos: <b>${fmt(g.totalEvents)}</b><br/>` +
            `<span style="color:${C.muted};font-size:12px;display:block;max-width:260px;margin-top:6px">${g.note}</span>`;
        }
      },
      xAxis: {
        type: "value", name: "Alcance  →  (% de usuarios activos)", nameLocation: "middle", nameGap: 30,
        nameTextStyle: { color: C.faint, fontSize: 12 }, min: 0, max: 100, ...axisCommon,
        axisLabel: { color: C.muted, formatter: "{value}%" }
      },
      yAxis: {
        type: "log", name: "Profundidad  →  (mediana usos/usuario)", nameLocation: "middle", nameGap: 38,
        nameTextStyle: { color: C.faint, fontSize: 12 }, min: 1, max: 200, ...axisCommon
      },
      series: [{
        type: "scatter", data,
        label: {
          show: true, position: "right", color: C.text, fontSize: 11, fontFamily: "Inter",
          formatter: (p) => groups[p.dataIndex].name, distance: 6
        },
        markArea: {
          silent: true, itemStyle: { color: "rgba(255,93,108,.05)" },
          data: [[{ xAxis: 0, yAxis: 1 }, { xAxis: 25, yAxis: 6 }]]
        }
      }]
    });
    register(chart);

    // legend
    const seen = [];
    document.getElementById("map-legend").innerHTML = groups
      .map(g => g.verdict).filter(v => (seen.includes(v) ? false : seen.push(v)))
      .map(v => `<span><i style="background:${VERDICT_COLOR[v]}"></i> ${v}</span>`).join("") +
      `<span style="color:var(--faint)">· tamaño de burbuja = volumen de eventos · zona roja = candidatas a matar</span>`;
  })();

  /* ---------- Recommendations ---------- */
  (function renderRecs() {
    const cols = [
      { key: "kill", cls: "kill", title: "🔴 Matar / replantear", items: D.recommendations.kill },
      { key: "improve", cls: "improve", title: "🟡 Mejorar / vigilar", items: D.recommendations.improve },
      { key: "keep", cls: "keep", title: "🟢 Mantener / invertir", items: D.recommendations.keep }
    ];
    document.getElementById("recs").innerHTML = cols.map(c => `
      <div class="rec-col ${c.cls}">
        <h3>${c.title}</h3>
        ${c.items.map(it => `
          <div class="rec-item">
            <div class="rt">${it.name}</div>
            <div class="rm">${it.metric}</div>
            <div class="rw">${it.why}</div>
          </div>`).join("")}
      </div>`).join("");
  })();
})();
