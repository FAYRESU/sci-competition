import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const PORT = process.env.PORT || 5000;
// import ActivityRouter from "./routers/activity.routers.js";
// import db from "./models/index.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const Role = db.Role;
// Function to initialize roles
// const initRole = async () => {
//   try {
//     await Role.findOrCreate({ where: { id: 1 }, defaults: { roleName: "user" } });
//     await Role.findOrCreate({ where: { id: 2 }, defaults: { roleName: "moderator" } });
//     await Role.findOrCreate({ where: { id: 3 }, defaults: { roleName: "admin" } });
//     console.log("Initial roles created");
//   } catch (err) {
//     console.error("Error initializing roles:", err);
//   }
// };
// initRole();

// Sync database
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("create table user_roles");
// });

// Homepage
app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

// Routers
// app.use("/api/v1/activity", ActivityRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
