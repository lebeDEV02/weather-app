import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdditional, fetchCity } from "../asyncActions/request";
import { favouriteCityAddListener, favouriteCityDeleteListener, tabListener, weatherSwitchListener } from "../eventListeners/listeners";
import { returnSunInfo, returnTemperature, addedFavouriteCities, setFilling } from "../Functions/functions"


export let inputValue = "";

export const Weather = () => {

	const value = useSelector(state => (state as any).general.value)
	const weather = useSelector(state => (state as any).general.weather)
	const temp = useSelector(state => (state as any).general.temp)
	const feels_like = useSelector(state => (state as any).general.feels_like)
	const sunrise = useSelector(state => (state as any).general.sunrise)
	const sunset = useSelector(state => (state as any).general.sunset)
	const lat = useSelector(state => (state as any).general.coord.lat)
	const lon = useSelector(state => (state as any).general.coord.lon)
	const daily = useSelector(state => (state as any).additional.daily)
	const hourly = useSelector(state => (state as any).additional.hourly)
	const dispatch = useDispatch()


	// useEffect for listeners. Works only once
	useEffect(() => {
		tabListener();
		weatherSwitchListener();
		favouriteCityAddListener();
		favouriteCityDeleteListener();
		setFilling();
		addedFavouriteCities();
		if (localStorage.getItem('inputStorage')) {
			dispatch(fetchCity(localStorage.getItem('inputStorage')))
		}
	}, [])


	useEffect(() => {
		if (lat) {
			localStorage.setItem('inputStorage', inputValue || value);
			dispatch(fetchAdditional(lat, lon))
		}
	}, [value])


	return (
		<section className="app">
			<form className="app__search">
				<input onChange={(e) => {
					inputValue = e.target.value;
				}} type="text" className="app__search-input"></input>
				<button onClick={(e) => {
					e.preventDefault();
					dispatch(fetchCity(inputValue))
				}} type="submit" className="app__search-button">
					<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd"
							d="M16.3775 14.5H15.385L15.04 14.1575C16.2588 12.7363 17 10.8938 17 8.87502C17 4.38752 13.3625 0.750021 8.875 0.750021C4.3875 0.750021 0.75 4.38752 0.75 8.87502C0.75 13.3625 4.3875 17 8.875 17C10.8938 17 12.735 16.26 14.1563 15.0425L14.5013 15.385V16.375L20.7488 22.6138L22.6125 20.75L16.3775 14.5ZM8.87501 14.5C5.76751 14.5 3.25001 11.9825 3.25001 8.87502C3.25001 5.76877 5.76751 3.25002 8.87501 3.25002C11.9813 3.25002 14.5 5.76877 14.5 8.87502C14.5 11.9825 11.9813 14.5 8.87501 14.5Z"
							fill="black" />
					</svg>
				</button>
			</form>
			<div className="app__inner">
				<div className="app__weather">
					<div className="app__weather-infotabs">
						<div className="app__weather-top app__weather-now app__weather-top--active">
							<div className="weather__value">{temp}</div>
							{weather && <img className="weather__icon" src={`images/${weather}.svg`}></img>}
							<div className="weather__info">
								<div className="app__weather-city app__weather-city--favourite">{value}</div>
								<div className="weather__favourite">
									<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd"
											d="M17.5 1C15.0556 1 12.8556 2.7875 12 5.125C11.1444 2.7875 8.94444 1 6.5 1C3.44444 1 1 3.6125 1 7.1875C1 12 5.27778 16.125 12 23C18.7222 16.125 23 12 23 7.1875C23 3.6125 20.5556 1 17.5 1Z"
											stroke="black" stroke-width="2" />
									</svg>
								</div>
							</div>
						</div>
						<div className="app__weather-top app__weather-details ">
							<div className="app__weather-city--details">{value}</div>
							<div className="app__weather-information weather-information">
								<p className="weather-information__temperature">{temp ? `Temperature : ${temp}` : null}</p>
								<p className="weather-information__feelsLike">{feels_like ? `Feels like: ${feels_like}` : null}</p>
								<p className="weather-information__weather">{weather ? `Weather: ${weather}` : null}</p>
								<p className="weather-information__sunrise">{sunrise ? `Sunrise: ${returnSunInfo(sunrise)}` : null}</p>
								<p className="weather-information__sunset">{sunset ? `Sunset: ${returnSunInfo(sunset)}` : null}</p>
							</div>
						</div>
						<div className="app__weather-top app__weather-forecast">
							<div className="app__weather-forecast-top">
								<div className="app__weather-city--forecast">{value}</div>
								<label className="weather-checkbox"> More information
								<input className="weather-checkbox__more" type="checkbox"></input>
								</label>
							</div>
							<div className="app__weather-daily">
								{daily.map((item: any) => {
									return <div key={item.dt} className="weather-day">
										<div className="weather-day__top">
											<p>{`${new Date(item.dt * 1000).getDate()} ${new Date(item.dt * 1000).toLocaleString('default', { month: 'long' })}`}</p>
											<p>{`${new Date(item.dt * 1000).getHours()}:00`}</p>
										</div>
										<div className="weather-day__bottom">
											<div>
												<p>{`Temperature: ` + returnTemperature(item.temp.eve)}</p>
												<p>{`Feels Like: ` + returnTemperature(item.feels_like.eve)}</p>
											</div>
											<div className="weather-day__information">
												<p>{item.weather[0].main}</p>
												<img src={`images/${item.weather[0].main}.svg`} />
											</div>
										</div>
									</div>
								})}
							</div>
							<div className="app__weather-hourly app__weather-hide">
								{hourly.map((item: any) => {
									return <div key={item.dt} className="weather-hour">
										<div className="weather-hour__top">
											<p>{`${new Date(item.dt * 1000).getDate()} ${new Date(item.dt * 1000).toLocaleString('default', { month: 'long' })}`}</p>
											<p>{`${new Date(item.dt * 1000).getHours()}:00`}</p>
										</div>
										<div className="weather-hour__bottom">
											<div>
												<p>{`Temperature: ` + returnTemperature(item.temp)}</p>
												<p>{`Feels Like: ` + returnTemperature(item.feels_like)}</p>
											</div>
											<div className="weather-hour__information">
												<p>{item.weather[0].main}</p>
												<img src={`images/${item.weather[0].main}.svg`} />
											</div>
										</div>
									</div>
								})}
							</div>
						</div>
					</div>
					<ul className="app__weather-tabs">
						<li className="app__weather-tab app__weather-tab--active">Now</li>
						<li className="app__weather-tab">Details</li>
						<li className="app__weather-tab">Forecast</li>
					</ul>
				</div>
				<div className="app__locations">
					<p className="app__locations-added">Added Locations:</p>
					<div className="app__locations-list" onClick={(e) => {
						if ((e.target as HTMLTextAreaElement).classList.contains('app__favourite-city')) {
							e.preventDefault();
							localStorage.removeItem('inputStorage');
							localStorage.setItem('inputStorage', (e.target as any).textContent.trim());
							dispatch(fetchCity((e.target as any).textContent.trim()))
						}
					}}>
					</div>
				</div>
			</div>
		</section >
	)
}