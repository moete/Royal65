import * as dotenv from 'dotenv' ;

dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
 //const databaseURL: any = process.env.MONGODB_URI 

export default {   
        /**
        * Your  port
        */
        port: process.env.PORT,
        /**

        * Mongodb URI
        */
         DATABASE_URL: process.env.DATABASE_URL,
        /**
         * Used by winston logger
        */
        logs: {
        level: process.env.LOG_LEVEL || 'silly',
        },   
        /**
         * mode sandbox paypal
         */
        paypal : {
          mode : process.env.MODE ,
          client_id : process.env.CLIENT_ID,
          client_secret : process.env.SECRET  
        },

        /**
         * Secret JWt
         */
        SECRET : process.env.SECRET ,
       

        /**
         * Stripe 
         */
        client_id : process.env.STRIPE_PUBLIC ,
        client_secret : process.env.STRIPE_SECRET,

        api: {
          prefix: '/api',
          },
          matchStatus:{
            process:1,
            finished:2,
            open:0
          }


 
      };
