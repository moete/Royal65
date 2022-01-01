import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from '../middlewares';
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
      route.post('/addTournament',middlewares.authJwt.isAdmin,tournamentController.Addtournament)
      route.get('/getById/:id',tournamentController.getTournamentById)
      route.get('/getByTitle/:title',tournamentController.getTournamentByTitle);
      route.get('/getAll',tournamentController.getAllTournaments)
      route.post('/join',tournamentController.join)
      route.delete('/delete/:id',tournamentController.deleteTournament) 
};