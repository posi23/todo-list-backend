import express from "express";
import { userController } from "../controller";

const router = express.Router();

router.get("/all", userController.getAllUsers);

export default router;