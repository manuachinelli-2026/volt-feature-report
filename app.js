/* Volt — segmented feature report (light theme, ECharts) */
(function () {
  if (!window.VOLT_DATA) { console.error("data.js no cargó"); return; }
  const D = window.VOLT_DATA;
  const charts = [];
  const reg = (c) => { if (c) charts.push(c); };
  window.addEventListener("resize", () => charts.forEach(c => c.resize()));

  const COL = { text: "#0f172b", muted: "#5a6473", faint: "#9aa3b2", line: "#e6e8ec", grid: "#eef0f3", navy: "#0f172b" };
  const SEG = {}; D.segments.forEach(s => SEG[s.key] = s.color);
  const SEG_ORDER = ["Free", "Premium", "Employee"];
  const METRIC_LABEL = { m: "Promedio", me: "Promedio sin outlier", md: "Mediana" };

  const U = D.users || {};
  const who = (tu) => {
    const u = U[tu];
    if (!u) return `<code>${tu}</code>`;
    return `<b>${u.n}</b> <span style="color:var(--muted)">+${u.p}</span>`;
  };

  const fmt = (n) => {
    if (n == null) return "—";
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
    return (+n).toLocaleString("es-AR");
  };
  const full = (n) => n == null ? "—" : (+n).toLocaleString("es-AR");

  const axis = {
    axisLine: { lineStyle: { color: COL.line } }, axisTick: { show: false },
    axisLabel: { color: COL.muted, fontFamily: "Inter", fontSize: 12 },
    splitLine: { lineStyle: { color: COL.grid } }
  };
  const tip = {
    backgroundColor: "#ffffff", borderColor: "#e6e8ec", borderWidth: 1,
    textStyle: { color: COL.text, fontFamily: "Inter", fontSize: 13 },
    extraCssText: "border-radius:10px;padding:11px 13px;box-shadow:0 8px 28px rgba(15,23,43,.12)"
  };

  /* ---- segment KPI cards ---- */
  document.getElementById("segcards").innerHTML = D.segments.map(s => `
    <div class="segcard ${s.key}">
      <div class="tag">${s.label}</div>
      <div class="users">${full(s.users)}</div>
      <div class="row"><span>Eventos</span><b>${fmt(s.events)}</b></div>
      <div class="row"><span>Eventos / usuario</span><b>${full(s.perUser)}</b></div>
    </div>`).join("");

  /* ---- KEY FEATURES (handbook) + trend ---- */
  const MONTHS = (D.meta.months || []);
  function trendInfo(name) {
    const t = (D.keyTrends || {})[name];
    if (!t) return null;
    const idx = t.map((v, i) => v == null ? -1 : i).filter(i => i >= 0);
    if (!idx.length) return null;
    const firstIdx = idx[0], lastIdx = idx[idx.length - 1];
    const first = t[firstIdx], last = t[lastIdx];
    const isNew = firstIdx >= 2;             // apareció en marzo o después
    const pct = first ? Math.round((last / first - 1) * 100) : 0;
    return { t, firstIdx, lastIdx, first, last, isNew, pct };
  }
  function spark(t, color) {
    const W = 120, H = 30, P = 3;
    const nn = t.filter(v => v != null);
    const mn = Math.min(...nn), mx = Math.max(...nn);
    const span = mx - mn || 1, n = t.length;
    const pts = [];
    t.forEach((v, i) => {
      if (v == null) return;
      const x = (i / (n - 1)) * (W - 2 * P) + P;
      const y = H - P - ((v - mn) / span) * (H - 2 * P);
      pts.push([x, y]);
    });
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = `M${pts[0][0].toFixed(1)} ${H} ` + pts.map(p => "L" + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ") + ` L${pts[pts.length-1][0].toFixed(1)} ${H} Z`;
    const last = pts[pts.length - 1];
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
      <path d="${area}" fill="${color}1f"/>
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.6" fill="${color}"/>
    </svg>`;
  }
  const METRIC_FULL = { m: "Promedio de usos por usuario", me: "Promedio sin el usuario outlier", md: "Mediana de usos por usuario" };
  let kfMetric = "m";
  function renderKF() {
    document.getElementById("keyfeatures").innerHTML = D.keyFeatures.map(f => {
      const vals = SEG_ORDER.map(k => f.seg[k] ? (f.seg[k][kfMetric] || 0) : 0);
      const max = Math.max(...vals, 1);
      const rows = SEG_ORDER.map(k => {
        const s = f.seg[k]; if (!s) return "";
        const v = s[kfMetric] || 0;
        const w = Math.max(3, (v / max) * 100);
        return `<div class="kf-row">
          <span class="lab"><i style="background:${SEG[k]}"></i>${k}</span>
          <span class="track"><span class="fill" style="width:${w}%;background:${SEG[k]}"></span></span>
          <span class="val">${full(v)} <span class="u">${s.u}u</span></span>
        </div>`;
      }).join("");
      const ti = trendInfo(f.name);
      let trendHTML = "";
      if (ti) {
        const up = ti.pct >= 0;
        const color = ti.isNew ? "#c2710c" : (up ? "#3a9e1e" : "#d23b3b");
        const badge = ti.isNew
          ? `<span class="kf-badge new">🆕 Nueva · ${MONTHS[ti.firstIdx]}</span>`
          : `<span class="kf-badge ${up ? "up" : "down"}">${up ? "▲" : "▼"} ${Math.abs(ti.pct)}%</span>`;
        trendHTML = `<div class="kf-trend"><span class="spk-wrap"><span class="spk">${spark(ti.t, color)}</span><span class="spk-cap">usuarios activos/mes · crecim. ene→jun</span></span>${badge}</div>`;
      }
      return `<div class="kf-card">
        <div class="top"><span class="ic">${f.icon}</span><div><div class="nm">${f.name}</div><div class="ds">${f.desc}</div></div></div>
        ${trendHTML}
        <div class="kf-mlabel">${METRIC_FULL[kfMetric]} <span>· u = usuarios</span></div>
        <div class="kf-seg">${rows}</div>
      </div>`;
    }).join("");
  }
  renderKF();
  bindToggle("kf-toggle", (m) => { kfMetric = m; renderKF(); });

  /* trend summary banner */
  (function () {
    const el = document.getElementById("kf-summary");
    if (!el) return;
    const news = [], growers = [], decliners = [];
    D.keyFeatures.forEach(f => {
      const ti = trendInfo(f.name); if (!ti) return;
      if (ti.isNew) news.push(`${f.icon} ${f.name}`);
      else if (ti.pct >= 60) growers.push({ n: f.name, ic: f.icon, p: ti.pct });
      else if (ti.pct <= 0) decliners.push({ n: f.name, ic: f.icon, p: ti.pct });
    });
    growers.sort((a, b) => b.p - a.p);
    el.innerHTML =
      `<div class="ts-item ts-new"><span class="ts-h">🆕 Nuevas</span>${news.join(" · ") || "—"}</div>` +
      `<div class="ts-item ts-up"><span class="ts-h">📈 Más crecimiento</span>${growers.slice(0,4).map(g => `${g.ic} ${g.n} <b>+${g.p}%</b>`).join(" · ")}</div>` +
      `<div class="ts-item ts-flat"><span class="ts-h">😴 Sin crecer</span>${decliners.map(g => `${g.ic} ${g.n}`).join(" · ") || "—"}</div>`;
  })();

  /* ---- segment legend (shared) ---- */
  const segLegendHTML = SEG_ORDER.map(k => `<span><i style="background:${SEG[k]}"></i>${k}</span>`).join("");
  document.getElementById("sc-legend").innerHTML = segLegendHTML;
  document.getElementById("grp-legend").innerHTML = segLegendHTML;

  /* ---- chart: segment weight (events + per user) ---- */
  (function () {
    const segs = D.segments;
    const c = echarts.init(document.getElementById("chart-seg"));
    c.setOption({
      grid: { left: 8, right: 80, top: 10, bottom: 24, containLabel: true },
      tooltip: {
        ...tip, trigger: "axis", axisPointer: { type: "shadow" },
        formatter: (p) => { const s = segs[p[0].dataIndex]; return `<b>${s.label}</b><br/>Usuarios: <b>${full(s.users)}</b><br/>Eventos: <b>${full(s.events)}</b><br/>Eventos/usuario: <b>${full(s.perUser)}</b>`; }
      },
      xAxis: { type: "log", ...axis, name: "eventos (log)", nameTextStyle: { color: COL.faint }, nameLocation: "end" },
      yAxis: { type: "category", data: segs.map(s => s.label), ...axis, axisLabel: { color: COL.text, fontWeight: 600, fontSize: 13 } },
      series: [{
        type: "bar", data: segs.map(s => ({ value: s.events, itemStyle: { color: s.color, borderRadius: [0, 5, 5, 0] } })), barWidth: "52%",
        label: { show: true, position: "right", color: COL.muted, fontWeight: 600, formatter: (p) => `${fmt(p.value)} · ${full(segs[p.dataIndex].perUser)}/u` }
      }]
    });
    reg(c);
  })();

  /* ---- chart: shortcuts per segment (toggle metric) ---- */
  let scChart, scMetric = "m";
  function drawShortcuts() {
    const rows = SEG_ORDER.map(k => D.shortcuts.find(s => s.seg === k)).filter(Boolean);
    if (!scChart) scChart = echarts.init(document.getElementById("chart-shortcuts"));
    scChart.setOption({
      grid: { left: 8, right: 70, top: 10, bottom: 30, containLabel: true },
      tooltip: {
        ...tip, trigger: "axis", axisPointer: { type: "shadow" },
        formatter: (p) => { const r = rows[p[0].dataIndex]; return `<b>${r.seg}</b> · shortcuts/usuario<br/>Promedio: <b>${full(r.m)}</b><br/>Sin outlier: <b>${full(r.me)}</b><br/>Mediana: <b>${full(r.md)}</b><br/><span style="color:${COL.faint}">${r.u} usuarios · adopción ${r.adopt}% · 1 usuario = ${r.tp}%</span>`; }
      },
      xAxis: { type: "value", ...axis, name: METRIC_LABEL[scMetric] + " (atajos/usuario)", nameTextStyle: { color: COL.faint }, nameLocation: "middle", nameGap: 28 },
      yAxis: { type: "category", data: rows.map(r => r.seg), ...axis, axisLabel: { color: COL.text, fontWeight: 600, fontSize: 13 } },
      series: [{
        type: "bar", barWidth: "52%",
        data: rows.map(r => ({ value: r[scMetric], itemStyle: { color: SEG[r.seg], borderRadius: [0, 5, 5, 0] } })),
        label: { show: true, position: "right", color: COL.text, fontWeight: 700, formatter: (p) => full(p.value) }
      }]
    });
  }
  drawShortcuts(); reg(scChart);
  bindToggle("sc-toggle", (m) => { scMetric = m; drawShortcuts(); });
  (function () {
    const emp = D.shortcuts.find(s => s.seg === "Employee");
    document.getElementById("sc-note").innerHTML =
      `Premium domina los atajos en absoluto (promedio ${full(D.shortcuts.find(s=>s.seg==='Premium').m)}/usuario). En Employee, ${who(emp.tu)} concentra el ${emp.tp}% — sin esa persona, el promedio baja de ${full(emp.m)} a <b>${full(emp.me)}</b>.`;
  })();

  /* ---- chart: groups × segment (toggle metric) ---- */
  let grpChart, grpMetric = "m";
  function drawGroups() {
    const groups = [...D.groups].sort((a, b) => totalOf(b) - totalOf(a));
    const names = groups.map(g => g.name).reverse();
    const gg = [...groups].reverse();
    if (!grpChart) grpChart = echarts.init(document.getElementById("chart-groups"));
    grpChart.setOption({
      grid: { left: 8, right: 30, top: 10, bottom: 34, containLabel: true },
      legend: { show: false },
      tooltip: {
        ...tip, trigger: "axis", axisPointer: { type: "shadow" },
        formatter: (ps) => {
          const g = gg[ps[0].dataIndex];
          let h = `<b>${g.name}</b><br/>`;
          SEG_ORDER.forEach(k => { const s = g.seg[k]; if (s) h += `<span style="color:${SEG[k]}">●</span> ${k}: <b>${full(s[grpMetric])}</b> <span style="color:${COL.faint}">(${s.u} u · med ${full(s.md)})</span><br/>`; });
          return h;
        }
      },
      xAxis: { type: "log", min: 1, ...axis, name: METRIC_LABEL[grpMetric] + " de usos/usuario (log)", nameTextStyle: { color: COL.faint }, nameLocation: "middle", nameGap: 30 },
      yAxis: { type: "category", data: names, ...axis, axisLabel: { color: COL.text, fontSize: 11.5 } },
      series: SEG_ORDER.map(k => ({
        name: k, type: "bar", barGap: "10%", barCategoryGap: "32%",
        itemStyle: { color: SEG[k], borderRadius: [0, 3, 3, 0] },
        data: gg.map(g => { const v = g.seg[k] ? g.seg[k][grpMetric] : 0; return v > 0 ? v : 0.0001; })
      }))
    });
  }
  function totalOf(g) { return SEG_ORDER.reduce((a, k) => a + (g.seg[k] ? g.seg[k].t : 0), 0); }
  drawGroups(); reg(grpChart);
  bindToggle("grp-toggle", (m) => { grpMetric = m; drawGroups(); });

  /* ---- table (one metric at a time, segment columns with bars) ---- */
  (function () {
    const thead = document.querySelector("#tbl thead");
    const tbody = document.querySelector("#tbl tbody");
    const rows = D.groups.map(g => ({ name: g.name, seg: g.seg, _total: totalOf(g), _maxTp: Math.max(...SEG_ORDER.map(k => g.seg[k] ? g.seg[k].tp : 0)) }));
    let metric = "m", sortKey = "_total", sortDir = -1;

    thead.innerHTML = "<tr>" +
      `<th class="grp" data-k="name">Funcionalidad</th>` +
      SEG_ORDER.map(k => `<th class="seg-h" data-k="${k}"><span class="dot" style="background:${SEG[k]}"></span>${k}</th>`).join("") +
      `<th data-k="flag"></th></tr>`;

    function colMax(k) { return Math.max(1, ...rows.map(r => r.seg[k] ? (r.seg[k][metric] || 0) : 0)); }
    function sortVal(r) { return sortKey === "name" ? r.name : sortKey === "_total" ? r._total : (r.seg[sortKey] ? (r.seg[sortKey][metric] || 0) : 0); }

    function draw() {
      const maxes = {}; SEG_ORDER.forEach(k => maxes[k] = colMax(k));
      const sorted = [...rows].sort((a, b) => { const av = sortVal(a), bv = sortVal(b); return typeof av === "string" ? sortDir * av.localeCompare(bv) : sortDir * (av - bv); });
      tbody.innerHTML = sorted.map(r => {
        const cells = SEG_ORDER.map(k => {
          const s = r.seg[k];
          if (!s) return `<td class="seg-cell"><span style="color:var(--faint)">—</span></td>`;
          const v = s[metric] || 0, w = Math.max(2, (v / maxes[k]) * 100);
          return `<td class="seg-cell">
            <div class="cellbar"><span style="width:${w}%;background:${SEG[k]}"></span></div>
            <div class="cellval">${full(v)}<span class="cu">${s.u} u</span></div>
          </td>`;
        }).join("");
        return `<tr><td>${r.name}</td>${cells}<td>${r._maxTp >= 30 ? '<span class="flag">outlier</span>' : ""}</td></tr>`;
      }).join("");
    }
    thead.querySelectorAll("th").forEach(th => {
      const k = th.dataset.k; if (k === "flag") return;
      th.setAttribute("tabindex", "0"); th.setAttribute("aria-sort", "none");
      const go = () => { if (k === sortKey) sortDir *= -1; else { sortKey = k; sortDir = k === "name" ? 1 : -1; } thead.querySelectorAll("th").forEach(t => t.setAttribute("aria-sort", "none")); th.setAttribute("aria-sort", sortDir === 1 ? "ascending" : "descending"); draw(); };
      th.addEventListener("click", go);
      th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    draw();
    bindToggle("tbl-toggle", (m) => { metric = m; draw(); });
  })();

  /* ---- outlier cards ---- */
  (function () {
    const items = [];
    D.groups.forEach(g => SEG_ORDER.forEach(k => {
      const s = g.seg[k];
      if (s && s.tp >= 30 && s.t >= 200) items.push({ name: g.name, seg: k, m: s.m, me: s.me, md: s.md, tp: s.tp, tu: s.tu, t: s.t, impact: s.tp / 100 * s.t });
    }));
    D.shortcuts.forEach(s => { if (s.tp >= 30) items.push({ name: "Shortcuts", seg: s.seg, m: s.m, me: s.me, md: s.md, tp: s.tp, tu: s.tu, t: s.t, impact: s.tp / 100 * s.t }); });
    items.sort((a, b) => b.impact - a.impact);
    document.getElementById("outliers").innerHTML = items.slice(0, 6).map(o => `
      <div class="out-card" style="border-left-color:${SEG[o.seg]}">
        <div class="h">${o.name}</div>
        <div class="seg" style="color:${SEG[o.seg]}">${o.seg}</div>
        <div class="nums">
          <div><div class="lbl">Promedio crudo</div><div class="val">${full(o.m)}</div></div>
          <div class="real"><div class="lbl">Real (sin outlier)</div><div class="val">${full(o.me)}</div></div>
        </div>
        <div class="who">${who(o.tu)} concentra el <b>${o.tp}%</b> del uso${o.md != null ? ` · mediana ${full(o.md)}` : ""}.</div>
      </div>`).join("");
  })();

  /* ---- meet/zoom chart ---- */
  (function () {
    const mz = D.meetZoom;
    const c = echarts.init(document.getElementById("chart-meetzoom"));
    c.setOption({
      grid: { left: 8, right: 60, top: 10, bottom: 24, containLabel: true },
      tooltip: { ...tip, trigger: "axis", axisPointer: { type: "shadow" }, formatter: (p) => { const r = mz[p[0].dataIndex]; return `<b>${r.cmd}</b><br/>Usuarios: <b>${r.u}</b><br/>Promedio: <b>${full(r.m)}</b> · Mediana: <b>${full(r.md)}</b><br/><span style="color:${COL.faint}">top usuario solo ${r.tp}% — sin outlier real</span>`; } },
      xAxis: { type: "value", ...axis, name: "promedio usos/usuario", nameTextStyle: { color: COL.faint }, nameLocation: "middle", nameGap: 26 },
      yAxis: { type: "category", data: mz.map(r => r.cmd), ...axis, axisLabel: { color: COL.text, fontSize: 12 } },
      series: [{ type: "bar", barWidth: "48%", data: mz.map(r => r.m), itemStyle: { color: "#94a3b8", borderRadius: [0, 5, 5, 0] }, label: { show: true, position: "right", color: COL.muted, fontWeight: 600, formatter: (p) => `${full(mz[p.dataIndex].u)} users` } }]
    });
    reg(c);
  })();

  /* ---- helpers ---- */
  function bindToggle(id, cb) {
    const btns = document.querySelectorAll("#" + id + " button");
    btns.forEach(b => {
      b.setAttribute("aria-pressed", b.classList.contains("on") ? "true" : "false");
      b.addEventListener("click", () => {
        btns.forEach(x => { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
        b.classList.add("on"); b.setAttribute("aria-pressed", "true");
        cb(b.dataset.m);
      });
    });
  }
})();
