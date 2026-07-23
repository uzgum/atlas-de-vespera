/* ===================================================
   BASE DE DATOS Y LÓGICA DE NPCS (CATÁLOGO)
=================================================== */

const npcsData = [
    {
        id: 'npc-1',
        name: 'Anciano del Pueblo',
        role: 'Líder del Concilio',
        location: 'Plains of Dawn',
        attitude: 'Aliado',
        avatar: 'img/personajes/nyxidea.jpeg', // Foto temporal de prueba
        description: 'Líder sabio de las llanuras que acogió a la party en sus primeros días.'
    },
    {
        id: 'npc-2',
        name: 'El Mago de la Torre',
        role: 'Investigador Arcano',
        location: 'Tierras Salvajes',
        attitude: 'Neutral',
        avatar: 'img/personajes/nyxidea.jpeg',
        description: 'Mago ermitaño que conoce secretos olvidados sobre la Primera Llama.'
    },
    {
        id: 'npc-3',
        name: 'Thrumda',
        role: 'Mercader Principal',
        location: 'Costa del Sol',
        attitude: 'Aliado',
        avatar: 'img/personajes/nyxidea.jpeg',
        description: 'Enana comerciante dispuesta a comprar artefactos raros al mejor precio.'
    }
];

// Función para renderizar las cartas
function renderNPCs(items) {
    const grid = document.getElementById('npcs-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8a827a;">No se encontraron NPCs con esos criterios.</p>`;
        return;
    }

    grid.innerHTML = items.map(npc => `
        <div class="npc-card">
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

// Lógica de Filtros
function filterNPCs() {
    const searchText = document.getElementById('npc-search-input')?.value.toLowerCase() || '';
    const locationVal = document.getElementById('filter-location')?.value || 'all';
    const attitudeVal = document.getElementById('filter-attitude')?.value || 'all';

    const filtered = npcsData.filter(npc => {
        const matchesSearch = npc.name.toLowerCase().includes(searchText) || 
                              npc.role.toLowerCase().includes(searchText);
        const matchesLocation = locationVal === 'all' || npc.location === locationVal;
        const matchesAttitude = attitudeVal === 'all' || npc.attitude === attitudeVal;

        return matchesSearch && matchesLocation && matchesAttitude;
    });

    renderNPCs(filtered);
}

function resetNPCFilters() {
    if (document.getElementById('npc-search-input')) document.getElementById('npc-search-input').value = '';
    if (document.getElementById('filter-location')) document.getElementById('filter-location').value = 'all';
    if (document.getElementById('filter-attitude')) document.getElementById('filter-attitude').value = 'all';
    renderNPCs(npcsData);
}

// Inicializar al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    renderNPCs(npcsData);
});