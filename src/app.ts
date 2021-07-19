import express from 'express';
  
import config from './config';


async function startServer() {
   const app = express();
 
    require('./loaders').default({ expressApp: app });
   app.listen(config.port, () => console.log(`server is listening on ${config.port}`));
  
 }
 


startServer();