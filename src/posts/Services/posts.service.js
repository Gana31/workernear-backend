import PostsRespository from "../Repository/posts.respository.js";

const postsRepository = new PostsRespository();

class PostsService {
  createPostService = async (data) => {
    try {
      // Convert services array to a concatenated string
      data.services = data.services.join('.');

      // Save category to the database
      return await postsRepository.create(data);
    } catch (error) {
      throw error; // Rethrow the error to be handled by the controller
    }
  };

  updatePostsService = async (data) => {
    try {
      // Convert services array to a concatenated string
      data.services = data.services.join('.');

      // Update category in the database
      return await postsRepository.update(data.id, data);
    } catch (error) {
      throw error; 
    }
  };

}

export default new PostsService();
