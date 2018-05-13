import React, {Fragment} from 'react';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-image-lightbox';
import * as helper from '../../lib/helper';
import {themeSettings} from '../../lib/settings';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      lightboxPhotoIndex: 0,
    };
  }

  setPhotoIndex(index) {
    this.setState({lightboxPhotoIndex: index});
  }

  closeLightbox() {
    this.setState({lightboxIsOpen: false});
  }

  openLightbox() {
    this.setState({lightboxIsOpen: true});
  }

  render() {
    const {images} = this.props;
    const {lightboxIsOpen, lightboxPhotoIndex} = this.state;

    if (images && images.length > 0) {
      const imagesArray = images.map(image => ({
        original: helper.getThumbnailUrl(
          image.url,
          themeSettings.bigThumbnailWidth
        ),
        thumbnail: helper.getThumbnailUrl(
          image.url,
          themeSettings.previewThumbnailWidth
        ),
        originalAlt: image.alt,
        thumbnailAlt: image.alt,
      }));

      const originalImages = images.map(image => image.url);
      const showThumbnails = images.length > 1;

      return (
        <Fragment>
          <ImageGallery
            items={imagesArray}
            showThumbnails={showThumbnails}
            onClick={this.openLightbox}
            lazyLoad
            slideInterval={2000}
            showNav={themeSettings.product_gallery_shownav === true}
            showBullets={showThumbnails}
            showPlayButton={false}
            showFullscreenButton={false}
            slideOnThumbnailHover
            thumbnailPosition={themeSettings.product_thumbnail_position}
            onSlide={this.setPhotoIndex}
          />
          {lightboxIsOpen && (
            <Lightbox
              reactModalStyle={{overlay: {zIndex: 1099}}}
              mainSrc={originalImages[lightboxPhotoIndex]}
              nextSrc={
                originalImages[(lightboxPhotoIndex + 1) % originalImages.length]
              }
              prevSrc={
                originalImages[
                  (lightboxPhotoIndex + originalImages.length - 1) %
                    originalImages.length
                ]
              }
              onCloseRequest={this.closeLightbox}
              onMovePrevRequest={() =>
                this.setState({
                  lightboxPhotoIndex:
                    (lightboxPhotoIndex + originalImages.length - 1) %
                    originalImages.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  lightboxPhotoIndex:
                    (lightboxPhotoIndex + 1) % originalImages.length,
                })
              }
            />
          )}
        </Fragment>
      );
    }
    return <div className="large-image-placeholder" />;
  }
}
