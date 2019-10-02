const mapNode = document.getElementById('map');
let map, marker, infoWindow;
let coord = {lat: -34.6131500, lng: -58.3772300}

let infoContent = `<p>Descripción: Aeroterra S.A.</p>
<p>Dirección: Av. Eduardo Madero 1020</p>
<p>Teléfono: 459 11 5272 0900</p>
<p>(X, Y): -34.5972551, -58.3722446</p>
<p>Categoría: Residencial</p>`

function initMap (){
    map = new google.maps.Map(mapNode, {
        center: coord,
        zoom: 12
    });

    addMarker()
    
}

const addMarker = () => {
    marker = new google.maps.Marker({
        position: {lat: -34.5972551, lng: -58.3722446},
        map: map
    })

    infoWindow = new google.maps.InfoWindow({
        content: infoContent
    })

    marker.addListener('click', function(){
        infoWindow.open(map, marker)
    })
}