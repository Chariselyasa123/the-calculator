import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Statistic from "../models/statistic.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null)
      return res.status(404).json({ message: "Email tidak ditemukan" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.where({ _id: user._id }).update({ refreshToken });
    await Statistic.create({
      loginTime: new Date(),
      user,
    });

    await session.commitTransaction();
    session.endSession();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: "false",
    });
    res.json({
      accessToken,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    session.abortTransaction();
    console.log(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Password dan confirm password tidak cocok" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null)
      return res.status(400).json({ message: "Email sudah digunakan" });

    const savedUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const accessToken = jwt.sign(
      { userId: savedUser._id, name: savedUser.name, email: savedUser.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId: savedUser._id, name: savedUser.name, email: savedUser.email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.where({ _id: savedUser._id }).update({ refreshToken });
    await Statistic.create({
      loginTime: new Date(),
      user,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: "false",
    });
    res.status(201).json({
      accessToken,
      name: savedUser.name,
      email: savedUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken });
    if (user === null) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { userId: user.id, name: user.name, email: user.email },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "20s",
        }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await User.findOne({ refreshToken });
    if (user === null) return res.sendStatus(204);

    await User.where({ _id: user._id }).update({ refreshToken: null });
    await Statistic.where({ user: { _id: user._id } }).update({
      logoutTime: new Date(),
    });

    await session.commitTransaction();
    session.endSession();

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    session.abortTransaction();
    console.log(error);
  }
};
