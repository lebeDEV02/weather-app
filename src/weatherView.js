import { infoTabs, tabsSection, allTabs, weatherCity, weatherCityFavourite, inputValue, btn, favouriteCity, addedLocations, dailyForecast, hourlyForecast, weatherSwitcher, set } from './UiElements.js';
import { onChange, mainInfo } from './controller.js'
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
weatherSwitcher.addEventListener('click', () => {
	dailyForecast.classList.toggle('app__weather-hide');
	hourlyForecast.classList.toggle('app__weather-hide');
})
favouriteCity.addEventListener('click', () => {
	if (weatherCity.textContent !== undefined && weatherCity.textContent !== "" && !set.has(weatherCityFavourite.textContent)) {
		console.log(weatherCity.textContent)
		localStorage.setItem(`${localStorage.length}`, `${weatherCityFavourite.textContent}`);
		set.add(weatherCityFavourite.textContent);
		addedLocations.insertAdjacentHTML('beforeend', `<p class="app__favourite-city">${weatherCityFavourite.textContent}<svg class="app__favourite-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
		 </p>`);
	} else {
		alert('Try again! Something went wrong!')
	}
});
//delete favourite
addedLocations.addEventListener('click', (e) => {
	if (e.target.parentElement.classList.contains('app__favourite-icon')) {
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (localStorage.getItem(key) === e.target.parentElement.parentElement.textContent.trim() && !(key === "inputStorage")) {
				localStorage.removeItem(key);
				e.target.parentElement.parentElement.remove();
			} else {
				continue;
			}
		}
	}
})
document.addEventListener('DOMContentLoaded', () => {
	for (let key in localStorage) {
		if (!localStorage.hasOwnProperty(key)) {
			continue;
		} else {
			if (key !== "inputStorage") {
				set.add(localStorage.getItem(key))
			}
		}
	}
})
document.addEventListener('DOMContentLoaded', () => {
	for (let value of set) {
		addedLocations.insertAdjacentHTML('beforeend', `<p class="app__favourite-city">${value}<svg class="app__favourite-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
		 </p>`);
	};
})
//Weather info listeners
btn.addEventListener('click', (e) => {
	e.preventDefault();
	mainInfo(inputValue.value);
})
addedLocations.addEventListener('click', (e) => {
	if (e.target.classList.contains('app__favourite-city')) {
		localStorage.removeItem('inputStorage');
		localStorage.setItem('inputStorage', e.target.textContent.trim());
		e.preventDefault();
		mainInfo(e.target.textContent.trim());
	}
})
btn.addEventListener('click', () => {
	if (inputValue.value) {
		localStorage.setItem('inputStorage', inputValue.value);
	}
})
document.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
	mainInfo(localStorage.getItem('inputStorage'))
});

inputValue.addEventListener('keyup', onChange);