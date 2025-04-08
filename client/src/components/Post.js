"use strict";
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
exports.default = Post;
// components/Post.tsx
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var AuthContext_1 = require("../context/AuthContext");
var api_1 = require("../services/api");
function Post(_a) {
    var _this = this;
    var post = _a.post, onCommentAdded = _a.onCommentAdded;
    var user = (0, AuthContext_1.useAuth)().user;
    var _b = (0, react_1.useState)(''), comment = _b[0], setComment = _b[1];
    var _c = (0, react_1.useState)(false), showComments = _c[0], setShowComments = _c[1];
    var _d = (0, react_1.useState)(post.likes.includes((user === null || user === void 0 ? void 0 : user._id) || '')), isLiked = _d[0], setIsLiked = _d[1];
    var _e = (0, react_1.useState)(post.likes.length), likeCount = _e[0], setLikeCount = _e[1];
    var handleLike = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.default.post("/posts/".concat(post._id, "/like"))];
                case 1:
                    _a.sent();
                    setIsLiked(!isLiked);
                    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Error liking post:', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleComment = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!comment.trim())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_1.default.post("/posts/".concat(post._id, "/comments"), { content: comment })];
                case 2:
                    _a.sent();
                    setComment('');
                    onCommentAdded === null || onCommentAdded === void 0 ? void 0 : onCommentAdded();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error adding comment:', err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "post" },
        React.createElement("div", { className: "post-emoji" }, post.emoji),
        React.createElement("p", { className: "post-content" }, post.content),
        React.createElement("div", { className: "post-actions" },
            React.createElement("button", { onClick: handleLike, className: "like-btn" },
                isLiked ? React.createElement(fa_1.FaHeart, { color: "red" }) : React.createElement(fa_1.FaRegHeart, null),
                React.createElement("span", null, likeCount)),
            React.createElement("button", { onClick: function () { return setShowComments(!showComments); } },
                React.createElement(fa_1.FaComment, null),
                React.createElement("span", null, post.comments.length))),
        showComments && (React.createElement("div", { className: "comments-section" },
            React.createElement("form", { onSubmit: handleComment, className: "comment-form" },
                React.createElement("input", { type: "text", value: comment, onChange: function (e) { return setComment(e.target.value); }, placeholder: "Add a comment..." }),
                React.createElement("button", { type: "submit" }, "Post")),
            React.createElement("div", { className: "comments-list" }, post.comments.map(function (comment) { return (React.createElement("div", { key: comment._id, className: "comment" },
                React.createElement("strong", null,
                    "@",
                    comment.author.name),
                React.createElement("p", null, comment.content))); })))),
        React.createElement("div", { className: "post-footer" },
            React.createElement("span", null,
                "@",
                post.author.name),
            React.createElement("span", null, new Date(post.createdAt).toLocaleDateString()))));
}
