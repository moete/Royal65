import { Router, Request, Response, NextFunction } from "express";
import withdrawalController from "../controllers/withdrawal";
const route = Router();
export default function (app: Router) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/withdrawal", route);
  route.post("/AddWithdrawal", withdrawalController.AddWithdrawal);
  route.get("/getAll", withdrawalController.getAllWithdrawals);
}
  