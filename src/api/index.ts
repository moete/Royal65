import { Router } from "express";
import recla from "./routes/recla";
import promo from "./routes/promo";
import paypal from "./routes/paypal";
import stripe from "./routes/stripe";
export default () => {
    const app = Router();
    recla(app)
    promo(app)
    paypal(app)
    stripe(app)

    return app ;

}