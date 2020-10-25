export const getGeo = async () => {
  const response = await fetch('https://freegeoip.app/json/');
  const { country_name: country, city, ip } = await response.json();
  return { country, city, ip };
};
