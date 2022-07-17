import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as ExtendedTypes from "../types/types";
import { encryptPassword } from "../models/user.model";
import { pool } from "../config/index"

export const getBlogs = (req: Request, res: Response) => {
    // Save User to Database
    pool.query(
        'SELECT * FROM blogs WHERE isDeleted!=$1 ', [true]
    )
        .then(function (blogs) {
            res.status(200).json({
                message: "Status OK for fetching blogs",
                data: {
                    blogs: blogs.rows
                }
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Status Nok", data: { error: err.message } });
        });
};
export const getBlogById = (req: Request, res: Response) => {
    // Save User to Database
    pool.query(
        'SELECT * FROM blogs WHERE id!=$1 ', [req.params.blogId]
    )
        .then(function (blogs) {
            res.status(200).json({
                message: "Status OK for fetching blog",
                data: {
                    blogs: blogs.rows[0]
                }
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Status Nok", data: { error: err.message } });
        });
};
export const addBlog = (req: Request, res: Response) => {
    const { title, date, shortDescription, content, image} = req.body
 
    pool.query(
        'INSERT INTO blogs (title, date, shortDescription, content, image) VALUES ($1, $2, $3, $4, $5)',
        [title, date, shortDescription, content, image]
    )
        .then(()=> {
            res.status(200).json({
                message: "Status OK for adding blog"
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Status Nok", data: { error: err.message } });
        });
}
export const deleteBlog = (req: Request, res: Response) => {

    console.log(req.body)
    pool.query(
        'UPDATE blogs SET isDeleted = true WHERE "id"=$1' ,
        [req.params.blogId]
    )
        .then(()=> {
            res.status(200).json({
                message: "Status OK for deleting blog"
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Status Nok", data: { error: err.message } });
        });
}
export const editBlog = (req: Request, res: Response) => {

    const { title, date, shortDescription, content, image} = req.body
    pool.query(
        'UPDATE blogs SET title=$1, date=$2, shortDescription=$3, content=$4, image=$5  WHERE "id"=$6' ,
        [ title, date, shortDescription, content, image, req.params.blogId]
    )
        .then(()=> {
            res.status(200).json({
                message: "Status OK for editing blog"
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Status Nok", data: { error: err.message } });
        });
}
export const userLogin = (req: Request, res: Response) => {

    pool.query({
        text: 'SELECT id, username, age, email, password FROM users WHERE "username"=$1',
        values: [req.body.username]
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const { id, username, email, age, password } = user.rows[0]
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

