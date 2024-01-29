const cityForm = document.querySelector('form');

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
        .then( data => console.log(data))
        .catch( err => console.log(err));
});
