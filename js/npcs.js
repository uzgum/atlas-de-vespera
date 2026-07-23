/* ===================================================
   BASE DE DATOS Y LÓGICA DE NPCS (CATÁLOGO Y FICHA)
=================================================== */

/*
===================================================
PLANTILLA NUEVO NPC
===================================================
Instrucciones:
1. Copia desde el 'id:' hasta la llave '},'
2. Pégalo dentro del arreglo 'npcsData' en js/npcs.js
3. La actitud debe ser exactamente: 'Aliado', 'Neutral' o 'Hostil' (para los colores).

{
    id: 'npc-0',                         // ID único (ej: 'npc-4')
    name: 'Nombre del NPC',             // Ej: 'Lord Cassian'
    role: 'Ocupación / Título',         // Ej: 'Comandante de la Guardia'
    location: 'Nombre de la Ubicación', // Debe coincidir con los filtros (ej: 'Costa del Sol')
    attitude: 'Aliado',                 // Opciones exactas: 'Aliado', 'Neutral', 'Hostil'
    avatar: 'img/personajes/foto.jpg',   // Ruta de la imagen del NPC
    isVisible: false,                   // false = Oculto para los jugadores / true = Visible en el catálogo
    description: 'Breve nota sobre quién es, qué busca o la relación que tiene con la party.'
},
*/

const npcsData = [
    {
        id: 'npc-1',
        name: 'Aster Lume',
        role: 'Maga astrologa',
        location: 'Plains of Dawn',
        attitude: 'Aliado',
        avatar: 'img/npc/aster.png',
        isVisible: true,
        description: 'Antigua maga, y famosa astrologa de Vespera, actualmente muerta.'
    }
];

// Variable para rastrear qué NPC se está viendo en el modal
let currentOpenNPC = null;

// Función para renderizar las cartas
function renderNPCs(items) {
    const grid = document.getElementById('npcs-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8a827a;">No se encontraron NPCs con esos criterios.</p>`;
        return;
    }

    grid.innerHTML = items.map(npc => `
        <div class="npc-card" onclick="openNPCModal('${npc.id}')">
            <img src="${npc.avatar}" alt="${npc.name}" class="npc-avatar">
            <div class="npc-info">
                <div>
                    <h3 class="npc-name">${npc.name}</h3>
                    <div class="npc-role">${npc.role}</div>
                    <div class="npc-meta">📍 <strong>${npc.location}</strong></div>
                </div>
                <div>
                    <span class="badge-attitude ${npc.attitude}">${npc.attitude}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Lógica de Filtros (Solo muestra NPCs con isVisible: true)
function filterNPCs() {
    const searchText = document.getElementById('npc-search-input')?.value.toLowerCase() || '';
    const locationVal = document.getElementById('filter-location')?.value || 'all';
    const attitudeVal = document.getElementById('filter-attitude')?.value || 'all';

    const filtered = npcsData.filter(npc => {
        // 1. CONDICIÓN PRINCIPAL: Solo NPCs visibles para los jugadores
        const isPublic = npc.isVisible === true;

        // 2. Filtros de búsqueda
        const matchesSearch = npc.name.toLowerCase().includes(searchText) || 
                              npc.role.toLowerCase().includes(searchText);
        const matchesLocation = locationVal === 'all' || npc.location === locationVal;
        const matchesAttitude = attitudeVal === 'all' || npc.attitude === attitudeVal;

        return isPublic && matchesSearch && matchesLocation && matchesAttitude;
    });

    renderNPCs(filtered);
}

function resetNPCFilters() {
    if (document.getElementById('npc-search-input')) document.getElementById('npc-search-input').value = '';
    if (document.getElementById('filter-location')) document.getElementById('filter-location').value = 'all';
    if (document.getElementById('filter-attitude')) document.getElementById('filter-attitude').value = 'all';
    filterNPCs();
}

/* ===================================================
   LÓGICA DEL MODAL / FICHA DEL NPC
=================================================== */

function openNPCModal(npcId) {
    const npc = npcsData.find(item => item.id === npcId);
    if (!npc) return;

    currentOpenNPC = npc;

    document.getElementById('npc-modal-img').src = npc.avatar;
    document.getElementById('npc-modal-name').textContent = npc.name;
    document.getElementById('npc-modal-role').textContent = npc.role;
    document.getElementById('npc-modal-location').textContent = `📍 ${npc.location}`;
    
    const attitudeBadge = document.getElementById('npc-modal-attitude');
    attitudeBadge.textContent = npc.attitude;
    attitudeBadge.className = `badge-attitude ${npc.attitude}`;

    document.getElementById('npc-modal-desc').textContent = npc.description;

    const modal = document.getElementById('npc-modal');
    if (modal) modal.style.display = 'flex';
}

function closeNPCModal(event) {
    if (event.target.id === 'npc-modal') {
        forceCloseNPCModal();
    }
}

function forceCloseNPCModal() {
    const modal = document.getElementById('npc-modal');
    if (modal) modal.style.display = 'none';
}

// Permite ampliar la imagen del NPC usando la vista completa
function zoomNPCImage() {
    if (!currentOpenNPC) return;
    if (typeof openImageModal === 'function') {
        openImageModal(currentOpenNPC.avatar, currentOpenNPC.name);
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    filterNPCs();
});