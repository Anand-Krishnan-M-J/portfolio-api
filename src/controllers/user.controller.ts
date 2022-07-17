import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as ExtendedTypes from "../types/types";
import { encryptPassword } from "../models/user.model";
import { pool } from "../config/index"

export const userSignup = (req: Request, res: Response) => {
    // Save User to Database
    const { username, age, email, password } = req.body
    encryptPassword(req.body.password)
        .then(hash =>
            pool.query(
                'INSERT INTO users (username, age, email, password) VALUES ($1, $2, $3, $4)',
                [username, age, email, hash]
            )
        )
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

export const userLogin = (req: Request, res: Response) => {
  
    pool.query({
        text: 'SELECT id, username, age, email, password FROM users WHERE "username"=$1',
        values: [req.body.username]
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            
            const {id, username, email, age, password}=user.rows[0]
            const passwordIsValid = bcrypt.compareSync(req.body.password, password);
            const tokenData = { id, username, email, age };
            const token = jwt.sign({ tokenData }, process.env.SALT_ROUNDS, { expiresIn: "7d" });
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            else res.status(200).json({ message: "Successful login", data: { token } });
        })
        .catch(err => {
            res.status(500).send({ message: "Unsuccessful login", data: { error: err.message, code: "1" } });
        });
};

export const getProfile = (req: ExtendedTypes.RequestWithAuth, res: Response) => {
    if (req.error) {
        return res.status(403).send({ status: "nok", results: { message: "Get profile failed" } });
    } else {
        res.json({ status: "ok", results: { msg: "Get profile success", "re": req.authData } });
    }
};

