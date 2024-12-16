import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';
import UserWorkerModel from '../../User/Models/user.models.js'



const JobPostModel = sequelize.define(
  'worknearjobposts',
  {
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
        notNull: { msg: 'Job title is required' },
        notEmpty: { msg: 'Job title cannot be empty' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Job description is required' },
        notEmpty: { msg: 'Job description cannot be empty' },
      },
    },
    jobType: {
      type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Full-Time', 'Part-Time', 'Contract']],
          msg: 'Job type must be Full-Time, Part-Time, or Contract',
        },
      },
    },
    jobMode: {
      type: DataTypes.ENUM('Onsite', 'Remote', 'Hybrid'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Onsite', 'Remote', 'Hybrid']],
          msg: 'Job mode must be Onsite, Remote, or Hybrid',
        },
      },
    },
    skills: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postMode: {
      type: DataTypes.ENUM('Draft', 'Published'),
      allowNull: false,
      defaultValue: 'Draft',
    },
    companyLogoURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: 'Company logo must be a valid URL' },
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Company name is required' },
        notEmpty: { msg: 'Company name cannot be empty' },
      },
    },
    createdBy: {
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
  },
  {
    tableName: 'worknearjobposts',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);


export default JobPostModel;
