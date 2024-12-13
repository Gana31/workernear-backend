import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';

const CategoryModel = sequelize.define('worknearcategories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "Category name is required" },
      notEmpty: { msg: "Category name cannot be empty" },
    },
  },
  services: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'worknearcategories',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enables soft deletes
});

export default CategoryModel;
