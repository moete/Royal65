import { Router ,Request, Response, NextFunction} from 'express';
import MailService from '../../services/MailService';
const route = Router() ;

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.use('/mail',route);
    route.post('/send',MailService.call)

  
}
