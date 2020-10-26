import { getGeo } from './api/geo';
import { reportData } from './api/main';
import { EVENTS, MS_IN_SEC } from './constants';
import { getImage } from './utils/camera';
import eventEmmiter from './utils/events';
import { getEmotionAgeAndGender, loadModels } from './utils/face-api';

let trackingIntervalId;

export { EVENTS } from './constants';

export const { on } = eventEmmiter;

export const init = async () => {
  await loadModels();
};

export const getData = async () => {
  const image = await getImage();
  return getEmotionAgeAndGender(image);
};

export const startTracking = (getCustomData, intervalSec = 30, withDefaultReporter = true) => {
  trackingIntervalId = setInterval(async () => {
    const data = await getData();
    const geo = await getGeo();
    const dataToReport = { ...data, ...geo, custom: getCustomData?.() };

    eventEmmiter.emit(EVENTS.TRACKED, dataToReport);

    if (withDefaultReporter) {
      reportData(dataToReport);
      eventEmmiter.emit(EVENTS.REPORTED, dataToReport);
    }
  }, intervalSec * MS_IN_SEC);
};

export const stopTracking = () => trackingIntervalId && clearInterval(trackingIntervalId);
