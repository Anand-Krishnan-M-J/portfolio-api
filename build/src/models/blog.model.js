"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.deleteItem = exports.add = exports.getById = exports.getAll = void 0;
const index_1 = require("../config/index");
const getAll = (req, res) => {
    // Save User to Database
    const { limit, offset, showHidden = 'true' } = req.query;
    if (showHidden === 'true') {
        return index_1.pool.query('SELECT * FROM blogs');
    }
    else if (showHidden === "false") {
        return index_1.pool.query('SELECT * FROM blogs WHERE isDeleted!=$1 AND showinportfolio=$2  LIMIT $3 OFFSET $4', [true, true, limit, offset]);
    }
};
exports.getAll = getAll;
const getById = (req, res) => {
    // Save User to Database
    return index_1.pool.query('SELECT * FROM blogs WHERE id=$1 ', [req.params.blogId]);
};
exports.getById = getById;
const add = (req, res) => {
    const { title, date, description, content, image, slug, showinportfolio } = req.body;
    return index_1.pool.query('INSERT INTO blogs (title, date, description, content, image, slug, showinportfolio) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, date, description, content, image, slug, showinportfolio]);
};
exports.add = add;
const deleteItem = (req, res) => {
    return index_1.pool.query('DELETE FROM blogs WHERE "id"=$1', [req.params.blogId]);
};
exports.deleteItem = deleteItem;
const edit = (req, res) => {
    const { title, date, description, content, image, slug, showinportfolio, id } = req.body;
    return index_1.pool.query('UPDATE blogs SET title=$1, date=$2, description=$3, content=$4, image=$5, slug=$6, showinportfolio=$7 WHERE "id"=$8', [title, date, description, content, image, slug, showinportfolio, id]);
};
exports.edit = edit;
//# sourceMappingURL=blog.model.js.map