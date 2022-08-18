import { Request, Response } from "express";
import { pool } from "../config/index"

export const getAll = (req: Request, res: Response) => {
    // Save User to Database
    const {limit, offset, showHidden} = req.query
    console.log("hidden",showHidden)
    if (showHidden==='true') {
        return pool.query(
            'SELECT * FROM projects'
        )
    }
    else if(showHidden==="false") {
        return pool.query(
            'SELECT * FROM projects WHERE isDeleted!=$1 AND showinportfolio=$2  LIMIT $3 OFFSET $4', [true, true, limit, offset]
        )
    }

};

export const getById = (req: Request, res: Response) => {
    // Save User to Database
    return pool.query(
        'SELECT * FROM projects WHERE id=$1 ', [req.params.projectId]
    )
};

export const add = (req: Request, res: Response) => {
    const { title, date, description, content, image, slug, showinportfolio } = req.body
    return pool.query(
        'INSERT INTO projects (title, date, description, content, image, slug, showinportfolio) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [title, date, description, content, image, slug, showinportfolio]
    )
}
export const deleteItem = (req: Request, res: Response) => {
    console.log(req.params.projectId, "id")
    return pool.query(
        'DELETE FROM projects WHERE "id"=$1',
        [req.params.projectId]
    )

}
export const edit = (req: Request, res: Response) => {
    const { title, date, description, content, image, slug, showinportfolio, id } = req.body
    return pool.query(
        'UPDATE projects SET title=$1, date=$2, description=$3, content=$4, image=$5, slug=$6, showinportfolio=$7 WHERE "id"=$8',
        [title, date, description, content, image, slug, showinportfolio, id]
    )
}
