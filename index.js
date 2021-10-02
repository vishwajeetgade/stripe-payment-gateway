if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // import process.env
}
const stripeSecretKey = process.env.SECRET_KEY;
const stripePublicKey = process.env.PUBLIC_KEY
const express = require('express');
const app = express();
const stripe = require('stripe')(stripeSecretKey);

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.json());

app.get("/", (req, res, next)=>{
    res.render('index.ejs', {
        stripePublicKey
    });
});

app.post('/payment', (req, res, next) => {
    stripe.charges.create({
        amount:100000, // inr 1000.00
        source:req.body.stripeTokenId,
        currency:'INR'
    }).then(()=>(
        res.status(200).json({message: `Payment Successfull`})
    )).catch(err => (
        res.status(500).end()
    ))
})


app.listen(process.env.PORT || 8080, () => (
    console.log(`Server Started at Port ${process.env.PORT}`)
))