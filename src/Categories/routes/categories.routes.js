import express from 'express'
import categoryController from '../Controller/category.controller.js';


const categoriesRouter = express.Router();

categoriesRouter.post("/createcategories",categoryController.createCategory);
categoriesRouter.get("/getAllCategories",categoryController.getAllCategories);
// categoriesRouter.post("/logout",userController.Logout);
// categoriesRouter.post("/createContactus",userController.createContactus);

export default categoriesRouter;