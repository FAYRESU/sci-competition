import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece

const Admin = User.init(
  {
   
  },
  {
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
    beforeCreate: (admin) => {
      admin.type = "admin";
    },
  }
);

export default Admin;
