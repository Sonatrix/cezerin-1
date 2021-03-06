import React, {PureComponent} from 'react';
import text from '../../text';
import {PaymentForm} from '../paymentForm';

export default class CheckoutStepPayment extends PureComponent {
  render() {
    const {
      cart,
      settings,
      processingCheckout,
      finishCheckout,
      inputClassName,
      buttonClassName,
    } = this.props;

    const {
      payment_method_gateway: paymentMethodGateway,
      grand_total: grandTotal,
    } = cart;

    if (!this.props.show) {
      return (
        <div className="checkout-step">
          <h1>
            <span>3</span>
            {this.props.title}
          </h1>
        </div>
      );
    }
    return (
      <div className="checkout-step">
        <h1>
          <span>3</span>
          {this.props.title}
        </h1>
        <div className="checkout-button-wrap">
          {!processingCheckout && (
            <PaymentForm
              gateway={paymentMethodGateway}
              amount={grandTotal}
              shopSettings={settings}
              onPayment={finishCheckout}
              inputClassName={inputClassName}
              buttonClassName={buttonClassName}
            />
          )}
          {processingCheckout && <p>{text.loading}</p>}
        </div>
      </div>
    );
  }
}
