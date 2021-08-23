import { Router, Request, Response, NextFunction } from "express";
import PromoController from "../Controllers/promo";
import multer = require("multer");
const route = Router();

export default function (app: Router) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },

    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
  });
  const fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  };
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.use("/promo", route);
  route.post("/addpromo", upload.array("images", 5), PromoController.addPromo);
  route.get('',PromoController.getAllPromos);
  route.delete('/deletepromo',PromoController.deletePromo);
}
