import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import categoriesService from "../Services/categories.service.js";

class CategoryController {
  // Create category
  createCategory = async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) throw new ApiError(400, "Category name is required");

      const data = { name, createdby: req.user.id }; 

      const response = await categoriesService.createCategoryService(data);

      res.status(201).json(new ApiResponse(201, "Category created successfully", response));
    } catch (error) {
      next(error); 
    }
  };

  // Update category
  updateCategory = async (req, res, next) => {
    try {
      const { id, name } = req.body;

      // Validate input
      if (!id) throw new ApiError(400, "Category ID is required");
      if (!name) throw new ApiError(400, "Category name is required");

      req.body.createdby = req.user.id;
      const response = await categoriesService.updateCategoryService(req.body);

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Category updated successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  // Get all categories
  getAllCategories = async (req, res, next) => {
    try {
      // Call the service method to get all categories
      const categories = await categoriesService.getAllCategoriesWithServices();

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Categories retrieved successfully", categories));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  // Get categories by a specific user (created by user)
  getCategoriesByUser = async (req, res, next) => {
    try {

      const userId = req.user.id; 
     
      const categories = await categoriesService.getCategoriesByUserService(userId);

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Categories retrieved successfully", categories));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  deleteCategory = async (req, res, next) => {
    try {
      const { id} = req.body;
        console.log(req.body)
      // Validate input
      if (!id) throw new ApiError(400, "Category ID is required");

      req.body.createdby = req.user.id;
      const response = await categoriesService.deleteCategoryService(req.body);

      console.log(response)

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Category deleted successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };
}

export default new CategoryController();
