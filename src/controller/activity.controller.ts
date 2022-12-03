import { Request, Response } from "express";
import { ActivityService } from "../services";
import httpStatus from 'http-status';

const addActivity = async (req: Request, res: Response) => {
    try {
        const { newActivity }: { newActivity: string } = req.body;

        const result = await ActivityService.addActivity(newActivity);
        res.status(httpStatus.CREATED).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
}

const getAllActivity = async (req: Request, res: Response) => {
    try {
        const result = await ActivityService.getAllActivity();
        res.status(httpStatus.OK).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
}

const readAllActivities = async (req: Request, res: Response) => {
    try {
        const result = await ActivityService.readAllActivities();
        res.status(httpStatus.OK).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
}


export default {
    addActivity,
    getAllActivity,
    readAllActivities,
}