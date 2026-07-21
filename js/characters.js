/* ===================================================
   GESTIÓN DE PERSONAJES Y FICHAS
=================================================== */

const characters = [
    {
        id: 'pj-1',
        name: 'Inna',
        player: 'Ari',
        raceClass: 'Sirena / Cleriga (Nivel 1)',
        avatar: 'img/personajes/inna.png',
        pdfUrl: 'docs/hoja-inna.html',
        alignment: 'Caótico Bueno',
        background: 'Acolita',
        stats: { hp: 9, ac: 11, speed: '30 ft' },
        description: 'Una joven sirenita que ha abandonado su vida submarina...'
    },
    {
        id: 'pj-2',
        name: 'Kani',
        player: 'Erick',
        raceClass: 'Lotol / Guerrero (Nivel 1)',
        avatar: 'img/personajes/Kani.jpeg',
        pdfUrl: 'docs/hoja-kani.pdf',
        alignment: 'Caótico Bueno',
        background: 'Guardia',
        stats: { hp: 12, ac: 16, speed: '30 ft' },
        description: 'Guardián Lotol entrenado para defender las ciudades de piedra, busca aliados para salvar a su pueblo mientras intenta encontrar el camino de regreso a su mundo...'
    },
    {
        id: 'pj-3',
        name: 'Seira',
        player: 'Adrian',
        raceClass: 'Elfa Astral / Artificiero (Nivel 1)',
        avatar: 'img/personajes/seira.jpeg',
        pdfUrl: 'docs/hoja-seira.pdf',
        alignment: 'Caótico Neutral',
        background: 'Cazador',
        stats: { hp: 8, ac: 12, speed: '30 ft' },
        description: 'Una brillante inventora proveniente de las estrellas, fascinada por los secretos del cosmos y decidida a comprender los misterios que conectan los mundos.'
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
                <!-- La foto del personaje ahora abre la galería al hacer clic -->
                <div class="portrait-wrapper" onclick="openImageModal('${pj.avatar}', '${pj.name}')">
                    <img src="${pj.avatar}" alt="${pj.name}" class="character-portrait" onerror="this.src='https://via.placeholder.com/150'">
                    <span class="zoom-icon">🔍 Ampliar</span>
                </div>
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
                <h3>Trasfondo e Historia</h3>
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

/* --- LÓGICA DEL LIGHTBOX / GALERÍA DE IMÁGENES --- */
function openImageModal(imgSrc, captionText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');

    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imgSrc;
        if (caption) caption.innerHTML = captionText;
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Cargar la lista al iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderCharactersList();
    if (characters.length > 0) selectCharacter(characters[0].id);
});