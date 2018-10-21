webpackHotUpdate("static/development/pages/signin.js",{

/***/ "./components/SigninBox.js":
/*!*********************************!*\
  !*** ./components/SigninBox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_redirect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/redirect */ "./lib/redirect.js");
/* harmony import */ var _utils_authService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/authService */ "./utils/authService.js");
var _jsxFileName = "/Users/sean/Documents/projects/user_management/frontend/components/SigninBox.js";


function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password)\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var SIGN_IN = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject()); // TODO: Find a better name for component.

var SigninBox = function SigninBox(_ref) {
  var client = _ref.client;
  var email;
  var password;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Mutation"], {
    mutation: SIGN_IN,
    onCompleted: function onCompleted(data) {
      console.log('token', data.login); // Store the token in cookie

      _utils_authService__WEBPACK_IMPORTED_MODULE_4__["default"].setToken(data.login, data.login); // // Force a reload of all the current queries now that the user is
      // // logged in

      client.cache.reset().then(function () {
        Object(_lib_redirect__WEBPACK_IMPORTED_MODULE_3__["default"])({}, '/');
      });
    },
    onError: function onError(error) {
      // If you want to send error to external service?
      console.log(error);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, function (signin, _ref2) {
    var data = _ref2.data,
        error = _ref2.error;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        signin({
          variables: {
            email: email.value,
            password: password.value
          }
        });
        email.value = password.value = '';
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, "No user found with that information."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      name: "email",
      placeholder: "Email",
      ref: function ref(node) {
        email = node;
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      name: "password",
      placeholder: "Password",
      ref: function ref(node) {
        password = node;
      },
      type: "password",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70
      },
      __self: this
    }, "Sign in"));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_apollo__WEBPACK_IMPORTED_MODULE_1__["withApollo"])(SigninBox));

/***/ }),

/***/ "./node_modules/cookie/index.js":
false

})
//# sourceMappingURL=signin.js.6b632841c489d3bf4dd0.hot-update.js.map