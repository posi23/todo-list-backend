import db from '../db';
import { ApiError } from '../utils';
import httpStatus from "http-status";


const getAllUsers = async () => {
    try {
        const { rows } = await db.query(
            `SELECT uid, fullname FROM users`
        );

        return rows;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

export default {
    getAllUsers
};