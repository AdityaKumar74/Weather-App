const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUi = (data) => {
    // console.log(data);
    // const getcityDetls = data.getCityDetails;
    // const getWeatherDetls = data.getWeatherDetails;

    // destructure properties
    const { getCityDetails, getWeatherDetails } = data;
    
    // update the details
    details.innerHTML = `
    <h5 class="my-3">${getCityDetails.EnglishName}</h5>
    <div class="my-3">${getWeatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${getWeatherDetails.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    const getCityDetails = await getCity(city);
    const getWeatherDetails = await getWeather(getCityDetails.Key);
    
    return {
        getCityDetails,
        getWeatherDetails
    }
}
cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    updateCity(city)
        .then( data => updateUi(data))
        .catch( err => console.log(err));
});
