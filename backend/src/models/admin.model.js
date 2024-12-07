import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile_img_url: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
