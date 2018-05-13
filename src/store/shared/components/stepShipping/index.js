import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {submit} from 'redux-form';
import {checkout, updateShipping} from '../../actions';
import {Form} from './form';

const mapStateToProps = state => {
  let shippingMethod = null;
  const {shipping_method_id: shippingMethodId} = state.app.cart;
  if (
    shippingMethodId &&
    state.app.shippingMethods &&
    state.app.shippingMethods.length > 0
  ) {
    shippingMethod = state.app.shippingMethods.find(
      method => method.id === shippingMethodId
    );
  }

  return {
    shippingMethod,
    initialValues: state.app.cart,
    settings: state.app.settings,
    checkoutFields: state.app.checkoutFields,
    processingCheckout: state.app.processingCheckout,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => {
    dispatch(updateShipping(values));
  },
  saveForm: () => {
    dispatch(submit('CheckoutStepShipping'));
  },
  finishCheckout: values => {
    dispatch(checkout(values, ownProps.history));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
