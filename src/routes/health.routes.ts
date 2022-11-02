import express from "express";
import { healthController } from "../controller";

const router = express.Router();

router.get("/isHealthy", healthController.isHealthy);

export default router;