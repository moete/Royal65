import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }:any) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');
  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

   const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  // ... more loaders can be here


  



}