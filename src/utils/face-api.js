import { detectSingleFace, nets, TinyFaceDetectorOptions } from 'face-api.js';

import { getEntryWithMaxValueFromObject } from './objects';

export const loadModels = async () => {
  await nets.tinyFaceDetector.loadFromUri('/models');
  await nets.faceExpressionNet.loadFromUri('/models');
  await nets.ageGenderNet.loadFromUri('/models');
};

export const getFaceExpressionsAgeAndGender = async (image) => {
  const face = await detectSingleFace(image, new TinyFaceDetectorOptions())
    .withFaceExpressions()
    .withAgeAndGender();

  return {
    expression: getEntryWithMaxValueFromObject(face.expressions).key,
    age: Math.round(face.age),
    gender: face.gender,
  };
};
