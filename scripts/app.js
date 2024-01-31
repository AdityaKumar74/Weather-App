const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {
    console.log(data);
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
    `;

    // update the night and day img / icons
    const iconSrc = `./img/icons/${getWeatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = getWeatherDetails.IsDayTime ? './img/day.svg' : './img/night.svg';
    // if (getWeatherDetails.IsDayTime) {
    //     timeSrc = ;
    // } else {
    //     timeSrc = './img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

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
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});
