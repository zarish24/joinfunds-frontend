import { loadStripe } from '@stripe/stripe-js'
//  import { placeOrder } from './apiService'
import { CardWidget } from './CardWidget'

export async function initStripe() {
    const stripe = await loadStripe('pk_test_51O9nTCAsRAqYaynXo1vM4QJ7RXKi1Vb5Pp7kWvtVKlxiPYw793uWVKJ6WdGNgujugRdh7SNjce0E6fHcKY7E902E00ktI42vtM');
    let card = null;
    card = new CardWidget(stripe);
    card.mount()
    // const token = await card.createToken()
    // console.log("token_id",token.id)
    // console.log("card",card)
    // Ajax call
// const paymentForm = document.querySelector('#payment-form');
// if(paymentForm) {
//     paymentForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         let formData = new FormData(paymentForm);
//         let formObject = {}
//         for(let [key, value] of formData.entries()) {
//             formObject[key] = value
//         }

//         if (!card) {
//             // Ajax
//             placeOrder(formObject);
//             return;
//         }

//         const token = await card.createToken()
//         formObject.stripeToken = token.id;
//         placeOrder(formObject);


//         // // Verify card
//         // stripe.createToken(card).then((result) => {
//         //     formObject.stripeToken = result.token.id;
//         //     placeOrder(formObject);
//         // }).catch((err) => {
//         //     console.log(err)
//         // })

//     })
// }
}