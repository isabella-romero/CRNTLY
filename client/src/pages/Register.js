"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// registering credentials
// should take user to this page when they press "register", and successfully filled in the credentials
// handles the registration process
var Register = function () {
    var _a = (0, react_1.useState)({ username: '', password: '' }), formState = _a[0], setFormState = _a[1];
    var _b = useMutation(REGISTER_USER), register = _b[0], _c = _b[1], error = _c.error, data = _c.data;
    var handleChange = function (event) {
        var _a;
        var _b = event.target, name = _b.name, value = _b.value;
        setFormState(__assign(__assign({}, formState), (_a = {}, _a[name] = value, _a)));
    };
    var handleFormSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var data_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log(formState);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, register({
                            variables: __assign({}, formState),
                        })];
                case 2:
                    data_1 = (_a.sent()).data;
                    Auth.register(data_1.register.token);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    setFormState({
                        username: '',
                        password: '',
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Join CRNTLY"),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "First Name:"),
                react_1.default.createElement("input", { type: "text", name: "firstName", value: registerData.firstName, onChange: handleChange, required: true })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Last Name:"),
                react_1.default.createElement("input", { type: "text", name: "lastName", value: registerData.lastName, onChange: handleChange, required: true })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Create Username:"),
                react_1.default.createElement("input", { type: "text", name: "username", value: registerData.username, onChange: handleChange, required: true })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Create Password:"),
                react_1.default.createElement("input", { type: "password", name: "password", value: registerData.password, onChange: handleChange, required: true })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Confirm Password:"),
                react_1.default.createElement("input", { type: "password", name: "confirmPassword", value: registerData.confirmPassword, onChange: handleChange, required: true })),
            error && react_1.default.createElement("p", { style: { color: 'red' } }, error),
            react_1.default.createElement("button", { type: "submit" }, "Register"))));
};
exports.default = Register;
