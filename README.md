# Epotion 🧪

Detects users' emotions and gathers the data for later analysis.

![CI](https://github.com/marcinxkaminski/face-expression-detector-js/workflows/CI/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/epotion.svg)](https://badge.fury.io/js/epotion)

## Install 🔧

use NPM:

```sh
npm i -S epotion
```

use Yarn:

```sh
yarn add epotion
```

## Example 🤓

```js
import epotion from 'epotion';

(async () => {
  await epotion.init();

  epotion.startTracking();

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

## API Functions 🎮

### `init()`

**Returns:** `Promise<>`

This is **MANDATORY** function that needs to be called before using any face expression recognition functions like `getDataAndImage`, `track` or `startTracking`. Also note, that this function needs to be awaited in most cases.

### `getDataAndImage()`

**Returns:** `Promise<Object>`

This function returns data from image (emotion, age, gender etc.) as well as the image that was analyzed.

### `getUserStatistics()`

**Returns:** `Promise<Object>`

Returns statistics for the user's events. It uses events' ids that were collected during tracking.

### `getCurrentPageStatistics()`

**Returns:** `Promise<Object>`

Returns statistics for the current page (url).

### `track(customReporter, enableReporting = true)`

**Returns:** `Promise<>`

One time tracking. It takes picture, gets analyzed data and reports it. You can use custom reporter for that purpose or even disable reporting.

### `startTracking(customReporter, enableReporting = true, intervalSec = 30)`

**Returns:** `undefined`

Starts tracking in interval. It uses `track` method in interval, simply providing simple interface for managing it.

### `stopTracking()`

**Returns:** `undefined`

Stops tracking started by calling `startTracking` function.

### `on(eventName, callback)`

**Returns:** `undefined`

Allows you to listen to events and make callbacks.

## Events 🎉

All events are available under `EVENTS` property in epotion.

### `tracked`

Whenever tracking was used and data was properly collected.

### `reported`

Whenever events were reported, no matter the reporter that was used - default or custom.

## More about API and Events

For more information about functions and events that are allowed to use I recommend you to check out the code.
It's pretty straightforward and the best starting point is `src/epotion.js` file.
[Check it out now](https://github.com/marcinxkaminski/epotion/blob/master/src/epotion.js)

## Future Work 🔮

- [ ] Move from `face-api.js` to own TensorFlow based solution.
- [ ] Improve documentation

## Development 👷🏼‍♂️

```sh
git clone https://github.com/marcinxkaminski/epotion.git
cd epotion
npm ci
npm run start
```

You could also improve your development experience by using [react-epotion](https://github.com/marcinxkaminski/react-epotion) to test this. Use `npm link` for that purpose. [More information here](https://docs.npmjs.com/cli/v6/commands/npm-link).

## Contribution

Feel free to contribute - every help is welcome 🙏🏻
