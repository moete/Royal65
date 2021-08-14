import mongoose from 'mongoose'
import config from '../config';
const db = require("../models");
const Role = db.role;

function initial() {
    Role.estimatedDocumentCount((err:any, count:any) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save((err:any) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
  
        new Role({
          name: "admin"
        }).save((err:any) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

export default async (): Promise<any> => {
  console.log(config.DATABASE_URL as string,"********************")
    const connection= await mongoose.connect(config.DATABASE_URL as string, { useNewUrlParser: true,useUnifiedTopology: true })
    initial()
    return connection.connection.db;
}