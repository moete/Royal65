import { Router } from "express";
import recla from "./routes/recla";
import promo from "./routes/promo";
export default () => {
    const app = Router();
    recla(app)
    promo(app)

    return app ;

}