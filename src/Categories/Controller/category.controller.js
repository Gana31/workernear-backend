import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import categoriesService from "../Services/categories.service.js";



class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      const { name, services } = req.body;

      // Validate input at the controller level
      if (!name) throw new ApiError(400, "Name is required");
      if (!services || !Array.isArray(services) || services.length === 0) {
        throw new ApiError(400, "Services must be a non-empty array");
      }

      // Prepare data for the service
      const data = { name, services };

      // Call service method to create category
      const response = await categoriesService.createCategoryService(data);

      // Respond with success
      res.status(201).json(new ApiResponse(201, "Category created successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      const { id, name,services } = req.body;

      // Validate input
      if (!id) throw new ApiError(400, "Category ID is required");
      if (!name) throw new ApiError(400, "Name is required");
      if (!services || !Array.isArray(services)) {
        throw new ApiError(400, "Services must be an array");
      }

      // Prepare data for the service
      const data = { id, name, description, services };

      // Call service method to update category
      const response = await categoriesService.updateCategoryService(data);

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Category updated successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  getAllCategories = async (req, res, next) => {
    try {
      // Call the service method
      const categories = await categoriesService.getAllCategoriesWithServices();

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Categories retrieved successfully", categories));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };
 
}

export default new CategoryController();
