import mongoose from "mongoose";

async function connectDb(url: string): Promise<void> {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
}

export default connectDb;
