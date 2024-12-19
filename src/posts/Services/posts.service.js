import { deleteFromCloudinary, uploadToCloudinary } from "../../../config/multer.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import PostsRespository from "../Repository/posts.respository.js";

const postsRepository = new PostsRespository();

class PostsService {
  createPostService = async (data, files) => {
    try {
      if (!data) throw new ApiError(400, "Data is not present in the service layer of create post");

      // Handle visual mode image upload
      if (data.mode === 'visual') {
        if (!files || !files.images || files.images.length === 0) {
          throw new ApiError(400, "An image is required for visual mode");
        }

        // Upload the image to Cloudinary
        const image = files.images[0];
        const cloudinaryResponse = await uploadToCloudinary(image, 'jobpostimages');

        // Append Cloudinary response details to the post data
        data.imagepublicid = cloudinaryResponse.public_id;
        data.image = cloudinaryResponse.secure_url;
      }

      // Save the post to the database via the repository
      const savedPost = await postsRepository.create(data);
      return savedPost;
    } catch (error) {
      throw new ApiError(500, error.message || "Error creating post");
    }
  };

  updatePostService = async (data, files) => {
    try {
        // Retrieve the existing post from the database
        const existingPost = await postsRepository.findById(data.id);
        if (!existingPost) throw new ApiError(404, "Post not found");

        // Handle visual mode updates
        if (data.mode === 'visual') {
            // Check if new files are provided
            if (files && files.images && files.images.length > 0) {
                const newImage = files.images[0];

                // Upload the new image to Cloudinary
                const cloudinaryResponse = await uploadToCloudinary(newImage, 'jobpostimages');

                // Delete the old image from Cloudinary if it exists
                if (existingPost.imagepublicid) {
                    await deleteFromCloudinary(existingPost.imagepublicid);
                }

                // Update the data with new image details
                data.imagepublicid = cloudinaryResponse.public_id;
                data.image = cloudinaryResponse.secure_url;
            } else {
                // Ensure existing image is retained if no new image is uploaded
                data.imagepublicid = existingPost.imagepublicid;
                data.image = existingPost.image;
            }
        }

        // Update the post in the database
        const updatedPost = await postsRepository.update(data.id, data);

        return updatedPost;
    } catch (error) {
        throw new ApiError(500, error.message || "Error updating post");
    }
};

  // Get All Posts
  getAllPostsService = async () => {
    try {
      return await postsRepository.findAll();
    } catch (error) {
      throw new Error(error.message || "Error fetching all posts");
    }
  };

  // Get Post by ID
  getPostByIdService = async (id) => {
    try {
      return await postsRepository.findById(id);
    } catch (error) {
      throw new Error(error.message || "Error fetching post by ID");
    }
  };

  // Delete Post
  deletePostService = async (id) => {
    try {
      return await postsRepository.delete(id);
    } catch (error) {
      throw new Error(error.message || "Error deleting post");
    }
  };

  getPostsByUserIdService = async (id) => {
    try {
        // Pass the userId in the options to filter posts by userId
        let posts = await postsRepository.findAll({
            where: { createdby :id } // Filter posts by userId
        });
        if (!posts || posts.length === 0) {
         return posts = []
        }
        return posts;
    } catch (error) {
        throw new ApiError(500, error.message || "Error fetching posts for the user");
    }
};


}

export default new PostsService();
