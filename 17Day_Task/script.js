async function getCountries(){
    let data=await fetch('https://restcountries.com/v3.1/all')
    let res=await data.json()
    console.log(res)
    displayCountries(res)
}
getCountries()
async function getWeather(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}&units=metric`);
        let weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
function displayCountries(countryDetails){
    document.body.style.backgroundColor="rgb(49, 49, 73)";
    console.log(countryDetails)
    let wrapper=document.createElement('div')
    wrapper.classList.add('d-flex','flex-row','flex-wrap','justify-content-center','mt-3','gap-4','w-100','text-center')
    countryDetails.map((element,index)=>{              
        
        let div1=document.createElement('div')
        
        div1.innerHTML=`
       
            <div class="card m-0 p-0 border" style="width: 25.1rem;height:450px">
                <div class="bg-dark text-white p-2">${element.name.common}</div>
                <img src=${element.flags.png} class="card-img-top p-4   " alt="..." height="220px">
                <div class="card-body  p-0">
                <span class="d-block text-white">Capital: ${element.capital}</span>
                    <span class="d-block text-white">Region: ${element.region}</span>
                    <span class="d-block text-white">Country Code: ${element.cca3}</span>
                    <a href="https://openweathermap.org/api" target="_blank" class="btn text-white border">Click for Weather</a>
                </div>
            </div>
       
        `
        wrapper.append(div1)
        document.body.append(wrapper)
    })  
}