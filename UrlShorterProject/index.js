import express from 'express';
import userRouter from './routes/user.route.js';
import urlRouter from './routes/url.route.js';
import cookieParser from 'cookie-parser';
import { authenticationMiddleware } from './middleware/authMiddleware.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.json({ message: 'ok' })
})

app.use('/user', userRouter);
app.use(urlRouter)


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})