const cityname = document.querySelector(".city")
const tempr = document.querySelector(".temperature")
const humid = document.querySelector(".hum-value")
const windspeed = document.querySelector(".wind-value")
const feels = document.querySelector(".feels-value")
const pressure = document.querySelector(".pressure-value")
const states = document.querySelector(".states")
const inputcity = document.querySelector(".inp input")
const stateimage = document.querySelector(".states-img")
const container = document.querySelector(".container")
const hides = document.querySelector(".weather-info")
const startaudio = new Audio("audios/entercity.mp4")
const rainaudio = new Audio("audios/rain.mp3")
const cloudy = new Audio("audios/cloudy.mp3")
const birds = new Audio("audios/Birds.mp3")
const btns = document.querySelector(".btn")
const err = document.querySelector(".errors")
const invalid =new Audio("audios/invalid.mp3")


err.style.display = "none"
const apikey = "1250b7b8b067514ab8b3ae0d90936901"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

wheather = async (citye) => {

    const response = await fetch(apiurl + citye + `&appid=${apikey}`)

    if (response.status == 404) {
        err.style.display = "flex";
        hides.classList.add('tohide')
        invalid.play()
    }
    else {
        const data = await response.json()
        
        hides.classList.remove('tohide')
        err.style.display = "none";

        // Entering the data
        cityname.innerHTML = data.name;
        tempr.innerHTML = data.main.temp + '°C';
        humid.innerHTML = data.main.humidity;
        feels.innerHTML = Math.round(data.main.feels_like);
        pressure.innerHTML = data.main.pressure;
        states.innerHTML = data.weather[0].main;



        // changing the images


        switch (data.weather[0].main) {
            case "Clear":
                stateimage.src = "images/clear.png"
                container.style.backgroundImage = "url(images/clearsky.gif)";
                birds.play()
                // changing()
                break;
            case "Clouds":
                stateimage.src = "images/clouds.png"
                container.style.backgroundImage = "url(images/cloudy.gif)";
                cloudy.play()
                break;
            case "Rain":
                stateimage.src = "images/rain.png"
                container.style.backgroundImage = "url(images/rain.gif)";
                rainaudio.play()
                setTimeout(() => {
                    rainaudio.pause();
                    rainaudio.currentTime = 0
                }, 5000)
                break;
            case "Drizzle":
                stateimage.src = "images/drizzle.png"
                container.style.backgroundImage = "url(images/drizz.gif)";
                break;
            case "Mist":
                stateimage.src = "images/mist.png"
                container.style.backgroundImage = "url(images/mists.gif)";
                break;
            case "Haze":
                stateimage.src = "images/mist.png"
                container.style.backgroundImage = "url(images/haze.gif)";
                break;
            default:
                break;
        }
    }
}

btns.addEventListener('click', () => {
    wheather(inputcity.value)
    inputcity.value = ""
})

inputcity.addEventListener('click', () => {
    startaudio.play()
})
