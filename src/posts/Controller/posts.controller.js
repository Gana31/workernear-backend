import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import postsService from "../Services/posts.service.js";




class PostsController {
  createPost = async (req, res, next) => {
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
      const response = await postsService.createPostService(data);

      // Respond with success
      res.status(201).json(new ApiResponse(201, "Category created successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };

  updatePost = async (req, res, next) => {
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
      const response = await postsService.updatePostsService(data);

      // Respond with success
      res.status(200).json(new ApiResponse(200, "Category updated successfully", response));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };


 
}

export default new PostsController();
