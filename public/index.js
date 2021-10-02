if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    console.log("Hi");
    console.log(stripePublicKey);
    document.getElementById('payment').addEventListener('click', purchaseClicked);
}

var stripeHandler = StripeCheckout.configure({
    key:stripePublicKey,
    locale:'en',
    token: function(token){
        fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id
            })
        }).then((res)=>(
            res.json()
        )).then(data => (
            console.log(data)
        )).catch(err => (
            res.status(500).end()
        ))
    }
})

function purchaseClicked(){
    stripeHandler.open()
}