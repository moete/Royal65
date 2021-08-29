import { Router ,Request, Response, NextFunction} from 'express';
import tournamentController from '../controllers/tournament' 
const route = Router();

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, ' Origin, Content-Type, Accept"
        );
        next();
      });
       // add auth validation
      app.use('/tournaments', route);
      route.post('/addTournament',tournamentController.Addtournament)
      route.get('/getAll',tournamentController.getAllTournaments)
    

};