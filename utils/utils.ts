type Photo = {
  width: number;
  height: number;
  value: string;
};

export const getImgSrc = (photos: any) => {
  const photo = photos.find((photo: any) => photo.width === 560);
  if (photo) {
    return photo.value;
  }
  if (photos.length > 0) {
    return photos[photos.length - 1].value;
  }
  return "https://images.foody.vn/default/s400x400/shopeefood-deli-dish-no-image.png";
};

export const getImgWidth = (photos: Photo[]) => {
  const photo = photos.find((photo: any) => photo.width === 560);
  if (photo) {
    return photo.width;
  }
  if (photos.length > 0) {
    return photos[photos.length - 1].width;
  }
  return 560;
};

export const getImgHeight = (photos: Photo[]) => {
  const photo = photos.find((photo: any) => photo.height === 560);
  if (photo) {
    return photo.height;
  }
  if (photos.length > 0) {
    return photos[photos.length - 1].height;
  }
  return 560;
};
