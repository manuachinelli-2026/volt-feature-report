# Volt · Reporte de Uso de Features

Reporte interactivo del uso real de las funcionalidades de **Volt**, construido a partir de los datos de **PostHog** (proyecto `Volt Prd`, producción).

🔗 **Deploy:** ver el link de Vercel.

## Qué responde

1. **Todas las funcionalidades** instrumentadas en PostHog, agrupadas en ~22 áreas de producto.
2. **Las más usadas** — por alcance (usuarios distintos) y por volumen (eventos).
3. **Promedio de uso por usuario** de cada feature.
4. **Outliers** — power-users que inflan la métrica: se aíslan estadísticamente (corte P95 / mediana) para llegar al número *real*.
5. **Qué matar y qué mantener** — recomendaciones según alcance + profundidad + costo de mantenimiento.

## Datos

- **Ventana:** 180 días (1 ene – 30 jun 2026)
- **Volumen:** 5,64M eventos · 2.929 personas · 872 usuarios activos de producto
- **Privacidad:** solo datos **agregados y anónimos** (sin emails ni identidades).
- **Snapshot estático:** la foto está embebida en [`data.js`](./data.js). Para regenerar, correr de nuevo las queries HogQL contra PostHog y actualizar ese archivo.

## Stack

Sitio estático puro — `index.html` + `data.js` + `app.js` + [ECharts](https://echarts.apache.org/). Sin build. Deploy directo en Vercel.

## Estructura

```
index.html   # estructura + estilos
data.js       # snapshot de datos (auditable)
app.js        # render: KPIs, gráficos, tabla ordenable, mapa de decisión
```

---
Generado el 30 jun 2026.
