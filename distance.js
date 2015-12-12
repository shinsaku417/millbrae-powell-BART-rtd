





// html 5 geolocation functions 
function getLocation(cb) {
  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	console.log('position: ', position.coords);
	    	getDiffDistance({'lat': position.coords.latitude, 'lng' : position.coords.longitude}, cb);
	    }, function(error) {
	        alert('Error occurred. Error code: ' + error.code);         
	    },{timeout:5000});
	}else{
	    alert('no geolocation support');
	}
}

//google distance finder
//currently hardcode gps location for embr cord
// {'lat': 37.7929318, 'lng: -122.39681330000002'}
function getDiffDistance(origin, cb){
	var _origin = new google.maps.LatLng(origin.lat, origin.lng);
	var _destination = new google.maps.LatLng(37.7894069, -122.40106730000002);
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins: [_origin],
		destinations: [_destination],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: true,
		avoidTolls: true
	}, function(response, status) {
		if (status !== google.maps.DistanceMatrixStatus.OK) {
			alert('Error was: ' + status);
		} else {
			cb(response.rows[0].elements[0].duration.text);
		}
	});
}



