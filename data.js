/* =============================================================================
   Volt — Feature Usage Report · DATA SNAPSHOT
   -----------------------------------------------------------------------------
   Source:   PostHog · project "Volt Prd" (id 347977) · org "Volt"
   Window:   180 days · 2026-01-01 → 2026-06-30
   Captured: 2026-06-30
   Method:   Aggregations run via HogQL over the `events` table.
             All figures are AGGREGATE and ANONYMOUS (no user identities).
   ============================================================================= */

window.VOLT_DATA = {
  meta: {
    project: "Volt Prd",
    windowDays: 180,
    periodStart: "2026-01-01",
    periodEnd: "2026-06-30",
    generatedAt: "2026-06-30",
    totalEvents: 5636104,
    allUsers: 2929,        // every person_id seen (incl. anonymous / one-touch)
    activeUsers: 872,      // engaged product base (did Chat Open / Opened App / identify / User Created)
    // Overall per-user concentration (across ALL 2929 users)
    meanEventsPerUser: 1924,
    medianEventsPerUser: 2,
    p90EventsPerUser: 2521,
    p99EventsPerUser: 48016,
    maxEventsPerUser: 102175
  },

  /* ---------------------------------------------------------------------------
     FEATURE GROUPS — ~250 raw events rolled up into logical product areas.
     `users` = distinct users that touched the group (real reach).
     Adoption % is computed in app.js as users / activeUsers (872).
     verdict ∈ CRITICAL | KEEP | GROW | IMPROVE | WATCH | CONSOLIDATE | RECONSIDER
     `infra:true` => excluded from kill/keep scoring (background/telemetry/identity).
     --------------------------------------------------------------------------- */
  groups: [
    { name: "Chat & Messaging",        users: 799, totalEvents: 2908217, mean: 3639.8, median: 177.0, p90: 11278.6, max: 66545, verdict: "CRITICAL",
      note: "El corazón del producto. 9 de cada 10 usuarios activos. Intocable." },
    { name: "Voice & Transcription",   users: 633, totalEvents: 419684,  mean: 663.0,  median: 73.0,  p90: 2017.8,  max: 12017, verdict: "CRITICAL",
      note: "Diferenciador clave: 73% de reach y engagement profundo (mediana 73/usuario). Núcleo de Volt." },
    { name: "Command Palette & Nav",   users: 533, totalEvents: 166528,  mean: 312.4,  median: 14.0,  p90: 968.6,   max: 7838,  verdict: "KEEP",
      note: "Navegación de power-users. 61% de reach; mediana 14 → uso recurrente real." },
    { name: "Lists & Organization",    users: 593, totalEvents: 87645,   mean: 147.8,  median: 4.0,   p90: 49.0,    max: 9944,  verdict: "KEEP",
      note: "Columna vertebral organizativa. 68% de reach, aunque uso por usuario moderado." },
    { name: "Search",                  users: 473, totalEvents: 80523,   mean: 170.2,  median: 31.0,  p90: 448.8,   max: 4241,  verdict: "KEEP",
      note: "Alta adopción (54%) y profundidad (mediana 31). Función esperada y usada." },
    { name: "Broadcast",               users: 98,  totalEvents: 65876,   mean: 672.2,  median: 2.5,   p90: 242.1,   max: 23556, verdict: "WATCH",
      note: "Power-feature de nicho: 11% de reach pero volumen enorme concentrado en ~13 broadcasters. Mediana 2.5 → la media miente. No matar; monetizar." },
    { name: "Send Later / Scheduling", users: 544, totalEvents: 18814,   mean: 34.6,   median: 9.0,   p90: 61.0,    max: 2453,  verdict: "KEEP",
      note: "62% de reach con uso recurrente. Feature de productividad sólida." },
    { name: "MCP / Developer API",     users: 176, totalEvents: 34087,   mean: 193.7,  median: 4.0,   p90: 121.5,   max: 7975,  verdict: "GROW",
      note: "20% de reach para una función de developers/API — sorprendentemente alto. Apuesta de crecimiento." },
    { name: "CRM / Tickets / Issues",  users: 28,  totalEvents: 16001,   mean: 571.5,  median: 31.5,  p90: 2134.7,  max: 5290,  verdict: "RECONSIDER",
      note: "Solo 3.2% de reach. Volumen alto pero concentrado en ~14 usuarios. Sistema completo para casi nadie." },
    { name: "Onboarding",              users: 475, totalEvents: 6450,    mean: 13.6,   median: 8.0,   p90: 29.0,    max: 361,   verdict: "KEEP",
      note: "Funnel necesario. 54% de reach (transitorio por naturaleza)." },
    { name: "AI Drafts & Suggestions", users: 283, totalEvents: 2521,    mean: 8.9,    median: 3.0,   p90: 18.8,    max: 239,   verdict: "IMPROVE",
      note: "32% la prueban pero mediana 3 → no se vuelve pegajosa. Potencial desaprovechado: mejorar calidad/UX." },
    { name: "Tasks",                   users: 295, totalEvents: 2331,    mean: 7.9,    median: 3.0,   p90: 23.0,    max: 151,   verdict: "WATCH",
      note: "34% de reach pero uso superficial. Definir si es core o se consolida con Reminders." },
    { name: "Volt Cloud",              users: 256, totalEvents: 2225,    mean: 8.7,    median: 5.0,   p90: 20.5,    max: 73,    verdict: "KEEP",
      note: "Conector de infraestructura. 29% de reach; setup + reconexión recurrentes." },
    { name: "Settings & UI",           users: 249, totalEvents: 2725,    mean: 10.9,   median: 3.0,   p90: 21.0,    max: 238,   verdict: "KEEP",
      note: "Utilidad transversal. Algunos toggles (ej. tema) casi no se usan." },
    { name: "Auth & Login",            users: 240, totalEvents: 1652,    mean: 6.9,    median: 4.0,   p90: 13.1,    max: 177,   verdict: "KEEP", infra: true,
      note: "Necesario (OTP/login/WhatsApp). No es feature de producto per se." },
    { name: "Integrations & App Store", users: 165, totalEvents: 1009,   mean: 6.1,    median: 3.0,   p90: 14.0,    max: 89,    verdict: "WATCH",
      note: "19% navegan el App Store pero pocos conectan integraciones. Convertir exploración en conexión." },
    { name: "Monetization / Upsell",   users: 155, totalEvents: 513,     mean: 3.3,    median: 2.0,   p90: 6.0,     max: 41,    verdict: "IMPROVE",
      note: "155 ven el upsell, ~34 completan checkout. El funnel existe pero convierte poco." },
    { name: "Workspaces & Team",       users: 144, totalEvents: 1081,    mean: 7.5,    median: 3.0,   p90: 12.0,    max: 79,    verdict: "WATCH",
      note: "16% de reach y superficial. ¿Volt es individual o de equipo? Definir." },
    { name: "Meeting & Call Commands", users: 108, totalEvents: 852,     mean: 7.9,    median: 4.0,   p90: 21.3,    max: 57,    verdict: "CONSOLIDATE",
      note: "12% de reach. Meet funciona (99 users); Zoom casi muerto (19). Consolidar en un solo comando." },
    { name: "Contacts & Groups",       users: 104, totalEvents: 859,     mean: 8.3,    median: 3.0,   p90: 20.5,    max: 78,    verdict: "WATCH",
      note: "12% de reach. Funcionalidad básica de contactos/grupos." },
    { name: "Reminders",               users: 102, totalEvents: 1295,    mean: 12.7,   median: 5.0,   p90: 22.7,    max: 302,   verdict: "WATCH",
      note: "12% de reach pero mediana 5 → los que la usan vuelven. Nicho pegajoso. Posible merge con Tasks." },
    { name: "HubSpot Integration",     users: 14,  totalEvents: 820,     mean: 58.6,   median: 35.0,  p90: 126.6,   max: 214,   verdict: "RECONSIDER",
      note: "1.6% de reach — la integración más cara de mantener para casi nadie. ¿Solo enterprise? Revisar ROI." }
  ],

  /* ---------------------------------------------------------------------------
     TOP USER-FACING FEATURES (event level) — for "most used" + outlier drill-down.
     trimmedMean = media excluyendo el top 5% de usuarios (corte P95).
     pctFromOutliers = % de eventos generados por ese top 5%.
     median = el número "real" representativo (resistente a outliers).
     --------------------------------------------------------------------------- */
  features: [
    { name: "Chat Open",                      group: "Chat & Messaging",   users: 799, total: 2667087, mean: 3338.0, median: 157,  trimmedMean: 1902.0, pctFromOutliers: 45.9 },
    { name: "Transcription Displayed",        group: "Voice & Transcription", users: 612, total: 245797, mean: 401.6, median: 34, trimmedMean: 212.7, pctFromOutliers: 49.7 },
    { name: "Transcription Failed (Seen)",    group: "Voice & Transcription", users: 392, total: 165125, mean: 421.2, median: 57, trimmedMean: 234.1, pctFromOutliers: 47.3 },
    { name: "Toggle Command Palette",         group: "Command Palette & Nav", users: 369, total: 148095, mean: 401.3, median: 17, trimmedMean: 228.5, pctFromOutliers: 46.0 },
    { name: "Focus Compose Box and Type",     group: "Chat & Messaging",   users: 526, total: 134577, mean: 255.8, median: 34,  trimmedMean: 130.0,  pctFromOutliers: 51.8 },
    { name: "Search",                         group: "Search",             users: 454, total: 79325,  mean: 174.7, median: 34,  trimmedMean: 100.7,  pctFromOutliers: 45.3 },
    { name: "Archive Chat",                   group: "Lists & Organization", users: 128, total: 79875, mean: 624.0, median: 8,  trimmedMean: 229.0,  pctFromOutliers: 65.3 },
    { name: "MCP Tool Called",                group: "MCP / Developer API", users: 58, total: 33137,  mean: 571.3, median: 34,  trimmedMean: 277.4,  pctFromOutliers: 54.0 },
    { name: "Broadcast Message Sent (media)", group: "Broadcast",          users: 13,  total: 32488,  mean: 2499.1, median: 96, trimmedMean: 1351.3, pctFromOutliers: 50.1 },
    { name: "Focus Compose Box",              group: "Chat & Messaging",   users: 399, total: 26858,  mean: 67.3,  median: 7,   trimmedMean: 21.3,   pctFromOutliers: 69.9 },
    { name: "Broadcast Message Sent (text)",  group: "Broadcast",          users: 29,  total: 25542,  mean: 880.8, median: 14,  trimmedMean: 271.0,  pctFromOutliers: 71.3 },
    { name: "Focus Chat List",                group: "Chat & Messaging",   users: 345, total: 22092,  mean: 64.0,  median: 7,   trimmedMean: 23.4,   pctFromOutliers: 65.4 },
    { name: "Focus Chat Messages",            group: "Chat & Messaging",   users: 289, total: 19355,  mean: 67.0,  median: 4,   trimmedMean: 21.4,   pctFromOutliers: 69.8 },
    { name: "Reply Message",                  group: "Chat & Messaging",   users: 242, total: 10448,  mean: 43.2,  median: 4,   trimmedMean: 16.4,   pctFromOutliers: 64.1 },
    { name: "Navigate Filter",                group: "Command Palette & Nav", users: 293, total: 9646, mean: 32.9, median: 5,   trimmedMean: 9.9,    pctFromOutliers: 71.5 },
    { name: "Open All Scheduled Messages",    group: "Send Later / Scheduling", users: 502, total: 6058, mean: 12.1, median: 5, trimmedMean: 6.8,   pctFromOutliers: 46.8 },
    { name: "Open Chat",                      group: "Chat & Messaging",   users: 293, total: 4505,   mean: 15.4,  median: 3,   trimmedMean: 6.1,    pctFromOutliers: 62.3 },
    { name: "Toggle Send Later Mode",         group: "Send Later / Scheduling", users: 323, total: 3586, mean: 11.1, median: 3, trimmedMean: 5.4,   pctFromOutliers: 53.6 },
    { name: "Edit Message",                   group: "Chat & Messaging",   users: 185, total: 3389,   mean: 18.3,  median: 2,   trimmedMean: 6.4,    pctFromOutliers: 66.7 },
    { name: "Star Message",                   group: "Chat & Messaging",   users: 229, total: 2948,   mean: 12.9,  median: 6,   trimmedMean: 9.9,    pctFromOutliers: 27.4 },
    { name: "Schedule Attempt",               group: "Send Later / Scheduling", users: 227, total: 2834, mean: 12.5, median: 3, trimmedMean: 5.5,   pctFromOutliers: 58.0 },
    { name: "Send and Archive",               group: "Chat & Messaging",   users: 131, total: 2811,   mean: 21.5,  median: 3,   trimmedMean: 5.5,    pctFromOutliers: 75.7 },
    { name: "Message Scheduled",              group: "Send Later / Scheduling", users: 221, total: 2364, mean: 10.7, median: 2, trimmedMean: 4.8,   pctFromOutliers: 57.4 },
    { name: "React to Message",               group: "Chat & Messaging",   users: 190, total: 2148,   mean: 11.3,  median: 2,   trimmedMean: 4.1,    pctFromOutliers: 65.7 },
    { name: "Accept Suggestion (AI)",         group: "AI Drafts & Suggestions", users: 242, total: 1925, mean: 8.0, median: 2.5, trimmedMean: 4.9,  pctFromOutliers: 41.4 },
    { name: "Create List",                    group: "Lists & Organization", users: 307, total: 1756, mean: 5.7,  median: 3,   trimmedMean: 3.8,    pctFromOutliers: 36.7 },
    { name: "Task Set",                       group: "Tasks",              users: 234, total: 1554,   mean: 6.6,   median: 2,   trimmedMean: 4.6,    pctFromOutliers: 33.8 },
    { name: "Pin Message",                    group: "Chat & Messaging",   users: 218, total: 1492,   mean: 6.8,   median: 4,   trimmedMean: 5.5,    pctFromOutliers: 23.1 },
    { name: "Copy Message",                   group: "Chat & Messaging",   users: 222, total: 1442,   mean: 6.5,   median: 3,   trimmedMean: 4.9,    pctFromOutliers: 28.7 },
    { name: "Search Message in Chat",         group: "Search",             users: 189, total: 1157,   mean: 6.1,   median: 3,   trimmedMean: 3.9,    pctFromOutliers: 39.8 },
    { name: "Volt Cloud Settings Opened",     group: "Volt Cloud",         users: 218, total: 1039,   mean: 4.8,   median: 3,   trimmedMean: 3.8,    pctFromOutliers: 23.6 },
    { name: "Forward Message",                group: "Chat & Messaging",   users: 156, total: 736,    mean: 4.7,   median: 2,   trimmedMean: 2.9,    pctFromOutliers: 41.8 },
    { name: "Start Broadcasting",             group: "Broadcast",          users: 34,  total: 645,    mean: 19.0,  median: 2,   trimmedMean: 7.7,    pctFromOutliers: 61.7 },
    { name: "App Store Drawer Opened",        group: "Integrations & App Store", users: 122, total: 608, mean: 5.0, median: 2, trimmedMean: 3.4,    pctFromOutliers: 35.4 },
    { name: "Delete Message",                 group: "Chat & Messaging",   users: 169, total: 562,    mean: 3.3,   median: 2,   trimmedMean: 2.4,    pctFromOutliers: 32.2 },
    { name: "Start Transcribing",             group: "Voice & Transcription", users: 142, total: 553, mean: 3.9,   median: 2,   trimmedMean: 2.8,    pctFromOutliers: 30.6 },
    { name: "Ticket Created",                 group: "CRM / Tickets / Issues", users: 12, total: 519, mean: 43.2,  median: 4.5, trimmedMean: 30.9,   pctFromOutliers: 34.5 },
    { name: "Create MCP API Key",             group: "MCP / Developer API", users: 119, total: 311,   mean: 2.6,   median: 2,   trimmedMean: 2.4,    pctFromOutliers: 18.0 },
    { name: "Meet Command Triggered",         group: "Meeting & Call Commands", users: 99, total: 470, mean: 4.7,  median: 2,   trimmedMean: 3.7,    pctFromOutliers: 25.1 },
    { name: "HubSpot Drawer Button",          group: "HubSpot Integration", users: 13, total: 451,    mean: 34.7,  median: 19,  trimmedMean: 27.9,   pctFromOutliers: 25.7 },
    { name: "Reminder usage",                 group: "Reminders",          users: 60,  total: 386,    mean: 6.4,   median: 3,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Upsell Modal Shown",             group: "Monetization / Upsell", users: 105, total: 178, mean: 1.7,   median: 1,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Upsell Checkout Completed",      group: "Monetization / Upsell", users: 34, total: 38,   mean: 1.1,   median: 1,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Zoom Command Triggered",         group: "Meeting & Call Commands", users: 19, total: 40,  mean: 2.1,  median: 1,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Generate Draft with AI",         group: "AI Drafts & Suggestions", users: 13, total: 30,  mean: 2.3,  median: 1,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Toggle Light/Dark Mode",         group: "Settings & UI",      users: 7,   total: 26,     mean: 3.7,   median: 3,   trimmedMean: null,   pctFromOutliers: null },
    { name: "Memory",                         group: "Settings & UI",      users: 7,   total: 15,     mean: 2.1,   median: 1,   trimmedMean: null,   pctFromOutliers: null }
  ],

  /* ---------------------------------------------------------------------------
     CURATED RECOMMENDATIONS (kill / improve / keep)
     --------------------------------------------------------------------------- */
  recommendations: {
    kill: [
      { name: "HubSpot Integration", metric: "1.6% reach · 14 usuarios", why: "La integración más pesada de mantener para la fracción más chica de usuarios. Evaluar si es solo un requisito enterprise puntual; si no, deprecar." },
      { name: "CRM / Tickets / Issues", metric: "3.2% reach · 28 usuarios", why: "Un sistema entero de tickets/issues que usan ~14 personas de forma intensa. No justifica mantenimiento horizontal: o se vuelve add-on enterprise o se mata." },
      { name: "Zoom Command", metric: "19 usuarios", why: "Casi muerto frente a Meet (99). Consolidar comandos de reunión en uno solo." },
      { name: "Toggle Light/Dark Mode", metric: "7 usuarios", why: "Nadie cambia el tema. No invertir más; mantener default y listo." },
      { name: "\"Memory\" feature", metric: "7 usuarios", why: "Adopción casi nula. Candidata clara a remover o repensar por completo." }
    ],
    improve: [
      { name: "AI Drafts & Suggestions", metric: "32% prueban · mediana 3", why: "Se prueba mucho pero no engancha. Hay producto acá: subir calidad de drafts y reducir fricción para volverla pegajosa." },
      { name: "Monetization / Upsell", metric: "155 ven · ~34 convierten", why: "El funnel de upsell existe pero convierte poco (~22%). Optimizar mensaje, timing y pricing." },
      { name: "Integrations & App Store", metric: "19% navegan, pocos conectan", why: "Se explora el App Store pero la conexión cae. Reducir fricción del connect y destacar integraciones con valor." },
      { name: "Tasks + Reminders", metric: "34% y 12% · superficiales", why: "Dos features de productividad superpuestas y poco profundas. Evaluar consolidarlas en una sola." }
    ],
    keep: [
      { name: "Chat & Messaging", metric: "91.6% reach", why: "El core absoluto. Toda inversión en performance y fiabilidad acá rinde." },
      { name: "Voice & Transcription", metric: "72.6% reach · mediana 73", why: "Diferenciador con engagement profundo. Es la razón por la que muchos usan Volt." },
      { name: "Search · Lists · Command Palette · Send Later", metric: "54–68% reach", why: "Cuarteto de productividad de alta adopción. Mantener y pulir." },
      { name: "Broadcast", metric: "11% reach · power feature", why: "Nicho pero de altísimo volumen para quien la usa. No matar: monetizar como feature premium." },
      { name: "MCP / Developer API", metric: "20% reach y creciendo", why: "Apuesta de futuro con tracción inesperada. Invertir en developers." }
    ]
  }
};
