import { Request, Response } from "express";

const isHealthy = (req: Request, res: Response) => {
    res.status(200).send({ message: "Server is healthy." });
};

export default {
    isHealthy,
};