import { Router ,Request, Response, NextFunction} from 'express';
import middlewares from"../middlewares"
import gameController from "../controllers/game"
const route = Router();

export default function(app:Router) {
  app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/game', route);
  
  //create a game for the connected user
  route.post("/save",
  [middlewares.authJwt.verifyToken], gameController.save);
  
  route.get("/getAll",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], gameController.getAll);

  
  route.post("/join",
  [middlewares.authJwt.verifyToken], gameController.join);

  
  route.post("/unJoin",
  [middlewares.authJwt.verifyToken], gameController.unJoin);

  
  route.get("/getOpen",
  [middlewares.authJwt.verifyToken], gameController.getOpen);

  
  //TODO check who can use this route administrator or all
  route.post("/addUpdateScore",
  [middlewares.authJwt.verifyToken], gameController.addUpdateScore);

  
  route.get("/getScoreByGameId/:id",
  [middlewares.authJwt.verifyToken], gameController.getScoreByGameId);

  
  route.get("/getScoresByUserId/:id",
  [middlewares.authJwt.verifyToken], gameController.getScoresByUserId);

  
  route.delete("/delete/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], gameController.deleteGame);


};
