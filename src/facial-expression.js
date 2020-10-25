import { getGeo } from './api/geo';
import { reportData } from './api/main';
import { EVENTS } from './constants';
import { getImage } from './utils/camera';
import eventEmmiter from './utils/events';
import { getEmotionAgeAndGender, loadModels } from './utils/face-api';

// eslint-disable-next-line import/named
export { EVENTS } from './constants';

let trackingIntervalId;

export const { on } = eventEmmiter;

export const init = async () => {
  await loadModels();
};

export const getData = async () => {
  const image = await getImage();
  return getEmotionAgeAndGender(image);
};

export const startTracking = ({ intervalSec = 30, withDefaultReporter = true }) => {
  trackingIntervalId = setInterval(async () => {
    const data = await getData();
    const geo = await getGeo();
    const dataToReport = { ...data, ...geo };

    eventEmmiter.emit(EVENTS.TRACKED, dataToReport);

    if (withDefaultReporter) {
      reportData(dataToReport);
      eventEmmiter.emit(EVENTS.REPORTED, dataToReport);
    }
  }, intervalSec * 1000);
};

export const stopTracking = () => trackingIntervalId && clearInterval(trackingIntervalId);
