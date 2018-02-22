function initMap() {
  let latitude, longitude, marker;
  let cityUbication = {
    lat: -12.023545,
    lng: -77.014166};
  let map = new google.maps.Map(document.getElementById('map'), {
    center: cityUbication,
    zoom: 8
  });

  let miUbication = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: cityUbication,
      title: 'Estoy aqui'
    });

    marker.addListener('click', function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });

    map.setZoom(14);
    map.setCenter(cityUbication);
  };

  let error = function(error) {
    window.alert('No se puede obtener tu localización');
  };

  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(miUbication, error);
    }
  }

  let pointStart = document.getElementById('point-start');
  let pointDestination = document.getElementById('point-destination');
  new google.maps.places.Autocomplete(pointStart);
  new google.maps.places.Autocomplete(pointDestination);

  let directionService = new google.maps.DirectionsService;
  let directionRendere = new google.maps.DirectionsRenderer;

  document.getElementById('button-myUbication').addEventListener('click', function() {
    pointStart.value = latitude + ' ' + longitude;
  });

  let route = function(direccionService, direccionDisplay) {
    var request = {
      origin: pointStart.value,
      destination: pointDestination.value,
      travelMode: 'DRIVING'
    };
    direccionService.route(request, function(result, status) {
      if (status === 'OK') {
        let distance = result.routes[0].legs[0].distance.value / 1000,
          time = result.routes[0].legs[0].duration.text,
          money = (distance * 2.5).toFixed(2);
  
        document.getElementById('tarifa').innerHTML = '';
        document.getElementById('tarifa').innerHTML = `Costo: S/. ${money} <br><br> Duración: ${time}`;
        direccionDisplay.setDirections(result);
      }
    });
    directionRendere.setMap(map);
    marker.setMap(null);
  };

  window.addEventListener('load', search);
  document.getElementById('button-router').addEventListener('click', function(e) {
    e.preventDefault();
    route(directionService, directionRendere);
  });
}

