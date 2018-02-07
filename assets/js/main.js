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
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#1d2c4d'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#8ec3b9'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#1a3646'
          }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#4b6878'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#64779e'
          }
        ]
      },
      {
        'featureType': 'administrative.province',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#4b6878'
          }
        ]
      },
      {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#334e87'
          }
        ]
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#023e58'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#283d6a'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#6f9ba5'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#1d2c4d'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#023e58'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#3C7680'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#304a7d'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#98a5be'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#1d2c4d'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#2c6675'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#255763'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#b0d5ce'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#023e58'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#98a5be'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#1d2c4d'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#283d6a'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#3a4762'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#0e1626'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#4e6d70'
          }
        ]
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
