import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece
import sequelize from "./db.js";

const Judge = User.init(
  {},
  {
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "judge",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (judge) => {
        judge.type = "judge";
      },
    },
  }
);

export default Judge;
