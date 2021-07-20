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

  route.get("/test/all", userController.allAccess);

  route.get("/test/user", [middlewares.authJwt.verifyToken], userController.userBoard);


  route.get(
    "/test/admin",
    [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
    userController.adminBoard
  );
};
