import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from"../middlewares"
import transactionController from "../controllers/transaction"
const route = Router();

export default function(app:Router) {
    app.use(function(req:Request, res:Response, next:NextFunction) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.use('/transaction', route);

      route.get("/count",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], transactionController.count);
      route.get("/getAllTransactions",
      [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], transactionController.getAllTransactions);

};