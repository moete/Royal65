import loadersInit from "./loaders";
import express from 'express';
import config from './config';

async function startServer() {

  const app = express();

  await loadersInit({ expressApp: app });

  app.listen(config.port, ()=>{
    console.log(`Your server is ready !`);
  });
}

startServer();