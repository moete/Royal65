import Services from '../../services';
import config from "../../config";
const stripe = require("stripe")(config.stripe_sk);
const userService = new Services.UserService();
const transactionService = new Services.TransactionService();
const getClientSecret = async (req:any,res:any) =>{
    try {
        const { amount } = req.body;
        if(amount){
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount*100,
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


const confirmAndUpdate = async (req:any,res:any) =>{
    const {payment_intent}=req.body
    const transaction=await transactionService.findOneByIntent(payment_intent)
    if(transaction){
        return res.status(400).send({ message: "Payment already confirmed" });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent
      );
    const amount=paymentIntent.amount/100
    const user=await userService.updateWallet({userId:req.userId,amount})
    const transactionS=await transactionService.save({
        Type: "Deposit",
        User: req.userId,
        Credit: amount,
        payment_intent: payment_intent
      })    
    if(user){
        return res.status(200).send({ message: "Wallet updated" });
    }
    else
        return res.status(400).send({ message: "An error has occurred!" });

}

export default  {
    getClientSecret,
    confirmAndUpdate
}