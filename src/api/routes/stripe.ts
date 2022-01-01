import { Router, Request, Response, NextFunction } from "express";
import stripeController from "../controllers/stripe"
import middlewares from"../middlewares"
const route = Router();

export default function (app: Router) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.use("/stripe", route);
    
    route.post("/create-payment-intent",
    [middlewares.authJwt.verifyToken], stripeController.getClientSecret)

    route.post("/confirmAndUpdate",
    [middlewares.authJwt.verifyToken], stripeController.confirmAndUpdate)


}



