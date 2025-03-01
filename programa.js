var map = L.map('map').setView([4.677964736027799, -74.0936596653222], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// async function cargarGeoJSON() {
//     try {
//         let response = await fetch('barrios-bogota'); // Verifica que esta URL sea válida
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
//         let data = await response.json(); // Esperar el JSON correctamente
//         L.geoJSON(data).addTo(map); // Agregar los datos al mapa
//     } catch (error) {
//         console.error("Error al cargar el GeoJSON:", error);
//     }
// }

// cargarGeoJSON();


async function loadPolygon(){
    let myData = await fetch('barrios-bogota.geojson'); //Aquí se especifica .geojson, lo que indica claramente el tipo de archivo que se está solicitando. 
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon,
        {
            style:{
                color:'blue'
        }
        } 
    ).addTo(map);
    }

loadPolygon();
//CARGAR LOS ARBOLES
async function loadPolygon2() {
    let myData2 = await fetch('arboles_laEstrada.geojson');  
    let myPoint = await myData2.json();

    L.geoJSON(myPoint, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 5,  // Tamaño del punto
                color: 'green',  // Borde del punto
                fillColor: 'green',  // Color del relleno
                fillOpacity: 0.8  // Opacidad del punto
            });
        }
    }).addTo(map);
}

loadPolygon2();



let btnTrees = document.getElementById("btnTrees");
btnTrees.addEventListener('click', ()=> alert('Hola'));