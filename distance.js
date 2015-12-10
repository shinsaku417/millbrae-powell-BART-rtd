// html 5 geolocation functions 
function getLocation(cb) {
  if (navigator.geolocation) {
      cb(navigator.geolocation.getCurrentPosition(showPosition));
  } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  return [position.coords.latitude, position.coords.longitude]
}


