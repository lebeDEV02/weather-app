import { set } from "../DOMElements/WeatherElements"


export const returnSunInfo = (s: number) => {
	return `${Math.floor((s / (60 * 60)) % 24)}:${Math.floor((s / (60)) % 60)}`;
}


export const returnTemperature = (temp: number) => {
	return `${Math.round(temp - 273)}°`
}


export const addedFavouriteCities = () => {
	const addedLocations = document.querySelector('.app__locations-list')
	for (let value of set as any) {
		if (typeof value === "string") {
			addedLocations!.insertAdjacentHTML('beforeend', `<p class="app__favourite-city">${value}<svg class="app__favourite-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
			 </p>`);
		}
	};
}


export const setFilling = () => {
	for (let key in localStorage) {
		if (!localStorage.hasOwnProperty(key)) {
			continue;
		} else {
			if (key !== "inputStorage") {
				set.add(localStorage.getItem(key))
			}
		}
	}
}