import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { signupSchema, signinSchema } from "../Schemas/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // validate
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // kiểm tra email tồn tại
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    user.password = undefined;
    res.status(201).json({
      message: "Đăng ký thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
export const signin = async (req, res) => {
  try {
    console.log(1);
    const { email, password } = req.body;
    //validate
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // kiểm tra email khớp
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    // token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    user.password = undefined;
    res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
    
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
