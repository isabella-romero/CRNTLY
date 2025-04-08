"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var LandingPage = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleLoginClick = function () {
        navigate("/login");
    };
    var handleRegisterClick = function () {
        navigate("/register");
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("img", { src: "/path/to/your/image.jpg" // Replace with the actual path to your image
                , alt: "App Logo" }),
            react_1.default.createElement("h1", null, "Welcome to CRNTLY")),
        react_1.default.createElement("p", null, "'Short Bio on how our app works'"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: handleLoginClick, style: { margin: "10px", padding: "10px 20px" } }, "Login"),
            react_1.default.createElement("button", { onClick: handleRegisterClick, style: { margin: "10px", padding: "10px 20px" } }, "Create your Account"))));
};
exports.default = LandingPage;
