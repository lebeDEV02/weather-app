'use strict'
const infoTabs = document.querySelectorAll('.app__weather-top');
const tabsSection = document.querySelector('.app__weather-tabs');
const allTabs = document.querySelectorAll('.app__weather-tab');
const weatherInformation = document.querySelector('.weather-information__temperature');
const weatherFeelsLike = document.querySelector('.weather-information__feelsLike');
const weather = document.querySelector('.weather-information__weather');
const weatherSunrise = document.querySelector('.weather-information__sunrise')
const weatherSunset = document.querySelector('.weather-information__sunset')
const weatherCityArray = document.querySelectorAll('.app__weather-city');
const inputValue = document.querySelector('.app__search-input')
const btn = document.querySelector('.app__search-button');
const favouriteCity = document.querySelector('.weather__favourite');
const addedLocations = document.querySelector('.app__locations-list');
let counterForLocalStorage = 0;
tabsSection.addEventListener('click', (e) => {
	if (e.target.classList.contains('app__weather-tab')) {
		allTabs.forEach(item => {
			item.classList.remove('app__weather-tab--active');
		})
		e.target.classList.add('app__weather-tab--active');
		infoTabs.forEach(item => {
			item.classList.remove('app__weather-top--active');
			if (item.classList.contains(`app__weather-${e.target.textContent.toLowerCase()}`)) {
				item.classList.add('app__weather-top--active');
			}
		});
	}
});

// Weather API 


let weatherDigitsValue = document.querySelector('.weather__value');
btn.addEventListener('click', () => {
	fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
		.then(response => response.json())
		.then(data => {
			if (data.message !== "city not found") {
				console.log(data);
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (1000 * 60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (1000 * 60)) % 60)} `;
			}
			else {
				alert("Try again! Probably you made a mistake");
				inputValue.value = "";
			}
		})
	// .catch(err => {
	// 	alert(err);
	// });
})
favouriteCity.addEventListener('click', () => {
	const weatherCity = document.querySelector('.app__weather-city');
	addedLocations.insertAdjacentHTML('beforeend', `<p>${weatherCity.textContent}</p>`);
	counterForLocalStorage++;

});
for (let i = 0; i < localStorage.length; i++) {
	let key = localStorage.key(i);
	addedLocations.insertAdjacentHTML('beforeend', `<p>${localStorage.getItem(key)}</p>`);
}