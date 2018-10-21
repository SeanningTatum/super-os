webpackHotUpdate("static/development/pages/index.js",{

/***/ "./hocs/defaultPage.js":
/*!*****************************!*\
  !*** ./hocs/defaultPage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var _utils_authService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/authService */ "./utils/authService.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _lib_redirect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/redirect */ "./lib/redirect.js");
var _jsxFileName = "/Users/sean/Documents/projects/user_management/frontend/hocs/defaultPage.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var App = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].main.withConfig({
  displayName: "defaultPage__App",
  componentId: "sc-116y1b7-0"
})(["height:100vh;width:100vw;"]);
var Main = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "defaultPage__Main",
  componentId: "sc-116y1b7-1"
})(["max-width:1024px;margin:0 auto;padding:30px;"]);
/* harmony default export */ __webpack_exports__["default"] = (function (Page) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(DefaultPage, _React$Component);

      _createClass(DefaultPage, null, [{
        key: "getInitialProps",
        value: function getInitialProps(ctx) {
          var loggedUser =  true ? _utils_authService__WEBPACK_IMPORTED_MODULE_4__["default"].getUserFromLocalCookie() : undefined;
          var isAuthenticated = !!loggedUser;
          var pageProps = Page.getInitialProps && Page.getInitialProps(ctx); // If user is authenticated and is the unsecuredPagesArray
          // redirect user to somewhere useful.

          if (isAuthenticated && _utils_constants__WEBPACK_IMPORTED_MODULE_5__["unsecuredPages"].includes(ctx.pathname)) {
            Object(_lib_redirect__WEBPACK_IMPORTED_MODULE_6__["default"])(ctx, '/');
            return _objectSpread({}, pageProps);
          }

          return _objectSpread({}, pageProps, {
            loggedUser: loggedUser,
            isAuthenticated: isAuthenticated,
            currentUrl: ctx.pathname
          });
        }
      }]);

      function DefaultPage(props) {
        var _this;

        _classCallCheck(this, DefaultPage);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(DefaultPage).call(this, props));
        _this.logout = _this.logout.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(DefaultPage, [{
        key: "logout",
        value: function logout(eve) {
          console.log('in here');

          if (eve.key === 'logout') {
            next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/?logout=".concat(eve.newValue));
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          window.addEventListener('storage', this.logout, false);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          window.removeEventListener('storage', this.logout, false);
        }
      }, {
        key: "render",
        value: function render() {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          }, this.props.isAuthenticated ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_3__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Page, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 75
            },
            __self: this
          }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 78
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Page, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            },
            __self: this
          }))));
        }
      }]);

      return DefaultPage;
    }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)
  );
});

/***/ })

})
//# sourceMappingURL=index.js.120e9cf1b660bdc2372e.hot-update.js.map