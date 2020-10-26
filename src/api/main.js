import { getCurrentPageUrl } from '../utils/url';

export const BASE_URL = '';

export const reportData = (data) =>
  fetch(`${BASE_URL}/events`, {
    method: 'POST',
    body: JSON.stringify({ url: getCurrentPageUrl(), ...data }),
  });

export const getStatisticsForCurrentPage = async () => {
  const response = await fetch(`${BASE_URL}/statistics?url=${getCurrentPageUrl()}`);
  const data = await response.json();
  return { ...data };
};

export const getStatisticsForEventsIds = async (eventsIds) => {
  const response = await fetch(`${BASE_URL}/statistics?eventsIds=${eventsIds}`);
  const data = await response.json();
  return { ...data };
};
