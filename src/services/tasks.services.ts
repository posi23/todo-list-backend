import db from '../db';
import { ApiError } from '../utils';
import httpStatus from "http-status";
import { EditTaskType, Task, UserTask } from '../types';

const addTask = async (taskName: string, description: string, dueDate: string, assignees: number[]) => {
    try {

        const newTaskQuery = `INSERT INTO tasks ("taskName", description, "dueDate")
        VALUES ($1, $2, $3)
        RETURNING *;`

        const addAssigneeQuery = `INSERT INTO user_task (uid, "taskId")
        VALUES ($1, $2);`

        const { rows } = await db.query(newTaskQuery, [taskName, description, dueDate]);

        assignees.forEach(async assigneeId => {
            await db.query(addAssigneeQuery, [assigneeId, rows[0].id]);
        });

        return rows[0];
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const assignTaskToUser = async (uid: number, taskId: Number) => {
    try {
        const assignUserToTaskQuery = `INSERT INTO user_task (uid, "taskId")
        VALUES ($1, $2);`

        await db.query(assignUserToTaskQuery, [uid, taskId]);
        return true;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const getAllTask = async () => {
    try {
        const { rows }: { rows: Task[] } = await db.query(`SELECT * FROM tasks`);

        const { rows: assignedUsers }: { rows: UserTask[] } = await db.query(`SELECT * from user_task`);

        const tasks = rows.map(each => {
            const temp = { ...each };
            temp.assignees = [];
            assignedUsers.forEach(eachAssigned => {
                if (eachAssigned.taskId == temp.id) temp.assignees?.push(eachAssigned.uid);
            });
            return temp;
        })

        return tasks;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const deleteTask = async (taskId: number) => {
    try {
        const deleteQuery = `DELETE FROM tasks
        WHERE id=$1;`

        const removeUserTaskQuery = `DELETE FROM user_task
        WHERE "taskId"=$1;`

        await db.query(removeUserTaskQuery, [taskId]);
        await db.query(deleteQuery, [taskId]);

        return true;

    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const editTask = async (task: EditTaskType) => {
    try {
        const { rows } = await db.query(
            `UPDATE tasks
            SET
            "taskName"=$1,
            description=$2,
            completed=$3
            WHERE id=$4
            RETURNING updated_at;`,
            [
                task.taskName,
                task.description,
                task.completed,
                task.id
            ]
        )

        return rows;
    } catch (error: any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};


export default {
    addTask,
    assignTaskToUser,
    getAllTask,
    deleteTask,
    editTask
};