import { useState } from 'react';
import { IMAGES_URL, IMAGES_URL_OF } from '../config/api';

export const useManageImg = (id) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError
    ? `${IMAGES_URL_OF}${id}.png`
    : `${IMAGES_URL}${id}.svg`;
  return {
    imageUrl,
    handleImageError,
  };
};
