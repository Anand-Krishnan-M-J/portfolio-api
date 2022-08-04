import { Request, Response } from "express";
import { pool } from "../config/index"

export const getAll = (req: Request, res: Response) => {
    // Save User to Database
    return pool.query(
        'SELECT * FROM blogs WHERE isDeleted!=$1 ', [true]
    )
};

export const getById = (req: Request, res: Response) => {
    // Save User to Database
    return pool.query(
        'SELECT * FROM blogs WHERE id!=$1 ', [req.params.blogId]
    )
};

export const add = (req: Request, res: Response) => {
    console.log(req.body)
    

    const { title, date, description, content, image, slug, showinportfolio } = req.body
    return pool.query(
        'INSERT INTO blogs (title, date, description, content, image, slug, showinportfolio) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [title, date, description, content, image, slug, showinportfolio]
    )
}
export const deleteItem = (req: Request, res: Response) => {
    return pool.query(
        'UPDATE blogs SET isDeleted = true WHERE "id"=$1',
        [req.params.blogId]
    )

}
export const edit = (req: Request, res: Response) => {
    const { title, date, description, content, image, slug, showinportfolio, id } = req.body
    return pool.query(
        'UPDATE blogs SET title=$1, date=$2, description=$3, content=$4, image=$5, slug=$6, showinportfolio=$7 WHERE "id"=$8',
        [title, date, description, content, image, slug, showinportfolio, id]
    )
}
