import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Connected to database:",
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URI
        : "production DB"
    );
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
};
