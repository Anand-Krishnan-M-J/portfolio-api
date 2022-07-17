"use strict";
// import {User} from "../models/user.model"
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignUp = void 0;
const config_1 = require("../../config");
const checkDuplicateUsernameOrEmail = (req, res, next) => {
    config_1.pool.query({
        text: 'SELECT id, username, age, email, password FROM users WHERE "username"=$1',
        values: [req.body.username]
    })
        .then(user => {
        if (user.rows.length !== 0) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        config_1.pool.query({
            text: 'SELECT id, username, age, email, password FROM users WHERE "email"=$1',
            values: [req.body.email]
        }).then(user => {
            if (user.rows.length !== 0) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    })
        .catch(err => {
        res.status(500).send({ message: "Unsuccessful login", data: { error: err.message, code: "1" } });
    });
};
exports.verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};
//# sourceMappingURL=verifySignUp.js.map