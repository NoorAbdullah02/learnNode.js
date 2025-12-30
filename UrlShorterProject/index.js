import express from 'express';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import { authenticationMiddleware } from './middleware/authMiddleware.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.json({ message: 'ok' })
})

app.use('/user', userRouter);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})