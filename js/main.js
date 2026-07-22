/* ===================================================
   CONFIGURACIÓN Y MOTOR DEL MAPA (Leaflet.js)
=================================================== */

// 1. RUTA Y DIMENSIONES DE TU MAPA
const MAP_IMAGE_URL = 'img/mapa-tourvile.jpg'; 

// Ancho y Alto exactos de tu imagen en píxeles
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

svgElement.innerHTML = `<path d="${hexPaths}" fill="none" stroke="rgb(173, 173, 173)" stroke-width="1.2"/>`;

const hexGridLayer = L.svgOverlay(svgElement, mapBounds);

/* ===================================================
   CONTROL DE CAPAS
=================================================== */

const overlayLayers = {
    "📐 Cuadrícula (1 Hex = 1 Día)": hexGridLayer
};

L.control.layers(null, overlayLayers, { collapsed: false }).addTo(map);

/* ===================================================
   HERRAMIENTA DM: COORDENADAS AL CLIC
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
        isKnown: true,
        isPartyHere: true,
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
        isKnown: false,
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
        isKnown: false,
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

    if (titleElement) titleElement.textContent = location.name;

    if (detailsElement) {
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
}

/* ===================================================
   DEFINICIÓN DE ICONOS
=================================================== */

const poiIcon = L.divIcon({
    className: 'custom-pin',
    html: '<div class="pin-circle poi-pin"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

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
    if (!location.isKnown) return;

    const iconoAUsar = location.isPartyHere ? partyIcon : poiIcon;
    const marker = L.marker(location.coords, { icon: iconoAUsar }).addTo(map);

    let label = location.name;
    if (location.isPartyHere) {
        label += ' 📍 (Party)';
    }
    marker.bindTooltip(label, { direction: 'top', offset: [0, -10] });

    marker.on('click', () => {
        updateInfoPanel(location);
    });
});

/* ===================================================
   SISTEMA DE PESTAÑAS (NAVEGACIÓN POR ENLACES/HASH)
=================================================== */

function switchTab(tabName) {
    // 1. Desactivar todos los enlaces de la barra
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => link.classList.remove('active'));

    // 2. Ocultar todas las secciones
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active-tab');
    });

    // 3. Activar el enlace correspondiente
    const selectedLink = document.querySelector(`.navbar a[href="#${tabName}"]`);
    if (selectedLink) selectedLink.classList.add('active');

    // 4. Mostrar la pestaña seleccionada
    const activeSection = document.getElementById(`section-${tabName}`);
    if (activeSection) {
        if (tabName === 'mapa') {
            activeSection.style.display = 'flex';
            if (typeof map !== 'undefined') setTimeout(() => map.invalidateSize(), 200);
        } else {
            activeSection.style.display = 'block';
        }
        activeSection.classList.add('active-tab');

        // Renderizar la cronología si es esa pestaña
        if (tabName === 'cronologia' && typeof window.renderTimeline === 'function') {
            window.renderTimeline();
        }
    }
}

// Escuchar los cambios en la URL (al dar clic en los links #mapa, #cronologia, etc.)
window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '') || 'mapa';
    switchTab(currentHash);
});

// Cargar la pestaña correcta la primera vez
document.addEventListener('DOMContentLoaded', () => {
    const initialHash = window.location.hash.replace('#', '') || 'mapa';
    switchTab(initialHash);
});

/* ===================================================
   CONTROL DEL PANEL CÓDICE EN MÓVILES
=================================================== */

function toggleCodexPanel() {
    const panel = document.getElementById('info-panel');
    if (panel) {
        panel.classList.toggle('active-mobile');
    }
}

// Sobrescribir updateInfoPanel para abrir en móviles al presionar un pin
const originalUpdateInfoPanel = updateInfoPanel;
updateInfoPanel = function(location) {
    originalUpdateInfoPanel(location);
    if (window.innerWidth <= 768) {
        const panel = document.getElementById('info-panel');
        if (panel) panel.classList.add('active-mobile');
    }
};