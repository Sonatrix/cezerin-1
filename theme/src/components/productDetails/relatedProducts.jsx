import React, {PureComponent} from 'react';
import {themeSettings, text} from '../../lib/settings';
import CustomProducts from '../products/custom';

export default class RelatedProducts extends PureComponent {
  render() {
    const {ids, settings, addCartItem, limit} = this.props;
    if (ids && ids.length > 0) {
      const title =
        themeSettings.related_products_title &&
        themeSettings.related_products_title.length > 0
          ? themeSettings.related_products_title
          : text.relatedProducts;

      return (
        <section className="section section-product-related">
          <div className="container">
            <div className="title is-4 has-text-centered">{title}</div>
            <CustomProducts
              ids={ids}
              sort={null}
              limit={limit}
              isCentered
              settings={settings}
              addCartItem={addCartItem}
            />
          </div>
        </section>
      );
    }
    return null;
  }
}
