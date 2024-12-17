import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';
import UserWorkerModel from '../../User/Models/user.models.js';

const PostModel = sequelize.define('worknearjobposts', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Job title is required" },
      notEmpty: { msg: "Job title cannot be empty" },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // For visual mode, this will store the image URL
  },
  jobType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Job type is required" },
      notEmpty: { msg: "Job type cannot be empty" },
    },
  },
  jobMode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Onsite", // Can be Onsite, Remote, or Hybrid
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postMode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Draft", // Can be Draft or Public
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true, // Only used for traditional mode
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true, // Only used for traditional mode
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false, // 'traditional' or 'visual' to differentiate the mode
    validate: {
      isIn: [["traditional", "visual"]],
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
      notNull: { msg: "CreatedBy field is required" },
    },
  },
}, {
  tableName: 'worknearjobposts',
  timestamps: true,
  underscored: true,
});

export default PostModel;
