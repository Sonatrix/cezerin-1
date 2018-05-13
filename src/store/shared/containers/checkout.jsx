import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {CheckoutContainer} from 'theme';
import {mapStateToProps, mapDispatchToProps} from '../containerProps';
import CheckoutForm from '../components/checkoutForm';

const ConnectedCheckoutContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
);

export default () => (
  <ConnectedCheckoutContainer checkoutForm={<CheckoutForm />} />
);
