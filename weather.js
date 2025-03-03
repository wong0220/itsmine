const COORDS = "coords";
const API_KEY ="e230a3049a69228c4fd2e8e0c72d73c7";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
.then(function(response){
    return response.json();

})
.then(function(json){
const temperature = json.main.temp;
const place = json.name;
weather.innerText = ` ${temperature}°C ${place}`; 
});

}
function savecoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){

   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   };
   savecoords(coordsObj);
   getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("error")
}
function askForCoords(){
navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadedcoords(){
    const loadedCoords = localStorage.getItem(COORDS);
if(loadedCoords === null){
    askForCoords();
}
else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
}
}

function init(){
loadedcoords();
}
init();