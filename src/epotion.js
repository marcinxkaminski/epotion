import { getGeo } from './api/geo';
import { getStatisticsForCurrentPage, getStatisticsForEventsIds, reportData } from './api/main';
import { EVENTS, MS_IN_SEC } from './constants';
import { getImage } from './utils/camera';
import eventEmmiter from './utils/events';
import { getEmotionAgeAndGender, loadModels } from './utils/face-api';
import { getCurrentPageUrl } from './utils/url';

let trackingIntervalId;
const eventsIds = [];

export { EVENTS } from './constants';

export const { on } = eventEmmiter;

export const init = () => loadModels();

export const getData = async () => {
  const image = await getImage();
  return getEmotionAgeAndGender(image);
};

export const getUserStatistics = () => getStatisticsForEventsIds(eventsIds);

export const getCurrentPageStatistics = getStatisticsForCurrentPage;

export const track = async (getCustomData, withDefaultReporter = true) => {
  const data = await getData();
  const geo = await getGeo();
  const dataToReport = { ...data, ...geo, url: getCurrentPageUrl(), custom: getCustomData?.() };

  eventEmmiter.emit(EVENTS.TRACKED, dataToReport);

  if (withDefaultReporter) {
    const id = await reportData(dataToReport);
    eventsIds.push(id);
    eventEmmiter.emit(EVENTS.REPORTED, { ...dataToReport, id });
  }
};

export const startTracking = (getCustomData, withDefaultReporter, intervalSec = 30) => {
  trackingIntervalId = setInterval(
    () => track(getCustomData, withDefaultReporter),
    intervalSec * MS_IN_SEC,
  );
};

export const stopTracking = () => trackingIntervalId && clearInterval(trackingIntervalId);
