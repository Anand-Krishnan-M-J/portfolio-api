import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const signUp = [
    check("username", "username must be greater than 3 characters")
        .custom(value => !/\s/.test(value))
        .withMessage("No spaces are allowed in the username")
        .isLength({
            min: 3
        })
        .not()
        .isEmpty(),
    check("password", "Password length should be 4 to 20 characters").isLength({
        min: 4,
        max: 20
    }).custom(value => !/\s/.test(value))
    .withMessage("No spaces are allowed in the password"),
    check("age", "Age should be a number").isNumeric(),
    check("email", "Email should be valid").isEmail(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else next();
    }
];

// export const login = [
//     check("username", "username must be greater than 3 characters")
//         .custom(value => !/\s/.test(value))
//         .withMessage("No spaces are allowed in the username")
//         .isLength({
//             min: 3
//         })
//         .not()
//         .isEmpty(),
//     check("password", "Password length should be 4 to 20 characters").isLength({
//         min: 4,
//         max: 20
//     }).custom(value => !/\s/.test(value))
//     .withMessage("No spaces are allowed in the password"),
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         } else next();
//     }
// ];
