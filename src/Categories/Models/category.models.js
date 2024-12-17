import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';
import UserWorkerModel  from '../../User/Models/user.models.js';

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
  createdby: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserWorkerModel,
      key: 'id',
    },
    onDelete: 'CASCADE', // Deletes job posts if the user is deleted
    onUpdate: 'CASCADE',
    validate: {
      notNull: { msg: 'CreatedBy field is required' },
    },
  },
}, {
  tableName: 'worknearcategories',
  timestamps: true,
  underscored: true,
});

export default CategoryModel;
