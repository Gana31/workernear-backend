import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import postsService from "../Services/posts.service.js";




class PostsController {
  createPost = async (req, res, next) => {
    try {
      const { body, files } = req;

      // Validate if the request body is not empty
      if (!body || Object.keys(body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
      }
      // Add the ID of the user creating the post
      body.createdby = req.user.id;
      body.companyimgae = body.profilePicture;
        // console.log(body)
      // Delegate to the service layer for handling all business logic
      const post = await postsService.createPostService(body, files);

      // Send response
      res.status(201).json(new ApiResponse(201, "Post created successfully", post));
    } catch (error) {
      next(error);
    }
  };

  getPostsByUserId = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const posts = await postsService.getPostsByUserIdService(userId);
      if (posts.length > 0) {
        return res.status(200).json(new ApiResponse(200, "Post found successfully", posts));
      }
      return res.status(200).json(new ApiResponse(200, "No Post found",posts));
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  };
  
  // Update Post
updatePost = async (req, res, next) => {
  try {
      const { body } = req;
      const { id } = req.params;
      const { files } = req;
      console.log(body)

      // Validate input
      if (!id) throw new ApiError(400, "Post ID is required");
      body.id = id;

      // Delegate to service layer
      const updatedPost = await postsService.updatePostService(body, files);

      // Send response
      res.status(200).json(new ApiResponse(200, "Post updated successfully", updatedPost));
  } catch (error) {
      next(error);
  }
};

// Get All Posts
getAllPosts = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const { keywords, location } = req.query;  // Extract query parameters
    // console.log(req.query);  // Log for debugging

    // Pass query parameters to the service layer
    const posts = await postsService.getAllPostsService({ keywords, location ,id });

    // Send response
    res.status(200).json(new ApiResponse(200, "Posts fetched successfully", posts));
  } catch (error) {
    next(error);
  }
};


  // Get Post by ID
  getPostById = async (req, res, next) => {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id) throw new ApiError(400, "Post ID is required");

      // Delegate to service layer
      const post = await postsService.getPostByIdService(id);

      // Send response
      res.status(200).json(new ApiResponse(200, "Post fetched successfully", post));
    } catch (error) {
      next(error);
    }
  };

  // Delete Post
  deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id) throw new ApiError(400, "Post ID is required");

      // Delegate to service layer
      await postsService.deletePostService(id);

      // Send response
      res.status(200).json(new ApiResponse(200, "Post deleted successfully"));
    } catch (error) {
      next(error);
    }
  };

  applyForJob = async (req, res, next) => {
    try {
        const { jobId } = req.body;  // Assuming userId and jobId are sent in the body
      const userId = req.user.id;
        // Call the service to apply for the job
        const application = await postsService.applyForJob(userId, jobId);

        // Send response if the application is successful
        res.status(200).json(new ApiResponse(200, 'Job applied successfully', application));
    } catch (error) {
        next(error);
    }
};
  
getJobApplications = async (req, res, next) => {
  try {
    const { id } = req.params;  // Job ID is passed as a URL parameter
    // Validate if jobId is provided
    const jobId = id;
    console.log(jobId)
    if (!jobId) {
      throw new ApiError(400, "Job ID is required");
    }

    // Get the job applications using the service
    const applications = await postsService.getJobApplicationsForJob(jobId);

    // Send response
    res.status(200).json(new ApiResponse(200, "Job applications fetched successfully", applications));
  } catch (error) {
    
    next(error);  // Pass the error to the global error handler
  }
};

changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;  // Job ID is passed as a URL parameter
    const {status,jobTitle,companyName,userEmail} = req.body
    if (!id) {
      throw new ApiError(400, "Job ID is required");
    }

    // Get the job applications using the service
    const applications = await postsService.changeStatus(id,status,jobTitle,companyName,userEmail);

    // Send response
    res.status(200).json(new ApiResponse(200, "Job applications fetched successfully", applications));
  } catch (error) {
    
    next(error);  // Pass the error to the global error handler
  }
};
 
}

export default new PostsController();
