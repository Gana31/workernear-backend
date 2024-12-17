import CategoriesRespository from "../Repository/category.respository.js";
import UserWorkerModel from "../../User/Models/user.models.js";

const categoryRepository = new CategoriesRespository();

class CategoryService {
  // Create category service
  createCategoryService = async (data) => {
    try {
      // Check if category name already exists
      const existingCategory = await categoryRepository.findOne({ where: { name: data.name } });
      if (existingCategory) {
        throw new Error('Category name already exists');
      }

      // Create new category
      return await categoryRepository.create(data);
    } catch (error) {
      throw error; // Rethrow the error to be handled by the controller
    }
  };

  // Update category service
  updateCategoryService = async (data) => {
    try {
      // Check if the category exists
      const category = await categoryRepository.findById(data.id);

      if (!category) {
        throw new Error('Category not found');
      }

      // Check if the user is the creator of the category
      if (category.createdby !== data.createdby) {
        throw new Error('You are not the creator of this category');
      }

      // Update category
      return await categoryRepository.update(data.id, data);
    } catch (error) {
      throw error;
    }
  };

  deleteCategoryService = async (data) => {
    try {
      // Check if the category exists
      const category = await categoryRepository.findById(data.id);

      if (!category) {
        throw new Error('Category not found');
      }

      // Check if the user is the creator of the category
      if (category.createdby !== data.createdby) {
        throw new Error('You are not the creator of this category');
      }

      // Update category
      return await categoryRepository.delete(data.id);
    } catch (error) {
      throw error;
    }
  };

  // Get all categories created by a specific user
  getCategoriesByUserService = async (userId) => {
    try {
      // Fetch categories created by the specific user
      const categories = await categoryRepository.findAll({
        where: { createdby: userId },
      });

      return categories;
    } catch (error) {
      throw error;
    }
  };

  // Get all categories with services
  getAllCategoriesWithServices = async () => {
    try {
      const categories = await categoryRepository.findAll();

      // Transform each category's services string into an array
      const transformedCategories = categories.map((category) => ({
        id : category.id,
        name: category.name,
      }));

      return transformedCategories;
    } catch (error) {
      throw error;
    }
  };
}

export default new CategoryService();
