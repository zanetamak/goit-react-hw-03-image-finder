import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalerryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClickImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};