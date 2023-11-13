import { loadStripe } from '@stripe/stripe-js'
//  import { placeOrder } from './apiService'
import { CardWidget } from './CardWidget'

export async function initStripe() {
    const stripe = await loadStripe('pk_test_51O9nTCAsRAqYaynXo1vM4QJ7RXKi1Vb5Pp7kWvtVKlxiPYw793uWVKJ6WdGNgujugRdh7SNjce0E6fHcKY7E902E00ktI42vtM');
    let card = null;
    card = new CardWidget(stripe);
    card.mount()
}