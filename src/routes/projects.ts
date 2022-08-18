import express from "express";
import * as authenticate from "../middleware/authentication";
import * as controller from "../controllers/project.controller";
const router = express.Router();

router.get("/", controller.getProjects);
router.get("/:projectId", controller.getProjectById);
router.post("/", authenticate.authenticateJWT, controller.addProject);
router.put("/:projectId", authenticate.authenticateJWT, controller.editProject);
router.delete("/:projectId", authenticate.authenticateJWT, controller.deleteProject);

export default router;
