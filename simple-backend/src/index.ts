import express from 'express';
const app = express();

const PORT = 4000;

app.get('/', (req: express.Request, res: express.Response) => {
    res.json("I love docker!");
});

app.listen(PORT, () => {
    console.log('Your server is running on PORT:',PORT);
});