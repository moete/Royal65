import * as express from 'express';
import * as bodyParser from 'body-parser';
import cors = require('cors');
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  
    // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors(
  //   /*{
  //   origin: '*',
  
  //   methods: [
  //     'GET',
  //     'POST',
  //   ],
  
  //   allowedHeaders: [
  //     'Content-Type',
  //   ],
  // }*/
  ));
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  app.get('/status', (req, res) => {
    res.status(200).end();
  });


}