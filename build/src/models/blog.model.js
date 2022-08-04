"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.deleteItem = exports.add = exports.getById = exports.getAll = void 0;
const index_1 = require("../config/index");
const getAll = (req, res) => {
    // Save User to Database
    return index_1.pool.query('SELECT * FROM blogs WHERE isDeleted!=$1 ', [true]);
};
exports.getAll = getAll;
const getById = (req, res) => {
    // Save User to Database
    return index_1.pool.query('SELECT * FROM blogs WHERE id!=$1 ', [req.params.blogId]);
};
exports.getById = getById;
const add = (req, res) => {
    const { title, date, description, content, image } = req.body;
    return index_1.pool.query('INSERT INTO blogs (title, date, description, content, image) VALUES ($1, $2, $3, $4, $5)', [title, date, description, content, image]);
};
exports.add = add;
const deleteItem = (req, res) => {
    return index_1.pool.query('UPDATE blogs SET isDeleted = true WHERE "id"=$1', [req.params.blogId]);
};
exports.deleteItem = deleteItem;
const edit = (req, res) => {
    const { title, date, description, content, image } = req.body;
    return index_1.pool.query('UPDATE blogs SET title=$1, date=$2, description=$3, content=$4, image=$5  WHERE "id"=$6', [title, date, description, content, image, req.params.blogId]);
};
exports.edit = edit;
//# sourceMappingURL=blog.model.js.map