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

    app.post('/payment', function(req, res){
  
      // Moreover you can take more details from user
      // like Address, Name, etc from form
      stripe.customers.create({
          email: req.body.stripeEmail,
          source: req.body.stripeToken,
          name: 'Gourav Hammad',
          address: {
              line1: 'TC 9/4 Old MES colony',
              postal_code: '452331',
              city: 'Indore',
              state: 'Madhya Pradesh',
              country: 'India',
          }
      })
      .then((customer:any) => {
    
          return stripe.charges.create({
              amount: 2500,     // Charing Rs 25
              description: 'Web Development Product',
              currency: 'INR',
              customer: customer.id
          });
      })
      .then((charge:any) => {
          res.send("Success")  // If no error occurs
      })
      .catch((err:Error) => {
          res.send(err)       // If some error occurs
      });
  })
  
    /*app.post('/create-checkout-session', async (req, res) => {
      const {product} = req.body ;
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
               
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

r*/
  }



