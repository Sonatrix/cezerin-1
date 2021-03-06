import queryString from 'query-string';
import {getJSONLD} from './lib/jsonld';
import {
  addCartItem,
  deleteCartItem,
  updateCartItemQuantiry,
  fetchMoreProducts,
  setSort,
} from './actions';

const setQuery = (history, query) => {
  if (history && history.location) {
    const newLocation = `${history.location.pathname}?${queryString.stringify(
      query
    )}`;
    history.push(newLocation);
  }
};

export const mapStateToProps = state => ({
  state: state.app,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  addCartItem: item => {
    dispatch(addCartItem(item));
  },
  deleteCartItem: itemId => {
    dispatch(deleteCartItem(itemId));
  },
  updateCartItemQuantiry: (itemId, quantity) => {
    dispatch(updateCartItemQuantiry(itemId, quantity));
  },
  loadMoreProducts: () => {
    dispatch(fetchMoreProducts());
  },
  setSearch: search => {
    const query = queryString.parse(ownProps.history.location.search);
    query.search = search;
    setQuery(ownProps.history, query);
  },
  setSort: sort => {
    dispatch(setSort(sort));
  },
  setPriceFromAndTo: (priceFrom, priceTo) => {
    const query = queryString.parse(ownProps.history.location.search);
    query.price_from = priceFrom;
    query.price_to = priceTo;
    setQuery(ownProps.history, query);
  },
  setPriceFrom: priceFrom => {
    const query = queryString.parse(ownProps.history.location.search);
    query.price_from = priceFrom;
    setQuery(ownProps.history, query);
  },
  setPriceTo: priceTo => {
    const query = queryString.parse(ownProps.history.location.search);
    query.price_to = priceTo;
    setQuery(ownProps.history, query);
  },
  setFilterAttribute: (name, value) => {
    const query = queryString.parse(ownProps.history.location.search);
    const queryKey = `attributes.${name}`;

    if (query[queryKey]) {
      if (Array.isArray(query[queryKey])) {
        query[queryKey].push(value);
      } else {
        query[queryKey] = [query[queryKey], value];
      }
    } else {
      query[queryKey] = [value];
    }

    setQuery(ownProps.history, query);
  },
  unsetFilterAttribute: (name, value) => {
    const query = queryString.parse(ownProps.history.location.search);
    const queryKey = `attributes.${name}`;
    const values = query[queryKey];

    if (values) {
      if (Array.isArray(values)) {
        query[queryKey] = values.filter(v => v !== value);
      } else {
        query[queryKey] = undefined;
      }
    }

    setQuery(ownProps.history, query);
  },
  setLocation: path => {
    ownProps.history.push(path);
  },
  goBack: () => {
    if (ownProps.history.length > 0) {
      ownProps.history.goBack();
    }
  },
  getJSONLD: state => getJSONLD(state),
});
