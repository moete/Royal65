import { Router, Request, Response, NextFunction } from 'express';
import authController from "../controllers/auth"
import middlewares from"../middlewares"
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, './uploads/userImages')
  },
  filename: function (req:any, file:any, cb:any) {
    const pos=file.originalname.lastIndexOf('.')
    const name=file.originalname.substr(0,pos)
    const ext=file.originalname.substr(pos)
    cb(null, name+'-'+new Date().getTime()+ext)
  }
})
var upload = multer({ storage: storage })
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
        upload.single('photo')
    ],
    authController.signup
  );

  route.post("/signin", authController.signin);
};
