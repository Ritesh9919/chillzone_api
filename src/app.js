import express from 'express';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js'
import likeRouter from './routes/like.route.js'
import friendshipRouter from './routes/friendship.route.js'

import {errorhandlerMiddleware} from './middlewares/error_handler.middleware.js'
import {notFoundMiddleware} from './middlewares/not_found.middleware.js'



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/', (req, res)=> {
    res.send("Hello World");
})


app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/friends', friendshipRouter)

app.use(notFoundMiddleware);
app.use(errorhandlerMiddleware);


export {app}