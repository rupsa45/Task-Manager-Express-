import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const isLoggedIn =async(req,res)=>{
  try {
    res.status(200).json({ loggedIn: true });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
}

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ([username, email, password].some((fields) => fields?.trim() === "")) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    //check if user existed or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already existed" });
    }
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((fields) => fields?.trim() === "")) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    //check if user existed or not
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //check if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    //generate token
    const token = generateToken(res, userExist._id);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Failed to log out user" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
