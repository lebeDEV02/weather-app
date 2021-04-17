import { initialState } from "./initialState";
import { returnTemperature } from "../Functions/functions"

const GENERAL_REQUEST = "GENERAL_REQUEST"
const ADDITIONAL_REQUEST = "ADDITIONAL_REQUEST"
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GENERAL_REQUEST:
			return {
				...state,
				general: {
					response: action.payload.cod,
					value: action.payload.name,
					weather: action.payload.weather[0].main,
					temp: returnTemperature(action.payload.main.temp),
					feels_like: returnTemperature(action.payload.main.feels_like),
					sunrise: action.payload.sys.sunrise,
					sunset: action.payload.sys.sunset,
					coord: {
						lon: action.payload.coord.lon,
						lat: action.payload.coord.lat
					}
				}
			}
		case ADDITIONAL_REQUEST:
			return {
				...state,
				additional: {
					daily: action.payload.daily,
					hourly: action.payload.hourly
				}
			}
		default: return state
	}
}

export const generalRequestDispatch = (payload) => ({ type: GENERAL_REQUEST, payload })
export const additionalRequestDispatch = (payload) => ({ type: ADDITIONAL_REQUEST, payload })