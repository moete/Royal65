import expressLoader from './express';
import mongooseLoader from './mongoose';
import socketLoader from './socket';

export default async ({ expressApp,server }:any) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');
  await expressLoader({ app: expressApp });
  await socketLoader({ app: server });
  console.log('Express Initialized');

  
}
