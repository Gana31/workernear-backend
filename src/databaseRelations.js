
import CategoryModel from "./Categories/Models/category.models.js";
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
  

  export {CategoryModel,UserWorkerModel};