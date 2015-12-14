// html 5 geolocation functions 
function getLocation(cb) {
  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	//getDiffDistance({'lat': position.coords.latitude, 'lng' : position.coords.longitude});
	    	// console.log({'lat': position.coords.latitude, 'lng' : position.coords.longitude});
			cb({'lat': position.coords.latitude, 'lng' : position.coords.longitude});
	    	//return {'lat': position.coords.latitude, 'lng' : position.coords.longitude};
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
	var _destination = new google.maps.LatLng(37.7894069, -122.40106730000002); //bart location
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins: [_origin],
		destinations: [_destination],
		travelMode: google.maps.TravelMode.WALKING,
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


//closest bart station to you function
function closestBartStation(currentLat, currentLng){ //passing in current location

	var _currentLat = parseInt(currentLat);
	var _currentLng	= parseInt(currentLng);

	var closest, closestDist = null;

	//bartstation from bartstation.js
	for( var key in bartstation ){
		var distance = haversine(_currentLat, _currentLng, bartstation[key]['gtfs_latitude'], bartstation[key]['gtfs_longitude']);
		// console.log(bartstation[key]['abbr']);
		// console.log('distance', distance);
		if (!closest || closestDist > distance){
			closest = bartstation[key]['abbr'];
			closestDist = distance;
		}
	}

	return closest;//key of closes bart station. 
}

//wikipedia haversine for calculating gps coordinates. 
function haversine() {
       var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
       var R = 6372.8; // km
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}
//console.log(haversine(36.12, -86.67, 33.94, -118.40));
