webpackHotUpdate(0,{

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(16);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(43);

	var _reactRedux = __webpack_require__(181);

	var _redux = __webpack_require__(192);

	var _reducers = __webpack_require__(218);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _state = __webpack_require__(222);

	var _state2 = _interopRequireDefault(_state);

	var _actions = __webpack_require__(220);

	var _app = __webpack_require__(223);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AudioContext = window.AudioContext // Default
	|| window.webkitAudioContext // Safari and old versions of Chrome
	|| false;

	var ac = new AudioContext();
	var store = void 0;

	Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (piano) {

	    store = (0, _redux.createStore)(_reducers2.default, _state2.default);
	    store.dispatch((0, _actions.generateKeys)(88, 21));
	    store.dispatch((0, _actions.setPlayer)(piano, ac));
	    console.log(store.getState());
	    (0, _reactDom.render)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_app2.default, null)
	    ), document.getElementById('root'));
	});

	if (true) {
	    module.hot.accept(223, function () {
	        var NextApp = __webpack_require__(223);
	        (0, _reactDom.render)(_react2.default.createElement(
	            _reactRedux.Provider,
	            { store: store },
	            _react2.default.createElement(NextApp, null)
	        ), document.getElementById("root"));
	    });
	}

/***/ }

})
//# sourceMappingURL=0.148fb608fc6aea2060f2.hot-update.js.map