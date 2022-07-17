"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const authenticateJWT = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ status: "Nok", results: { message: "No credentials sent" } });
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SALT_ROUNDS, (err, authData) => {
            req.error = err;
            req.authData = authData;
            if (err) {
                return res.status(403).send({ status: "Nok", results: { message: "Authentication failed" } });
            }
        });
    }
    if (!req.error) {
        next();
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authentication.js.map