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
/* harmony import */ var _utils_authService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/authService */ "./utils/authService.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _lib_redirect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/redirect */ "./lib/redirect.js");
/* harmony import */ var _layout_defaultLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../layout/defaultLayout */ "./layout/defaultLayout.js");
var _jsxFileName = "/Users/sean/Documents/projects/user_management/frontend/hocs/defaultPage.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Main = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].main.withConfig({
  displayName: "defaultPage__Main",
  componentId: "sc-116y1b7-0"
})(["height:100vh;width:100vw;"]);
/* harmony default export */ __webpack_exports__["default"] = (function (Page) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(DefaultPage, _React$Component);

      function DefaultPage() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, DefaultPage);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DefaultPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logout", function (eve) {
          console.log('in here');

          if (eve.key === 'logout') {
            next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/?logout=".concat(eve.newValue));
          }
        });

        return _this;
      }

      _createClass(DefaultPage, [{
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
          var props = this.props;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Main, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: this
          }, props.isAuthenticated ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Page, _extends({}, props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 63
            },
            __self: this
          }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_defaultLayout__WEBPACK_IMPORTED_MODULE_6__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Page, _extends({}, props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          }))));
        }
      }], [{
        key: "getInitialProps",
        value: function getInitialProps(ctx) {
          var loggedUser =  true ? _utils_authService__WEBPACK_IMPORTED_MODULE_3__["default"].getUserFromLocalCookie() : undefined;
          var isAuthenticated = !!loggedUser;
          var pageProps = Page.getInitialProps && Page.getInitialProps(ctx); // If user is authenticated and is the unsecuredPagesArray
          // redirect user to somewhere useful.

          if (isAuthenticated && _utils_constants__WEBPACK_IMPORTED_MODULE_4__["unsecuredPages"].includes(ctx.pathname)) {
            Object(_lib_redirect__WEBPACK_IMPORTED_MODULE_5__["default"])(ctx, '/');
            return _objectSpread({}, pageProps);
          }

          return _objectSpread({}, pageProps, {
            loggedUser: loggedUser,
            isAuthenticated: isAuthenticated,
            currentUrl: ctx.pathname
          });
        }
      }]);

      return DefaultPage;
    }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component)
  );
});

/***/ })

})
//# sourceMappingURL=index.js.c709c678cc682e781fb3.hot-update.js.map