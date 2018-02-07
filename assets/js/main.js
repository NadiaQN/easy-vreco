// Funcion para iniciar el mapa de google
function initMap() {
  var laboratoriaChile = {
    lat: -33.4190456,
    lng: -70.64176040000001
  };
  // Obtenemos el mapa, centramos la imagen y colocamos zoom
  var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: laboratoriaChile
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