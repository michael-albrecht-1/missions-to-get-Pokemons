// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SOURCES } from 'src/config/sources';

export const environment = {
  production: false,
  source: SOURCES.restPokeApi,
  firebase: {
    apiKey: 'AIzaSyBsuOnFtVWVlQa-JND5Kcx36vTEb0R7PHc',
    authDomain: 'missions2getpokemons.firebaseapp.com',
    projectId: 'missions2getpokemons',
    storageBucket: 'missions2getpokemons.appspot.com',
    messagingSenderId: '436113489151',
    appId: '1:436113489151:web:a44cf684b7dadca116a0ca',
    measurementId: 'G-9FLT40MYSM',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
