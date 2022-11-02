import express from 'express';
import healthRoute from './health.routes';
import userRoute from "./user.routes";

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
];

allRoutes.forEach(eachRoute => {
    router.use(eachRoute.path, eachRoute.route);
});

export default router;