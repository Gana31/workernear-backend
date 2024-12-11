import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databaseconfig.js';
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const ContactModel = sequelize.define('worknearscontacts', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures email uniqueness
    validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: function (value) {
          if (value !== "" && !validateEmail(value)) {
            throw new ApiError(400,"Invalid Email Address");
          }
        },
        async isUnique(value) {
          const existingUser = await ContactModel.findOne({
            where: {
              email: value,
            },
          });
          if (existingUser) {
            throw new Error("Email already in use!");
          }
        },
      },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 12], // Validates phone number length
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'worknearscontacts',
  timestamps: true, // Adds createdAt and updatedAt fields
});

export default ContactModel;
