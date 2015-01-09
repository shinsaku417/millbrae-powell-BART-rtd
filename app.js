$(function() {
  // Get Real Time Departures for northbound trains from Millbrae
  $.ajax ({
    // Register for BART API at http://api.bart.gov/api/register.aspx and insert key
    // Change orig=mlbr to station of your choice. Full list of abbreviations
    // can be found at http://api.bart.gov/docs/overview/abbrev.aspx
    url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=mlbr&dir=n&key=insert-key-here",
    type: 'GET',
    success: function (data) {
      $('.northbound').prepend('<div class = "direction">Northbound</div>');
      var station = $(data).find('abbr')[0].innerHTML;
      $('.northbound').prepend('<div class = "station">' + station + '</div>');
      getEtd(data, '.northbound')
    },
    error: function (data) {
      console.error('Error: Failed to fetch data');
    }
  });

  // Get Real Time Departures for southbound trains from Powell Street
  $.ajax ({
    url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=powl&dir=s&key=insert-key-here",
    type: 'GET',
    success: function (data) {
      $('.southbound').prepend('<div class = "direction">Southbound</div>');
      var station = $(data).find('abbr')[0].innerHTML;
      $('.southbound').prepend('<div class = "station">' + station + '</div>');
      getEtd(data, '.southbound');
    },
    error: function (data) {
      console.error('Error:Failed to fetch data');
    }
  });

  var getEtd = function(data, direction) {
    var timeData = {
      'redLine': [],
      'blueLine': [],
      'greenLine': [],
      'yellowLine': [],
      'orangeLine': []
    };
    $(data).find('estimate').each(function() {
      var color = $(this).find('color')[0].innerHTML;
      // Specify lines of your choice here
      if (color === 'RED' || color === 'YELLOW') {
        var min = $(this).find('minutes')[0].innerHTML;
        switch(color) {
          case 'RED':
            timeData.redLine.push(min);
            break;
          case 'BLUE':
            timeData.blueLine.push(min);
            break;
          case 'GREEN':
            timeData.greenLine.push(min);
            break;
          case 'YELLOW':
            timeData.yellowLine.push(min);
            break;
          case 'ORANGE':
            timeData.orangeLine.push(min);
            break;
        }
      }
    });
    appendData(timeData, direction);
  };

  var appendData = function(data, direction) {
    for (var key in data) {
      for (var i = 0; i < data[key].length; i++) {
        var min = data[key][i];
        if (min === "Leaving") {
          $(direction).append('<div class = ' + key + '>Leaving</div>');
        } else {
          $(direction).append('<div class = ' + key + '><span class = "min">' + min + '</span> mins</div>');
        }
      }
    }
  }
});
