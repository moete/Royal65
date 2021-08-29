import 'reflect-metadata'; 
import loadersInit from "./loaders";
import express = require ('express');
import config from './config';
import http = require('http');




async function startServer() {

  const app = express();

  const server = http.createServer(app);
  
  await loadersInit({ expressApp: app,server });
  app.use('/uploads', express.static('uploads'));


  server.listen(config.port, ()=>{
    console.log(`Your server is ready !`);
  });
}

startServer();
