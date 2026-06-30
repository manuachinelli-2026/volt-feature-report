/* =============================================================================
   Volt — Uso de funcionalidades por segmento · DATA SNAPSHOT (WAU)
   -----------------------------------------------------------------------------
   Fuente:   PostHog · "Volt Prd" (347977) · 180 días (2026-01-01 → 2026-06-30)
   Filtro:   WAU (WhatsApp Active Users) = usuarios con actividad en los últimos
             20 días. Se excluyen dormidos/churned de TODO el reporte.
   Segmento: person.properties.status → Free / Premium / Employee
   Outlier:  por feature×segmento: media (m), mediana (md), media sin el usuario
             outlier (me), % del usuario tope (tp) y quién es (tu → users{}).
   ============================================================================= */

window.VOLT_DATA = {
  meta: {
    windowDays: 180,
    wauDays: 20,
    periodStart: "2026-01-01",
    periodEnd: "2026-06-30",
    generatedAt: "2026-06-30",
    totalEvents: 4476683,      // eventos (180d) de usuarios WAU identificados
    activeWAU: 417,            // usuarios activos últimos 20 días (Free+Premium+Employee)
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
  },

  segments: [
    { key: "Free",     label: "Free",     users: 267, events: 1063620, perUser: 3984,  color: "#3a9e1e" },
    { key: "Premium",  label: "Premium",  users: 138, events: 3152524, perUser: 22844, color: "#b060ff" },
    { key: "Employee", label: "Employee", users: 12,  events: 260539,  perUser: 21712, color: "#f59e0b" }
  ],

  // TENDENCIA — usuarios activos por mes (WAU), ene→jun. null = no existía ese mes.
  keyTrends: {
    "Transcripción de voz":      [69, 83, 117, 170, 240, 288],
    "Atajos de teclado":         [null, 45, 116, 171, 244, 286],
    "Mensajes programados":      [37, 58, 99, 143, 218, 240],
    "Tareas y recordatorios":    [54, 30, 58, 76, 110, 86],
    "Listas y workspaces":       [57, 65, 104, 144, 222, 236],
    "Broadcast":                 [4, 8, 14, 14, 28, 28],
    "/meet y /zoom":             [null, null, null, 11, 71, 61],
    "App Store / Integraciones": [null, null, null, 4, 79, 84],
    "Modo privado":              [null, null, 14, 30, 29, 33],
    "IA (Claude / ChatGPT)":     [null, null, null, 25, 93, 96],
    "Nuevo chat":                [34, 39, 29, 30, 33, 31]
  },

  // SHORTCUTS por segmento (WAU)
  shortcuts: [
    { seg: "Premium",  u: 129, t: 218897, m: 1696.9, md: 617.0,  mx: 12159, me: 1615.1, tp: 5.6,  tu: "02198bb3", adopt: 93, share: 66 },
    { seg: "Employee", u: 12,  t: 21606,  m: 1800.5, md: 1314.0, mx: 8299,  me: 1209.7, tp: 38.4, tu: "a0c28a6f", adopt: 100, share: 82 },
    { seg: "Free",     u: 220, t: 65944,  m: 299.7,  md: 69.5,   mx: 4732,  me: 279.5,  tp: 7.2,  tu: "c1dab004", adopt: 82, share: 59 }
  ],

  // GRUPOS DE FEATURES × SEGMENTO (WAU)
  groups: [
    { name: "Chat & Messaging", seg: {
        Free:     { u: 254, t: 729251,  m: 2871.1,  md: 849.0,  mx: 33929, me: 2748.3,  tp: 4.7,  tu: "c1dab004" },
        Premium:  { u: 131, t: 1711041, m: 13061.4, md: 8794.0, mx: 55016, me: 12738.7, tp: 3.2,  tu: "05377919" },
        Employee: { u: 12,  t: 94318,   m: 7859.8,  md: 5458.5, mx: 38885, me: 5039.4,  tp: 41.2, tu: "a0c28a6f" } } },
    { name: "Voice & Transcription", seg: {
        Free:     { u: 215, t: 147239, m: 684.8,  md: 192.0, mx: 6882, me: 655.9,  tp: 4.7,  tu: "c1dab004" },
        Premium:  { u: 127, t: 191296, m: 1506.3, md: 974.0, mx: 7514, me: 1458.6, tp: 3.9,  tu: "2de5b224" },
        Employee: { u: 12,  t: 11747,  m: 978.9,  md: 842.0, mx: 2944, me: 800.3,  tp: 25.1, tu: "a0c28a6f" } } },
    { name: "Command Palette & Nav", seg: {
        Free:     { u: 171, t: 17026,  m: 99.6,   md: 10.0,  mx: 1450, me: 91.6,  tp: 8.5,  tu: "705e671d" },
        Premium:  { u: 119, t: 119400, m: 1003.4, md: 379.0, mx: 6253, me: 958.9, tp: 5.2,  tu: "b957618e" },
        Employee: { u: 12,  t: 6534,   m: 544.5,  md: 369.0, mx: 2027, me: 409.7, tp: 31.0, tu: "a0c28a6f" } } },
    { name: "Lists & Organization", seg: {
        Free:     { u: 218, t: 5579,  m: 25.6,  md: 4.0,   mx: 1302, me: 19.7,  tp: 23.3, tu: "4d26413f" },
        Premium:  { u: 122, t: 68432, m: 560.9, md: 15.5,  mx: 9931, me: 483.5, tp: 14.5, tu: "9b42fef7" },
        Employee: { u: 12,  t: 2967,  m: 247.2, md: 106.5, mx: 769,  me: 199.8, tp: 25.9, tu: "01281485" } } },
    { name: "Search", seg: {
        Free:     { u: 200, t: 33094, m: 165.5, md: 42.5, mx: 2328, me: 154.6, tp: 7.0,  tu: "dff04e4f" },
        Premium:  { u: 128, t: 34921, m: 272.8, md: 91.0, mx: 2902, me: 252.1, tp: 8.3,  tu: "3e6f2e08" },
        Employee: { u: 10,  t: 738,   m: 73.8,  md: 25.0, mx: 361,  me: 41.9,  tp: 48.9, tu: "5800db99" } } },
    { name: "Broadcast", seg: {
        Free:     { u: 33, t: 2223,  m: 67.4,   md: 2.0, mx: 841,   me: 43.2,   tp: 37.8, tu: "fade3c6e" },
        Premium:  { u: 29, t: 52722, m: 1818.0, md: 3.0, mx: 16766, me: 1284.1, tp: 31.8, tu: "bd9533c7" },
        Employee: { u: 7,  t: 482,   m: 68.9,   md: 3.0, mx: 464,   me: 3.0,    tp: 96.3, tu: "361a5123" } } },
    { name: "MCP / Developer API", seg: {
        Free:     { u: 84, t: 8467,  m: 100.8, md: 3.5,  mx: 2871, me: 67.4,  tp: 33.9, tu: "6f40b097" },
        Premium:  { u: 62, t: 25239, m: 407.1, md: 4.0,  mx: 7975, me: 283.0, tp: 31.6, tu: "9962ef3c" },
        Employee: { u: 9,  t: 238,   m: 26.4,  md: 12.0, mx: 121,  me: 14.6,  tp: 50.8, tu: "361a5123" } } },
    { name: "Send Later / Scheduling", seg: {
        Free:     { u: 234, t: 3909,  m: 16.7,  md: 10.0, mx: 152,  me: 16.1, tp: 3.9,  tu: "9783edce" },
        Premium:  { u: 125, t: 11060, m: 88.5,  md: 28.0, mx: 2420, me: 69.7, tp: 21.9, tu: "05d19df6" },
        Employee: { u: 12,  t: 1452,  m: 121.0, md: 39.5, mx: 447,  me: 91.4, tp: 30.8, tu: "361a5123" } } },
    { name: "CRM / Tickets / Issues", seg: {
        Free:     { u: 11, t: 648,   m: 58.9,  md: 13.0,  mx: 439,  me: 20.9,  tp: 67.7, tu: "404f91ce" },
        Premium:  { u: 15, t: 14280, m: 952.0, md: 17.0,  mx: 5290, me: 642.1, tp: 37.0, tu: "ed216392" },
        Employee: { u: 6,  t: 1071,  m: 178.5, md: 124.5, mx: 445,  me: 125.2, tp: 41.5, tu: "3d56f4a7" } } },
    { name: "Onboarding", seg: {
        Free:     { u: 217, t: 2028, m: 9.3,  md: 8.0,  mx: 47,  me: 9.2,  tp: 2.3,  tu: "e49f8331" },
        Premium:  { u: 125, t: 2357, m: 18.9, md: 16.0, mx: 97,  me: 18.2, tp: 4.1,  tu: "9962ef3c" },
        Employee: { u: 12,  t: 787,  m: 65.6, md: 16.0, mx: 353, me: 39.5, tp: 44.9, tu: "2842c620" } } },
    { name: "Settings & UI", seg: {
        Free:     { u: 103, t: 557,  m: 5.4,  md: 2.0, mx: 47,  me: 5.0,  tp: 8.4,  tu: "2842c620" },
        Premium:  { u: 83,  t: 1188, m: 14.3, md: 8.0, mx: 133, me: 12.9, tp: 11.2, tu: "00a9ef57" },
        Employee: { u: 11,  t: 620,  m: 56.4, md: 9.0, mx: 207, me: 41.3, tp: 33.4, tu: "361a5123" } } },
    { name: "AI Drafts & Suggestions", seg: {
        Free:     { u: 117, t: 718,  m: 6.1,  md: 2.0, mx: 114, me: 5.2,  tp: 15.9, tu: "068da5c3" },
        Premium:  { u: 92,  t: 1421, m: 15.4, md: 6.5, mx: 239, me: 13.0, tp: 16.8, tu: "a70669d6" },
        Employee: { u: 10,  t: 68,   m: 6.8,  md: 5.5, mx: 27,  me: 4.6,  tp: 39.7, tu: "361a5123" } } },
    { name: "Volt Cloud", seg: {
        Free:     { u: 128, t: 727,  m: 5.7,  md: 4.0, mx: 25, me: 5.5,  tp: 3.4,  tu: "bc5bbe6a" },
        Premium:  { u: 92,  t: 1227, m: 13.3, md: 8.0, mx: 73, me: 12.7, tp: 5.9,  tu: "0284115e" },
        Employee: { u: 12,  t: 116,  m: 9.7,  md: 8.0, mx: 26, me: 8.2,  tp: 22.4, tu: "361a5123" } } },
    { name: "Tasks", seg: {
        Free:     { u: 136, t: 980, m: 7.2,  md: 3.0, mx: 55,  me: 6.9, tp: 5.6,  tu: "4d26413f" },
        Premium:  { u: 77,  t: 884, m: 11.5, md: 4.0, mx: 129, me: 9.9, tp: 14.6, tu: "0284115e" },
        Employee: { u: 12,  t: 101, m: 8.4,  md: 4.5, mx: 25,  me: 6.9, tp: 24.8, tu: "5800db99" } } },
    { name: "Reminders", seg: {
        Free:     { u: 4,  t: 37,  m: 9.2,  md: 9.0,  mx: 13,  me: 8.0,  tp: 35.1, tu: "441406a4" },
        Premium:  { u: 56, t: 814, m: 14.5, md: 6.0,  mx: 302, me: 9.3,  tp: 37.1, tu: "b957618e" },
        Employee: { u: 6,  t: 252, m: 42.0, md: 36.0, mx: 122, me: 26.0, tp: 48.4, tu: "2842c620" } } },
    { name: "Integrations & App Store", seg: {
        Free:     { u: 87, t: 395, m: 4.5,  md: 2.0,  mx: 23, me: 4.3,  tp: 5.8,  tu: "980cc87a" },
        Premium:  { u: 52, t: 314, m: 6.0,  md: 2.5,  mx: 59, me: 5.0,  tp: 18.8, tu: "0ee76e12" },
        Employee: { u: 8,  t: 205, m: 25.6, md: 16.5, mx: 89, me: 16.6, tp: 43.4, tu: "3d56f4a7" } } },
    { name: "HubSpot Integration", seg: {
        Free:     { u: 6, t: 282, m: 47.0, md: 15.5, mx: 141, me: 28.2, tp: 50.0, tu: "2b9f524a" },
        Premium:  { u: 8, t: 452, m: 56.5, md: 29.5, mx: 207, me: 35.0, tp: 45.8, tu: "92c4c8ef" },
        Employee: { u: 3, t: 116, m: 38.7, md: 21.0, mx: 93,  me: 11.5, tp: 80.2, tu: "3d56f4a7" } } },
    { name: "Workspaces & Team", seg: {
        Free:     { u: 60, t: 331, m: 5.5,  md: 4.0,  mx: 39, me: 4.9,  tp: 11.8, tu: "fbfd75f7" },
        Premium:  { u: 45, t: 335, m: 7.4,  md: 3.0,  mx: 62, me: 6.2,  tp: 18.5, tu: "f1957bfe" },
        Employee: { u: 9,  t: 155, m: 17.2, md: 10.0, mx: 67, me: 11.0, tp: 43.2, tu: "01281485" } } },
    { name: "Meeting & Call Commands", seg: {
        Free:     { u: 37, t: 195, m: 5.3,  md: 2.0,  mx: 35, me: 4.4,  tp: 17.9, tu: "f3a7ad61" },
        Premium:  { u: 52, t: 471, m: 9.1,  md: 4.0,  mx: 61, me: 8.0,  tp: 13.0, tu: "38d28446" },
        Employee: { u: 9,  t: 148, m: 16.4, md: 19.0, mx: 30, me: 14.8, tp: 20.3, tu: "361a5123" } } },
    { name: "Contacts & Groups", seg: {
        Free:     { u: 17, t: 70,  m: 4.1, md: 2.0, mx: 27, me: 2.7, tp: 38.6, tu: "82d8e68f" },
        Premium:  { u: 59, t: 572, m: 9.7, md: 4.0, mx: 78, me: 8.5, tp: 13.6, tu: "9641c310" },
        Employee: { u: 7,  t: 67,  m: 9.6, md: 3.0, mx: 31, me: 6.0, tp: 46.3, tu: "361a5123" } } },
    { name: "Monetization / Upsell", seg: {
        Free:     { u: 105, t: 324, m: 3.1,  md: 2.0,  mx: 20, me: 2.9, tp: 6.2,  tu: "2842c620" },
        Premium:  { u: 21,  t: 50,  m: 2.4,  md: 1.0,  mx: 13, me: 1.8, tp: 26.0, tu: "ea90eea9" },
        Employee: { u: 2,   t: 22,  m: 11.0, md: 11.0, mx: 21, me: 1.0, tp: 95.5, tu: "2842c620" } } }
  ],

  // FUNCIONALIDADES CLAVE (handbook), uso por segmento (WAU)
  keyFeatures: [
    { icon: "🎙️", name: "Transcripción de voz", desc: "Audios de WhatsApp → texto y resumen con IA. Leé, no escuches.", seg: {
        Free: { u: 215, m: 684.8, md: 192.0, me: 655.9 }, Premium: { u: 127, m: 1506.3, md: 974.0, me: 1458.6 }, Employee: { u: 12, m: 978.9, md: 842.0, me: 800.3 } } },
    { icon: "⌨️", name: "Atajos de teclado", desc: "Operá todo Volt sin tocar el mouse. +50 shortcuts.", seg: {
        Free: { u: 220, m: 299.7, md: 69.5, me: 279.5 }, Premium: { u: 129, m: 1696.9, md: 617.0, me: 1615.1 }, Employee: { u: 12, m: 1800.5, md: 1314.0, me: 1209.7 } } },
    { icon: "⏰", name: "Mensajes programados", desc: "Escribí ahora, enviá en el momento perfecto (Send Later).", seg: {
        Free: { u: 234, m: 16.7, md: 10.0, me: 16.1 }, Premium: { u: 125, m: 88.5, md: 28.0, me: 69.7 }, Employee: { u: 12, m: 121.0, md: 39.5, me: 91.4 } } },
    { icon: "✅", name: "Tareas y recordatorios", desc: "Mensajes → tareas y recordatorios. Nada se escapa.", seg: {
        Free: { u: 139, m: 7.3, md: 3.0, me: 7.0 }, Premium: { u: 97, m: 17.5, md: 8.0, me: 14.4 }, Employee: { u: 12, m: 29.4, md: 11.5, me: 20.5 } } },
    { icon: "📂", name: "Listas y workspaces", desc: "Chats y grupos ordenados en listas y espacios de trabajo.", seg: {
        Free: { u: 218, m: 25.6, md: 4.0, me: 19.7 }, Premium: { u: 122, m: 560.9, md: 15.5, me: 483.5 }, Employee: { u: 12, m: 247.2, md: 106.5, me: 199.8 } } },
    { icon: "📢", name: "Broadcast", desc: "Mensajes personalizados a cientos de contactos a la vez.", seg: {
        Free: { u: 33, m: 67.4, md: 2.0, me: 43.2 }, Premium: { u: 29, m: 1818.0, md: 3.0, me: 1284.1 }, Employee: { u: 7, m: 68.9, md: 3.0, me: 3.0 } } },
    { icon: "🎥", name: "/meet y /zoom", desc: "Link de reunión en segundos, sin salir del chat.", seg: {
        Free: { u: 37, m: 5.3, md: 2.0, me: 4.4 }, Premium: { u: 52, m: 9.1, md: 4.0, me: 8.0 }, Employee: { u: 9, m: 16.4, md: 19.0, me: 14.8 } } },
    { icon: "🧩", name: "App Store / Integraciones", desc: "Conectá Meet, Zoom, HubSpot, Claude, Zendesk y más.", seg: {
        Free: { u: 87, m: 4.5, md: 2.0, me: 4.3 }, Premium: { u: 52, m: 6.0, md: 2.5, me: 5.0 }, Employee: { u: 8, m: 25.6, md: 16.5, me: 16.6 } } },
    { icon: "🔒", name: "Modo privado", desc: "Blurrea tus chats al compartir pantalla (⌘D).", seg: {
        Free: { u: 31, m: 5.9, md: 4.0, me: 5.4 }, Premium: { u: 39, m: 6.0, md: 4.0, me: 5.1 }, Employee: { u: 8, m: 28.0, md: 5.0, me: 19.7 } } },
    { icon: "🤖", name: "IA (Claude / ChatGPT)", desc: "Conectá tu IA a Volt con acceso a tus chats (MCP).", seg: {
        Free: { u: 84, m: 100.8, md: 3.5, me: 67.4 }, Premium: { u: 62, m: 407.1, md: 4.0, me: 283.0 }, Employee: { u: 9, m: 26.4, md: 12.0, me: 14.6 } } },
    { icon: "💬", name: "Nuevo chat", desc: "Escribile a cualquier número sin tenerlo agendado.", seg: {
        Free: { u: 28, m: 3.2, md: 2.0, me: 2.4 }, Premium: { u: 66, m: 14.4, md: 4.0, me: 11.0 }, Employee: { u: 6, m: 18.0, md: 10.5, me: 10.6 } } }
  ],

  // /meet y /zoom — sin outlier; uso bajo (WAU)
  meetZoom: [
    { cmd: "/meet (triggered)", u: 91, t: 454, m: 5.0, md: 2.0, tp: 7.5,  me: 4.7 },
    { cmd: "/meet (completado)", u: 60, t: 309, m: 5.2, md: 2.5, tp: 8.7, me: 4.8 },
    { cmd: "/zoom (triggered)",  u: 16, t: 34,  m: 2.1, md: 1.0, tp: 17.6, me: 1.9 },
    { cmd: "/zoom (completado)", u: 10, t: 23,  m: 2.3, md: 2.0, tp: 21.7, me: 2.0 }
  ],

  // Lookup de usuarios outlier → nombre + teléfono
  users: {
    "00a9ef57": { n: "Jose Murillo",                 p: "14132306735" },
    "01281485": { n: "Santiago Santana",             p: "5492974428565" },
    "02198bb3": { n: "Deepak Chhugani",              p: "16178708645" },
    "0284115e": { n: "Mahmoud Shawky",               p: "966546662329" },
    "05377919": { n: "Gonzalo Strauss",              p: "59898452662" },
    "05d19df6": { n: "Luis Felipe Giraldo",          p: "573127433687" },
    "068da5c3": { n: "Sagaon Tech",                  p: "5213311320625" },
    "0ee76e12": { n: "Aitor Fernández",              p: "34623928079" },
    "2842c620": { n: "Federico",                     p: "5491173674957" },
    "2b9f524a": { n: "Laila Gomes",                  p: "553298164313" },
    "2de5b224": { n: "Matias Craviotto",             p: "59891527980" },
    "361a5123": { n: "Manuel Mao",                   p: "5491138629682" },
    "38d28446": { n: "Psicóloga Milagros Garbiero",  p: "34611834606" },
    "3d56f4a7": { n: "tom",                          p: "5491168919547" },
    "3e6f2e08": { n: "David Paredes Gortaire",       p: "593992786941" },
    "404f91ce": { n: "Lili",                         p: "5215516190510" },
    "441406a4": { n: "Agustina | OrderEAT",          p: "59898265586" },
    "4d26413f": { n: "Seba",                         p: "5491139009382" },
    "5800db99": { n: "Alina Alvarez",                p: "5491131596226" },
    "6f40b097": { n: "Ian",                          p: "5215525072003" },
    "705e671d": { n: "—",                            p: "" },
    "82d8e68f": { n: "—",                            p: "" },
    "92c4c8ef": { n: "Humand",                       p: "5492643163809" },
    "9641c310": { n: "FH",                           p: "5511973446566" },
    "9783edce": { n: "Mikaela Malaquina - OrderEAT", p: "59893514970" },
    "980cc87a": { n: "Carlos Gesino",                p: "5491123328443" },
    "9962ef3c": { n: "Ezequiel Morkin",              p: "5491165836983" },
    "9b42fef7": { n: "Damaris",                      p: "5218120738321" },
    "a0c28a6f": { n: "kenny 🥀",                      p: "5491161171314" },
    "a70669d6": { n: "Anabella",                     p: "5491156997056" },
    "b957618e": { n: "Pedro Emboava",                p: "553175236312" },
    "bc5bbe6a": { n: "Fabián",                       p: "5215525444265" },
    "bd9533c7": { n: "DANCASSAB",                    p: "5215561623436" },
    "c1dab004": { n: "Iñaki Valencia",               p: "5492236000055" },
    "dff04e4f": { n: "—",                            p: "" },
    "e49f8331": { n: "C.",                           p: "5212221158565" },
    "ea90eea9": { n: "Carolina Vogt",                p: "5491165740143" },
    "ed216392": { n: "Ely 🌸",                        p: "5215577630703" },
    "f1957bfe": { n: "Luciana Lucero | Humand",      p: "5492241620376" },
    "f3a7ad61": { n: "Martin Vassallo",              p: "5493454195549" },
    "fade3c6e": { n: "Grupo Chelo",                  p: "5491176199820" },
    "fbfd75f7": { n: "Juan Manuel Núñez",            p: "5218116096925" }
  }
};
