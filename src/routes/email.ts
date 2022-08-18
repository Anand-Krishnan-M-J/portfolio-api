import express from "express";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/email.controller";
const router = express.Router();

router.get("/",authenticate.authenticateJWT, controller.getEmails);
router.post("/", controller.sendEmail);

export default router;
