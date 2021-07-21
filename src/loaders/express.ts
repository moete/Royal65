import * as express from 'express';
import * as bodyParser from 'body-parser';
import cors = require('cors');

export default ({ app }: { app: express.Application }) => {

    // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());


}