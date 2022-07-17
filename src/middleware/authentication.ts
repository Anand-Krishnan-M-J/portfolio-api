import { Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticateJWT = (req: any, res: Response, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ status: "Nok", results: { message: "No credentials sent" } })
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SALT_ROUNDS, (err, authData) => {
            req.error = err;
            req.authData = authData;
            if (err) {
                return res.status(403).send({ status: "Nok", results: { message: "Authentication failed" } })
            }
        })
    }
    if (!req.error) {
        next();
    }
};

