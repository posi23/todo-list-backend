import express from "express";
import { taskController } from "../controller";

const router = express.Router();

router.post("/create", taskController.addTask);

router.post("/assignUser", taskController.assignTaskToUser);

router.get("/all", taskController.getAllTask);

router.delete("/delete", taskController.deleteTask);

router.patch("/edit", taskController.editTask);

export default router;