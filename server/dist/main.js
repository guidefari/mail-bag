"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var ServerInfo_1 = require("./ServerInfo");
var IMAP = __importStar(require("./IMAP"));
// import * as SMTP from "./SMTP";
// import * as Contacts from "./Contacts";
// import { IContact } from "./Contacts";
var app = express_1.default();
// middlewear - it's like underwear, except you wear it in the middle - Scott Mos
app.use(express_1.default.json());
//web server - The static middleware is another built-in middleware that Express provides for serving static resources.
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// adding this little bit of custom middleware ensures that all
// requests to our Express server will be allowed
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
app.get("/mailboxes", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, mailboxes, inError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMailboxes()];
            case 1:
                mailboxes = _a.sent();
                inResponse.json(mailboxes);
                return [3 /*break*/, 3];
            case 2:
                inError_1 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/mailboxes/:mailbox", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messages, inError_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMessages({ mailbox: inRequest.params.mailbox })];
            case 1:
                messages = _a.sent();
                inResponse.json(messages);
                return [3 /*break*/, 3];
            case 2:
                inError_2 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/mailboxes/:mailbox/:id", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messageBody, inError_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.getMessageBody({ mailbox: inRequest.params.mailbox, id: parseInt(inRequest.params.id, 10) })];
            case 1:
                messageBody = _a.sent();
                inResponse.json(messageBody);
                return [3 /*break*/, 3];
            case 2:
                inError_3 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=main.js.map