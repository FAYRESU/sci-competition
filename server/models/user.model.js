import sequelize from "./db.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, //ต้องยืนยันอีเมลก่อน
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          //เติมเกลือ
          //genSalt = genaralSalt
          const salt = await bcrypt.genSalt(10);
          // ต้องเข้ารหัสใหม่
          user.password = bcrypt.hash(user.password, salt);
        }
      },
      //กรณีเปลี่ยน password
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          // ต้องเข้ารหัสใหม่
          user.password = bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);
User.prototype.comparePassword = async function (candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
;}

export default User;
