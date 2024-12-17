import express from 'express'
import categoryController from '../Controller/category.controller.js';
import { authMiddleware, requireRole } from '../../Middleware/authMiddleware.js';


const categoriesRouter = express.Router();

categoriesRouter.post("/createcategories",authMiddleware,categoryController.createCategory);
categoriesRouter.get("/getAllCategories",categoryController.getAllCategories);
categoriesRouter.get("/getusercategories",authMiddleware,categoryController.getCategoriesByUser);
categoriesRouter.put("/updatecategories",authMiddleware,categoryController.updateCategory);
categoriesRouter.post("/deletecategories",authMiddleware,categoryController.deleteCategory);

export default categoriesRouter;