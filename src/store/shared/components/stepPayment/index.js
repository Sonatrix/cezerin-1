import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {checkout} from '../../actions';
import Form from './form';

const mapStateToProps = state => ({
  cart: state.app.cart,
  settings: state.app.settings,
  processingCheckout: state.app.processingCheckout,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  finishCheckout: () => {
    dispatch(checkout(null, ownProps.history));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
