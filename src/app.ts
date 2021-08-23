import 'reflect-metadata'; 
import loadersInit from "./loaders";
import express  = require('express');
import config from './config';
import ejs = require('ejs');
var path = require ('path');


async function startServer() {

  const app = express();

  await loadersInit({ expressApp: app });

  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(path.join(__dirname, './views')));
 
  app.listen(config.port, ()=>{
    console.log(`Your server is ready !`);
  });
   app.get('/', function(req, res){
    res.render("index");
});


  
}

startServer();
