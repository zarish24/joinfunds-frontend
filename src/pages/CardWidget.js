export class CardWidget {
    stripe = null
    card = null
    style = {
        base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
            color: '#aab7c4'
        }
        },
        invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
        }
    }

    constructor(stripe) {
        this.stripe = stripe
    }

    mount() {
        const elements = this.stripe.elements()
        this.card = elements.create('card', { style: this.style, hidePostalCode: true })
        this.card.mount('#card-element')
    }

    destroy() {
       this.card.destroy()
    }

    async createToken() {
        try {
            //   console.log("function-called")
            const result = await this.stripe.createToken(this.card)
            return result.token
        } catch(err) {
            //   console.log(err);
        }
    }

}