import db from '../db';
import { ApiError } from '../utils';
import httpStatus from "http-status";

const addActivity = async (newActivity: string) => {
    try {
        const addActivityQuery = `INSERT INTO activities (activity)
        VALUES ($1)
        RETURNING created_at;`

        const { rows } = await db.query(addActivityQuery, [newActivity]);
        return rows[0].created_at;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

const getAllActivity = async () => {
    try {
        const getAllActivityQuery = `SELECT activity, read, created_at FROM activities`
        const { rows } = await db.query(getAllActivityQuery);
        console.log(rows);
        return rows;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

const readAllActivities = async () => {
    try {
        const readAllActivityQuery = `
        UPDATE activities
        SET
        read=true
        WHERE read=false;`

        await db.query(readAllActivityQuery);
        return true;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}


export default {
    addActivity,
    getAllActivity,
    readAllActivities,
};