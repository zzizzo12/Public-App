const functions = require("firebase-functions");
const express = require("express");
const cors = require ("cors");
const stripe = require("stripe")('sk_test_51I88sgBQ4q0jfnmB5EnazAW1GtiFjaoPetBFaDLnxqdvh9HsDzM5ZjpYfy5gDefZUolwaEu2hyoBcx1Nc9a9nOfK00rLoSPDim')


// our API

 // - App config
const app = express();

 // - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

 // - API routes
app.get('/', (request, response) => response.status(200).send('api envoyé avec succes'))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log("payement request receved", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

 // - listen command
 exports.api = functions.https.onRequest(app);

 // exemple endpoint
 // http://localhost:5001/amashop-9071a/us-central1/api (wich i get by (firebase emulators:start) in the function directory)