import mongoose from 'mongoose'
import config from '../config';

export default async (): Promise<any> => {
    const connection = await mongoose.connect(config.DATABASE_URL as string, { useNewUrlParser: true });
  return connection.connection.db;
}
