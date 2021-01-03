import { getCurrentPageUrl } from '../utils/url.js';

const EVENTS_PATH = '/events';
const STATISTICS_PATH = '/statistics';
const BASE_URL = 'https://epotion-api.herokuapp.com';

export const reportData = async (data) => {
  const response = await fetch(`${BASE_URL}${EVENTS_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const { id } = await response.json();
  return id;
};

export const getStatisticsForCurrentPage = async () => {
  const response = await fetch(`${BASE_URL}${STATISTICS_PATH}?url=${getCurrentPageUrl()}`);
  return response.json();
};

export const getStatisticsForEventsIds = async (eventsIds) => {
  const response = await fetch(`${BASE_URL}${STATISTICS_PATH}?eventsIds=${eventsIds.toString()}`);
  return response.json();
};
