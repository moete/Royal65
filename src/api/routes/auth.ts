import { Router, Request, Response, NextFunction } from 'express';
import authController from "../controllers/auth"
import middlewares from"../middlewares"
const route = Router();

export default  function(app:Router) {
  app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/auth', route);

  route.post(
    "/signup",
    [
        middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
        middlewares.verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  route.post("/signin", authController.signin);
};