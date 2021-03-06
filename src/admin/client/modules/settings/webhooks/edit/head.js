import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {deleteWebhook} from '../../actions';
import Buttons from './components/headButtons';

const mapStateToProps = (state, ownProps) => ({
  webhook: state.settings.webhookEdit,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: webhookId => {
    dispatch(deleteWebhook(webhookId));
    ownProps.history.push('/admin/settings/webhooks');
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Buttons)
);
