const { detectSingleFace, nets, TinyFaceDetectorOptions } = require('face-api.js');

const { getEntryWithMaxValueFromObject } = require('./objects.js');

const MODELS_URL =
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

const loadModels = async () => {
  await nets.tinyFaceDetector.loadFromUri(MODELS_URL);
  await nets.faceExpressionNet.loadFromUri(MODELS_URL);
  await nets.ageGenderNet.loadFromUri(MODELS_URL);
};

const getEmotionAgeAndGender = async (image) => {
  const { expressions, age, gender } = await detectSingleFace(image, new TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  return {
    emotion: getEntryWithMaxValueFromObject(expressions).key,
    age: Math.round(age),
    gender,
  };
};

module.exports = { loadModels, getEmotionAgeAndGender };
