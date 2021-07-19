import * as dotenv from 'dotenv' ;
import mongoose from "mongoose"
dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your  port
     */
     port: process.env.PORT,
    databaseURL: process.env.MONGODB_URI,
    
  };