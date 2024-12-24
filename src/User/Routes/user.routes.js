import express from 'express'
import userController from '../Controller/user.controller.js';
import { authMiddleware } from '../../Middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register",userController.userRegister);
userRouter.post("/login",userController.userlogin);
userRouter.post("/logout",userController.Logout);
userRouter.post("/createContactus",userController.createContactus);
userRouter.post("/createprofile",authMiddleware,userController.createprofile);
userRouter.get("/getallprofile",authMiddleware,userController.getAllUser);
userRouter.post("/getuserprofile",authMiddleware,userController.getUserProfile);


export default userRouter;