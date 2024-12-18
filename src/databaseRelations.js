
import CategoryModel from "./Categories/Models/category.models.js";
import JobPostModel from "./posts/Models/posts.models.js";
import UserWorkerModel from "./User/Models/user.models.js";

// Many-to-Many Association
UserWorkerModel.belongsToMany(CategoryModel, {
    through: 'worknearcategories', // Join table
    as: 'categories', // Alias for related categories
    foreignKey: 'id',
  });
  
  CategoryModel.belongsToMany(UserWorkerModel, {
    through: 'worknearcategories',
    as: 'users', // Alias for related users
    foreignKey: 'id',
  });
  
  // One-to-Many Association for Creator
  CategoryModel.belongsTo(UserWorkerModel, {
    as: 'creator', // Alias for the creator
    foreignKey: 'id',
  });
  
  UserWorkerModel.hasMany(CategoryModel, {
    as: 'createdCategories', // Alias for categories created by the user
    foreignKey: 'id',
  });
  

  UserWorkerModel.hasMany(JobPostModel, {
    foreignKey: 'createdby',
    as: 'jobPosts',
  });
  
  JobPostModel.belongsTo(UserWorkerModel, {
    foreignKey: 'createdby',
    as: 'creator',
  });
  

  export {CategoryModel,UserWorkerModel,JobPostModel};