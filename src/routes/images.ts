import express from "express";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/image.controller";
const router = express.Router();


router.post("/", controller.addImage);

export default router;
