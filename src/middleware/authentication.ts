import { Response } from "express";
import jwt from "jsonwebtoken";
export const authenticateJWT = (req: any, res: Response, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ status: "Nok",results:{message:"No credentials sent"} })
    }
    else {
        const token = req.headers.authorization.split(" ")[1];


        jwt.verify(token, process.env.SECRET, (err, authData) => {
        req.error = err;
        req.authData=authData
        })
        next();

    }
};

