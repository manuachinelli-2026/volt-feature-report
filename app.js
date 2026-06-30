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
      `Premium domina los atajos en absoluto (promedio ${full(D.shortcuts.find(s=>s.seg==='Premium').m)}/usuario). En Employee, el usuario <code style="background:#f3f5f7;padding:1px 5px;border-radius:4px">${emp.tu}</code> concentra el ${emp.tp}% — sin él, el promedio baja de ${full(emp.m)} a <b>${full(emp.me)}</b>.`;
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

  /* ---- table ---- */
  (function () {
    const thead = document.querySelector("#tbl thead");
    const tbody = document.querySelector("#tbl tbody");
    const cols = [
      { k: "name", t: "Funcionalidad", grp: true },
      { k: "Free_u", t: "Free · u" }, { k: "Free_m", t: "Free · prom" }, { k: "Free_md", t: "Free · med" },
      { k: "Premium_u", t: "Prem · u" }, { k: "Premium_m", t: "Prem · prom" }, { k: "Premium_md", t: "Prem · med" },
      { k: "Employee_u", t: "Emp · u" }, { k: "Employee_m", t: "Emp · prom" }, { k: "Employee_md", t: "Emp · med" },
      { k: "flag", t: "" }
    ];
    const rows = D.groups.map(g => {
      const maxTp = Math.max(...SEG_ORDER.map(k => g.seg[k] ? g.seg[k].tp : 0));
      const r = { name: g.name, _total: totalOf(g), _maxTp: maxTp };
      SEG_ORDER.forEach(k => { const s = g.seg[k] || {}; r[k + "_u"] = s.u || 0; r[k + "_m"] = s.m || 0; r[k + "_md"] = s.md || 0; });
      return r;
    });
    thead.innerHTML = "<tr>" + cols.map(c => `<th class="${c.grp ? "grp" : ""}" data-k="${c.k}">${c.t}</th>`).join("") + "</tr>";
    let sk = "_total", sd = -1;
    function seg_dot(k) { return `<span class="seg-dot" style="background:${SEG[k]}"></span>`; }
    function draw() {
      const sorted = [...rows].sort((a, b) => typeof a[sk] === "string" ? sd * a[sk].localeCompare(b[sk]) : sd * (a[sk] - b[sk]));
      tbody.innerHTML = sorted.map(r => `<tr>
        <td>${r.name}</td>
        <td class="mono">${full(r.Free_u)}</td><td class="mono">${full(r.Free_m)}</td><td class="mono" style="color:${COL.muted}">${full(r.Free_md)}</td>
        <td class="mono">${full(r.Premium_u)}</td><td class="mono">${full(r.Premium_m)}</td><td class="mono" style="color:${COL.muted}">${full(r.Premium_md)}</td>
        <td class="mono">${full(r.Employee_u)}</td><td class="mono">${full(r.Employee_m)}</td><td class="mono" style="color:${COL.muted}">${full(r.Employee_md)}</td>
        <td>${r._maxTp >= 30 ? '<span class="flag">outlier</span>' : ""}</td>
      </tr>`).join("");
    }
    thead.querySelectorAll("th").forEach(th => {
      th.setAttribute("tabindex", "0"); th.setAttribute("aria-sort", "none");
      const go = () => { const k = th.dataset.k; if (k === "flag") return; if (k === sk) sd *= -1; else { sk = k; sd = k === "name" ? 1 : -1; } thead.querySelectorAll("th").forEach(t => t.setAttribute("aria-sort", "none")); th.setAttribute("aria-sort", sd === 1 ? "ascending" : "descending"); draw(); };
      th.addEventListener("click", go);
      th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    draw();
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
        <div class="who">1 usuario <code>${o.tu}</code> concentra el <b>${o.tp}%</b> del uso${o.md != null ? ` · mediana ${full(o.md)}` : ""}.</div>
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
