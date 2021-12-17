import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from"../middlewares"
import refernceController from "../controllers/reference"
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
      app.use('/reference', route);
      route.post("/saverefernce", refernceController.referencesave);
      route.get("/count",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], refernceController.count);
      route.get("/getAllReferences",[middlewares.authJwt.verifyToken],refernceController.getAllReferences);

};