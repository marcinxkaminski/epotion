import { IMAGE_COMPRESSION, IMAGE_WIDTH } from './config';
import { getPhoto } from './utils/camera';

(async () => {
  const photo = await getPhoto(IMAGE_WIDTH, IMAGE_COMPRESSION);

  // eslint-disable-next-line no-unsanitized/property
  document.body.innerHTML = `<img src="${photo}"/>`;
})();

export * as camera from './utils/camera';
