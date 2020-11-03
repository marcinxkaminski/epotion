import { detectSingleFace, nets, TinyFaceDetectorOptions } from 'face-api.js';

import { getEntryWithMaxValueFromObject } from './objects';

export const MODELS_URL =
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

export const loadModels = async () => {
  await nets.tinyFaceDetector.loadFromUri(MODELS_URL);
  await nets.faceExpressionNet.loadFromUri(MODELS_URL);
  await nets.ageGenderNet.loadFromUri(MODELS_URL);
};

export const getEmotionAgeAndGender = async (image) => {
  const { expressions, age, gender } = await detectSingleFace(image, new TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  return {
    emotion: getEntryWithMaxValueFromObject(expressions).key,
    age: Math.round(age),
    gender,
  };
};
