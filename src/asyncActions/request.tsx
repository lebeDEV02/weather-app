exports.__esModule = true;
exports.fetchCity = exports.fetchAdditional = void 0;
var reducer_1 = require("../store/reducer");
var fetchAdditional = function (lat, lon) {
	return function (dispatch) {
		fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely, hourly&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(function (response) { return response.json(); })
			.then(function (data) {
				dispatch(reducer_1.additionalRequestDispatch(data));
			});
	};
};
exports.fetchAdditional = fetchAdditional;
var fetchCity = function (requestCity) {
	return function (dispatch) {
		fetch('http://api.openweathermap.org/data/2.5/weather?q=' + requestCity + '&appid=f660a2fb1e4bad108d6160b7f58c555f')
			.then(function (response) { return response.json(); })
			.then(function (data) {
				if (data.cod === 200) {
					dispatch(reducer_1.generalRequestDispatch(data));
				}
				else {
					console.log(data.cod);
					var searchInput = document.querySelector('.app__search-input');
					alert('Oh, looks like you made a mistake, try again!');
					searchInput.value = "";
				}
			});
	};
};
exports.fetchCity = fetchCity;
