import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation
    if (!name) {
      return res.send({
        message: "Name is required",
      });
    }
    if (!email) {
      return res.send({
        message: "Email is required",
      });
    }
    if (!password) {
      return res.send({
        message: "Password is required",
      });
    }
    if (!phone) {
      return res.send({
        message: "Phone is required",
      });
    }
    if (!address) {
      return res.send({
        message: "Address is required",
      });
    }
    if (!answer) {
      return res.send({
        message: "Answer is required",
      });
    }
    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already  Register! Please login",
      });
    }

    //Register User
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    res.send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Registraiton",
      success: false,
      error,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email is required",
      });
    }
    //check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalied Password",
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Login",
      success: false,
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send("Email is required!");
    }
    if (!answer) {
      res.status(400).send("Answer is required!");
    }
    if (!newPassword) {
      res.status(400).send("new password is required!");
    }
    //check
    const user = await userModel.findOne({ email, answer });

    //validation
    if (!user) {
      return res.status(404).send({
        message: "Email or Answer is wrong!",
        success: false,
        error: error,
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      message: "Password Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error: error,
    });
  }
};

//update user profile controler
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req?.user?._id);

    //password
    if (password && password?.length < 6) {
      return res.json({ error: "Password is equired and 6 character long" });
    }

    const hashedPassword = password ? hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user?.name,
        address: address || user?.address,
        phone: phone || user?.phone,
        password: hashedPassword || user?.password,
      },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "Profile upated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile!",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  console.log("Protected Route");
  res.send("Protected Route");
};
