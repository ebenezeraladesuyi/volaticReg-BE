import mongoose from "mongoose";
import env from "dotenv";

env.config()


const uri = process.env.MONGOOSE_DB;
// console.log("Mongoose URI:", process.env.MONGOOSE_DB);

// deployed url = https://volatic-reg-be.onrender.com

if (!uri) {
  console.error("MONGOOSE_DB environment variable is not defined.");
  process.exit(1); // Exit the process or handle the error appropriately
}


const dbConfig = async (): Promise<void> => {
    try {
      const con = await mongoose.connect(uri);
      console.log(`connected to database on port ${con.connection.host}`);
    } catch (error) {
      console.log(`failed to connect to database` , error);
    }
  };
  
  export default dbConfig;

