import CategoriesRespository from "../Repository/category.respository.js";


const categoryRepository = new CategoriesRespository();

class CategoryService {
  createCategoryService = async (data) => {
    try {
      // Convert services array to a concatenated string
      data.services = data.services.join('.');

      // Save category to the database
      return await categoryRepository.create(data);
    } catch (error) {
      throw error; // Rethrow the error to be handled by the controller
    }
  };

  updateCategoryService = async (data) => {
    try {
      // Convert services array to a concatenated string
      data.services = data.services.join('.');

      // Update category in the database
      return await categoryRepository.update(data.id, data);
    } catch (error) {
      throw error; 
    }
  };

  getAllCategoriesWithServices = async () => {
    try {
      
      const categories = await categoryRepository.findAll();
    //   console.log(categories);

      // Transform each category's services string into an array
      const transformedCategories = categories.map((category) => ({
        name :category.name,
        services: category.services ? category.services.split('.') : [], 
      }));

      return transformedCategories;
    } catch (error) {
      throw error; 
    }
  };
}

export default new CategoryService();
