import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})