import { Router ,Request, Response, NextFunction} from 'express';
import ReclaController from '../Controllers/recla';
const route = Router() ;

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.use('/recla',route);
    route.post('/addRecla',ReclaController.addRecla);
    route.get('',ReclaController.getAllReclas);
}
