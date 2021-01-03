import { getGeo } from './api/geo.js';
import { getStatisticsForCurrentPage, getStatisticsForEventsIds, reportData } from './api/main.js';
import { EVENTS, MS_IN_SEC } from './constants.js';
import { getImage } from './utils/camera.js';
import eventEmmiter from './utils/events.js';
import { getEmotionAgeAndGender, loadModels } from './utils/face-api.js';
import { getCurrentPageUrl } from './utils/url.js';

let trackingIntervalId;
const eventsIds = [];

export { EVENTS } from './constants.js';

const report = async (reporter = reportData, dataToReport) => {
  const id = await reporter(dataToReport);
  eventsIds.push(id);
  eventEmmiter.emit(EVENTS.REPORTED, { ...dataToReport, id });
};

export const init = loadModels;

export const getDataAndImage = async () => {
  const image = await getImage();
  return { data: await getEmotionAgeAndGender(image), image };
};

export const getUserStatistics = () => getStatisticsForEventsIds(eventsIds);

export const getCurrentPageStatistics = getStatisticsForCurrentPage;

export const track = async (customReporter, enableReporting = true) => {
  const { data, image } = await getDataAndImage();
  const geo = await getGeo();
  const dataToReport = { ...data, ...geo, url: getCurrentPageUrl() };

  eventEmmiter.emit(EVENTS.TRACKED, { ...dataToReport, image });

  if (dataToReport.emotion && enableReporting) {
    report(customReporter, dataToReport);
  }
};

export const startTracking = (customReporter, enableReporting = true, intervalSec = 30) => {
  trackingIntervalId = setInterval(
    () => track(customReporter, enableReporting),
    intervalSec * MS_IN_SEC,
  );
};

export const stopTracking = () => trackingIntervalId && clearInterval(trackingIntervalId);

export const { on } = eventEmmiter;
