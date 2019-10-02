const mapNode = document.getElementById('map');
let map;
let coord = {lat: -34.6131500, lng: -58.3772300}

function initMap (){
    map = new google.maps.Map(mapNode, {
        center: coord,
        zoom: 12
    });

}