import { Request, Response } from "express";
import { taskService } from "../services";
import httpStatus from 'http-status';
import { EditTaskType } from "../types";

const addTask = async (req: Request, res: Response) => {
    try {
        const { taskName, description, dueDate, assignees }: { taskName: string, description: string, dueDate: string, assignees: number[] } = req.body;

        const result = await taskService.addTask(taskName, description, dueDate, assignees);
        res.status(httpStatus.CREATED).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
};

const assignTaskToUser = async (req: Request, res: Response) => {
    try {
        const { uid, taskId } = req.body;
        const result = await taskService.assignTaskToUser(uid, taskId);
        res.status(httpStatus.CREATED).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
};

const getAllTask = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTask();
        res.status(httpStatus.OK).send(tasks);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    };
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId }: { taskId: number } = req.query as any;
        const correctTaskId = Number(taskId);
        const result = await taskService.deleteTask(correctTaskId);
        res.status(httpStatus.OK).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    };
};


const editTask = async (req: Request, res: Response) => {
    try {
        const { data }: { data: EditTaskType } = req.body;
        const result = await taskService.editTask(data);
        res.status(httpStatus.OK).send(result);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    };
};

export default {
    addTask,
    assignTaskToUser,
    getAllTask,
    deleteTask,
    editTask,
}