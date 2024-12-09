import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    profile_img: {
      profile_img_url: {
        type: String,
        default: "/images/default-user.png",
      },
      public_id: {
        type: String,
      },
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
      enum: ["driver", "delivery_boy"],
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

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
