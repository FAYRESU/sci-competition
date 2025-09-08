import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece

const Judge = User.init(
  {},
  {
    scopes: {
      defaultScope: {
        where: {
          type: "judge",
        },
      },
    },
  },
  {
    beforeCreate: (judge) => {
      judge.type = "judge";
    },
  }
);

export default Judge;
