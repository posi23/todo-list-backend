import express from 'express';
import healthRoute from './health.routes';
import userRoute from "./user.routes";
import taskRoute from "./task.routes";

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
];

allRoutes.forEach(eachRoute => {
    router.use(eachRoute.path, eachRoute.route);
});

export default router;