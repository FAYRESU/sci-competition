import sequelize from "./db.js"; // หรือไฟล์ที่คุณเก็บ instance ไว้
import User from "./user.model.js";
import { DataTypes } from "sequelize";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
