"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
// middlewear - it's like underwear, except you wear it in the middle - Scott Mos
app.use(express_1.default.json());
//web server - The static middleware is another built-in middleware that Express provides for serving static resources.
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
//# sourceMappingURL=main.js.map