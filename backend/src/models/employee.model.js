import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema(
  {
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "Manager" },
    name: { type: String, required: true },
    licence_number: { type: String, required: true, unique: true },
    profile_img: {
      profile_img_url: { type: String, default: "/images/default-user.png" },
      public_id: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    role: { type: String, enum: ["driver", "delivery_boy"], required: true },
    driving_experience: { type: Number, required: true },
    salary: { type: Number, required: true },
    curr_status: {
      type: String,
      enum: ["in_work", "available", "on_leave"],
      default: "active",
    },
    work_status: {
      type: String,
      enum: ["working", "resigned", "terminated"],
      default: "working",
    },
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
