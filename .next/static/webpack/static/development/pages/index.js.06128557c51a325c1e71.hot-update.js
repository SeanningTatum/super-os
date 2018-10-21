webpackHotUpdate("static/development/pages/index.js",{

/***/ "./utils/authService.js":
/*!******************************!*\
  !*** ./utils/authService.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var AuthService = function AuthService() {
  _classCallCheck(this, AuthService);

  _defineProperty(this, "setToken", function (idToken, accessToken) {
    if (false) {}

    js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('user', jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(idToken));
    js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('idToken', idToken); // Cookie.set('accessToken', accessToken)
  });

  _defineProperty(this, "unsetToken", function () {
    if (false) {}

    js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.remove('idToken'); // Cookie.remove('accessToken')

    js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.remove('user'); // to support logging out from all windows

    window.localStorage.setItem('logout', Date.now());
  });

  _defineProperty(this, "getUserFromServerCookie", function (req) {
    if (!req.headers.cookie) {
      return undefined;
    }

    var jwtCookie = req.headers.cookie.split(';').find(function (c) {
      return c.trim().startsWith('idToken=');
    });

    if (!jwtCookie) {
      return undefined;
    }

    var jwt = jwtCookie.split('=')[1];
    return jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(jwt);
  });

  _defineProperty(this, "getUserFromLocalCookie", function () {
    return js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.getJSON('user');
  });
};

var authService = new AuthService();
/* harmony default export */ __webpack_exports__["default"] = (authService);

/***/ })

})
//# sourceMappingURL=index.js.06128557c51a325c1e71.hot-update.js.map