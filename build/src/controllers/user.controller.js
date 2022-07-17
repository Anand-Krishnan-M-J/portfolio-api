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
exports.getProfile = exports.userLogin = exports.userSignup = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const index_1 = require("../config/index");
const userSignup = (req, res) => {
    // Save User to Database
    const { username, age, email, password } = req.body;
    (0, user_model_1.encryptPassword)(req.body.password)
        .then(hash => index_1.pool.query('INSERT INTO users (username, age, email, password) VALUES ($1, $2, $3, $4)', [username, age, email, hash]))
        .then(function (user) {
        res.status(200).json({
            message: "Successfully registered",
            data: {
                user
            }
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Registration unsuccessful", data: { error: err.message } });
    });
};
exports.userSignup = userSignup;
const userLogin = (req, res) => {
    index_1.pool.query({
        text: 'SELECT id, username, age, email, password FROM users WHERE "username"=$1',
        values: [req.body.username]
    })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const { id, username, email, age, password } = user.rows[0];
        const passwordIsValid = bcrypt.compareSync(req.body.password, password);
        const tokenData = { id, username, email, age };
        const token = jsonwebtoken_1.default.sign({ tokenData }, process.env.SALT_ROUNDS, { expiresIn: "7d" });
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }
        else
            res.status(200).json({ message: "Successful login", data: { token } });
    })
        .catch(err => {
        res.status(500).send({ message: "Unsuccessful login", data: { error: err.message, code: "1" } });
    });
};
exports.userLogin = userLogin;
const getProfile = (req, res) => {
    if (req.error) {
        return res.status(403).send({ status: "nok", results: { message: "Get profile failed" } });
    }
    else {
        res.json({ status: "ok", results: { msg: "Get profile success", "re": req.authData } });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=user.controller.js.map