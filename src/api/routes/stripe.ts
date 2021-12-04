import { Router, Request, Response, NextFunction } from "express";
import config from "../../config";
const stripe = require("stripe")("'sk_test_51JrMTFGrCjNT8rWxueXXUS1RpL2E1JeHsL7aJdq2m4D0KEsPUIqcErVlpg4AxEKkwGSyIVbmynuilRNUxneQAzUA00nusLviX9");
const uuid = require("uuid");
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

    route.get("/stripeClient", async (req:Request, res:Response) => {

      try{
        
        var elements = await stripe.elements({
          clientSecret: 'CLIENT_SECRET',
        });
    
        res.status(200).send({data:elements});
      }catch(err:any){
        console.log(err)
        res.status(500).send({ message: "An error has occurred!" });
      }
    
    })
    route.post("/stripe-payment", (req, res) => {
      const stripe = require("stripe")(
        "sk_test_51JrMTFGrCjNT8rWxueXXUS1RpL2E1JeHsL7aJdq2m4D0KEsPUIqcErVlpg4AxEKkwGSyIVbmynuilRNUxneQAzUA00nusLviX9"
      );
    
      const { amount, email, token } = req.body;
    
      stripe.customers
        .create({
          email: email,
          source: token.id,
          name: token.card.name,
        })
        .then((customer :any ) => {
          return stripe.charges.create({
            amount: parseFloat(amount) * 100,
            description: `Payment for USD ${amount}`,
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge : any) => res.status(200).send(charge))
        .catch((err : any) => console.log(err));
    });





  }



