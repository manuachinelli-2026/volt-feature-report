/* =============================================================================
   Volt — Revisión de funcionalidades por segmento · DATA SNAPSHOT
   -----------------------------------------------------------------------------
   Fuente:   PostHog · "Volt Prd" (347977) · 180 días (2026-01-01 → 2026-06-30)
   Segmento: person.properties.status  →  Free / Premium / Employee
   Outlier:  por cada feature×segmento guardamos la media, la mediana, la media
             SIN el usuario más pesado (me) y quién es ese usuario (tu, % = tp).
   Privado:  datos agregados; el usuario outlier se muestra anonimizado (8 chars).
   ============================================================================= */

window.VOLT_DATA = {
  meta: {
    windowDays: 180,
    periodStart: "2026-01-01",
    periodEnd: "2026-06-30",
    generatedAt: "2026-06-30",
    totalEvents: 4855363,           // eventos de usuarios identificados (Free+Premium+Employee)
    activeIdentified: 688            // base activa según dashboard de Volt (~626 en eventos)
  },

  // Tamaño y peso de cada segmento (usuarios identificados, 180d)
  segments: [
    { key: "Free",     label: "Free",     users: 537, events: 1342899, perUser: 2501,  color: "#3a9e1e" },
    { key: "Premium",  label: "Premium",  users: 162, events: 3228348, perUser: 19928, color: "#b060ff" },
    { key: "Employee", label: "Employee", users: 24,  events: 284116,  perUser: 11838, color: "#f59e0b" }
  ],

  // Modo de interacción (global) — Shortcuts es el modo dominante
  interaction: [
    { mode: "Shortcut",      events: 340291, users: 481 },
    { mode: "Botón",         events: 175712, users: 556 },
    { mode: "Slash command", events: 852,    users: 108 },
    { mode: "Click",         events: 241,    users: 77 },
    { mode: "Teclado",       events: 20,     users: 13 }
  ],

  // SHORTCUTS por segmento (lo que más se usa)
  // u=usuarios, t=total, m=media, md=mediana, mx=tope 1 usuario, me=media sin outlier,
  // tp=% del tope, tu=usuario tope, adopt=% del segmento que usa shortcuts, share=% de sus interacciones que son shortcut
  shortcuts: [
    { seg: "Premium",  u: 140, t: 227658, m: 1626.1, md: 565.0, mx: 12159, me: 1550.4, tp: 5.3,  tu: "02198bb3", adopt: 86, share: 66.3 },
    { seg: "Employee", u: 18,  t: 21819,  m: 1212.2, md: 245.5, mx: 8299,  me: 795.3,  tp: 38.0, tu: "a0c28a6f", adopt: 75, share: 81.8 },
    { seg: "Free",     u: 344, t: 75991,  m: 220.9,  md: 35.0,  mx: 4732,  me: 207.8,  tp: 6.2,  tu: "c1dab004", adopt: 64, share: 58.5 }
  ],

  // GRUPOS DE FEATURES × SEGMENTO  (ordenados por volumen total)
  // cada seg: { u:usuarios, t:total, m:media, md:mediana, mx:tope1, me:media_sin_outlier, tp:%tope, tu:usuario_tope }
  groups: [
    { name: "Chat & Messaging", seg: {
        Free:     { u: 448, t: 912477,  m: 2036.8, md: 184.0,  mx: 66545, me: 1892.5, tp: 7.3,  tu: "ae15356f" },
        Premium:  { u: 146, t: 1756884, m: 12033.5, md: 7252.5, mx: 55016, me: 11737.0, tp: 3.1, tu: "05377919" },
        Employee: { u: 18,  t: 96820,  m: 5378.9, md: 1857.0, mx: 38885, me: 3407.9, tp: 40.2, tu: "a0c28a6f" } } },
    { name: "Voice & Transcription", seg: {
        Free:     { u: 350, t: 178551, m: 510.1, md: 54.0,  mx: 8500, me: 487.3,  tp: 4.8,  tu: "ae15356f" },
        Premium:  { u: 139, t: 194645, m: 1400.3, md: 903.0, mx: 7514, me: 1356.0, tp: 3.9, tu: "2de5b224" },
        Employee: { u: 16,  t: 13182, m: 823.9, md: 453.0, mx: 2944, me: 682.5,  tp: 22.3, tu: "a0c28a6f" } } },
    { name: "Command Palette & Nav", seg: {
        Free:     { u: 258, t: 20390,  m: 79.0,  md: 7.0,   mx: 1956, me: 71.7,  tp: 9.6,  tu: "ae15356f" },
        Premium:  { u: 130, t: 124740, m: 959.5, md: 342.0, mx: 6253, me: 918.5, tp: 5.0,  tu: "b957618e" },
        Employee: { u: 17,  t: 6699,  m: 394.1, md: 99.0,  mx: 2027, me: 292.0, tp: 30.3, tu: "a0c28a6f" } } },
    { name: "Lists & Organization", seg: {
        Free:     { u: 358, t: 6041,  m: 16.9,  md: 3.0,  mx: 1302, me: 13.3,  tp: 21.6, tu: "4d26413f" },
        Premium:  { u: 131, t: 71748, m: 547.7, md: 15.0, mx: 9931, me: 475.5, tp: 13.8, tu: "9b42fef7" },
        Employee: { u: 18,  t: 3010, m: 167.2, md: 49.0, mx: 769,  me: 131.8, tp: 25.5, tu: "01281485" } } },
    { name: "Search", seg: {
        Free:     { u: 300, t: 41597, m: 138.7, md: 20.5, mx: 4241, me: 124.9, tp: 10.2, tu: "ae15356f" },
        Premium:  { u: 139, t: 35671, m: 256.6, md: 87.0, mx: 2902, me: 237.5, tp: 8.1,  tu: "3e6f2e08" },
        Employee: { u: 13,  t: 749,   m: 57.6,  md: 24.0, mx: 361,  me: 32.3,  tp: 48.2, tu: "5800db99" } } },
    { name: "Broadcast", seg: {
        Free:     { u: 57, t: 2356,  m: 41.3,   md: 1.0, mx: 841,   me: 27.1,   tp: 35.7, tu: "fade3c6e" },
        Premium:  { u: 32, t: 52733, m: 1647.9, md: 2.0, mx: 16766, me: 1160.2, tp: 31.8, tu: "bd9533c7" },
        Employee: { u: 9,  t: 500,   m: 55.6,   md: 3.0, mx: 464,   me: 4.5,    tp: 92.8, tu: "361a5123" } } },
    { name: "MCP / Developer API", seg: {
        Free:     { u: 109, t: 8570,  m: 78.6,  md: 3.0,  mx: 2871, me: 52.8,  tp: 33.5, tu: "6f40b097" },
        Premium:  { u: 64,  t: 25234, m: 394.3, md: 4.0,  mx: 7975, me: 274.0, tp: 31.6, tu: "9962ef3c" },
        Employee: { u: 9,   t: 238,   m: 26.4,  md: 12.0, mx: 121,  me: 14.6,  tp: 50.8, tu: "361a5123" } } },
    { name: "Send Later / Scheduling", seg: {
        Free:     { u: 396, t: 5115,  m: 12.9, md: 6.0,  mx: 152,  me: 12.6, tp: 3.0,  tu: "9783edce" },
        Premium:  { u: 136, t: 11309, m: 83.2, md: 25.0, mx: 2405, me: 66.0, tp: 21.3, tu: "05d19df6" },
        Employee: { u: 16,  t: 1525,  m: 95.3, md: 31.5, mx: 447,  me: 71.9, tp: 29.3, tu: "361a5123" } } },
    { name: "CRM / Tickets / Issues", seg: {
        Free:     { u: 11, t: 648,   m: 58.9,  md: 13.0,  mx: 439,  me: 20.9,  tp: 67.7, tu: "404f91ce" },
        Premium:  { u: 15, t: 14280, m: 952.0, md: 17.0,  mx: 5290, me: 642.1, tp: 37.0, tu: "ed216392" },
        Employee: { u: 7,  t: 1073,  m: 153.3, md: 100.0, mx: 445,  me: 104.7, tp: 41.5, tu: "3d56f4a7" } } },
    { name: "Onboarding", seg: {
        Free:     { u: 336, t: 2669, m: 7.9,  md: 6.0,  mx: 47,  me: 7.8,  tp: 1.8,  tu: "e49f8331" },
        Premium:  { u: 134, t: 2499, m: 18.6, md: 16.0, mx: 97,  me: 18.1, tp: 3.9,  tu: "9962ef3c" },
        Employee: { u: 17,  t: 815,  m: 47.9, md: 11.0, mx: 353, me: 28.9, tp: 43.3, tu: "2842c620" } } },
    { name: "Settings & UI", seg: {
        Free:     { u: 131, t: 651,  m: 5.0,  md: 2.0, mx: 47,  me: 4.6,  tp: 7.2,  tu: "2842c620" },
        Premium:  { u: 90,  t: 1316, m: 14.6, md: 7.0, mx: 133, me: 13.3, tp: 10.1, tu: "00a9ef57" },
        Employee: { u: 14,  t: 625,  m: 44.6, md: 6.5, mx: 207, me: 32.2, tp: 33.1, tu: "361a5123" } } },
    { name: "AI Drafts & Suggestions", seg: {
        Free:     { u: 157, t: 808,  m: 5.1,  md: 2.0, mx: 114, me: 4.4,  tp: 14.1, tu: "068da5c3" },
        Premium:  { u: 97,  t: 1497, m: 15.4, md: 6.0, mx: 239, me: 13.1, tp: 16.0, tu: "a70669d6" },
        Employee: { u: 12,  t: 71,   m: 5.9,  md: 4.5, mx: 27,  me: 4.0,  tp: 38.0, tu: "361a5123" } } },
    { name: "Volt Cloud", seg: {
        Free:     { u: 149, t: 794,  m: 5.3,  md: 4.0, mx: 25, me: 5.2,  tp: 3.1,  tu: "bc5bbe6a" },
        Premium:  { u: 95,  t: 1266, m: 13.3, md: 8.0, mx: 73, me: 12.7, tp: 5.8,  tu: "0284115e" },
        Employee: { u: 13,  t: 117,  m: 9.0,  md: 8.0, mx: 26, me: 7.6,  tp: 22.2, tu: "361a5123" } } },
    { name: "Tasks", seg: {
        Free:     { u: 202, t: 1210, m: 6.0,  md: 2.0, mx: 55,  me: 5.7, tp: 4.5,  tu: "4d26413f" },
        Premium:  { u: 83,  t: 911,  m: 11.0, md: 4.0, mx: 129, me: 9.5, tp: 14.2, tu: "0284115e" },
        Employee: { u: 15,  t: 110,  m: 7.3,  md: 4.0, mx: 25,  me: 6.1, tp: 22.7, tu: "5800db99" } } },
    { name: "Reminders", seg: {
        Free:     { u: 7,  t: 45,  m: 6.4,  md: 6.0,  mx: 13,  me: 5.3,  tp: 28.9, tu: "441406a4" },
        Premium:  { u: 60, t: 858, m: 14.3, md: 6.0,  mx: 302, me: 9.4,  tp: 35.2, tu: "b957618e" },
        Employee: { u: 8,  t: 275, m: 34.4, md: 25.5, mx: 122, me: 21.9, tp: 44.4, tu: "2842c620" } } },
    { name: "Integrations & App Store", seg: {
        Free:     { u: 108, t: 453, m: 4.2,  md: 2.0,  mx: 23, me: 4.0,  tp: 5.1,  tu: "980cc87a" },
        Premium:  { u: 55,  t: 315, m: 5.7,  md: 2.0,  mx: 55, me: 4.8,  tp: 17.5, tu: "0ee76e12" },
        Employee: { u: 8,   t: 205, m: 25.6, md: 16.5, mx: 89, me: 16.6, tp: 43.4, tu: "3d56f4a7" } } },
    { name: "Workspaces & Team", seg: {
        Free:     { u: 86, t: 439, m: 5.1,  md: 3.5,  mx: 39, me: 4.7,  tp: 8.9,  tu: "fbfd75f7" },
        Premium:  { u: 48, t: 344, m: 7.2,  md: 3.0,  mx: 62, me: 6.0,  tp: 18.0, tu: "f1957bfe" },
        Employee: { u: 9,  t: 155, m: 17.2, md: 10.0, mx: 67, me: 11.0, tp: 43.2, tu: "01281485" } } },
    { name: "Meeting & Call Commands", seg: {
        Free:     { u: 46, t: 226, m: 4.9,  md: 2.0,  mx: 35, me: 4.2,  tp: 15.5, tu: "f3a7ad61" },
        Premium:  { u: 54, t: 472, m: 8.7,  md: 4.0,  mx: 57, me: 7.8,  tp: 12.1, tu: "38d28446" },
        Employee: { u: 9,  t: 148, m: 16.4, md: 19.0, mx: 30, me: 14.8, tp: 20.3, tu: "361a5123" } } },
    { name: "HubSpot Integration", seg: {
        Free:     { u: 6, t: 282, m: 47.0, md: 15.5, mx: 141, me: 28.2, tp: 50.0, tu: "2b9f524a" },
        Premium:  { u: 8, t: 422, m: 52.8, md: 29.5, mx: 207, me: 30.7, tp: 49.1, tu: "92c4c8ef" },
        Employee: { u: 3, t: 116, m: 38.7, md: 21.0, mx: 93,  me: 11.5, tp: 80.2, tu: "3d56f4a7" } } },
    { name: "Contacts & Groups", seg: {
        Free:     { u: 21, t: 158, m: 7.5, md: 3.0, mx: 69, me: 4.4, tp: 43.7, tu: "e0e89de3" },
        Premium:  { u: 62, t: 590, m: 9.5, md: 4.0, mx: 78, me: 8.4, tp: 13.2, tu: "9641c310" },
        Employee: { u: 7,  t: 67,  m: 9.6, md: 3.0, mx: 31, me: 6.0, tp: 46.3, tu: "361a5123" } } },
    { name: "Monetization / Upsell", seg: {
        Free:     { u: 140, t: 407, m: 2.9,  md: 2.0,  mx: 20, me: 2.8, tp: 4.9,  tu: "2842c620" },
        Premium:  { u: 23,  t: 55,  m: 2.4,  md: 1.0,  mx: 13, me: 1.9, tp: 23.6, tu: "ea90eea9" },
        Employee: { u: 2,   t: 22,  m: 11.0, md: 11.0, mx: 21, me: 1.0, tp: 95.5, tu: "2842c620" } } }
  ],

  // Comandos de reunión (/meet, /zoom) — NO tienen outlier; simplemente se usan poco
  meetZoom: [
    { cmd: "/meet (triggered)", u: 101, t: 470, m: 4.7, md: 2.0, tp: 6.8,  tu: "38d28446", me: 4.4 },
    { cmd: "/meet (completado)", u: 66, t: 316, m: 4.8, md: 2.0, tp: 8.2,  tu: "ea90eea9", me: 4.5 },
    { cmd: "/zoom (triggered)",  u: 20, t: 40,  m: 2.0, md: 1.0, tp: 12.5, tu: "361a5123", me: 1.8 },
    { cmd: "/zoom (completado)", u: 12, t: 26,  m: 2.2, md: 2.0, tp: 15.4, tu: "361a5123", me: 2.0 }
  ],

  // Lookup de usuarios outlier → nombre + teléfono (para etiquetar outliers por nombre)
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
    "92c4c8ef": { n: "Humand",                       p: "5492643163809" },
    "9641c310": { n: "FH",                           p: "5511973446566" },
    "9783edce": { n: "Mikaela Malaquina - OrderEAT", p: "59893514970" },
    "980cc87a": { n: "Carlos Gesino",                p: "5491123328443" },
    "9962ef3c": { n: "Ezequiel Morkin",              p: "5491165836983" },
    "9b42fef7": { n: "Damaris",                      p: "5218120738321" },
    "a0c28a6f": { n: "kenny 🥀",                      p: "5491161171314" },
    "a70669d6": { n: "Anabella",                     p: "5491156997056" },
    "ae15356f": { n: "Toto Siseles",                 p: "5491157006700" },
    "b957618e": { n: "Pedro Emboava",                p: "553175236312" },
    "bc5bbe6a": { n: "Fabián",                       p: "5215525444265" },
    "bd9533c7": { n: "DANCASSAB",                    p: "5215561623436" },
    "c1dab004": { n: "Iñaki Valencia",               p: "5492236000055" },
    "e0e89de3": { n: "Tobias Giorgis",               p: "5493415863732" },
    "e49f8331": { n: "C.",                           p: "5212221158565" },
    "ea90eea9": { n: "Carolina Vogt",                p: "5491165740143" },
    "ed216392": { n: "Ely 🌸",                        p: "5215577630703" },
    "f1957bfe": { n: "Luciana Lucero | Humand",      p: "5492241620376" },
    "f3a7ad61": { n: "Martin Vassallo",              p: "5493454195549" },
    "fade3c6e": { n: "Grupo Chelo",                  p: "5491176199820" },
    "fbfd75f7": { n: "Juan Manuel Núñez",            p: "5218116096925" }
  }
};
