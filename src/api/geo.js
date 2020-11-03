export const BASE_URL = 'https://freegeoip.app/json/';

export const getGeo = async () => {
  const response = await fetch(BASE_URL);
  const { country_name: country, city, ip } = await response.json();
  return { country, city, ip };
};
