import sequelize from "./db.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece

const User = sequelize.define("user",  {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

export default User;
