import { infoTabs, tabsSection, allTabs, weatherFeelsLike, weatherCityDetails, weatherInformation, weatherCity, weather, weatherSunrise, weatherSunset, weatherCityFavourite, inputValue, btn, favouriteCity, addedLocations, weatherDigitsValue, weatherIcon, dailyForecast, hourlyForecast, weatherSwitcher, set } from './UiElements.js';
//Functions
export const mainInfo = (requestTarget) => {
	fetch('http://api.openweathermap.org/data/2.5/weather?q=' + requestTarget + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
		.then(response => response.json())
		.then(data => {
			const { name, weather: { 0: { main: description } }, main: { temp, feels_like }, sys: { sunrise, sunset }, coord: { lon, lat }
			} = data;
			weatherDigitsValue.textContent = returnTemperature(temp);
			weatherIcon.src = `images/${description}.svg`;
			weatherCity.textContent = name;
			weatherCityDetails.textContent = name;
			weatherInformation.textContent = `Temperature: ${returnTemperature(temp)}`;
			weatherFeelsLike.textContent = `Feels like: ${returnTemperature(feels_like)}`;
			weather.textContent = `Weather: ${description}`;
			weatherSunrise.textContent = `Sunrise: ${returnSunInfo(sunrise)}`;
			weatherSunset.textContent = `Sunset: ${returnSunInfo(sunset)}`;
			showAdditionalInfo(lon, lat);
		});
}
const returnTemperature = (temp) => {
	return `${Math.round(temp - 273)}°`
}
const returnSunInfo = (s) => {
	return `${Math.floor((s / (60 * 60)) % 24)}:${Math.floor((s / (60)) % 60)}`;
}

const showAdditionalInfo = (lon, lat) => {
	fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
		.then(response => response.json())
		.then(data => {
			const { hourly, daily } = data;
			showWeatherHourly(hourly);
			showWeatherDaily(daily);
		})
}

const showWeatherHourly = (arr) => {
	arr.forEach(item => {
		const { dt, feels_like, weather: { 0: { main } }, temp } = item;
		let hourlyForecastDiv = document.createElement('div');
		let hourlyForecastDivTop = document.createElement('div');
		let hourlyDate = document.createElement('p');
		let hourlyTime = document.createElement('p');
		let hourlyForecastDivBottom = document.createElement('div');
		let hourlyForecastDigits = document.createElement('div');
		let hourlyForecastInformation = document.createElement('div');
		let hourlyForecastTemperature = document.createElement('p');
		let hourlyForecastFeelsLike = document.createElement('p');
		let hourlyForecastTypeOfWeather = document.createElement('p');
		let hourlyForecastImg = document.createElement('img');
		hourlyForecastDiv.classList.add('weather-hour')
		hourlyForecastDivTop.classList.add('weather-hour__top')
		hourlyForecastDivBottom.classList.add('weather-hour__bottom')
		hourlyForecastInformation.classList.add('weather-hour__information')
		hourlyForecastImg.src = `images/${main}.svg`;
		hourlyDate.textContent = `${new Date(dt * 1000).getDate()} ${new Date(dt * 1000).toLocaleString('default', { month: 'long' })}`;
		hourlyTime.textContent = `${new Date(dt * 1000).getHours()}:00`;
		hourlyForecastTemperature.textContent = `Temperature: ` + returnTemperature(temp);
		hourlyForecastFeelsLike.textContent = `Feels Like: ` + returnTemperature(feels_like);
		hourlyForecastTypeOfWeather.textContent = main;
		hourlyForecast.append(hourlyForecastDiv);
		hourlyForecastDiv.appendChild(hourlyForecastDivTop);
		hourlyForecastDiv.appendChild(hourlyForecastDivBottom);
		hourlyForecastDivTop.appendChild(hourlyDate);
		hourlyForecastDivTop.appendChild(hourlyTime);
		hourlyForecastDivBottom.appendChild(hourlyForecastDigits);
		hourlyForecastDivBottom.appendChild(hourlyForecastInformation);
		hourlyForecastDigits.appendChild(hourlyForecastTemperature);
		hourlyForecastDigits.appendChild(hourlyForecastFeelsLike);
		hourlyForecastInformation.appendChild(hourlyForecastTypeOfWeather);
		hourlyForecastInformation.appendChild(hourlyForecastImg);
	})
}
const showWeatherDaily = (arr) => {
	arr.forEach(item => {
		const { dt, feels_like: { eve: eve_feels }, weather: { 0: { main } }, temp: { eve: eve_temp } } = item;
		let dailyForecastDiv = document.createElement('div');
		let dailyForecastDivTop = document.createElement('div');
		let dailyDate = document.createElement('p');
		let dailyTime = document.createElement('p');
		let dailyForecastDivBottom = document.createElement('div');
		let dailyForecastDigits = document.createElement('div');
		let dailyForecastInformation = document.createElement('div');
		let dailyForecastTemperature = document.createElement('p');
		let dailyForecastFeelsLike = document.createElement('p');
		let dailyForecastTypeOfWeather = document.createElement('p');
		let dailyForecastImg = document.createElement('img');
		dailyForecastDiv.classList.add('weather-day')
		dailyForecastDivTop.classList.add('weather-day__top')
		dailyForecastDivBottom.classList.add('weather-day__bottom')
		dailyForecastInformation.classList.add('weather-day__information')
		dailyForecastImg.src = `images/${main}.svg`;
		dailyDate.textContent = `${new Date(dt * 1000).getDate()} ${new Date(dt * 1000).toLocaleString('default', { month: 'long' })}`;
		dailyTime.textContent = `${new Date(dt * 1000).getHours()}:00`;
		dailyForecastTemperature.textContent = `Temperature: ` + returnTemperature(eve_temp);
		dailyForecastFeelsLike.textContent = `Feels Like: ` + returnTemperature(eve_feels);
		dailyForecastTypeOfWeather.textContent = main;
		dailyForecast.append(dailyForecastDiv);
		dailyForecastDiv.appendChild(dailyForecastDivTop);
		dailyForecastDiv.appendChild(dailyForecastDivBottom);
		dailyForecastDivTop.appendChild(dailyDate);
		dailyForecastDivTop.appendChild(dailyTime);
		dailyForecastDivBottom.appendChild(dailyForecastDigits);
		dailyForecastDivBottom.appendChild(dailyForecastInformation);
		dailyForecastDigits.appendChild(dailyForecastTemperature);
		dailyForecastDigits.appendChild(dailyForecastFeelsLike);
		dailyForecastInformation.appendChild(dailyForecastTypeOfWeather);
		dailyForecastInformation.appendChild(dailyForecastImg);
	})
}
// Requiest from favourite city
const debounce = (fn, ms) => {
	let timeout;
	return function () {
		const fnCall = () => { fn.apply(this, arguments) }
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms)
	};
}

export let onChange = (e) => {
	if (e.target.value.length > 2) {
		localStorage.removeItem('inputStorage');
		localStorage.setItem('inputStorage', e.target.value.trim());
		mainInfo(e.target.value);
	}
}

onChange = debounce(onChange, 2000);