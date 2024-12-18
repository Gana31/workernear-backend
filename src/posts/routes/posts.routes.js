import express from 'express'
import postsController from '../Controller/posts.controller.js';
import { conditionalUploadMiddleware } from '../../../config/multer.js';
import { authMiddleware } from '../../Middleware/authMiddleware.js';



const postsRouter = express.Router();

postsRouter.post("/createposts",authMiddleware,conditionalUploadMiddleware,postsController.createPost);
postsRouter.post("/updateposts",authMiddleware,conditionalUploadMiddleware,postsController.updatePost);
postsRouter.delete("/deleteposts/:id",authMiddleware,postsController.deletePost);
postsRouter.get("/getalluserposts",authMiddleware,postsController.getPostsByUserId);


export default postsRouter;