import { Router ,Request, Response, NextFunction} from 'express';
import paymentService from '../../services/PaymentService';
const route = Router() ;

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.use('/paypal',route);
    route.post('/pay',Payement)


}
