import mongoose from "mongoose";

const connectDB =  () => {
  try {
    const conn =  mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectDB;
// module.exports = connectDB ;