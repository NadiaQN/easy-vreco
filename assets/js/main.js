// Funcion para iniciar el mapa de google
function initMap() {
  var laboratoriaChile = {
    lat: -33.4190456,
    lng: -70.64176040000001
  };
  // Obtenemos el mapa, centramos la imagen y colocamos zoom
  var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
    center: laboratoriaChile,
    // Agregando estilo nocturno al mapa
    styles: [
      { elementType: 'geometry', 
        stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', 
        stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', 
        stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  });
  // Colocamos el marcador para el mapa
  var image = 'https://icon-icons.com/icons2/418/PNG/128/bike_41527.png';
  var markadorLaboratoria = new google.maps.Marker({
	  position: laboratoriaChile,
    map: map,
    icon: image
  });

  // Funcion para encontrar la posición del usuario
  function buscar() {
	  if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	  }
  }

  var latitud, longitud;
  var funcionExito = function(posicion) {
	  latitud = posicion.coords.latitude;
	  longitud = posicion.coords.longitude;

    var image = 'https://icon-icons.com/icons2/418/PNG/128/bike_41527.png';
	  var miUbicacion = new google.maps.Marker({
		  position: {
			  lat: latitud,
			  lng: longitud
		  },
      map: map,
      icon: image
	  });
	  map.setZoom(18);
  	map.setCenter({
  		lat: latitud,
  		lng: longitud
  	});
  };

  var funcionError = function(error) {
	  alert('Tenemos un problema con encontrar tu posición');
  };
  document.getElementById('encuentrame').addEventListener('click', buscar);

  // Autocompletado de imputs
  var inputPartida = document.getElementById('punto-partida');
  var inputDestino = document.getElementById('punto-destino');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  // Función para trazar ruta desde punto A a punto B
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  	directionsService.route({
  		origin: inputPartida.value,
  		destination: inputDestino.value,
      travelMode: 'DRIVING'
  	}, function(response, status) {
	  	if (status === 'OK') {
	  		directionsDisplay.setDirections(response);
	  	} else {
	  		window.alert('No encontramos una ruta');
	  	}
  	});
  };
  directionsDisplay.setMap(map);
  var trazarRuta = function() {
  	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
};
