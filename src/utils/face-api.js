import { getEntryWithMaxValueFromObject } from './objects.js';

const { detectSingleFace, nets, TinyFaceDetectorOptions } = require('face-api.js');

const MODELS_URL = 'https://marcinxkaminski.github.io/Trash/';

export const loadModels = async () => {
  await nets.tinyFaceDetector.loadFromUri(MODELS_URL);
  await nets.faceExpressionNet.loadFromUri(MODELS_URL);
  await nets.ageGenderNet.loadFromUri(MODELS_URL);
};

export const getEmotionAgeAndGender = async (image) => {
  const detectedData = await detectSingleFace(image, new TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  const { expressions, age, gender } = detectedData || {};

  return {
    emotion: getEntryWithMaxValueFromObject(expressions).key,
    age: Math.round(age),
    gender,
  };
};
