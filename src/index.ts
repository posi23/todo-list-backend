import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import routes from './routes';
import { initializeDB, populateUsers } from './functions';

const app = express();
const port = process.env.PORT || 8080;

initializeDB();
// populateUsers();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.use((req, res, next) => {
    res.status(404).send({ error: "Route not found" });
    next();
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})