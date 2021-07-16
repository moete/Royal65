import express from 'express';
  
import config from './config';

const app = express();


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(config.port, () => console.log(`server is listening on ${config.port}`));