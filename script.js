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
const weatherIcon = document.querySelector('.weather__icon');
const weeklyForecast = document.querySelector('.app__weather-weekly')
const weeklyForecastDays = document.querySelectorAll('.app__weather-day');
const dayOfWeekArray = document.querySelectorAll('.weather-day__date');
const tempreratureOfDayOfWeek = document.querySelectorAll('.weather-day__temperature')
const feelsLikeTemperatureOfDayOfWeek = document.querySelectorAll('.weather-day__feelslike')
const weatherTypeArray = document.querySelectorAll('.weather-day__typeofweather')
const weatherImagesArray = document.querySelectorAll('.weather-day__img');
const inputForHourlyInformation = document.querySelector('.weather-checkbox__more');
const hourlyForecast = document.querySelector('.app__weather-hourly ');
const weatherHourlyArray = document.querySelectorAll('.weather-hour');
const dayOfHourArray = document.querySelectorAll('.weather-hour__date');
const tempreratureOfDayOfHour = document.querySelectorAll('.weather-hour__temperature')
const feelsLikeTemperatureOfDayOfHour = document.querySelectorAll('.weather-hour__feelslike')
const weatherTypeArrayHourly = document.querySelectorAll('.weather-hour__typeofweather');
const weatherHourTimeArray = document.querySelectorAll('.weather-hour__time');
const weatherImagesArrayHourly = document.querySelectorAll('.weather-hour__img');
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
			fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
				.then(response => response.json())
				.then(data => {
					console.log(data.hourly);
					for (let i = 0; i < data.daily.length; i++) {
						dayOfWeekArray[i].textContent = `${new Date(data.daily[i].dt * 1000).toDateString()}`;
						tempreratureOfDayOfWeek[i].textContent = `Temperature: ${Math.round(data.daily[i].temp.eve - 273)}°C`
						feelsLikeTemperatureOfDayOfWeek[i].textContent = `Feels like: ${Math.round(data.daily[i].feels_like.eve - 273)}°C`
						weatherTypeArray[i].textContent = `${data.daily[i].weather[0].main}`
						if (data.daily[i].weather[0].main === "Clouds" || data.daily[i].weather[0].main === "Clear") {
							weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
						}
						if (data.daily[i].weather[0].main === "Snow") {
							weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
						}
						dayOfHourArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getDate()} ${new Date(data.hourly[i].dt * 1000).toLocaleString('default', { month: 'long' })}`;
						weatherHourTimeArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getHours()}:00`;
						tempreratureOfDayOfHour[i].textContent = `Temperature: ${Math.round(data.hourly[i].temp - 273)}°C`
						feelsLikeTemperatureOfDayOfHour[i].textContent = `Feels like: ${Math.round(data.hourly[i].feels_like - 273)}°C`
						weatherTypeArrayHourly[i].textContent = `${data.hourly[i].weather[0].main}`
						if (data.hourly[i].weather[0].main === "Clouds" || data.hourly[i].weather[0].main === "Clear") {
							weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
						}
						else if (data.hourly[i].weather[0].main === "Snow") {
							weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
						}
						else if (data.hourly[i].weather[0].main === "Rain") {
							weatherImagesArrayHourly[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
						}
					}
				})
			console.log(data);
			if (data.message !== "city not found") {
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (60)) % 60)} `;
				if (data.weather[0].main === "Clouds" || data.weather[0].main === "Clear") {
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect width="78" height="59" fill="url(#pattern0)"/>
					<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0" transform="translate(0 -0.161017) scale(0.0104167 0.0137712)"/>
					</pattern>
					<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADzElEQVR4nO3cS2hcVRgH8F+uiQFtU2tspHShgqUuVTD4QHwgouDCKrqyKFLsQl2JbkUEQfBJuxGXpbgQcZEuBB9VEB/YuvUBigaLr7Q+YrFGjS7OBEbI2HncuefOne8Hf0KymHznm9eZOedcQgghhBBCCCGEEEIIIYTQdBO5C+jCNC7BZZjHediMs1s/p7CME1jEl/gE7+Mj/FZ9yaNvE+7Fm1jBP33mz9ZtPIitlY5gRF2Jl/G7/pveKSut276mstGMkItxUPlN75RDuKqSkdXcLA5gVXXNb89+bBn6KGvqRhyVp/HtWcLOIY+1VqbwnHyP+vWy2qppaojjroVpvCJ/wzvlDcwMbfSZzeBt+Zt8qhyWPl80ykZpYLmb220+aNXcCAVelb+pveZ1TA6hH5V7XP5m9punh9CPSt2mXrOdfjKyU9QZ9ZjnD5ofMVdybyqxV/7mlZX9Jfdm6C7FX/I3rqys4opSO9RS1nrAZulbxsuxQyr23JJuuy4O4frcRbTbhD14B3/L/yitIvOldG5AW/AkfpG/IVXnpRL617dJPISf5W9ErqxIS6GVOx/v9lhsU7N7wF727Cbj+XLTKa8N1s7e7JYWtnMPuk45gdMHaWq37jY+s5teU9p6cqfPATdjAaeV9Y8a5idp/9EX+FCaih8p68Z3GO+ZTr/5Co8ZcP/RpHSP5h7MKOcknpV2fPTskRoMoCn5Hrf30vw5Md0cRl7Q5W6L52tQbFOzIO0I6egsaYdx7kKbnHVnlUXr5y5sWO+eCaW5RXpzXtd78j9CxiV3tjd+Qpq3HjUahzWaYEn6rHWc9BJ0tWh+lc7Bo2u/FNKhiFCtPVqfmAvp6RCqNY37SXfAhXlrGVu7MDGBYzItswXzhQbtAh5B1xbS3DTkMV+Ig8w5bS+k1Z2Qx7ZCWlYLeWws8GnuKsZZIZ2HCnksF9Ku35gJ5fFtge+kE4yhep+tLciM3AmQhji89jX0LL7GmRmLGUfza8+AY3gxZyVjaBFHirY/PCVtPA3VOIDV9lX6ZWkz7g156hkrf+Auqef/MYWP5V+4bnr2drpnSAs0sUNueFmS1oX/107NOudbp9xxquavua8GxTYt+7pt/pp7xBGlsnJQn5e/uRW/1mAAo5wFnNFr49ttF7OjfrNPSRd+msLDYhd1t/lBD2+4vdiKZ6S15NyDrGNOSvP8oW/1mcUD0oLOqF8Vq4ws4gls66WJZW3KncN10uVqLsIF0kU9NqjoUHOFVqRn/zf4XFpLeUs6prqasa4QQgghhBBCCCGEEEIIIdTUv9Phye0plTHGAAAAAElFTkSuQmCC"/>
					</defs>
					</svg>
						`}
				else if (data.weather[0].main === "Fog" || data.weather[0].main === "Haze") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g id="Fog"><g><path d="m421 331h-330c-24.05 0-46.794-9.327-64.043-26.264-17.384-17.069-26.957-39.705-26.957-63.736s9.573-46.667 26.957-63.736c13.614-13.368 30.653-21.995 49.055-25.038-.008-.406-.012-.815-.012-1.226 0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.131 9.838 25.864 22.443 34.586 37.044 14.08-8.733 30.32-13.407 47.22-13.407 44.886 0 82.202 33.026 88.922 76.056 18.81 2.88 36.243 11.581 50.121 25.208 17.384 17.069 26.957 39.705 26.957 63.736s-9.573 46.667-26.957 63.736c-17.249 16.937-39.993 26.264-64.043 26.264zm-330-150c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.147 15.857-8.314-21.048c-13.69-34.651-46.481-57.042-83.544-57.042-49.626 0-90 40.374-90 90 0 3.548.557 7.358 1.146 11.391l2.687 18.609z"/></g><g><path d="m166 421c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g><g><path d="m166 481c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g></g></svg>`
				}
				else if (data.weather[0].main === "Rain") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>
`
				}
				else if (data.weather[0].main === "Snow") {
					weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z" /></svg>`
				}
			}
			else {
				alert("Try again! Probably you made a mistake");
				inputValue.value = "";
			}
		})
		.catch(() => {
			alert("Try again! Probably you made a mistake");
			inputValue.value = "";
		}
		);
})
// Trying to fetch data 
document.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
	fetch('http://api.openweathermap.org/data/2.5/weather?q=' + localStorage.getItem('inputStorage') + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
		.then(response => response.json())
		.then(data => {
			fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
				.then(response => response.json())
				.then(data => {
					console.log(data.daily);
					for (let i = 0; i < data.daily.length; i++) {
						dayOfWeekArray[i].textContent = `${new Date(data.daily[i].dt * 1000).toDateString()}`;
						tempreratureOfDayOfWeek[i].textContent = `Temperature: ${Math.round(data.daily[i].temp.eve - 273)}°C`
						feelsLikeTemperatureOfDayOfWeek[i].textContent = `Feels like: ${Math.round(data.daily[i].feels_like.eve - 273)}°C`
						weatherTypeArray[i].textContent = `${data.daily[i].weather[0].main}`
						if (data.daily[i].weather[0].main === "Clouds" || data.daily[i].weather[0].main === "Clear") {
							weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
						}
						else if (data.daily[i].weather[0].main === "Snow") {
							weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
						}
						else if (data.daily[i].weather[0].main === "Rain") {
							weatherImagesArray[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
						}
						dayOfHourArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getDate()} ${new Date(data.hourly[i].dt * 1000).toLocaleString('default', { month: 'long' })}`;
						weatherHourTimeArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getHours()}:00`;
						tempreratureOfDayOfHour[i].textContent = `Temperature: ${Math.round(data.hourly[i].temp - 273)}°C`
						feelsLikeTemperatureOfDayOfHour[i].textContent = `Feels like: ${Math.round(data.hourly[i].feels_like - 273)}°C`
						weatherTypeArrayHourly[i].textContent = `${data.hourly[i].weather[0].main}`
						if (data.hourly[i].weather[0].main === "Clouds" || data.hourly[i].weather[0].main === "Clear") {
							weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
						}
						else if (data.hourly[i].weather[0].main === "Snow") {
							weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
						}
						else if (data.hourly[i].weather[0].main === "Rain") {
							weatherImagesArrayHourly[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
						}
					}
				})
			if (data.message !== "city not found" || data.message !== "Nothing to geocode") {
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (60)) % 60)} `;
				if (data.weather[0].main === "Clouds" || data.weather[0].main === "Clear") {
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect width="78" height="59" fill="url(#pattern0)"/>
					<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0" transform="translate(0 -0.161017) scale(0.0104167 0.0137712)"/>
					</pattern>
					<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADzElEQVR4nO3cS2hcVRgH8F+uiQFtU2tspHShgqUuVTD4QHwgouDCKrqyKFLsQl2JbkUEQfBJuxGXpbgQcZEuBB9VEB/YuvUBigaLr7Q+YrFGjS7OBEbI2HncuefOne8Hf0KymHznm9eZOedcQgghhBBCCCGEEEIIIYTQdBO5C+jCNC7BZZjHediMs1s/p7CME1jEl/gE7+Mj/FZ9yaNvE+7Fm1jBP33mz9ZtPIitlY5gRF2Jl/G7/pveKSut276mstGMkItxUPlN75RDuKqSkdXcLA5gVXXNb89+bBn6KGvqRhyVp/HtWcLOIY+1VqbwnHyP+vWy2qppaojjroVpvCJ/wzvlDcwMbfSZzeBt+Zt8qhyWPl80ykZpYLmb220+aNXcCAVelb+pveZ1TA6hH5V7XP5m9punh9CPSt2mXrOdfjKyU9QZ9ZjnD5ofMVdybyqxV/7mlZX9Jfdm6C7FX/I3rqys4opSO9RS1nrAZulbxsuxQyr23JJuuy4O4frcRbTbhD14B3/L/yitIvOldG5AW/AkfpG/IVXnpRL617dJPISf5W9ErqxIS6GVOx/v9lhsU7N7wF727Cbj+XLTKa8N1s7e7JYWtnMPuk45gdMHaWq37jY+s5teU9p6cqfPATdjAaeV9Y8a5idp/9EX+FCaih8p68Z3GO+ZTr/5Co8ZcP/RpHSP5h7MKOcknpV2fPTskRoMoCn5Hrf30vw5Md0cRl7Q5W6L52tQbFOzIO0I6egsaYdx7kKbnHVnlUXr5y5sWO+eCaW5RXpzXtd78j9CxiV3tjd+Qpq3HjUahzWaYEn6rHWc9BJ0tWh+lc7Bo2u/FNKhiFCtPVqfmAvp6RCqNY37SXfAhXlrGVu7MDGBYzItswXzhQbtAh5B1xbS3DTkMV+Ig8w5bS+k1Z2Qx7ZCWlYLeWws8GnuKsZZIZ2HCnksF9Ku35gJ5fFtge+kE4yhep+tLciM3AmQhji89jX0LL7GmRmLGUfza8+AY3gxZyVjaBFHirY/PCVtPA3VOIDV9lX6ZWkz7g156hkrf+Auqef/MYWP5V+4bnr2drpnSAs0sUNueFmS1oX/107NOudbp9xxquavua8GxTYt+7pt/pp7xBGlsnJQn5e/uRW/1mAAo5wFnNFr49ttF7OjfrNPSRd+msLDYhd1t/lBD2+4vdiKZ6S15NyDrGNOSvP8oW/1mcUD0oLOqF8Vq4ws4gls66WJZW3KncN10uVqLsIF0kU9NqjoUHOFVqRn/zf4XFpLeUs6prqasa4QQgghhBBCCCGEEEIIIdTUv9Phye0plTHGAAAAAElFTkSuQmCC"/>
					</defs>
					</svg>
						`}
				else if (data.weather[0].main === "Fog" || data.weather[0].main === "Haze") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g id="Fog"><g><path d="m421 331h-330c-24.05 0-46.794-9.327-64.043-26.264-17.384-17.069-26.957-39.705-26.957-63.736s9.573-46.667 26.957-63.736c13.614-13.368 30.653-21.995 49.055-25.038-.008-.406-.012-.815-.012-1.226 0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.131 9.838 25.864 22.443 34.586 37.044 14.08-8.733 30.32-13.407 47.22-13.407 44.886 0 82.202 33.026 88.922 76.056 18.81 2.88 36.243 11.581 50.121 25.208 17.384 17.069 26.957 39.705 26.957 63.736s-9.573 46.667-26.957 63.736c-17.249 16.937-39.993 26.264-64.043 26.264zm-330-150c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.147 15.857-8.314-21.048c-13.69-34.651-46.481-57.042-83.544-57.042-49.626 0-90 40.374-90 90 0 3.548.557 7.358 1.146 11.391l2.687 18.609z"/></g><g><path d="m166 421c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g><g><path d="m166 481c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g></g></svg>`
				}
				else if (data.weather[0].main === "Rain") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>
`
				}
				else if (data.weather[0].main === "Snow") {
					weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z" /></svg>`
				}
			}
			else {
				alert("Try again! Probably you made a mistake");
				inputValue.value = "";
				localStorage.removeItem('inputStorage');
			}
		})
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
	localStorage.removeItem('inputStorage');
	localStorage.setItem('inputStorage', e.target.textContent.trim());
	if (e.target.classList.contains('app__favourite-city')) {
		e.preventDefault();
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + e.target.textContent.trim() + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
					.then(response => response.json())
					.then(data => {
						console.log(data.daily);
						for (let i = 0; i < data.daily.length; i++) {
							dayOfWeekArray[i].textContent = `${new Date(data.daily[i].dt * 1000).toDateString()}`;
							tempreratureOfDayOfWeek[i].textContent = `Temperature: ${Math.round(data.daily[i].temp.eve - 273)}°C`
							feelsLikeTemperatureOfDayOfWeek[i].textContent = `Feels like: ${Math.round(data.daily[i].feels_like.eve - 273)}°C`
							weatherTypeArray[i].textContent = `${data.daily[i].weather[0].main}`
							if (data.daily[i].weather[0].main === "Clouds" || data.daily[i].weather[0].main === "Clear") {
								weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
							}
							else if (data.daily[i].weather[0].main === "Snow") {
								weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
							}
							else if (data.daily[i].weather[0].main === "Rain") {
								weatherImagesArray[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
							}
							dayOfHourArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getDate()} ${new Date(data.hourly[i].dt * 1000).toLocaleString('default', { month: 'long' })}`;
							weatherHourTimeArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getHours()}:00`;
							tempreratureOfDayOfHour[i].textContent = `Temperature: ${Math.round(data.hourly[i].temp - 273)}°C`
							feelsLikeTemperatureOfDayOfHour[i].textContent = `Feels like: ${Math.round(data.hourly[i].feels_like - 273)}°C`
							weatherTypeArrayHourly[i].textContent = `${data.hourly[i].weather[0].main}`
							if (data.hourly[i].weather[0].main === "Clouds" || data.hourly[i].weather[0].main === "Clear") {
								weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
							}
							else if (data.hourly[i].weather[0].main === "Snow") {
								weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
							}
							else if (data.hourly[i].weather[0].main === "Rain") {
								weatherImagesArrayHourly[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
							}
						}
					})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (60)) % 60)} `;

				if (data.weather[0].main === "Clouds" || data.weather[0].main === "Clear") {
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect width="78" height="59" fill="url(#pattern0)"/>
					<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0" transform="translate(0 -0.161017) scale(0.0104167 0.0137712)"/>
					</pattern>
					<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADzElEQVR4nO3cS2hcVRgH8F+uiQFtU2tspHShgqUuVTD4QHwgouDCKrqyKFLsQl2JbkUEQfBJuxGXpbgQcZEuBB9VEB/YuvUBigaLr7Q+YrFGjS7OBEbI2HncuefOne8Hf0KymHznm9eZOedcQgghhBBCCCGEEEIIIYTQdBO5C+jCNC7BZZjHediMs1s/p7CME1jEl/gE7+Mj/FZ9yaNvE+7Fm1jBP33mz9ZtPIitlY5gRF2Jl/G7/pveKSut276mstGMkItxUPlN75RDuKqSkdXcLA5gVXXNb89+bBn6KGvqRhyVp/HtWcLOIY+1VqbwnHyP+vWy2qppaojjroVpvCJ/wzvlDcwMbfSZzeBt+Zt8qhyWPl80ykZpYLmb220+aNXcCAVelb+pveZ1TA6hH5V7XP5m9punh9CPSt2mXrOdfjKyU9QZ9ZjnD5ofMVdybyqxV/7mlZX9Jfdm6C7FX/I3rqys4opSO9RS1nrAZulbxsuxQyr23JJuuy4O4frcRbTbhD14B3/L/yitIvOldG5AW/AkfpG/IVXnpRL617dJPISf5W9ErqxIS6GVOx/v9lhsU7N7wF727Cbj+XLTKa8N1s7e7JYWtnMPuk45gdMHaWq37jY+s5teU9p6cqfPATdjAaeV9Y8a5idp/9EX+FCaih8p68Z3GO+ZTr/5Co8ZcP/RpHSP5h7MKOcknpV2fPTskRoMoCn5Hrf30vw5Md0cRl7Q5W6L52tQbFOzIO0I6egsaYdx7kKbnHVnlUXr5y5sWO+eCaW5RXpzXtd78j9CxiV3tjd+Qpq3HjUahzWaYEn6rHWc9BJ0tWh+lc7Bo2u/FNKhiFCtPVqfmAvp6RCqNY37SXfAhXlrGVu7MDGBYzItswXzhQbtAh5B1xbS3DTkMV+Ig8w5bS+k1Z2Qx7ZCWlYLeWws8GnuKsZZIZ2HCnksF9Ku35gJ5fFtge+kE4yhep+tLciM3AmQhji89jX0LL7GmRmLGUfza8+AY3gxZyVjaBFHirY/PCVtPA3VOIDV9lX6ZWkz7g156hkrf+Auqef/MYWP5V+4bnr2drpnSAs0sUNueFmS1oX/107NOudbp9xxquavua8GxTYt+7pt/pp7xBGlsnJQn5e/uRW/1mAAo5wFnNFr49ttF7OjfrNPSRd+msLDYhd1t/lBD2+4vdiKZ6S15NyDrGNOSvP8oW/1mcUD0oLOqF8Vq4ws4gls66WJZW3KncN10uVqLsIF0kU9NqjoUHOFVqRn/zf4XFpLeUs6prqasa4QQgghhBBCCCGEEEIIIdTUv9Phye0plTHGAAAAAElFTkSuQmCC"/>
					</defs>
					</svg>
						`}
				else if (data.weather[0].main === "Fog" || data.weather[0].main === "Haze") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g id="Fog"><g><path d="m421 331h-330c-24.05 0-46.794-9.327-64.043-26.264-17.384-17.069-26.957-39.705-26.957-63.736s9.573-46.667 26.957-63.736c13.614-13.368 30.653-21.995 49.055-25.038-.008-.406-.012-.815-.012-1.226 0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.131 9.838 25.864 22.443 34.586 37.044 14.08-8.733 30.32-13.407 47.22-13.407 44.886 0 82.202 33.026 88.922 76.056 18.81 2.88 36.243 11.581 50.121 25.208 17.384 17.069 26.957 39.705 26.957 63.736s-9.573 46.667-26.957 63.736c-17.249 16.937-39.993 26.264-64.043 26.264zm-330-150c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.147 15.857-8.314-21.048c-13.69-34.651-46.481-57.042-83.544-57.042-49.626 0-90 40.374-90 90 0 3.548.557 7.358 1.146 11.391l2.687 18.609z"/></g><g><path d="m166 421c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g><g><path d="m166 481c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g></g></svg>`
				}
				else if (data.weather[0].main === "Rain") {
					weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>
`
				}
				else if (data.weather[0].main === "Snow") {
					weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z" /></svg>`
				}
			});
	}
	if (e.target.classList.contains('app__favourite-icon')) {
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (localStorage.getItem(key) === e.target.parentElement.textContent.trim() && key !== "inputStorage") {
				localStorage.removeItem(key);
				e.target.parentElement.remove();
			}
		}
	}
})
inputForHourlyInformation.addEventListener('click', () => {
	if (inputForHourlyInformation.checked) {
		weeklyForecast.classList.toggle('app__weather-hide');
		hourlyForecast.classList.toggle('app__weather-hide');
	} else {
		weeklyForecast.classList.toggle('app__weather-hide');
		hourlyForecast.classList.toggle('app__weather-hide');
	}
})
// localStorage for last selected city
btn.addEventListener('click', () => {
	if (inputValue.value) {
		localStorage.setItem('inputStorage', inputValue.value);
	}
})

const debounce = (fn, ms) => {
	let timeout;
	return function () {
		const fnCall = () => { fn.apply(this, arguments) }
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms)
	};
}

function onChange(e) {
	if (e.target.value.length > 2) {
		localStorage.removeItem('inputStorage');
		localStorage.setItem('inputStorage', e.target.value.trim());
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + e.target.value + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
					.then(response => response.json())
					.then(data => {
						console.log(data.daily);
						for (let i = 0; i < data.daily.length; i++) {
							dayOfWeekArray[i].textContent = `${new Date(data.daily[i].dt * 1000).toDateString()}`;
							tempreratureOfDayOfWeek[i].textContent = `Temperature: ${Math.round(data.daily[i].temp.eve - 273)}°C`
							feelsLikeTemperatureOfDayOfWeek[i].textContent = `Feels like: ${Math.round(data.daily[i].feels_like.eve - 273)}°C`
							weatherTypeArray[i].textContent = `${data.daily[i].weather[0].main}`
							if (data.daily[i].weather[0].main === "Clouds" || data.daily[i].weather[0].main === "Clear") {
								weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
							}
							else if (data.daily[i].weather[0].main === "Snow") {
								weatherImagesArray[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
							}
							else if (data.daily[i].weather[0].main === "Rain") {
								weatherImagesArray[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
							}
							dayOfHourArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getDate()} ${new Date(data.hourly[i].dt * 1000).toLocaleString('default', { month: 'long' })}`;
							weatherHourTimeArray[i].textContent = `${new Date(data.hourly[i].dt * 1000).getHours()}:00`;
							tempreratureOfDayOfHour[i].textContent = `Temperature: ${Math.round(data.hourly[i].temp - 273)}°C`
							feelsLikeTemperatureOfDayOfHour[i].textContent = `Feels like: ${Math.round(data.hourly[i].feels_like - 273)}°C`
							weatherTypeArrayHourly[i].textContent = `${data.hourly[i].weather[0].main}`
							if (data.hourly[i].weather[0].main === "Clouds" || data.hourly[i].weather[0].main === "Clear") {
								weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>`
							}
							else if (data.hourly[i].weather[0].main === "Snow") {
								weatherImagesArrayHourly[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>`
							}
							else if (data.hourly[i].weather[0].main === "Rain") {
								weatherImagesArrayHourly[i].innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>`
							}
						}
					})
				if (data.message !== "city not found" || data.message !== "Nothing to geocode") {
					weatherCityArray.forEach(item => {
						item.textContent = `${data.name}`
					})
					weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
					weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
					weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
					weather.textContent = `Weather: ${data.weather[0].main}`;
					weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
					weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (60)) % 60)} `;
					if (data.weather[0].main === "Clouds" || data.weather[0].main === "Clear") {
						weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect width="78" height="59" fill="url(#pattern0)"/>
					<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0" transform="translate(0 -0.161017) scale(0.0104167 0.0137712)"/>
					</pattern>
					<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADzElEQVR4nO3cS2hcVRgH8F+uiQFtU2tspHShgqUuVTD4QHwgouDCKrqyKFLsQl2JbkUEQfBJuxGXpbgQcZEuBB9VEB/YuvUBigaLr7Q+YrFGjS7OBEbI2HncuefOne8Hf0KymHznm9eZOedcQgghhBBCCCGEEEIIIYTQdBO5C+jCNC7BZZjHediMs1s/p7CME1jEl/gE7+Mj/FZ9yaNvE+7Fm1jBP33mz9ZtPIitlY5gRF2Jl/G7/pveKSut276mstGMkItxUPlN75RDuKqSkdXcLA5gVXXNb89+bBn6KGvqRhyVp/HtWcLOIY+1VqbwnHyP+vWy2qppaojjroVpvCJ/wzvlDcwMbfSZzeBt+Zt8qhyWPl80ykZpYLmb220+aNXcCAVelb+pveZ1TA6hH5V7XP5m9punh9CPSt2mXrOdfjKyU9QZ9ZjnD5ofMVdybyqxV/7mlZX9Jfdm6C7FX/I3rqys4opSO9RS1nrAZulbxsuxQyr23JJuuy4O4frcRbTbhD14B3/L/yitIvOldG5AW/AkfpG/IVXnpRL617dJPISf5W9ErqxIS6GVOx/v9lhsU7N7wF727Cbj+XLTKa8N1s7e7JYWtnMPuk45gdMHaWq37jY+s5teU9p6cqfPATdjAaeV9Y8a5idp/9EX+FCaih8p68Z3GO+ZTr/5Co8ZcP/RpHSP5h7MKOcknpV2fPTskRoMoCn5Hrf30vw5Md0cRl7Q5W6L52tQbFOzIO0I6egsaYdx7kKbnHVnlUXr5y5sWO+eCaW5RXpzXtd78j9CxiV3tjd+Qpq3HjUahzWaYEn6rHWc9BJ0tWh+lc7Bo2u/FNKhiFCtPVqfmAvp6RCqNY37SXfAhXlrGVu7MDGBYzItswXzhQbtAh5B1xbS3DTkMV+Ig8w5bS+k1Z2Qx7ZCWlYLeWws8GnuKsZZIZ2HCnksF9Ku35gJ5fFtge+kE4yhep+tLciM3AmQhji89jX0LL7GmRmLGUfza8+AY3gxZyVjaBFHirY/PCVtPA3VOIDV9lX6ZWkz7g156hkrf+Auqef/MYWP5V+4bnr2drpnSAs0sUNueFmS1oX/107NOudbp9xxquavua8GxTYt+7pt/pp7xBGlsnJQn5e/uRW/1mAAo5wFnNFr49ttF7OjfrNPSRd+msLDYhd1t/lBD2+4vdiKZ6S15NyDrGNOSvP8oW/1mcUD0oLOqF8Vq4ws4gls66WJZW3KncN10uVqLsIF0kU9NqjoUHOFVqRn/zf4XFpLeUs6prqasa4QQgghhBBCCCGEEEIIIdTUv9Phye0plTHGAAAAAElFTkSuQmCC"/>
					</defs>
					</svg>
						`}
					else if (data.weather[0].main === "Fog" || data.weather[0].main === "Haze") {
						weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g id="Fog"><g><path d="m421 331h-330c-24.05 0-46.794-9.327-64.043-26.264-17.384-17.069-26.957-39.705-26.957-63.736s9.573-46.667 26.957-63.736c13.614-13.368 30.653-21.995 49.055-25.038-.008-.406-.012-.815-.012-1.226 0-66.168 53.832-120 120-120 24.538 0 48.119 7.387 68.194 21.363 14.131 9.838 25.864 22.443 34.586 37.044 14.08-8.733 30.32-13.407 47.22-13.407 44.886 0 82.202 33.026 88.922 76.056 18.81 2.88 36.243 11.581 50.121 25.208 17.384 17.069 26.957 39.705 26.957 63.736s-9.573 46.667-26.957 63.736c-17.249 16.937-39.993 26.264-64.043 26.264zm-330-150c-33.636 0-61 26.916-61 60s27.364 60 61 60h330c33.636 0 61-26.916 61-60s-27.364-60-61-60h-15v-15c0-33.084-26.916-60-60-60-15.766 0-30.68 6.12-41.995 17.233l-16.147 15.857-8.314-21.048c-13.69-34.651-46.481-57.042-83.544-57.042-49.626 0-90 40.374-90 90 0 3.548.557 7.358 1.146 11.391l2.687 18.609z"/></g><g><path d="m166 421c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g><g><path d="m166 481c-46.895 0-92.812-15.126-94.743-15.77l-14.23-4.743 9.486-28.46 14.223 4.74c.428.142 43.356 14.233 85.264 14.233s84.836-14.091 85.265-14.233c1.923-.641 47.84-15.767 94.735-15.767s92.812 15.126 94.743 15.77l14.23 4.743-9.486 28.46-14.23-4.743c-.421-.139-43.349-14.23-85.257-14.23s-84.836 14.091-85.265 14.233c-1.923.641-47.84 15.767-94.735 15.767z"/></g></g></svg>`
					}
					else if (data.weather[0].main === "Rain") {
						weatherIcon.innerHTML = `<svg id="Capa_1" enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m426.477 110.67c-15.066-29.891-37.864-56.61-64.916-75.91-64.926-46.321-146.121-46.374-211.121 0-27.034 19.287-49.82 45.985-64.912 75.909-47.65 5.865-85.528 46.387-85.528 95.78 0 53.234 43.758 96.542 97.543 96.542h316.914c53.785 0 97.543-43.309 97.543-96.542 0-49.366-37.854-89.91-85.523-95.779zm-12.02 162.322c-18.892 0-302.843 0-316.914 0-37.243 0-67.543-29.851-67.543-66.543 0-35.695 29.486-65.523 65.729-66.492 5.762-.154 10.938-3.622 13.297-8.881 27.124-60.459 86.188-101.079 146.974-101.079 53.402 0 105.471 31.354 135.711 79.932-.121 0-63.816-.021-63.711-.021-8.281 0-14.997 6.713-15 14.995-.003 8.284 6.711 15.002 14.995 15.005 66.054.022 86.968.017 88.276.051 36.243.967 65.729 30.795 65.729 66.49 0 36.692-30.3 66.543-67.543 66.543z"/><path d="m133.571 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.941 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.077-7.692-.664-16.421-8.356-19.498z"/><path d="m261.572 338.069c-7.694-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/><path d="m181.453 442.023c-7.72-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m325.453 442.023c-7.719-3.012-16.415.803-19.427 8.521l-16 41c-3.85 9.865 3.477 20.457 13.97 20.457 5.999 0 11.665-3.625 13.978-9.551l16-41c3.012-7.718-.803-16.415-8.521-19.427z"/><path d="m389.572 338.069c-7.693-3.079-16.422.664-19.498 8.356l-16 40c-3.942 9.853 3.339 20.575 13.922 20.575 5.953 0 11.586-3.568 13.932-9.433l16-40c3.076-7.692-.665-16.421-8.356-19.498z"/></g></svg>
`
					}
					else if (data.weather[0].main === "Snow") {
						weatherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z" /></svg>`
					}
				}
				else {
					alert("Try again! Probably you made a mistake");
					inputValue.value = "";
					localStorage.removeItem('inputStorage');
				}
			});
	}
}

onChange = debounce(onChange, 2000);

inputValue.addEventListener('keyup', onChange);