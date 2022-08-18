import { Request, Response } from "express";
import { pool } from "../config/index"

export const getAll = (req: Request, res: Response) => {
    return pool.query(
        'SELECT name, email, subject, message FROM email'
    )
};

export const add = (req: Request, res: Response) => {
    const {  name, email, subject, message} = req.body
    return pool.query(
        'INSERT INTO email (name, email, subject, message) VALUES ($1, $2, $3, $4)',
        [ name, email, subject, message]
    )
}
