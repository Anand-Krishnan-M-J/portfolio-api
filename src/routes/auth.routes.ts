import express from "express";
// import { verifySignUp } from "../middleware/verifySignUp";
import * as validate from "../middleware/validations";
import * as authenticate from "../middleware/authentication";
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup",validate.signUp, controller.userSignup);
router.post("/login", validate.login, controller.userLogin);
router.get("/profile", authenticate.authenticateJWT, controller.getProfile);

export default router;
