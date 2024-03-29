import express from 'express';
import healthRoute from './health.routes';
import userRoute from "./user.routes";
import taskRoute from "./task.routes";
import activityRoute from "./activity.routes";

const router = express.Router();

const allRoutes = [
    {
        path: "/health",
        route: healthRoute,
    },

    {
        path: "/user",
        route: userRoute,
    },

    {
        path: "/task",
        route: taskRoute,
    },

    {
        path: "/activity",
        route: activityRoute,
    },
];

allRoutes.forEach(eachRoute => {
    router.use(eachRoute.path, eachRoute.route);
});

export default router;