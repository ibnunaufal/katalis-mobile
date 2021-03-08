// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: "https://api.katalis.info/",
  API_URL_ACADEMIC: "https://api.katalis.info/webedu/",
  API_URL_PY: "https://api.katalis.info/",

  // API_URL: "http://sundev.duckdns.org/",
  // API_URL: "http://192.168.1.102/",
  // API_URL_PY: "http://192.168.1.102:5004/",
  // API_URL_ACADEMIC: "http://192.168.1.102/webedu/",
  TIMEOUT: 10000,
  COMPANYCODE: "0001",
  COMPANYID: "5ec1c4c7ea40dd3912ff206d"
};

/*r
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.ori
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
