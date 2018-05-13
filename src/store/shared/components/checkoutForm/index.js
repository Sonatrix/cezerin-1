import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Form} from './form';

const mapStateToProps = state => ({
  cart: state.app.cart,
  settings: state.app.settings,
  themeSettings: state.app.themeSettings,
});

const mapDispatchToProps = () => ({
  onLoad: () => {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
