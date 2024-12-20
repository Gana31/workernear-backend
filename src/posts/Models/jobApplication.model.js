import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';

const JobApplication = sequelize.define('JobApplication', {
   id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',  // Default status when the user applies
    allowNull: false,
  },
});


export default JobApplication;
