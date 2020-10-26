export const BASE_URL = '';

export const reportData = async (
  { url, time, emotion, age, gender, country, city, ip, custom },
  apiURL = `${BASE_URL}`,
) => {
  await fetch(apiURL, { method: 'POST' });
};

export const getCurrentPageStatistics = () => {};
