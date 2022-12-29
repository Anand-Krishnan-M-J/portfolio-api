import { Request, Response } from "express";
import { getAll, getById, deleteItem, edit, add } from "../models/blog.model"

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await getAll(req, res);
        res.status(200).json({
            message: "Status OK for fetching blogs",
            data: {
                blogs: blogs.rows
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message , blogs:[]} });
    }
};
export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await getById(req, res);
        res.status(200).json({
            message: "Status OK for fetching blog",
            data: {
                blog: blog.rows[0]
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
};
export const addBlog = async (req: Request, res: Response) => {
    try {
        await add(req, res);
        res.status(200).json({
            message: "Status OK for adding blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
}
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        await deleteItem(req, res);
        res.status(200).json({
            message: "Status OK for deleting blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });

    }
}
export const editBlog = async(req: Request, res: Response) => {
    try {
        await edit(req, res);
        res.status(200).json({
            message: "Status OK for editing blog"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });

    }
}
