import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from"../middlewares"
import mailController from "../controllers/mails"
const route = Router();

export default function(app:Router) {
  app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/mail', route);
  
  route.get("/getAllMails",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], mailController.getAll);
  route.post("/update",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], mailController.update);

  route.get("/getById/:id",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], mailController.getById);

  route.post("/delete",[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], mailController.deleteMail);

};
