import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      required: true,
    },
  },
  { timestamps: true },
);

warehouseSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
