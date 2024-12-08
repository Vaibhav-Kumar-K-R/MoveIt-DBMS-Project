import Admin from "../models/admin.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const signInAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin doesn't exist!!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password,admin.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
 
    res.cookie("admin_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
     admin:{
      admin_id:admin._id,
      name:admin.name,
      profile_img_url:admin.profile_img_url,
      email:admin.email,
      phone:admin.phone,
      token:token
     },
      message: "Admin Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signInAdmin
}
