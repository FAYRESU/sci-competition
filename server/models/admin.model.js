import User from "./user.model.js";
import { DataTypes } from "sequelize";
import sequelize from "./db.js"; // สมมติว่าไฟล์นี้สร้างและ export sequelize instance ไว้

const Admin = User.init(
  {},
  {
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
    hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);

export default Admin;
