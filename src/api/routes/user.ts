import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from"../middlewares"
import userController from "../controllers/user"
const route = Router();

export default function(app:Router) {
  app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/user', route);
  
  route.get("/statistcsByCountry",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], userController.statistcsByCountry);
  route.get("/count",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], userController.count);
  route.get("/getLastRegistred",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], userController.getLastRegistred);
  route.get("/getAllUsers",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], userController.getAllUsers);

};
