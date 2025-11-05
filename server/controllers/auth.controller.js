import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js"; //index เป็นคนชี้แจง
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email.js";
import path from "path";

const User = db.User; //ข้างหน้าคือ class

//Register
const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    //Check varidation request
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Email, Password, Type and Name are reqiured !" });
    }

    const allowedType = ["admin", "teacher", "judge"];
    //เช็คว่า type ตรงไหม
    if (!allowedType.includes(type)) {
      return res.status(400).send({
        message: "Invalid user type. Must be admin, teacher or judge",
      });
    }
    //Addition validation for teacher
    if (type === "teacher" && (!school || !phone)) {
      return res.status(400).send({
        message: "School and Phone are required for teacher!",
      });
    }

    //check if user already exists
    //await คือหยุดทำงาน ต่อ if ได้เลย
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Email already in use!" });
    }

    //Create user object base on type
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
      isVerified: false,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    //Create new User
    const user = await User.create(userData);

    //If user is a teacher, create and send verification email
    //create token teacher
    if (type === "teacher") {
      try {
        //create verification token
        //บันทึกฐานข้อมูลเรียบร้อยแล้ว
        const token = crypto.randomBytes(32).toString("hex"); //เลขฐาน 16
        const verification = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 h
        });
        console.log("Verification token created", verification);

        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification email sent successfully!");
        //send Email
      } catch (error) {
        console.log("Error sending verification email", error);
      }
    }

    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successfully! Please check your email to verifity your accouct"
          : " User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred ehile creating the user",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).send({ message: "Token is missing!" });
  }
  try {
    const verificationToken = await db.VerificationToken.findOne({
      where: { token: token },
    });
    if (!verificationToken) {
      return res.status(400).send({ message: "Invalid or expired token!" });
    }
    //Check if token is expired
    if (new Date() > verificationToken.expiredAt) {
      await verificationToken.destroy();
      return res.status(400).send({
        message: "Versification token has expired. Please request a new one.",
      });
    }
    //ทำการดึง user มาก่อน
    const user = await User.findByPk(verificationToken.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    //ตั๋วยังไม่หมดอายุ และ user มีอยู่ ต้องเปลี่ยนสถานะ
    await user.update({ isVerified: true });
    await verificationToken.destroy(); //ลบ token ทิ้ง ใช้แบบ one time
    //ต้องรีเทิร์นหน้า web views
    const htmlPath = path.join(
      process.cwd(),
      "views", //ที่อยู่ project
      "verification-success.html"
    ); //views/verification-success.html
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while verifying user",
    });
  }
};

const authController = {
  signUp,
  verifyEmail,
};

export default authController;
