import React, {Fragment, PureComponent} from 'react';
import {text} from '../../lib/settings';

export default class Quantity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity > nextProps.maxQuantity) {
      this.setQuantity(nextProps.maxQuantity);
    }
  }

  setQuantity(quantity) {
    const intQuantity = ~~quantity;
    if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
      this.setState({quantity: intQuantity});
      this.props.onChange(intQuantity);
    }
  }

  handleChange(event) {
    this.setQuantity(event.target.value);
  }

  increment() {
    const newQuantity = this.state.quantity + 1;
    this.setQuantity(newQuantity);
  }

  decrement() {
    const newQuantity = this.state.quantity - 1;
    this.setQuantity(newQuantity);
  }

  render() {
    const {maxQuantity} = this.props;
    const {quantity} = this.state;
    const disabled = maxQuantity === 0;
    const value = disabled ? 0 : quantity;

    return (
      <Fragment>
        <div>{text.qty}</div>
        <div className="product-quantity">
          <a className="decrement" onClick={this.decrement} />
          <input
            value={value}
            onChange={this.handleChange}
            maxLength="3"
            type="number"
            pattern="\d*"
            disabled={disabled}
          />
          <a className="increment" onClick={this.increment} />
        </div>
      </Fragment>
    );
  }
}
