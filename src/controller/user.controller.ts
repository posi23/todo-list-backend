import { Request, Response } from "express";
import { userService } from "../services";
import httpStatus from 'http-status';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(httpStatus.CREATED).send(users);
    } catch (error: any) {
        res.status(error.status || 404).send({
            message: error.message,
            status: error.status
        });
    }
};

export default {
    getAllUsers
};