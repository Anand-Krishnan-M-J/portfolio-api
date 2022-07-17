import express from "express";
import { verifySignUp } from "../middleware/user/verifySignUp";
import * as validate from "../middleware/user/validations";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/user.controller";
const router = express.Router();

router.post("/signup",validate.signUp,verifySignUp.checkDuplicateUsernameOrEmail, controller.userSignup);
router.post("/login", validate.login, controller.userLogin);
router.get("/profile", authenticate.authenticateJWT, controller.getProfile);

export default router;
