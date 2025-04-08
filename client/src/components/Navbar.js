"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../context/AuthContext");
var Notifications_1 = require("./Notifications");
function Navbar() {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, logout = _a.logout;
    return (React.createElement("nav", { className: "navbar" },
        React.createElement(react_router_dom_1.Link, { to: "/", className: "logo" }, "CRNTLY"),
        React.createElement("div", { className: "nav-links" }, user ? (React.createElement(React.Fragment, null,
            React.createElement(Notifications_1.default, null),
            React.createElement(react_router_dom_1.Link, { to: "/profile" }, "Profile"),
            React.createElement("button", { onClick: logout }, "Logout"))) : (React.createElement(React.Fragment, null,
            React.createElement(react_router_dom_1.Link, { to: "/login" }, "Login"),
            React.createElement(react_router_dom_1.Link, { to: "/register" }, "Register"))))));
}
