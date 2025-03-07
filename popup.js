var marker = L.marker([4.675457638522295, -74.09545224589367]).addTo(map);

        // Contenido del popup
        var popupContent = `
            <h3>Iglesia Principal</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Palacio_de_Bellas_Artes%2C_Ciudad_de_M%C3%A9xico%2C_M%C3%A9xico%2C_2013-10-13%2C_DD_57.jpg" width="200">
            <p>Esta iglesia es un sitio histórico importante en la ciudad.</p>
        `;

        // Crear popup pero sin vincularlo aún
        var popup = L.popup().setContent(popupContent);

        // Asociar el popup al marcador (se abrirá si se da clic en el marcador)
        marker.bindPopup(popup);

        // Función para abrir el popup cuando se presiona el botón
        document.getElementById('btnIglesia').addEventListener('click', function() {
            marker.openPopup(); // Esto abre el popup manualmente al hacer clic en el botón
        });
