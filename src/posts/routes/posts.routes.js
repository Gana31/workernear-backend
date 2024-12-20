import express from 'express'
import postsController from '../Controller/posts.controller.js';
import { conditionalUploadMiddleware } from '../../../config/multer.js';
import { authMiddleware } from '../../Middleware/authMiddleware.js';



const postsRouter = express.Router();

postsRouter.post("/createposts",authMiddleware,conditionalUploadMiddleware,postsController.createPost);
postsRouter.post("/updateposts/:id",authMiddleware,conditionalUploadMiddleware,postsController.updatePost);
postsRouter.delete("/deleteposts/:id",authMiddleware,postsController.deletePost);
postsRouter.get("/getalluserposts",authMiddleware,postsController.getPostsByUserId);
postsRouter.get("/getallpublicposts",authMiddleware,postsController.getAllPosts);
postsRouter.post("/applyjob",authMiddleware,postsController.applyForJob);
postsRouter.get('/jobapplication/:id', postsController.getJobApplications);
postsRouter.put('/applicationstatusChange/:id', postsController.changeStatus);
export default postsRouter;