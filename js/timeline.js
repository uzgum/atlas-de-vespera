/* ===================================================
   GESTIÓN DE CRONOLOGÍA Y LÍNEA DEL TIEMPO (VESPERA)
=================================================== */

const historyEras = [
    {
        id: 'era-vacio',
        era: '🌌 La Era del Vacío',
        quote: '"Antes de que existiera el tiempo."',
        description: `No existía la luz. No existía la oscuridad. Solo un océano infinito de energía primordial donde nacían y morían estrellas antes de tener nombre.\n\nEn algún momento imposible de medir, una chispa permaneció encendida más tiempo que las demás. Aquella chispa dio origen a una estrella diferente. Los sabios la llamarían miles de años después...\n\n<strong>La Primera Llama.</strong>\n\nDe aquella estrella nació el mundo: <strong>Vespera</strong>.`
    },
    {
        id: 'era-despertar',
        era: '🌍 La Era del Despertar',
        quote: '"Cuando el mundo abrió los ojos."',
        description: `Vespera era un planeta salvaje. Los océanos cubrían casi toda su superficie. Las montañas aún crecían y los volcanes iluminaban las noches.\n\nNo existían razas inteligentes, solo enormes criaturas primigenias: Dragones, Titanes, Leviatanes y bestias imposibles.\n\nFue durante esta época cuando el propio planeta comenzó a generar algo parecido a una conciencia. Los druidas más antiguos lo llamarían simplemente: <strong>El Alma del Mundo</strong>.`
    },
    {
        id: 'era-guardianes',
        era: '🌿 La Era de los Guardianes',
        quote: '"La primera guerra de la historia."',
        description: `Las criaturas primitivas aprendieron que el planeta estaba vivo. Algunas decidieron protegerlo; otras intentaron dominarlo.\n\nSe libró la primera guerra de la historia, no por territorio, sino por decidir qué debía convertirse Vespera.\n\nLos Guardianes vencieron. Los titanes desaparecieron, los leviatanes se hundieron en las profundidades y los dragones abandonaron el mundo conocido. El Alma del Mundo quedó protegida.`
    },
    {
        id: 'era-mareas',
        era: '🌊 La Era de las Mareas',
        quote: '"El océano era uno solo."',
        description: `Los mares comenzaron a estabilizarse. Nacieron las primeras civilizaciones acuáticas: los ancestros de los Merkfolk, Tritones y Lotol convivían como un solo pueblo.\n\nTodavía no existían reinos, ni fronteras, ni guerras.`
    },
    {
        id: 'era-civilizaciones',
        era: '🔥 La Era de las Primeras Civilizaciones',
        quote: '"Las ciudades de piedra."',
        description: `Los humanos aparecieron. Poco después llegaron Enanos, Elfos, Gnomos y Halflings.\n\nLas antiguas razas del océano observaron con curiosidad cómo aquellos pequeños pueblos levantaban ciudades de piedra.\n\nPor primera vez aparecieron: escritura, comercio, astronomía y magia organizada.`
    },
    {
        id: 'era-estrellas',
        era: '✨ La Era de las Estrellas',
        quote: '"El firmamento vivo."',
        description: `Los primeros astrónomos comenzaron a observar el firmamento y descubrieron que algunas estrellas no permanecían inmóviles.\n\nLos magos afirmaban que el cielo estaba vivo, los sacerdotes pensaban que eran dioses, y los druidas aseguraban que eran espíritus. Todos estaban equivocados, pero nadie podía demostrarlo.\n\nDurante esta época surgieron los primeros observatorios; muchos permanecen en ruinas hasta el día de hoy.`
    },
    {
        id: 'era-reinos',
        era: '⚔️ La Era de los Reinos',
        quote: '"Progreso y destrucción."',
        description: `Las pequeñas ciudades crecieron y nacieron los primeros imperios. Las alianzas desaparecieron y comenzaron las guerras.\n\nFue una época de enorme progreso y enorme destrucción. Muchas maravillas fueron construidas; muchas jamás volvieron a encontrarse.`
    },
    {
        id: 'era-dorada',
        era: '🏛️ La Era Dorada',
        quote: '"El punto máximo de la civilización."',
        description: `La magia alcanzó su punto máximo. Los artificieros construían maravillas, los magos levantaban ciudades flotantes, los enanos excavaban montañas enteras, los elfos cultivaban bosques encantados y los océanos prosperaban.\n\nParecía que nada podría acabar con aquella civilización.`
    },
    {
        id: 'era-caida',
        era: '🌑 La Gran Caída',
        quote: '"Fragmentos de oscuridad."',
        description: `Entonces... algo cayó del cielo. No fue un meteorito, no fue una estrella, no fue un dios. Los registros son confusos, solo hablan de <strong>Fragmentos de Oscuridad</strong>.\n\nAquellos fragmentos corrompían todo lo que tocaban: bosques, animales, personas e incluso la magia. Muchas ciudades desaparecieron y otras fueron abandonadas.\n\nLos pocos sabios supervivientes sellaron los fragmentos más grandes. Con el tiempo, su existencia terminó convirtiéndose en leyenda.`
    },
    {
        id: 'era-renacer',
        era: '🌱 La Era del Renacer',
        quote: '"El mundo sobrevivió."',
        description: `Las ciudades comenzaron a reconstruirse y los pueblos olvidaron lentamente la Gran Caída. Los nuevos reinos crecieron sobre las ruinas de los antiguos, y muchas personas pensaban que las viejas historias eran simples mitos.\n\nSolo unos pocos astrónomos continuaron vigilando el cielo.`
    },
    {
        id: 'era-exploracion',
        era: '⚓ La Era de la Exploración',
        quote: '"Rutas sobre las olas."',
        description: `Los mares volvieron a abrirse y aparecieron nuevas rutas comerciales. Los grandes puertos comenzaron a dominar la economía; fue durante esta época cuando surgieron ciudades como <strong>Newport</strong> y <strong>Plotport</strong>.\n\nLos exploradores cartografiaron casi todo el continente conocido, aunque enormes regiones siguen siendo inexploradas.`
    },
    {
        id: 'era-tronos',
        era: '👑 La Era de los Tronos (Hace ~600 años)',
        quote: '"Consolidación del mundo moderno."',
        description: `Los reinos modernos comenzaron a consolidarse. Las familias nobles establecieron sus linajes, aparecieron los consejos gobernantes, las órdenes de caballería, los gremios, las universidades y las academias de magia.\n\nLa mayoría de las instituciones actuales nacieron durante esta época.`
    },
    {
        id: 'era-alianzas',
        era: '⚒️ La Era de las Alianzas (Hace ~400 años)',
        quote: '"Mayor estabilidad conocida."',
        description: `Tras décadas de conflictos menores, los grandes reinos comprendieron que la guerra constante solo debilitaba al continente.\n\nSe establecieron tratados comerciales, embajadas, puertos libres y rutas protegidas. Fue el periodo de mayor estabilidad que Vespera había conocido desde la Era Dorada.`
    },
    {
        id: 'era-silencio',
        era: '📖 La Era del Silencio (Hace ~200 años)',
        quote: '"El inicio de algo mucho más grande."',
        description: `Las estrellas dejaron de comportarse como siempre. No ocurrió de golpe, fue tan lento que nadie pareció notarlo.\n\nSolo unos pocos astrónomos comenzaron a registrar pequeñas anomalías: una estrella que brillaba diferente, constelaciones que parecían desplazarse, luces que desaparecían durante una sola noche.\n\nLos registros fueron archivados... Olvidados. Nadie imaginó que aquellos pequeños cambios eran el inicio de algo mucho más grande.\n\n<em>Y es aquí donde comienza realmente la historia de vuestra aventura...</em>`
    }
];

function renderTimeline() {
    const container = document.getElementById('timeline-events');
    if (!container) return;

    container.innerHTML = historyEras.map(item => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 class="timeline-era">${item.era}</h3>
                ${item.quote ? `<p class="timeline-quote">${item.quote}</p>` : ''}
                <div class="timeline-text">${item.description}</div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
});