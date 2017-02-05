webpackHotUpdate(0,{

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(197);

	var _MuiThemeProvider = __webpack_require__(163);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _Tabs = __webpack_require__(354);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavBar = function (_Component) {
	    _inherits(NavBar, _Component);

	    function NavBar(props, context) {
	        _classCallCheck(this, NavBar);

	        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

	        _this.handleChange = function (value) {
	            console.log(value);
	            console.log("HEY I CHANGED THIS!");
	            _reactRouter.hashHistory.push("/" + value);
	            _this.setState({
	                value: value
	            });
	        };

	        _this.state = {
	            value: "Home"
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        context.router;
	        return _this;
	    }

	    _createClass(NavBar, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                _MuiThemeProvider2.default,
	                null,
	                _react2.default.createElement(
	                    _Tabs.Tabs,
	                    {
	                        value: this.state.value,
	                        onChange: this.handleChange
	                    },
	                    _react2.default.createElement(_Tabs.Tab, { label: "Home", value: "" }),
	                    _react2.default.createElement(_Tabs.Tab, { label: "Interface", value: "interface" }),
	                    _react2.default.createElement(_Tabs.Tab, { label: "Sign Up", value: "signup" })
	                )
	            );
	        }
	    }]);

	    return NavBar;
	}(_react.Component);

	NavBar.contextTypes = {
	    router: _react2.default.PropTypes.object
	};

		exports.default = NavBar;

/***/ }

})
//# sourceMappingURL=0.d62c3605ad2834990d8d.hot-update.js.map