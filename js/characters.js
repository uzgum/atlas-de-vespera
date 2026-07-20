/* ===================================================
   GESTIÓN DE PERSONAJES Y FICHAS
=================================================== */

const characters = [
    {
        id: 'pj-1',
        name: 'Inna',
        player: 'Ari',
        raceClass: 'Merkflok / Cleriga (Nivel 1)',
        avatar: 'img/personajes/inna.png', // Ruta a la imagen del personaje
        pdfUrl: 'docs/hoja-inna.pdf',       // Ruta al PDF descargable
        alignment: 'Caótica Buena',
        background: 'Acolita',
        stats: { hp: 9, ac: 11, speed: '30 ft' },
        description: 'Exiliada del linaje real de un reino submarino.'
    },
];

function renderCharactersList() {
    const listContainer = document.getElementById('characters-list');
    if (!listContainer) return;

    listContainer.innerHTML = characters.map(pj => `
        <div class="character-card" onclick="selectCharacter('${pj.id}')">
            <img src="${pj.avatar}" alt="${pj.name}" class="character-thumb" onerror="this.src='https://via.placeholder.com/50'">
            <div class="character-card-info">
                <h4>${pj.name}</h4>
                <p>${pj.raceClass}</p>
            </div>
        </div>
    `).join('');
}

function selectCharacter(pjId) {
    const pj = characters.find(c => c.id === pjId);
    if (!pj) return;

    const detailContainer = document.getElementById('character-detail-panel');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
        <div class="character-detail-content">
            <div class="character-header">
                <img src="${pj.avatar}" alt="${pj.name}" class="character-portrait" onerror="this.src='https://via.placeholder.com/150'">
                <div>
                    <h2>${pj.name}</h2>
                    <p class="pj-subtitle">Jugador: <strong>${pj.player}</strong></p>
                    <p class="pj-subtitle">${pj.raceClass} | ${pj.alignment}</p>
                </div>
            </div>

            <div class="character-stats-bar">
                <div class="stat-box"><span>PG</span><strong>${pj.stats.hp}</strong></div>
                <div class="stat-box"><span>CA</span><strong>${pj.stats.ac}</strong></div>
                <div class="stat-box"><span>Velocidad</span><strong>${pj.stats.speed}</strong></div>
            </div>

            <div class="character-bio">
                <h3>Trasfondo y Historia</h3>
                <p><strong>Origen:</strong> ${pj.background}</p>
                <p>${pj.description}</p>
            </div>

            <div class="character-actions">
                <a href="${pj.pdfUrl}" download class="btn-download-pdf">
                    📄 Descargar Hoja de Personaje (PDF)
                </a>
            </div>
        </div>
    `;
}

// Cargar la lista al iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderCharactersList();
    if (characters.length > 0) selectCharacter(characters[0].id);
});