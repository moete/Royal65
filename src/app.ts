import 'reflect-metadata'; 
import loadersInit from "./loaders";
import express = require ('express');
import config from './config';




async function startServer() {

  const app = express();

  await loadersInit({ expressApp: app });
  app.use('/uploads', express.static('uploads'));


  app.listen(config.port, ()=>{
    console.log(`Your server is ready !`);
  });
}

startServer();
