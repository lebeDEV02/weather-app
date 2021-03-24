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
const weatherCityFavourite = document.querySelector('.app__weather-city--favourite');
const inputValue = document.querySelector('.app__search-input')
const btn = document.querySelector('.app__search-button');
const favouriteCity = document.querySelector('.weather__favourite');
const addedLocations = document.querySelector('.app__locations-list');
const weatherDigitsValue = document.querySelector('.weather__value');
let counterForLocalStorage = 0;
let set = new Set();
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
btn.addEventListener('click', (e) => {
	e.preventDefault();
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
				localStorage.removeItem('inputStorage');
			}
		});
})
inputValue.value = localStorage.getItem('inputStorage');
inputValue.addEventListener('input', () => {
	localStorage.setItem('inputStorage', inputValue.value);
})
// Trying to fetch data 
document.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
	fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
		.then(response => response.json())
		.then(data => {
			if (data.message !== "city not found" || data.message !== "Nothing to geocode") {
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
				localStorage.removeItem('inputStorage');
			}
		});
	//  After DOM Content loaded get info for set
	for (let key in localStorage) {
		if (!localStorage.hasOwnProperty(key) || localStorage.key === "inputStorage") {
			continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
		} else {
			if (key !== "inputStorage") {
				set.add(localStorage.getItem(key))
			}
		}
	}
	for (let value of set) {
		addedLocations.insertAdjacentHTML('beforeend', `<p class="app__favourite-city">${value}<svg class="app__favourite-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
		 </p>`);
	};
})
// Sort out keys in localStorage
favouriteCity.addEventListener('click', () => {
	for (let key in localStorage) {
		if (!localStorage.hasOwnProperty(key)) {
			continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
		}
		else if (weatherCityFavourite.textContent !== "undefined" && !set.has(weatherCityFavourite.textContent)) {
			localStorage.setItem(`${localStorage.length}`, `${weatherCityFavourite.textContent}`);
			set.add(weatherCityFavourite.textContent);
			addedLocations.insertAdjacentHTML('beforeend', `<p class="app__favourite-city">${weatherCityFavourite.textContent}<svg class="app__favourite-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
		 </p>`);
			break;
		}
	}
})

// Отправка на сервер запроса по клику на любимый город + тут же попытка реализовать удаление любимого города
addedLocations.addEventListener('click', (e) => {
	if (e.target.classList.contains('app__favourite-city')) {
		e.preventDefault();
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + e.target.textContent + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				weatherCityArray.forEach(item => {
					console.log(item);
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (1000 * 60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (1000 * 60)) % 60)} `;
			});
	}
	if (e.target.classList.contains('app__favourite-icon')) {
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (localStorage.getItem(key) === e.target.parentElement.textContent.trim() && key !== "inputStorage") {
				localStorage.removeItem(key);
				console.log(e.target.parentElement.remove());
			}
		}
	}
})