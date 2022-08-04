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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBlog = exports.deleteBlog = exports.addBlog = exports.getBlogById = exports.getBlogs = void 0;
const blog_model_1 = require("../models/blog.model");
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield (0, blog_model_1.getAll)(req, res);
        res.status(200).json({
            message: "Status OK for fetching blogs",
            data: {
                blogs: blogs.rows
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield (0, blog_model_1.getById)(req, res);
        res.status(200).json({
            message: "Status OK for fetching blog",
            data: {
                blog: blog.rows[0]
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
});
exports.getBlogById = getBlogById;
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, blog_model_1.add)(req, res);
        res.status(200).json({
            message: "Status OK for adding blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
});
exports.addBlog = addBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, blog_model_1.getById)(req, res);
        res.status(200).json({
            message: "Status OK for deleting blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
});
exports.deleteBlog = deleteBlog;
const editBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, blog_model_1.edit)(req, res);
        res.status(200).json({
            message: "Status OK for editing blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
});
exports.editBlog = editBlog;
//# sourceMappingURL=blog.controller.js.map