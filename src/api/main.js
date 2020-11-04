const { getCurrentPageUrl } = require('../utils/url.js');

const EVENTS_PATH = '/events';
const STATISTICS_PATH = '/statistics';
const BASE_URL = 'https://epotion-api.herokuapp.com';

const reportData = async (data) => {
  const response = await fetch(`${BASE_URL}${EVENTS_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const { id } = await response.json();
  return id;
};

const getStatisticsForCurrentPage = async () => {
  const response = await fetch(`${BASE_URL}${STATISTICS_PATH}?url=${getCurrentPageUrl()}`);
  return response.json();
};

const getStatisticsForEventsIds = async (eventsIds) => {
  const response = await fetch(`${BASE_URL}${STATISTICS_PATH}?eventsIds=${eventsIds.toString()}`);
  return response.json();
};

module.exports = { reportData, getStatisticsForCurrentPage, getStatisticsForEventsIds };
