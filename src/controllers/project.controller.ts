import { Request, Response } from "express";
import { getAll, getById, deleteItem, edit, add } from "../models/project.model"

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await getAll(req, res);
        res.status(200).json({
            message: "Status OK for fetching projects",
            data: {
                projects: projects.rows
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
};
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await getById(req, res);
        res.status(200).json({
            message: "Status OK for fetching project",
            data: {
                project: project.rows[0]
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
};
export const addProject = async (req: Request, res: Response) => {
    try {
        await add(req, res);
        res.status(200).json({
            message: "Status OK for adding project"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
}
export const deleteProject = async (req: Request, res: Response) => {
    try {
        await deleteItem(req, res);
        res.status(200).json({
            message: "Status OK for deleting project"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });

    }
}
export const editProject = async(req: Request, res: Response) => {
    try {
        await edit(req, res);
        res.status(200).json({
            message: "Status OK for editing project"
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });

    }
}
