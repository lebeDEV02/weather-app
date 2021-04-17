import { generalRequestDispatch, additionalRequestDispatch } from "../store/reducer"
export const fetchCity = (requestCity: string | null) => {
	return (dispatch: any) => {
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + requestCity + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				if (data.cod === 200) {
					dispatch(generalRequestDispatch(data))
				} else {
					const searchInput = document.querySelector('.app__search-input');
					alert('Oh, looks like you made a mistake, try again!');
					(searchInput as HTMLInputElement).value = "";
				}
			})
	}
}

export const fetchAdditional = (lat: string, lon: string) => {
	return (dispatch: any) => {
		fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(response => response.json())
			.then(data => {
				dispatch(additionalRequestDispatch(data))
			})
	}
}