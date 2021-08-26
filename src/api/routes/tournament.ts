import { Router ,Request, Response, NextFunction} from 'express';
import tournamentController from '../controllers/tournament' 
const route = Router();

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
       // add auth validation
      app.use('/tournament', route);
      app.post('/add',tournamentController.Addtournament)
      app.get('/getAll',tournamentController.getAllTournaments)
    

};