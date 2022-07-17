"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const express_validator_1 = require("express-validator");
exports.signUp = [
    (0, express_validator_1.check)("username", "username must be greater than 3 characters")
        .custom(value => !/\s/.test(value))
        .withMessage("No spaces are allowed in the username")
        .isLength({
        min: 3
    })
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("password", "Password length should be 4 to 20 characters").isLength({
        min: 4,
        max: 20
    }).custom(value => !/\s/.test(value))
        .withMessage("No spaces are allowed in the password"),
    (0, express_validator_1.check)("age", "Age should be a number").isNumeric(),
    (0, express_validator_1.check)("email", "Email should be valid").isEmail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else
            next();
    }
];
exports.login = [
    (0, express_validator_1.check)("username", "username must be greater than 3 characters")
        .custom(value => !/\s/.test(value))
        .withMessage("No spaces are allowed in the username")
        .isLength({
        min: 3
    })
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("password", "Password length should be 4 to 20 characters").isLength({
        min: 4,
        max: 20
    }).custom(value => !/\s/.test(value))
        .withMessage("No spaces are allowed in the password"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else
            next();
    }
];
//# sourceMappingURL=validations.js.map