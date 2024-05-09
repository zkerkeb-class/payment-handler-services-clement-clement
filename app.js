import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
