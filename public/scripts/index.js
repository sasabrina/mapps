class Location {
    constructor(name, address, phoneNumber, category, lat, lng) {
        this.name = name,
        this.address = address,
        this.phoneNumber = phoneNumber,
        this.category = category,
        this.coords = {
            'lat': lat, 
            'lng': lng
        }
    }   
}

// VARIABLES GLOBALES

const mapNode = document.getElementById('map');
let map, infoWindow, name, address, phoneNumber, lat, lng;
let intialCoords = {lat: -34.6131500, lng: -58.3772300}

// FUNCIONES AUXILIARES

//obtiene los valores de los inputs
const getInputValue = (id) => {
    return document.getElementById(id).value
}

// FUNCIONES

//función que carga el mapa
function initMap (){
    map = new google.maps.Map(mapNode, {
        center: intialCoords,
        zoom: 12
    });

    getLocations()
}

//obtiene los puntos de interés desde la api
const getLocations = () => {
    fetch('/api/locations')
    .then(res => res.json())
    .then(res => {
        console.log(res.locations)
        mappingLocations(res.locations)
    })
}

//mapea la respueta de la api y agrega los marcadores en el mapa
const mappingLocations = locations => locations.map(l => addMarker(l))

//función que agrega el marcador en el mapa
const addMarker = location => {
    let marker = new google.maps.Marker({
        position: location.coords,
        map: map
    })

    infoWindow = new google.maps.InfoWindow({
        content: markerPopup(location)
    })

    marker.addListener('click', function(){
        infoWindow.open(map, marker)
    })
}

//crea el contenido de infoWindow
const markerPopup = data => {
    let {name, address, phoneNumber, category, coords} = data

    return `<p><span>Descripción:</span> ${name}.</p>
    <p><span>Dirección:</span> ${address}</p>
    <p><span>Teléfono:</span> ${phoneNumber}</p>
    <p><span>(X, Y):</span> ${coords.lat}, ${coords.lng}</p>
    <p><span>Categoría:</span> ${category}</p>`
}

// obtiene los datos cargados en el formulario y crea el nuevo punto de interés para cargar a la api
const getFormData = (event) => {
    event.preventDefault()
    name = getInputValue('form-name'),
    address = getInputValue('form-address'),
    phoneNumber = getInputValue('form-phone'),
    category = getInputValue('form-category'),
    lat = parseFloat(getInputValue('form-coord-lat')),
    lng = parseFloat(getInputValue('form-coord-lng'))

    let newLocation = new Location(name, address, phoneNumber, category, lat, lng)
    console.log(newLocation);
    postNewLocations(newLocation)
}

const form = document.getElementById('my-form')
form.onsubmit = () => getFormData(event)


//carga nuevos puntos de interés en la api
const postNewLocations = newLocation => {
    fetch('/api/locations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocation)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        getLocations()
    })
    .catch(error => console.log(error))
}