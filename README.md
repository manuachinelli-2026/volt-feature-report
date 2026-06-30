# Volt · Revisión de funcionalidades por segmento

Reporte interactivo del uso de cada funcionalidad de **Volt**, dividido en **Free / Premium / Employee**, construido con datos de **PostHog** (`Volt Prd`).

🔗 **Deploy:** ver el link de Vercel.

## Qué muestra

- **Peso de cada segmento** — usuarios, eventos y eventos/usuario (Free / Premium / Employee).
- **Shortcuts** — el modo de interacción dominante; promedio de atajos por usuario en cada segmento.
- **Todas las funcionalidades por segmento** — promedio de usos/usuario, con toggle Promedio / Sin outlier / Mediana.
- **Outliers** — funcionalidades donde un único usuario infla el promedio: se identifica (anonimizado) y se recalcula el número real sin él.
- **/meet y /zoom** — caso de uso bajo sin outlier.

## Datos

- **Segmentación:** propiedad `status` de cada persona → `free` / `premium` / `employee`. Anónimos y churned quedan fuera.
- **Ventana:** 180 días (1 ene – 30 jun 2026). Base activa ~688 usuarios identificados.
- **Outlier:** por cada funcionalidad×segmento se aísla al usuario más pesado; "sin outlier" = promedio recalculado sin él; la mediana es el número resistente.
- **Privacidad:** datos agregados; el usuario outlier se muestra anonimizado (8 chars). Sin emails ni nombres.

## Stack

Sitio estático — `index.html` + `data.js` + `app.js` + [ECharts](https://echarts.apache.org/). Estética basada en voltchat.com (claro, verde #a0ff79, Inter). Deploy directo en Vercel.

---
Snapshot 30 jun 2026.
