import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profile_img: {
      profile_img_url: { type: String, default: "/images/default-user.png" },
      public_id: { type: String },
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
    shop_name: { type: String, required: true },
    shop_description: { type: String, required: true },
    pin_code: { type: String, required: true },
  },
  { timestamps: true },
);

vendorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
