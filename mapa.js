document.addEventListener("DOMContentLoaded", function () {
    // MAPA 1: Configuración sin arrastre y con capas comparables
    var map1 = L.map('map1', {
        center: [4.5709, -74.2973],
        zoom: 6,
        zoomControl: true,
        dragging: false,        // Desactiva el arrastre (paneo)
        scrollWheelZoom: true,  // Permite hacer zoom con la rueda del ratón
        doubleClickZoom: true,  // Permite hacer zoom con doble clic
        touchZoom: true         // Permite hacer zoom táctil
    });

    var politico1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© CartoDB | © OpenStreetMap contributors'
    }).addTo(map1);

    var base1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map1);

    L.control.sideBySide(politico1, base1).addTo(map1);

    // MAPA 2: Configuración normal con movimiento
    var map2 = L.map('map2', {
        center: [4.5709, -74.2973],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
    });

    var base2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map2);
});
