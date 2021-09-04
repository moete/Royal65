import { Router, Request, Response, NextFunction } from "express";
import config from "../../config";
var paypal = require("paypal-rest-sdk");
const route = Router();

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: config.paypal.client_id,
  client_secret: config.paypal.client_secret,
});

export default function (app: Router) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/paypal', route);
  app.get("/success", (req: Request, res: Response) => {
    const payerID = req.query.PayerID;
    const paymentID = req.query.paymentID;
    const execute_payment_json = {
      payer_id: payerID,
      payment_id: paymentID,
    };
  });
  route.get("/cancel", (req: Request, res: Response) => res.send("Cancelled"));

  route.post('/pay', (req: Request, res: Response) => {
    const {coins} = req.body ;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://return.url",
        cancel_url: "http://cancel.url",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: coins.name,
                sku: "item",
                price: coins.price,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coins.amount,
          },
          description: "This is the payment description.",
        },
      ],
    };
    paypal.payment.create(
      create_payment_json,
      function (error: Error, payment: any, res: Response) {
        if (error) {
          throw error;
        } else {
          res.send("success");
          console.log(JSON.stringify(payment));
        }
      }
    );
  });
}
