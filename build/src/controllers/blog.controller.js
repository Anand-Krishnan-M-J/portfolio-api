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
exports.getProfile = exports.userLogin = exports.editBlog = exports.deleteBlog = exports.addBlog = exports.getBlogById = exports.getBlogs = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const getBlogs = (req, res) => {
    // Save User to Database
    index_1.pool.query('SELECT * FROM blogs WHERE isDeleted!=$1 ', [true])
        .then(function (blogs) {
        res.status(200).json({
            message: "Status OK for fetching blogs",
            data: {
                blogs: blogs.rows
            }
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Status Nok", data: { error: err.message } });
    });
};
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => {
    // Save User to Database
    index_1.pool.query('SELECT * FROM blogs WHERE id!=$1 ', [req.params.blogId])
        .then(function (blogs) {
        res.status(200).json({
            message: "Status OK for fetching blog",
            data: {
                blogs: blogs.rows[0]
            }
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Status Nok", data: { error: err.message } });
    });
};
exports.getBlogById = getBlogById;
const addBlog = (req, res) => {
    const { title, date, shortDescription, content, image } = req.body;
    index_1.pool.query('INSERT INTO blogs (title, date, shortDescription, content, image) VALUES ($1, $2, $3, $4, $5)', [title, date, shortDescription, content, image])
        .then(() => {
        res.status(200).json({
            message: "Status OK for adding blog"
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Status Nok", data: { error: err.message } });
    });
};
exports.addBlog = addBlog;
const deleteBlog = (req, res) => {
    console.log(req.body);
    index_1.pool.query('UPDATE blogs SET isDeleted = true WHERE "id"=$1', [req.params.blogId])
        .then(() => {
        res.status(200).json({
            message: "Status OK for deleting blog"
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Status Nok", data: { error: err.message } });
    });
};
exports.deleteBlog = deleteBlog;
const editBlog = (req, res) => {
    const { title, date, shortDescription, content, image } = req.body;
    index_1.pool.query('UPDATE blogs SET title=$1, date=$2, shortDescription=$3, content=$4, image=$5  WHERE "id"=$6', [title, date, shortDescription, content, image, req.params.blogId])
        .then(() => {
        res.status(200).json({
            message: "Status OK for editing blog"
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Status Nok", data: { error: err.message } });
    });
};
exports.editBlog = editBlog;
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
//# sourceMappingURL=blog.controller.js.map