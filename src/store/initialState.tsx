interface IAppState {
	general: {},
	additional: {}
}
export const initialState: IAppState = {
	general: {
		response: "",
		value: "",
		weather: "",
		temp: "",
		feels_like: "",
		sunrise: "",
		sunset: "",
		coord: {
			long: "",
			lat: ""
		},
	},
	additional: {
		hourly: [],
		daily: []
	}
}