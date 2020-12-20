const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51HyZz6IW5QP7KsAHXuWpzReyEqir7z3yUqjWw3JeauuhQo1ZOXWwyXU0VvoDkbarQprmTl6TzrYFloc70WD1DUgQ00RbWAMSui"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment request for an amount -> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, 
        currency: "usd",
      });

    response.status(201).send({
       clientSecret: paymentIntent.client_secret,
    });
});

exports.api = functions.https.onRequest(app);


//http://localhost:5001/clone-70200/us-central1/api