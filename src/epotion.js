const { getGeo } = require('./api/geo.js');
const {
  getStatisticsForCurrentPage,
  getStatisticsForEventsIds,
  reportData,
} = require('./api/main.js');
const { EVENTS, MS_IN_SEC } = require('./constants.js');
const { getImage } = require('./utils/camera.js');
const eventEmmiter = require('./utils/events.js');
const { getEmotionAgeAndGender, loadModels } = require('./utils/face-api.js');
const { getCurrentPageUrl } = require('./utils/url.js');

let trackingIntervalId;
const eventsIds = [];

const { on } = eventEmmiter;

const init = () => loadModels();

const getData = async () => {
  const image = await getImage();
  return getEmotionAgeAndGender(image);
};

const getUserStatistics = () => getStatisticsForEventsIds(eventsIds);

const getCurrentPageStatistics = getStatisticsForCurrentPage;

const track = async (getCustomData, withDefaultReporter = true) => {
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

const startTracking = (getCustomData, withDefaultReporter, intervalSec = 30) => {
  trackingIntervalId = setInterval(
    () => track(getCustomData, withDefaultReporter),
    intervalSec * MS_IN_SEC,
  );
};

const stopTracking = () => trackingIntervalId && clearInterval(trackingIntervalId);

module.exports = {
  startTracking,
  stopTracking,
  track,
  getCurrentPageStatistics,
  getUserStatistics,
  getData,
  init,
  on,
  EVENTS,
};
