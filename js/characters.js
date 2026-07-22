/* ===================================================
   GESTIÓN DE PERSONAJES Y FICHAS
=================================================== */
/* === PLANTILLA PARA NUEVO PERSONAJE ===
{
        id: 'pj-X',
        name: '',
        player: '',
        raceClass: '',
        avatar: 'img/personajes/nombre.jpg',
        pdfUrl: 'docs/hoja-nombre.pdf',
        alignment: '',
        background: '',
        stats: { hp: 0, ac: 0, speed: '30 ft' },
        description: ''
    },
========================================= */

//recordatorio, cambiar el .html a .pdf de las hojas para permirir la descarga directa de las hojas de personaje en PDF.

const characters = [
    {
        id: 'pj-1',
        name: 'Inna 🌊',
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
        name: 'Kani 🪨',
        player: 'Erick',
        raceClass: 'Lotol / Guerrero (Nivel 1)',
        avatar: 'img/personajes/Kani.jpeg',
        pdfUrl: 'docs/hoja-kani.html',
        alignment: 'Caótico Bueno',
        background: 'Guardia',
        stats: { hp: 12, ac: 16, speed: '30 ft' },
        description: 'Guardián Lotol entrenado para defender las ciudades de piedra, busca aliados para salvar a su pueblo mientras intenta encontrar el camino de regreso a su mundo...'
    },
    {
        id: 'pj-3',
        name: 'Seira ✨',
        player: 'Adrian',
        raceClass: 'Elfa Astral / Artificiera (Nivel 1)',
        avatar: 'img/personajes/seira.jpeg',
        pdfUrl: 'docs/hoja-seira.html',
        alignment: 'Caótico Neutral',
        background: 'Cazador',
        stats: { hp: 8, ac: 12, speed: '30 ft' },
        description: 'Una brillante inventora proveniente de las estrellas, fascinada por los secretos del cosmos y decidida a comprender los misterios que conectan los mundos.'
    },
    {
        id: 'pj-4',
        name: 'Mooneth 🩸',
        player: 'Monts',
        raceClass: 'Dhampire / Mago (Nivel 1)',
        avatar: 'img/personajes/mooneth.jpg',
        pdfUrl: 'docs/hoja-mooneth.html',
        alignment: 'Legal buena',
        background: 'Aprendiz de mago',
        stats: { hp: 7, ac: 12, speed: '30 ft' },
        description: 'Exiliada de una antigua familia de magos, renunció a su linaje para vivir según sus ideales y ahora combate a las criaturas que destruyeron la vida que había elegido.'
    },
    {
        id: 'pj-5',
        name: 'Ren Kumari 🌌',
        player: 'Beto',
        raceClass: 'Humano / Druida (Nivel 1)',
        avatar: 'img/personajes/ren kumari.jpg',
        pdfUrl: 'docs/hoja-ren.html',
        alignment: 'Neutral',
        background: 'Tocado por las estrellas',
        stats: { hp: 11, ac: 14, speed: '30 ft' },
        description: 'Tocado por las estrellas desde su nacimiento, recorre el mundo siguiendo los susurros del firmamento y la llamada de la naturaleza.'
    },
    {
        id: 'pj-6',
        name: '(Por definir) 🍝',
        player: 'Marco',
        raceClass: 'Humano / Brujo (Nivel 1)',
        avatar: 'img/personajes/pendiente.jpg',
        pdfUrl: 'docs/hoja-marco.html',
        alignment: 'Caotico bueno',
        background: 'Granjero',
        stats: { hp: 10, ac: 12, speed: '30 ft' },
        description: 'Un humilde granjero salvado por una insólita deidad con forma de espagueti, cuya fe lo impulsa a compartir el poder de su peculiar patrón.'
    },
    {
        id: 'pj-7',
        name: 'Nyxidea 🐈',
        player: 'Joa',
        raceClass: 'Tabaxi / Pícaro (Nivel 1)',
        avatar: 'img/personajes/Nyxidea.jpeg',
        pdfUrl: 'docs/hoja-nyxidea.html',
        alignment: 'Neutral Buena',
        background: 'Asesina',
        stats: { hp: 10, ac: 15, speed: '30 ft' },
        description: 'Antigua asesina del gremio del Velo Gris que abandonó su primer gran contrato al descubrir un secreto capaz de cambiar el destino del mundo.'
    },

    
    
];

function renderCharactersList() {
    const listContainer = document.getElementById('characters-list');
    if (!listContainer) return;

    listContainer.innerHTML = characters.map(pj => `
        <div class="character-card" onclick="selectCharacter('${pj.id}')">
            <img src="${pj.avatar}" alt="${pj.name}" class="character-thumb" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'><rect width=\'100%\' height=\'100%\' fill=\'%2328241e\'/><text x=\'50%\' y=\'50%\' fill=\'%23c5a059\' font-size=\'20\' text-anchor=\'middle\' dy=\'.3em\'>👤</text></svg>';">
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
                <!-- La foto del personaje abre la galería al hacer clic -->
                <div class="portrait-wrapper" onclick="openImageModal('${pj.avatar}', '${pj.name}')">
                    <img src="${pj.avatar}" alt="${pj.name}" class="character-portrait" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\' viewBox=\'0 0 150 150\'><rect width=\'100%\' height=\'100%\' fill=\'%2328241e\'/><text x=\'50%\' y=\'50%\' fill=\'%23c5a059\' font-size=\'50\' text-anchor=\'middle\' dy=\'.3em\'>👤</text></svg>';">
                    <span class="zoom-icon">🔍 Ampliar</span>
                </div>
                <div>
                    <h2>${pj.name}</h2>
                    <p class="pj-subtitle">Jugador: <strong>${pj.player}</strong></p>
                    <p class="pj-subtitle">${pj.raceClass} | ${pj.alignment}</p>
                </div>
            </div>

            <div class="character-stats-bar">
                <div class="stat-box"><span>HP</span><strong>${pj.stats.hp}</strong></div>
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