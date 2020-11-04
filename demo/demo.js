/* eslint-disable eslint-comments/disable-enable-pair,no-unsanitized/property,xss/no-mixed-html,no-console */
const {
  init,
  EVENTS,
  on,
  getUserStatistics,
  getCurrentPageStatistics,
  startTracking,
} = require('./epotion.js');

(async () => {
  const getCustomData = () => ({ type: 'demo' });

  await init();

  startTracking(getCustomData, true, 30);

  on('*', console.log);

  on(EVENTS.REPORTED, async (event) => {
    const userStatistics = await getUserStatistics();
    const pageStatistics = await getCurrentPageStatistics();

    document.querySelector('#reportedEvent').innerHTML = JSON.stringify(event, undefined, 2);
    document.querySelector('#userStatistics').innerHTML = JSON.stringify(
      userStatistics,
      undefined,
      2,
    );
    document.querySelector('#pageStatistics').innerHTML = JSON.stringify(
      pageStatistics,
      undefined,
      2,
    );
  });
})();
