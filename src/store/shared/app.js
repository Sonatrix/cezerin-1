import React from 'react';
import {Route} from 'react-router';
import {connect} from 'react-redux';
import {animateScroll} from 'react-scroll';

import IndexContainer from './containers/index';
import SharedContainer from './containers/shared';
import CategoryContainer from './containers/category';
import ProductContainer from './containers/product';
import PageContainer from './containers/page';
import CheckoutContainer from './containers/checkout';
import CheckoutSuccessContainer from './containers/checkoutSuccess';
import NotFoundContainer from './containers/notfound';
import SearchContainer from './containers/search';

import {setCurrentPage} from './actions';
import {PAGE, PRODUCT_CATEGORY, PRODUCT, SEARCH} from './pageTypes';

class SwitchContainers extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props.setCurrentPage(nextProps.location);

    if (nextProps.location && this.props.location) {
      const pathnameChanged =
        nextProps.location.pathname !== this.props.location.pathname;
      const queryChanged =
        nextProps.location.search !== this.props.location.search;
      const isSearchPage = nextProps.location.pathname === '/search';

      if (pathnameChanged || (queryChanged && isSearchPage)) {
        animateScroll.scrollToTop({
          duration: 500,
          delay: 100,
          smooth: true,
        });
      }
    }
  }

  render() {
    const {location, currentPage} = this.props;
    const locationPathname =
      location && location.pathname ? location.pathname : '/';

    switch (currentPage.type) {
      case PRODUCT:
        return <ProductContainer />;
      case PRODUCT_CATEGORY:
        return <CategoryContainer />;
      case SEARCH:
        return <SearchContainer />;
      case PAGE:
        if (locationPathname === '/') {
          return <IndexContainer />;
        } else if (locationPathname === '/checkout') {
          return <CheckoutContainer />;
        }
        if (locationPathname === '/checkout-success') {
          return <CheckoutSuccessContainer />;
        }
        return <PageContainer />;

      default:
        return <NotFoundContainer />;
    }
  }
}

const mapStateToProps = state => ({
  currentPage: state.app.currentPage,
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage: location => {
    dispatch(setCurrentPage(location));
  },
});

const SwitchContainersConnected = connect(mapStateToProps, mapDispatchToProps)(
  SwitchContainers
);

const App = () => (
  <SharedContainer>
    <Route component={SwitchContainersConnected} />
  </SharedContainer>
);

export default App;
