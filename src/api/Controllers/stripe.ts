import Services from '../../services';
import config from "../../config";
const stripe = require("stripe")(config.stripe_sk);
const coinService = new Services.CoinService();
const getClientSecret = async (req:any,res:any) =>{
    try {
        const { coindId } = req.body;
        const coin = await coinService.getCoinById(coindId)
        if(coin){
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: coin.amount * 100,
                currency: "eur",
                payment_method_types: [
                "card"
                ],
            });

            return res.send({
                clientSecret: paymentIntent.client_secret,
            });

        }
        else
            return res.status(400).send({ message: "Offer not found" });
        
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }
}

export default  {
    getClientSecret
}