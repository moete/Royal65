import { Router, Request, Response, NextFunction } from "express";
import config from "../../config";
const stripe = require("stripe")("'sk_test_51JPX0CClMBPDy5APvzyI1ISgIXU48QRN07g6o9S9jXcsiQu5WsncxvYHlkwwEN9lIG2K8zWTO46cnRswklN0gmxL001bej3lmP");

const route = Router();

export default function (app: Router) {
    app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.use("/stripe", route);
    app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'T-shirt',
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        });
      
        res.redirect(303, session.url);
      });

  }

