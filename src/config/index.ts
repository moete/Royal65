import * as dotenv from 'dotenv' ;

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
     DATABASE_URL:"mongodb+srv://taz:B967C73C@royal65.s4azd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  };