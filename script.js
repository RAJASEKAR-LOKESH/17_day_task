
const openWeatherMapApiKey = 'API Key';

async function getCountries() {
    let data = await fetch('https://restcountries.com/v3.1/all');
    let res = await data.json();
    console.log(res);
    displayCountries(res);
}
getCountries();

async function getWeather(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}&units=metric`);
        let weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCountries(countryDetails) {
    document.body.style.backgroundColor = "rgb(49, 49, 73)";
    let wrapper = document.createElement('div');
    wrapper.classList.add('d-flex', 'flex-row', 'flex-wrap', 'justify-content-center', 'mt-3', 'gap-4', 'w-100', 'text-center');
    
    countryDetails.map((element) => {              
        let div1 = document.createElement('div');
        div1.classList.add('card', 'm-0', 'p-0', 'border');
        div1.style.width = "25.1rem";
        div1.style.height = "450px";

        div1.innerHTML = `
            <div class="bg-dark text-white p-2">${element.name.common}</div>
            <img src="${element.flags.png}" class="card-img-top p-4" alt="${element.name.common} flag" height="220px">
            <div class="card-body p-0">
                <span class="d-block text-white">Capital: ${element.capital ? element.capital[0] : "N/A"}</span>
                <span class="d-block text-white">Region: ${element.region}</span>
                <span class="d-block text-white">Country Code: ${element.cca3}</span>
                <span class="d-block text-white">Latlng: ${element.latlng ? element.latlng.join(', ') : "N/A"}</span>
                <button class="btn text-white border mt-2 weather-btn">Click for Weather</button>
                <div class="weather-info mt-0 text-white" style="display: none;"></div> 
            </div>
        `;

        div1.querySelector('.weather-btn').addEventListener('click', async () => {
            if (element.latlng && element.latlng.length >= 2) {
                const lat = element.latlng[0];
                const lon = element.latlng[1];
                const weatherData = await getWeather(lat, lon);

                if (weatherData) {
                    const weatherInfoDiv = div1.querySelector('.weather-info');
                    weatherInfoDiv.innerHTML = `
                        <strong>Temperature:</strong> ${weatherData.main.temp} °C<br>
                        <strong>Weather:</strong> ${weatherData.weather[0].description}
                    `;
                    weatherInfoDiv.style.display = 'block'; 
                } else {
                    div1.querySelector('.weather-info').innerHTML = `<strong>Weather data not available</strong>`;
                }
            } else {
                div1.querySelector('.weather-info').innerHTML = `<strong>Coordinates not available</strong>`;
            }
        });

        wrapper.append(div1);
    });

    document.body.append(wrapper);
}
