import { IMAGE_COMPRESSION, IMAGE_WIDTH } from './config';
import { getImage } from './utils/camera';
import eventEmmiter from './utils/events';
import { getFaceExpressionsAgeAndGender, loadModels } from './utils/face-api';

(async () => {
  await loadModels();
  const image = await getImage(IMAGE_WIDTH, IMAGE_COMPRESSION);
  const { expression, age, gender } = await getFaceExpressionsAgeAndGender(image);
  // eslint-disable-next-line no-unsanitized/property
  document.body.innerHTML = `<br>${JSON.stringify({
    expression,
    age,
    gender,
  })}`;
  document.body.append(image);
})();

// eslint-disable-next-line import/named
export const { on } = eventEmmiter;
export const detectFaceExpressionsAgeAndGender = getFaceExpressionsAgeAndGender;
