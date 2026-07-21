/* ===================================================
   CONFIGURACIÓN Y MOTOR DEL MAPA (Leaflet.js)
=================================================== */

// 1. RUTA Y DIMENSIONES DE TU MAPA
const MAP_IMAGE_URL = 'img/mapa-tourvile.jpg'; 

// Ancho y Alto exactos de tu imagen en píxeles (cámbialos por los reales)
const MAP_WIDTH = 2048;  
const MAP_HEIGHT = 1024; 

// 2. LÍMITES DEL MAPA
const mapBounds = [
    [0, 0],                   
    [MAP_HEIGHT, MAP_WIDTH]   
];

// 3. INICIALIZAR EL MAPA
const map = L.map('map', {
    crs: L.CRS.Simple,        
    minZoom: -2,              
    maxZoom: 3,               
    zoomSnap: 0.5,            
    maxBounds: mapBounds,     
    maxBoundsViscosity: 0.8  
});

// 4. CARGAR LA IMAGEN
L.imageOverlay(MAP_IMAGE_URL, mapBounds).addTo(map);
map.fitBounds(mapBounds);

/* ===================================================
   CUADRÍCULA HEXAGONAL PARA MEDIR DISTANCIAS
=================================================== */

// Reducimos el tamaño para ajustar la escala a 2 hexágonos de viaje
const HEX_SIZE = 32; 

function createHexagonPath(centerX, centerY, size) {
    let path = "";
    for (let i = 0; i < 6; i++) {
        const angle_rad = (Math.PI / 180) * (60 * i + 30);
        const x = centerX + size * Math.cos(angle_rad);
        const y = centerY + size * Math.sin(angle_rad);
        path += (i === 0 ? "M" : "L") + ` ${x} ${y} `;
    }
    return path + "Z";
}

let hexPaths = "";
const widthSpacing = HEX_SIZE * Math.sqrt(3);
const heightSpacing = HEX_SIZE * 1.5;

for (let y = 0; y < MAP_HEIGHT + HEX_SIZE; y += heightSpacing) {
    const isRowOdd = Math.floor(y / heightSpacing) % 2 === 1;
    const xOffset = isRowOdd ? widthSpacing / 2 : 0;

    for (let x = 0; x < MAP_WIDTH + HEX_SIZE; x += widthSpacing) {
        hexPaths += createHexagonPath(x + xOffset, y, HEX_SIZE) + " ";
    }
}

const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
svgElement.setAttribute('viewBox', `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`);

// Línea continua, más oscura (negro al 55% de opacidad) para que resalte sobre el mapa
svgElement.innerHTML = `<path d="${hexPaths}" fill="none" stroke="rgb(173, 173, 173)" stroke-width="1.2"/>`;

const hexGridLayer = L.svgOverlay(svgElement, mapBounds);
/* ===================================================
   CONTROL DE CAPAS (CHECKBOX EN ESQUINA SUPERIOR DERECHA)
=================================================== */

// Objeto con las capas opcionales que el jugador/DM puede encender u apagar
const overlayLayers = {
    "📐 Cuadrícula (1 Hex = 1 Día)": hexGridLayer
};

// Agrega el menú desplegable en la esquina superior derecha del mapa
L.control.layers(null, overlayLayers, { collapsed: false }).addTo(map);


/* ===================================================
   HERRAMIENTA PARA EL DM: OBTENER COORDENADAS AL HACER CLIC
   (Abre la consola de tu navegador con F12 para verlas)
=================================================== */
map.on('click', function(e) {
    const y = Math.round(e.latlng.lat);
    const x = Math.round(e.latlng.lng);
    console.log(`📍 Coordenada capturada para tu lista: coords: [${y}, ${x}]`);
});


/* ===================================================
   BASE DE DATOS DE UBICACIONES
=================================================== */

const locations = [
    {
        id: 'inicio-aventura',
        name: 'Punto de Inicio',
        region: 'Plains of Dawn',
        coords: [425, 1163],
        isKnown: true,       // Conocido por la party
        isPartyHere: true,   // La party inicia su aventura aquí
        description: 'Pequeño ploblado de las llanuras.',
        government: 'concilio de ancianos',
        population: 'Pequeño asentamiento',
        races: 'Variadas',
        importantNPCs: 'Anciano del pueblo'
    },
    {
        id: 'torre-mago',
        name: 'Torre',
        region: 'Tierras Salvajes',
        coords: [371, 1148],
        isKnown: false,       // Saben que deben viajar hacia aquí
        isPartyHere: false,
        description: 'Antigua torre donde mora un mago misterioso. Destino actual del grupo.',
        government: 'Ninguno',
        population: '1 habitante',
        races: 'Mago',
        importantNPCs: 'El Mago de la Torre'
    },
    {
        id: 'plotport',
        name: 'Plotport',
        region: 'Costa del Sol',
        coords: [305, 1176],
        isKnown: false,      // ¡OCULTA! Se desbloqueará al finalizar la Sesión 1
        isPartyHere: false,
        description: 'Una próspera ciudad portuaria conocida por sus comerciantes ruidosos y muelles siempre ocupados.',
        government: 'Consejo Mercante',
        population: '12,000 habitantes',
        races: 'Humanos, Elfos, Enanos',
        importantNPCs: 'Thrumda (Mercader local)'
    }
];

/* ===================================================
   FUNCIONES DE INTERACCIÓN CON EL PANEL LATERAL
=================================================== */

function updateInfoPanel(location) {
    const titleElement = document.getElementById('location-title');
    const detailsElement = document.getElementById('location-details');

    titleElement.textContent = location.name;

    detailsElement.innerHTML = `
        <p style="margin-bottom: 0.5rem; color: var(--gold-accent);">
            <strong>Región:</strong> ${location.region}
        </p>
        <p style="margin-bottom: 0.5rem;">
            <strong>Gobierno:</strong> ${location.government}
        </p>
        <p style="margin-bottom: 0.5rem;">
            <strong>Población:</strong> ${location.population}
        </p>
        <p style="margin-bottom: 0.5rem;">
            <strong>Razas:</strong> ${location.races}
        </p>
        <p style="margin-bottom: 1rem;">
            <strong>NPCs destacados:</strong> ${location.importantNPCs}
        </p>
        <hr style="border-color: var(--border-color); margin: 1rem 0;">
        <p>${location.description}</p>
    `;
}



/* ===================================================
   DEFINICIÓN DE ICONOS (HTML/CSS)
=================================================== */

// Icono con centro blanco para puntos de interés normales
const poiIcon = L.divIcon({
    className: 'custom-pin',
    html: '<div class="pin-circle poi-pin"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Icono con centro rojo e indicador dorado para la Party
const partyIcon = L.divIcon({
    className: 'custom-pin',
    html: '<div class="pin-circle party-pin"></div><div class="party-indicator"></div>',
    iconSize: [20, 30],
    iconAnchor: [10, 15]
});

/* ===================================================
   CREACIÓN DE PINES EN EL MAPA
=================================================== */

locations.forEach(location => {
    // Si la ubicación no es conocida, se ignora
    if (!location.isKnown) return;

    // --- CAMBIO AQUÍ ---
    // Decidir qué icono usar
    const iconoAUsar = location.isPartyHere ? partyIcon : poiIcon;

    // Crear pin usando el icono seleccionado
    const marker = L.marker(location.coords, { icon: iconoAUsar }).addTo(map);
    // -------------------

    // Etiqueta flotante
    let label = location.name;
    if (location.isPartyHere) {
        label += ' 📍 (Party)';
    }
    marker.bindTooltip(label, { direction: 'top', offset: [0, -10] });

    // Evento de clic
    marker.on('click', () => {
        updateInfoPanel(location);
    });
});
/* ===================================================
   SISTEMA DE PESTAÑAS (NAVEGACIÓN)
=================================================== */
function switchTab(tabName) {
    // 1. Desactivar todos los botones de la barra superior
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // 2. Ocultar todas las secciones
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active-tab');
    });

    // 3. Activar el botón presionado
    const selectedBtn = document.querySelector(`.nav-btn[onclick="switchTab('${tabName}')"]`);
    if (selectedBtn) selectedBtn.classList.add('active');

    // 4. Mostrar únicamente la pestaña seleccionada
    const activeSection = document.getElementById(`section-${tabName}`);
    if (activeSection) {
        if (tabName === 'mapa') {
            activeSection.style.display = 'flex';
            if (typeof map !== 'undefined') setTimeout(() => map.invalidateSize(), 200);
        } else {
            activeSection.style.display = 'block';
        }
        activeSection.classList.add('active-tab');

        // Renderizar la cronología si se selecciona esta pestaña
        if (tabName === 'cronologia' && typeof window.renderTimeline === 'function') {
            window.renderTimeline();
        }
    }
}