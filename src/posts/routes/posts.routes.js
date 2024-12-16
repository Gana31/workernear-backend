import express from 'express'
import postsController from '../Controller/posts.controller';



const postsRouter = express.Router();

postsRouter.post("/createposts",postsController.createPost);
postsRouter.post("/updateposts",postsController.updatePost);

export default postsRouter;