import express from 'express'
import userController from '../Controller/user.controller.js';

const userRouter = express.Router();

userRouter.post("/register",userController.userRegister);
userRouter.post("/login",userController.userlogin);
userRouter.post("/logout",userController.Logout);
userRouter.post("/createContactus",userController.createContactus);

export default userRouter;