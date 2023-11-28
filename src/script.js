const apiKey = "886705b4c1182eb1c69f28eb8c520e20";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .normal-search");
const weatherIcon = document.querySelector(".weather-icon");


//Adding voice command to search weather of 
//specific city
const voiceButton = document.getElementById("voiceBtn");
const recognition  = new webkitSpeechRecognition() || new SpeechRecognition();


// sound effect for different weather
const audio = new Audio();

async function checkWeather(city){
    if (!city) {
        // If city is empty, do not make the API request
        return;
    }
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`)
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
                        var data  = await response.json();
                        // console.log(data);
                    
                    
                        document.querySelector(".city").innerHTML = data.name; 
                        document.querySelector(".temp").innerHTML = Math.round( data.main.temp)+"°c";
                        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
                        document.querySelector(".wind").innerHTML = data.wind.speed+" km/h"; 
                    

                        //sound effect for different weather
                        let soundFile = "";
                    
                        if(data.weather[0].main == "Clouds"){
                            weatherIcon.src = "/clouds.png";
                            soundFile = "/clouds.mp3";
                        }else if(data.weather[0].main == "Clear"){
                            weatherIcon.src = "/clear.png";
                            soundFile = "/clearsky.mp3";
                        }else if(data.weather[0].main == "Rain"){
                            weatherIcon.src = "/rain.png";
                            soundFile = "/rain.mp3";
                        }else if(data.weather[0].main == "Snow"){
                            weatherIcon.src = "/snow.png";
                            soundFile = "/snow.mp3";
                        }else if(data.weather[0].main == "Mist"){
                            weatherIcon.src = "/mist.png";
                            soundFile = "/mist.mp3";
                        }else if(data.weather[0].main == "Drizzle"){
                            weatherIcon.src = "/drizzle.png";
                            soundFile = "/drizzling.mp3";
                        }
                        // Play the sound
                    if (soundFile) {
                        audio.src = soundFile;
                        audio.play();
                    }
                    
                        document.querySelector(".weather").style.display = "block";
                        document.querySelector(".error").style.display = "none";
    }
   
}  
//Adding voice command to search weather of 
//specific city
voiceButton.addEventListener("click",()=>{
    recognition.start();
});

recognition.onresult = (voiceParameter)=>{
    const voiceResult = voiceParameter.results[0][0].transcript;
    searchBox.value = voiceResult;
    checkWeather(voiceResult);
}
 

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});