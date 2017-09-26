/*// Author: Katie Pustolski (BASED OFF OF HOMEWORK AJAX FILES)
// Last Edited: 12/2/13
// Project 2: Weather app
// Rich Media Web App Dev. */
"use strict";

// GLOBALS
var OPENWEATHERMAP_JSONP_URL = "http://api.openweathermap.org/data/2.5/forecast/weather?";

var mainCondition;
var latitude;
var longitude;
var OPENWEATHERMAP_API_KEY = "2a9345bd86289846fe85648b6c1ca706";

// ENABLE GOOGLE MAPS VISUAL REFRESH
google.maps.visualRefresh = true;
// READY/INIT FUNCTION
$( document ).ready(function(){
	//Hides animated gif
	$("#ajax-loader").hide();
	
	// Hook up event for button that is grouped with searchterm text field
	$('#getbutton').on('click', function(event) {
		//SHOW LOADING GIF
		$("#ajax-loader").show();
		var term = $('#searchterm').val();
		if (term.length >= 1){
			getLocation(encodeURIComponent(term)); // replace space with %20
		}
	});
	
}); // end READY

// SHOW GOOGLE MAP FUNCTIONS
function showMap(lat,lon){
	// takes in the latuitude and longitude coordiates from the openweathermap API as assigns
	// and passes them into google maps, so that the center of the google map is now the city 
	// that was searched. 
	var mapOptions ={
		zoom:11,
		center: new google.maps.LatLng(lat,lon)
	};
	// create map
	var map = new google.maps.Map(document.getElementById('map'),mapOptions);
	// make the google map have a weather layer
	var weatherLayer = new google.maps.weather.WeatherLayer({
	    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
	  });
	  weatherLayer.setMap(map);
 	 // make the google map have a cloyud layer
  	var cloudLayer = new google.maps.weather.CloudLayer();
  	cloudLayer.setMap(map);
}
// called when user clicks a search button
function getLocation(term){
	var url = OPENWEATHERMAP_JSONP_URL;
	url += "q=" + term;
	url += "&APPID=" + OPENWEATHERMAP_API_KEY;
	
	// ajax cLL
	$.ajax({
            url: url,
            dataType: 'jsonp',
            success: onJSONLoaded
    });
	
} 

// WHEN THE JSON LOADS,
function onJSONLoaded(obj){
	// GRAB THE ID OF THESE SECTIONS
	var contentSec = document.getElementById("content");
	var searchSec = document.getElementById("search");
	var mapDiv = document.getElementById("map");
	// CLEAR SELECTED SECTIONS
	contentSec.innerHTML="";
	mapDiv.innerHTML="";
	// PRINT THE OBJECT
	// FOR TESTING
	// console.log(obj);
	// console.log("LOADED");

	// CREATE VARIABLES AND ASSIGN THEM TO PARTS OF THE JSON FILE
	var city = obj.city;
	var current = obj.list[0];
	var mainCondition = obj.list[0].weather[0].main;
	var latitude = obj.city.coord.lat;
	var longitude = obj.city.coord.lon;
	//PRINT MAIN CONDITION
	//FOR TESTING
	// console.log(mainCondition);

	// CREATE ELEMENTS
	var c = document.createElement('h1');
	var d = document.createElement('h2');
	var hr = document.createElement('hr');
	var temp = document.createElement('h2');
	var humidity = document.createElement('h2');
	var pressure = document.createElement('h2');
	var wind = document.createElement('h2');

	// CONVERT KELVIN TO CELCIUS AND CELCIUS TO FERENHEIT
	var tC = Math.floor(current.main.temp - 273.15);
	var tF = tC*(9/5)+32;

	// ADD JSON VALIABLES TO THE NEWLY CERATED ELEMENTS
	c.innerHTML= city.name + " , " +city.country;
	d.innerHTML= current.weather[0].description;
	temp.innerHTML = tF +"&degF"+" &nbsp&nbsp&nbsp"+tC+"&degC";
	humidity.innerHTML = "humidity: "+current.main.humidity+ "%";
	pressure.innerHTML = "pressure (sea level): "+current.main.pressure+" hpa"
	wind.innerHTML = "wind Speed: "+ Math.floor(current.wind.speed) + " m/s "

	// WHEN "GO" IS CLICKED, HAVE THE SEARCH SECTION MOVE DOWN THE PAGE
// 	$("#search").css("top","23em");
    $("#search").animate({top:'20em'});

	// HELPS WEATHER INFORMATION FADE WHEN FIRST LOADING A LOCATION
	$('body').addClass("loaded");

	//APPEND ELEMENTS TO HTML
	contentSec.appendChild(c);
	contentSec.appendChild(d);
	contentSec.appendChild(temp);
	contentSec.appendChild(humidity);
	contentSec.appendChild(pressure);
	contentSec.appendChild(wind);

	// DON'T FOR GET TO ADD THE GOOGLE MAP TO THE PAGE 
	 showMap(latitude,longitude);

	 // DETERMINES WHICH ANIMATION TO USE BASED ON WHAT THE MAIN CONDITION IS FROM THE WEATHER API
	if(mainCondition=="Clouds"){
		cloudyDay();
	}
	if(mainCondition=="Clear"){

		sunnyDay();
	}
	if(mainCondition=="Snow"){

		letItSnow();
	}
	if(mainCondition=="Rain" ||mainCondition=="Drizzle"){

		rain();
	}
	if(mainCondition=="Thunderstorm" ||mainCondition=="Storm"){

		thunderStorm();
	}

	//HIDE THE LOADING GIF
	$("#ajax-loader").hide();

}

	
	
	
	


