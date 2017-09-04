"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports["default"] = client;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Resolver = require("./Resolver");

var _Resolver2 = _interopRequireDefault(_Resolver);

function client(Loader) {
	return function clientDecorator(Component) {
		return (function (_React$Component) {
			_inherits(ClientResolver, _React$Component);

			_createClass(ClientResolver, null, [{
				key: "displayName",
				value: "ClientResolver",
				enumerable: true
			}, {
				key: "childContextTypes",
				value: {
					resolver: _react2["default"].PropTypes.instanceOf(_Resolver2["default"])
				},
				enumerable: true
			}, {
				key: "contextTypes",
				value: {
					resolver: _react2["default"].PropTypes.instanceOf(_Resolver2["default"])
				},
				enumerable: true
			}]);

			function ClientResolver(props, context) {
				_classCallCheck(this, ClientResolver);

				_get(Object.getPrototypeOf(ClientResolver.prototype), "constructor", this).call(this, props, context);

				this.enqueue = this.enqueue.bind(this);
				this.queue = [];
				this.state = {
					bypass: process.env.NODE_ENV === "test",
					loaded: false,
					server: true
				};
			}

			_createClass(ClientResolver, [{
				key: "componentDidMount",
				value: function componentDidMount() {
					this.setState({ server: false }, function () {
						var _this = this;

						Promise.all(this.queue).then(function () {
							return _this.setState({ loaded: true });
						});
					});
				}
			}, {
				key: "enqueue",
				value: function enqueue(promise) {
					this.queue.push(promise);
					return promise;
				}
			}, {
				key: "render",
				value: function render() {
					var _this2 = this;

					var _state = this.state;
					var bypass = _state.bypass;
					var loaded = _state.loaded;
					var server = _state.server;

					var loader = Loader ? _react2["default"].createElement(Loader, null) : null;

					if (server) {
						return loader;
					}

					if (bypass || loaded) {
						return _react2["default"].createElement(Component, this.props);
					}

					return _react2["default"].createElement(
						"div",
						null,
						loader,
						_react2["default"].createElement(
							"div",
							{ style: { display: "none" } },
							_react2["default"].createElement(
								_Resolver2["default"],
								{ onResolve: this.enqueue },
								function (resolved) {
									return _react2["default"].createElement(Component, _extends({}, _this2.props, resolved));
								}
							)
						)
					);
				}
			}]);

			return ClientResolver;
		})(_react2["default"].Component);
	};
}

module.exports = exports["default"];