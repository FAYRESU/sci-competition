import sequelize from "./db.js";
import Sequelize from "sequelize"  // libralies
import User from "./user.model.js"
import Activity from "./activity.model.js";
import Teacher from "./teacher.model.js";
import Judge from "./judge.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./verificationToken.model.js";


const db = {};
// S ตัวเล็ก
//import มาจาก db.js
db.sequelize = sequelize;
// S ตัวใหญ่
//import มาจาก libralies
db.Sequelize = Sequelize;


db.User = User;
db.Activity = Activity;
db.Admin = Admin;
db.Teacher = Teacher;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

//association
db.VerificationToken.belongTo(db.User, { foreigKey: "userId"});
db.User.belongTo(db.VerificationToken, { foreigKey: "userId" });

export default db;
