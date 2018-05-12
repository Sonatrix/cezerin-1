import React, {Component} from 'react';
import api from '../../lib/api';
import ProductList from '../productList';

export default class CustomProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProducts(nextProps);
  }

  fetchProducts({
    ids,
    sku,
    sort,
    limit,
    category_id: categoryId,
    tags,
    attributes,
    price_from: priceFrom,
    price_to: priceTo,
    on_sale: onSale,
  }) {
    const filter = {
      ids,
      sku,
      tags,
      on_sale: onSale,
      search: null,
      category_id: categoryId,
      price_from: priceFrom,
      price_to: priceTo,
      sort,
      fields:
        'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags',
      limit: limit || 4,
      offset: 0,
    };

    if (attributes && Array.isArray(attributes) && attributes.length > 0) {
      attributes.forEach(attr => {
        filter[`attributes.${attr.name}`] = attr.value;
      });
    }

    api.ajax.products
      .list(filter)
      .then(({json}) => {
        this.setState({
          products: json.data,
        });
      })
      .catch(() => {});
  }

  render() {
    const {
      settings,
      addCartItem,
      isCentered,
      className,
      columnCountOnMobile,
      columnCountOnTablet,
      columnCountOnDesktop,
      columnCountOnWidescreen,
      columnCountOnFullhd,
    } = this.props;

    return (
      <ProductList
        products={this.state.products}
        addCartItem={addCartItem}
        settings={settings}
        loadMoreProducts={null}
        hasMore={false}
        columnCountOnMobile={columnCountOnMobile}
        columnCountOnTablet={columnCountOnTablet}
        columnCountOnDesktop={columnCountOnDesktop}
        columnCountOnWidescreen={columnCountOnWidescreen}
        columnCountOnFullhd={columnCountOnFullhd}
        isCentered={isCentered}
        className={className}
      />
    );
  }
}
