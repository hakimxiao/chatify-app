import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      const { MONGO_URI } = process.env;
      if(!MONGO_URI) throw new Error("MONGO_URI not defined");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
    process.exit(1);
    1;
  }
};
