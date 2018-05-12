import React, {Fragment} from 'react';
import MetaTags from '../components/metaTags';
import {ProductDetails} from '../components/productDetails';

const ProductContainer = props => {
  const {productDetails, settings, categories} = props.state;
  const {addCartItem, getJSONLD} = props;

  if (productDetails) {
    const {
      images,
      meta_title: metaTitle,
      name,
      url,
      meta_description: metaDescription,
    } = productDetails;
    const imageUrl = images && images.length > 0 ? images[0].url : null;
    const title = metaTitle && metaTitle.length > 0 ? metaTitle : name;
    const jsonld = getJSONLD(props.state);

    return (
      <Fragment>
        <MetaTags
          title={title}
          description={metaDescription}
          canonicalUrl={url}
          imageUrl={imageUrl}
          ogType="product"
          ogTitle={name}
          ogDescription={metaDescription}
          jsonld={jsonld}
        />

        <ProductDetails
          settings={settings}
          product={productDetails}
          addCartItem={addCartItem}
          categories={categories}
        />
      </Fragment>
    );
  }
  return null;
};

export default ProductContainer;
