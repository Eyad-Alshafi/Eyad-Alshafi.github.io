//Set up variables
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon, currentInF, minInF, maxInF, windInK, windInM, now, sunrise, sunset, currentInC, minInC, maxInC;
var unit = 'F';
var speed = 'mph';

//Get user location
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser");
  }
  
  //Switch temp unit
  $('#switch').click(function() {    
    var currentUnit = $('#unit').text();
    var newUnit = currentUnit == "F" ? "C" : "F";
    $('.unit').text(newUnit);
    if (newUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + String.fromCharCode(176));
      var fahMinTemp = Math.round(parseInt($("#low").text()) * 9 / 5 + 32);
      $("#low").text(fahMinTemp + String.fromCharCode(176));
      var fahMaxTemp = Math.round(parseInt($("#high").text()) * 9 / 5 + 32);
      $("#high").text(fahMaxTemp + String.fromCharCode(176));
      var miles = Math.round(parseInt($("#wind").text()) * 0.62);
      $("#wind").text(miles);
      $("#speed").text("mph");
    } else {
      $("#temp").text(currentInC + String.fromCharCode(176));
      $("#low").text(minInC + String.fromCharCode(176));
      $("#high").text(maxInC + String.fromCharCode(176));
      $("#wind").text(windInK);
      $("#speed").text("kph");
    }
  });
})

//Get weather
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function(result) {
      $("#city").text(result.name);
      $("#country").text(result.sys.country);
      currentInC = Math.round(result.main.temp * 10) / 10;
      currentInF = Math.round(result.main.temp * 9 / 5 + 32);
      minInC = Math.round(result.main.temp_min * 10) / 10;
      minInF = Math.round(result.main.temp_min * 9 / 5 + 32);
      maxInC = Math.round(result.main.temp_max * 10) / 10;
      maxInF = Math.round(result.main.temp_max * 9 / 5 + 32);
      windInK = Math.round(result.wind.speed * 10) / 10;
      windInM = Math.round(result.wind.speed * 0.62);
      $("#temp").text(currentInF + String.fromCharCode(176));
      $("#low").text(minInF + String.fromCharCode(176));
      $("#high").text(maxInF + String.fromCharCode(176));
      $(".unit").text(unit);
      $("#desc").text(result.weather[0].main);
      $("#hum").text(result.main.humidity);
      //$("#wind").text(result.wind.speed);
      $("#wind").text(windInM);
      var unixSunrise = result.sys.sunrise;
      sunrise = new Date(unixSunrise*1000);
      $("#sunrise").text(sunrise.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      }));
      var unixSunset = result.sys.sunset;
      sunset = new Date(unixSunset*1000);
      $("#sunset").text(sunset.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      }));
      var dt = result.dt;
      now = new Date();
      $("#date").text(now.toDateString());
      var time = now.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit"
      });
      $("#time").text(time);
      changeBackground(result.weather[0].main);      
    }
  });
}

//Change background based on weather and time of day
function changeBackground(desc) {
  if (now > sunrise && now < sunset) {    
    var desc = desc.toLowerCase();
    switch (desc) {
      case "clear":
        $("body").css("background-image", 'url("img/clear-day.jpeg")');
        break;
      case "clouds":
        $("body").css("background-image", 'url("img/cloudy-day.jpeg")');
        break;
      case "rain":
        $("body").css("background-image", 'url("img/rainy-day.jpeg")');
        break;
      case "thunderstorm":
        $("body").css("background-image", 'url("img/thunder-day.jpeg")');
        break;
      case "snow":
        $("body").css("background-image", 'url("img/snow-day.jpeg")');
        break;
      case "fog":
        $("body").css("background-image", 'url("img/fog-day.jpeg")');
        break;
      case "mist":
        $("body").css("background-image", 'url("img/fog-day.jpg")');
        break;
      default:
        $("body").css("background-image", 'url("img/clear-day.jpeg")');
    }
} else {  
      var desc = desc.toLowerCase();
    switch (desc) {
      case "clear":
        $("body").css("background-image", 'url("img/clear-night.jpeg")');
        break;
      case "clouds":
        $("body").css("background-image", 'url("img/cloudy-night.jpeg")');
        break;
      case "rain":
        $("body").css("background-image", 'url("img/rainy-night.jpeg")');
        break;
      case "thunderstorm":
        $("body").css("background-image", 'url("img/thunder-night.jpeg")');
        break;
      case "snow":
        $("body").css("background-image", 'url("img/snow-night.jpeg")');
        break;
      case "fog":
        $("body").css("background-image", 'url("img/fog-night.jpeg")');
        break;
      case "mist":
        $("body").css("background-image", 'url("img/fog-night.jpg")');
        break;
      default:
        $("body").css("background-image", 'url("img/clear-night.jpeg")');
}
}
}