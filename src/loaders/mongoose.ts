import mongoose = require('mongoose') ;
import config from '../config';

export default async (): Promise<any> => {
  const connection= await mongoose.connect(config.databaseURL as string,
     { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex :true })
  return connection.connection.db;
}