/* eslint-disable eslint-comments/disable-enable-pair,no-unsanitized/property,xss/no-mixed-html,no-console */
import epotion from './epotion.js';

(async () => {
  const getCustomData = () => ({ type: 'demo' });

  await epotion.init();

  epotion.startTracking(getCustomData, true, 30);

  epotion.on('*', console.log);

  epotion.on(epotion.EVENTS.REPORTED, async (event) => {
    const userStatistics = await epotion.getUserStatistics();
    const pageStatistics = await epotion.getCurrentPageStatistics();

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
