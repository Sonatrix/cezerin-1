import React from 'react';
/* eslint-disable */
let scriptAdded = false;
export default class PayPalButton extends React.Component {
  componentDidMount() {
    this.addScript();
  }

  componentDidUpdate() {
    this.executeScript();
  }

  addScript() {
    if (scriptAdded) {
      this.executeScript();
      return;
    }

    const SCRIPT_URL = 'https://www.paypalobjects.com/api/checkout.min.js';
    const container = document.body || document.head;
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.onload = () => {
      this.executeScript();
    };
    container.appendChild(script);
    scriptAdded = true;
  }

  executeScript() {
    const {formSettings, shopSettings, onPayment} = this.props;

    document.getElementById('paypal-button-container').innerHTML = null;

    paypal.Button.render(
      {
        // Set your environment
        env: formSettings.env, // sandbox | production
        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,
        // Specify the style of the button
        style: {
          label: 'pay',
          size: formSettings.size,
          shape: formSettings.shape,
          color: formSettings.color
        },
        client: {
          sandbox: formSettings.client,
          production: formSettings.client
        },
        // Wait for the PayPal button to be clicked
        payment(data, actions) {
          return actions.payment.create({
            payment: {
              intent: 'sale',
              transactions: [
                {
                  custom: formSettings.order_id,
                  notify_url: formSettings.notify_url,
                  amount: {
                    total: formSettings.amount,
                    currency: formSettings.currency
                  }
                }
              ]
            },
            experience: {
              input_fields: {no_shipping: 1}
            }
          });
        },
        // Wait for the payment to be authorized by the customer
        onAuthorize(data, actions) {
          return actions.payment.execute().then(() => {
            onPayment();
          });
        }
      },
      '#paypal-button-container'
    );
  }

  render() {
    /* eslint-disable-next-line */
    const {formSettings, shopSettings, onPayment} = this.props;

    return (
      <div>
        <div id="paypal-button-container" />
      </div>
    );
  }
}
