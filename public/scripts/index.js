class Location {
    constructor(name, address, phoneNumber, category, lat, lng) {
        this.name = name,
        this.address = address,
        this.phoneNumber = phoneNumber,
        this.category = category,
        this.coords = {
            'lat': lat, 'lng': lng
        }
    }   
}


//Variables globales
const mapNode = document.getElementById('map');
let map, marker, infoWindow;
let intialCoords = {lat: -34.6131500, lng: -58.3772300}

//harcodeo datos para probar funciones
const locations = []

//funciones auxiliares
//función que trae los valores del formulario
const getInputValue = (id) => {
    return document.getElementById(id).value
}

//función que carga el mapa
function initMap (){
    map = new google.maps.Map(mapNode, {
        center: intialCoords,
        zoom: 12
    });

    getLocations()
    
}


//función que agrega el marcador en el mapa
const addMarker = location => {
    marker = new google.maps.Marker({
        position: location.coords,
        map: map
    })

    infoWindow = new google.maps.InfoWindow({
        content: markerPoup(location)
    })

    marker.addListener('click', function(){
        infoWindow.open(map, marker)
    })
}

const getLocations = () => {
    fetch('/api/locations')
    .then(res => res.json())
    .then(res => {
        console.log(res.locations)
        mappingLocations(res.locations)
    })
}

const mappingLocations = locations => locations.map(l => addMarker(l))


const getFormData = () => {
    event.preventDefault()
    let name = getInputValue('form-name'),
        address = getInputValue('form-address'),
        phoneNumber = getInputValue('form-phone'),
        category = getInputValue('form-category'),
        lat = parseFloat(getInputValue('form-coord-lat')),
        lng = parseFloat(getInputValue('form-coord-lng'))


    let newLocation = new Location(name, address, phoneNumber, category, lat, lng)
    console.log(newLocation);
    locations.push(newLocation)
    console.log(locations);
    
    
}
//crea el contenido de infoWindow
const markerPoup = data => {
    let {name, address, phoneNumber, category, coords} = data

    return `<p>Descripción: ${name}.</p>
    <p>Dirección: ${address}</p>
    <p>Teléfono: ${phoneNumber}</p>
    <p>(X, Y): ${coords.lat}, ${coords.lng}</p>
    <p>Categoría: ${category}</p>`
}
