import paypaLoader from "../loaders/paypal";

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};


paypaLoader.payment.create(create_payment_json, function (error : Error, payment : any) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});