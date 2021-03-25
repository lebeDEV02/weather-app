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
			fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
				.then(response => response.json())
				.then(data => {
					console.log(data.daily);
					// for (let i = 0; i < data.daily.length; i++) {
					// 	weeklyForecastDays[i].textContent = `${data.daily[i].clouds}`
					// }
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
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (1000 * 60)) % 60)} `;
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
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="31" height="31" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0" transform="scale(0.0104167)"/>
</pattern>
<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE4ElEQVR4nO2dy2tdVRSHv95qxbYxfUl8VCdFKLYWB9YOVCQVEUHJQAU7EEEnqUWSzkQcdGCp4kRDkSL4B6RVCyKIEzUKVqWFkqiIopAiYrW1PgJtIW0drHvrye099zz23mftc7I++EHIzX6s3zrnnn3WeQQMwzAMwzAMwzAMwzCMxcIS7Qnk4DrgPuBOYAtwK3ALsBxYBVwA/gXmgF+An4Hvga+AL9ufGQVZA4wCnwPzwKWSmgc+A8aB9ZVGUFO2A+8C5yhver9kHAYerCyaGnEHcBD/pqfpCJLsRc8QMAlcpDrzkzoI3Bg8ykh5GPgNHeOTOgPsCBxrVFwDvIHeVp+mN9tzazTLgQ/RNztNnwCDwaJXZhBZVmqbnKXjwPWBPFBjEDiGvrl5dYwG7Qkt4AP0TS2qKWBZAD8qZx/6ZpbV/gB+VMoTxLfaKaraLlFXAyfRN9BVZ4CbPXtTCQfQN8+XDnn2Jjh3IWVibeN86l6vDrXxdT3gBmAY2AZsRBKw1lPfsfAFcI/2JJKsBcaQCx/aW2dVut+Lc47chNRy5tA3pGod9uBfaZYBLyKX+LSN0NI8SuXrjcDRgpNtqp539LIwIyzurb5bU252FmMXzVtOuuo8UlYPzij1LyOE0gMOvi4g7TxgBHgPqWQaV/Ir8B3wE7IMn0LuR/LCJuw7v4yOA7uRm8VKczX1unASo/4B9gArC3oPwEsRBNAUnQAeKmL+EJI97Yk3SReBV8h5LN0fwYSbqknk6z2VNSzO2k6Veocee0LnF08DK3plxvDGY8BraR/GXFKeRsrem8i3kaxo/+0YMBPB/Ls10j3h9cR5xnsO2InbyWALeA4pH2jH09HvyPXyy+yIYFK9zB8u4nQG24krCa8nJzcRwYS6NVrQ4DzsiiCu5AZ2+brCRxFMKKlpwtSglgLfRBBfRy/TDnRDgGBdeBs5JvnmQrvvWHiKdjH0NPpbQ1K3Bwx6cwTxJXV3CxgIGHAZTgTsezZg32UYbiGZCMkM8pjoZqRCuCRDcxn9ZW1V/YjtmeGtAH8SZvfysY7vhUsC8rSvUtMAPwbo2Pc6PkmTEnCqhcdLaQnGkeetjP4MtJD3KvhkBnjLc58+yToGrUSOV+PIeUNILgE8id/daqyCSbt8BRUhdC3pD5B7PX0W40Ku48kxfghC1ZKmOwMc8dhp6PMKjQRAmFrSoc4ScdLjRLPW2loGunIA+NZzn0c7P6zC3yXJLLTbu7A7x/hFtDXZua+ydBba7V3wWUuapeskdQg/d8Rlod3ehYEc4+fV3l4DvOCh4yya3j6PziKrzyu4CvdbE7UN0G6fRxP9BrgNeTjZElCufZZOkeMJ0kcp/7ZC1wDq3j5Lj+cYA4BnKHeG7BpA3dv3U9+vnl48S/E9wTWAurdP0/vIMbYwjwB/FRjINYC6t08z/9ocfaeyAfg652CuAdS9fbcmKLnld7MUqZFnPUPgGkDd23d0kgIH3CKsA14F/k4ZOIvYDXRtfxbZ6lendeCLAeQWwk9ZeKDOInYDy7afRe5263mGm4av19WsQ14xvw0pZ/QjK8isOWm3P8//r8r/ASkpf4xUEArf0afx/wNcDaj7+AuwB7GVsQQoYwlQxhKgjCVAGUuAMpYAZSwBylgClLEEKGMJMAzDMAzDMAzDqJj/ABal5BnX61RcAAAAAElFTkSuQmCC"/>
</defs>
</svg>
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
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (1000 * 60)) % 60)} `;
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
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="31" height="31" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0" transform="scale(0.0104167)"/>
</pattern>
<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE4ElEQVR4nO2dy2tdVRSHv95qxbYxfUl8VCdFKLYWB9YOVCQVEUHJQAU7EEEnqUWSzkQcdGCp4kRDkSL4B6RVCyKIEzUKVqWFkqiIopAiYrW1PgJtIW0drHvrye099zz23mftc7I++EHIzX6s3zrnnn3WeQQMwzAMwzAMwzAMwzCMxcIS7Qnk4DrgPuBOYAtwK3ALsBxYBVwA/gXmgF+An4Hvga+AL9ufGQVZA4wCnwPzwKWSmgc+A8aB9ZVGUFO2A+8C5yhver9kHAYerCyaGnEHcBD/pqfpCJLsRc8QMAlcpDrzkzoI3Bg8ykh5GPgNHeOTOgPsCBxrVFwDvIHeVp+mN9tzazTLgQ/RNztNnwCDwaJXZhBZVmqbnKXjwPWBPFBjEDiGvrl5dYwG7Qkt4AP0TS2qKWBZAD8qZx/6ZpbV/gB+VMoTxLfaKaraLlFXAyfRN9BVZ4CbPXtTCQfQN8+XDnn2Jjh3IWVibeN86l6vDrXxdT3gBmAY2AZsRBKw1lPfsfAFcI/2JJKsBcaQCx/aW2dVut+Lc47chNRy5tA3pGod9uBfaZYBLyKX+LSN0NI8SuXrjcDRgpNtqp539LIwIyzurb5bU252FmMXzVtOuuo8UlYPzij1LyOE0gMOvi4g7TxgBHgPqWQaV/Ir8B3wE7IMn0LuR/LCJuw7v4yOA7uRm8VKczX1unASo/4B9gArC3oPwEsRBNAUnQAeKmL+EJI97Yk3SReBV8h5LN0fwYSbqknk6z2VNSzO2k6Veocee0LnF08DK3plxvDGY8BraR/GXFKeRsrem8i3kaxo/+0YMBPB/Ls10j3h9cR5xnsO2InbyWALeA4pH2jH09HvyPXyy+yIYFK9zB8u4nQG24krCa8nJzcRwYS6NVrQ4DzsiiCu5AZ2+brCRxFMKKlpwtSglgLfRBBfRy/TDnRDgGBdeBs5JvnmQrvvWHiKdjH0NPpbQ1K3Bwx6cwTxJXV3CxgIGHAZTgTsezZg32UYbiGZCMkM8pjoZqRCuCRDcxn9ZW1V/YjtmeGtAH8SZvfysY7vhUsC8rSvUtMAPwbo2Pc6PkmTEnCqhcdLaQnGkeetjP4MtJD3KvhkBnjLc58+yToGrUSOV+PIeUNILgE8id/daqyCSbt8BRUhdC3pD5B7PX0W40Ku48kxfghC1ZKmOwMc8dhp6PMKjQRAmFrSoc4ScdLjRLPW2loGunIA+NZzn0c7P6zC3yXJLLTbu7A7x/hFtDXZua+ydBba7V3wWUuapeskdQg/d8Rlod3ehYEc4+fV3l4DvOCh4yya3j6PziKrzyu4CvdbE7UN0G6fRxP9BrgNeTjZElCufZZOkeMJ0kcp/7ZC1wDq3j5Lj+cYA4BnKHeG7BpA3dv3U9+vnl48S/E9wTWAurdP0/vIMbYwjwB/FRjINYC6t08z/9ocfaeyAfg652CuAdS9fbcmKLnld7MUqZFnPUPgGkDd23d0kgIH3CKsA14F/k4ZOIvYDXRtfxbZ6lendeCLAeQWwk9ZeKDOInYDy7afRe5263mGm4av19WsQ14xvw0pZ/QjK8isOWm3P8//r8r/ASkpf4xUEArf0afx/wNcDaj7+AuwB7GVsQQoYwlQxhKgjCVAGUuAMpYAZSwBylgClLEEKGMJMAzDMAzDMAzDqJj/ABal5BnX61RcAAAAAElFTkSuQmCC"/>
</defs>
</svg>
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
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + e.target.textContent.trim() + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				weatherCityArray.forEach(item => {
					item.textContent = `${data.name}`
				})
				weatherDigitsValue.textContent = `${Math.round(data.main.temp) - 273}°C`
				weatherInformation.textContent = `Temperature: ${Math.round(data.main.temp - 273)}°C`;
				weatherFeelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like - 273)}°C`;
				weather.textContent = `Weather: ${data.weather[0].main}`;
				weatherSunrise.textContent = `Sunrise: ${Math.floor((data.sys.sunrise / (60 * 60)) % 24)}:${Math.floor((data.sys.sunrise / (60)) % 60)} `;
				weatherSunset.textContent = `Sunset: ${Math.floor((data.sys.sunset / (1000 * 60 * 60)) % 24)}:${Math.floor((data.sys.sunset / (1000 * 60)) % 60)} `;
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
					weatherIcon.innerHTML = `<svg width="100" height="100" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="31" height="31" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0" transform="scale(0.0104167)"/>
</pattern>
<image id="image0" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE4ElEQVR4nO2dy2tdVRSHv95qxbYxfUl8VCdFKLYWB9YOVCQVEUHJQAU7EEEnqUWSzkQcdGCp4kRDkSL4B6RVCyKIEzUKVqWFkqiIopAiYrW1PgJtIW0drHvrye099zz23mftc7I++EHIzX6s3zrnnn3WeQQMwzAMwzAMwzAMwzCMxcIS7Qnk4DrgPuBOYAtwK3ALsBxYBVwA/gXmgF+An4Hvga+AL9ufGQVZA4wCnwPzwKWSmgc+A8aB9ZVGUFO2A+8C5yhver9kHAYerCyaGnEHcBD/pqfpCJLsRc8QMAlcpDrzkzoI3Bg8ykh5GPgNHeOTOgPsCBxrVFwDvIHeVp+mN9tzazTLgQ/RNztNnwCDwaJXZhBZVmqbnKXjwPWBPFBjEDiGvrl5dYwG7Qkt4AP0TS2qKWBZAD8qZx/6ZpbV/gB+VMoTxLfaKaraLlFXAyfRN9BVZ4CbPXtTCQfQN8+XDnn2Jjh3IWVibeN86l6vDrXxdT3gBmAY2AZsRBKw1lPfsfAFcI/2JJKsBcaQCx/aW2dVut+Lc47chNRy5tA3pGod9uBfaZYBLyKX+LSN0NI8SuXrjcDRgpNtqp539LIwIyzurb5bU252FmMXzVtOuuo8UlYPzij1LyOE0gMOvi4g7TxgBHgPqWQaV/Ir8B3wE7IMn0LuR/LCJuw7v4yOA7uRm8VKczX1unASo/4B9gArC3oPwEsRBNAUnQAeKmL+EJI97Yk3SReBV8h5LN0fwYSbqknk6z2VNSzO2k6Veocee0LnF08DK3plxvDGY8BraR/GXFKeRsrem8i3kaxo/+0YMBPB/Ls10j3h9cR5xnsO2InbyWALeA4pH2jH09HvyPXyy+yIYFK9zB8u4nQG24krCa8nJzcRwYS6NVrQ4DzsiiCu5AZ2+brCRxFMKKlpwtSglgLfRBBfRy/TDnRDgGBdeBs5JvnmQrvvWHiKdjH0NPpbQ1K3Bwx6cwTxJXV3CxgIGHAZTgTsezZg32UYbiGZCMkM8pjoZqRCuCRDcxn9ZW1V/YjtmeGtAH8SZvfysY7vhUsC8rSvUtMAPwbo2Pc6PkmTEnCqhcdLaQnGkeetjP4MtJD3KvhkBnjLc58+yToGrUSOV+PIeUNILgE8id/daqyCSbt8BRUhdC3pD5B7PX0W40Ku48kxfghC1ZKmOwMc8dhp6PMKjQRAmFrSoc4ScdLjRLPW2loGunIA+NZzn0c7P6zC3yXJLLTbu7A7x/hFtDXZua+ydBba7V3wWUuapeskdQg/d8Rlod3ehYEc4+fV3l4DvOCh4yya3j6PziKrzyu4CvdbE7UN0G6fRxP9BrgNeTjZElCufZZOkeMJ0kcp/7ZC1wDq3j5Lj+cYA4BnKHeG7BpA3dv3U9+vnl48S/E9wTWAurdP0/vIMbYwjwB/FRjINYC6t08z/9ocfaeyAfg652CuAdS9fbcmKLnld7MUqZFnPUPgGkDd23d0kgIH3CKsA14F/k4ZOIvYDXRtfxbZ6lendeCLAeQWwk9ZeKDOInYDy7afRe5263mGm4av19WsQ14xvw0pZ/QjK8isOWm3P8//r8r/ASkpf4xUEArf0afx/wNcDaj7+AuwB7GVsQQoYwlQxhKgjCVAGUuAMpYAZSwBylgClLEEKGMJMAzDMAzDMAzDqJj/ABal5BnX61RcAAAAAElFTkSuQmCC"/>
</defs>
</svg>
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