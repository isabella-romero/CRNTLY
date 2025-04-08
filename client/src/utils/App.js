"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("./context/AuthContext");
var Navbar_1 = require("./components/Navbar");
var Home_1 = require("./pages/Home");
var Login_1 = require("./pages/Login");
var Register_1 = require("./pages/Register");
var Profile_1 = require("./pages/Profile");
require("./App.css");
function App() {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(AuthContext_1.AuthProvider, null,
            React.createElement(Navbar_1.default, null),
            React.createElement("div", { className: "container" },
                React.createElement(react_router_dom_1.Routes, null,
                    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Home_1.default, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "/login", element: React.createElement(Login_1.default, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "/register", element: React.createElement(Register_1.default, null) }),
                    React.createElement(react_router_dom_1.Route, { path: "/profile", element: React.createElement(Profile_1.default, null) }))))));
}
exports.default = App;
