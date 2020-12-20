# Epotion 🧪

Detects users' emotions and gathers the data for later analysis.

![CI](https://github.com/marcinxkaminski/face-expression-detector-js/workflows/CI/badge.svg?branch=master)

## Example

```js
import epotion from 'epotion';

(async () => {
  const getCustomData = () => ({ type: 'demo' });

  await epotion.init();

  epotion.startTracking(getCustomData, true, 30);

  epotion.on('*', console.log);

  epotion.on(epotion.EVENTS.REPORTED, async (event) => {
    const userStatistics = await epotion.getUserStatistics();
    const pageStatistics = await epotion.getCurrentPageStatistics();

    console.log(event);
    console.log(userStatistics);
    console.log(pageStatistics);
  });
})();

```
