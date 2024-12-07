import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },
    name: {
      type: String,
      required: true,
    },
    licence_number: {
      type: String,
      required: true,
      unique: true,
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
    dob: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    driving_experience: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
