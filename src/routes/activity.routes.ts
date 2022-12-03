import express from "express";
import { activityController } from "../controller";

const router = express.Router();

router.get("/all", activityController.getAllActivity);

router.post("/create", activityController.addActivity);

router.patch("/setRead", activityController.readAllActivities);

export default router;