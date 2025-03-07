var map = L.map('map').setView([4.677964736027799, -74.0936596653222], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




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

let btnTrees = document.getElementById('btnTrees');
btnTrees.addEventListener('click', 
    async function() {
        let response = await fetch('arboles_laEstrada.geojson');
        let data = await response.json();

        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, 
                    fillColor: 'green',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8 
                });
            }
        }).addTo(map);
    }
); 


//CARGAR LOS distancias, voy a crear un arreglo de arboles y voy a recorrerlo
let btnDistance= document.getElementById("btnDistance");
btnDistance.addEventListener('click',
    async ()=>{
        let response= await fetch("arboles_laEstrada.geojson");
        let datos= await response.json();
        let trees= datos.features.map((myElement, index)=>({
            id: index+1,
            coordinates: myElement.geometry.coordinates
        }));        

        let distances=[];
        trees.forEach( (treeA)=>{trees.forEach(

            
                (treeB)=>{
                    if(treeA.id != treeB.id){
                        let distance = turf.distance( 
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates),
                        );
                        distances.push(
                            [
                                `Árbol ${treeA.id}`,
                                `Árbol ${treeB.id}`,
                                distance.toFixed(3)                            
                            ]
                        )
                }
            }
            )
        }
        )
        generatePDF(distances, trees.lenght);
    }
)

//como me devuelvo un objeto con muchas cosas, le espesifico a jspdf que solo necesito un jsPDF
function generatePDF(distances, totalTrees){
    let { jsPDF } = window.jspdf;
    let documentPDF= new jsPDF();   
    
    documentPDF.text("REPORTE DE ÁRBOLES EN EL BARRIO LA ESTRADA", 10,10);

    documentPDF.autoTable(
        {
            head: [['Árbol 1', 'Árbol 2', 'Distance']],
            body: distances
        }
    );
    documentPDF.save("Estrada.pdf")
}



//CARGAR LOS siniestros
let btnSiniestros = document.getElementById('btnSiniestros');
btnSiniestros.addEventListener('click', 
    async function() {
        let response = await fetch('siniestros_laEstrada.geojson');
        let data = await response.json();

        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5, 
                    fillColor: 'black',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8 
                });
            }
        }).addTo(map);
    }
); 