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
  
  route.post("/saveTransaction",
  [middlewares.authJwt.verifyToken], gameController.saveTransaction);
  
  route.get("/getAll",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], gameController.getAll);
  route.get("/getMatchByUser",
  [middlewares.authJwt.verifyToken], gameController.getMatchByUser);
  route.get("/getAllTransactions",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], gameController.getAllTransactions);

  
  route.post("/join",
  [middlewares.authJwt.verifyToken], gameController.join);

  
  route.post("/unJoin",
  [middlewares.authJwt.verifyToken], gameController.unJoin);

  route.post("/deleteCurrentRoom",
  [middlewares.authJwt.verifyToken], gameController.deleteCurrentRoom);
  
  route.get("/getOpen",
  [middlewares.authJwt.verifyToken], gameController.getOpen);

  
  //TODO check who can use this route administrator or all
  route.post("/addUpdateScore",
  [middlewares.authJwt.verifyToken], gameController.addUpdateScore);

  
  route.get("/getScoreByGameId/:id",
  [middlewares.authJwt.verifyToken], gameController.getScoreByGameId);
  route.get("/getRoomById/:id",
  [middlewares.authJwt.verifyToken], gameController.getRoomById);

  
  route.get("/myGames",
  [middlewares.authJwt.verifyToken], gameController.myGames);
  
  route.get("/getScoresByUserId/:id",
  [middlewares.authJwt.verifyToken], gameController.getScoresByUserId);

  
  route.delete("/delete/:id",
  [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin], gameController.deleteGame);


};
