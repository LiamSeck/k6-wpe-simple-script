import { base_url } from "./config.js";
import { sleep, group } from 'k6'
import { check } from 'k6';
import http from 'k6/http'
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';


export const options = {

cloud: {
      // The ID of the project to which the test is assigned in the k6 Cloud UI.
      // By default tests are executed in default project.
      projectID: "3719588",
      // The name of the test in the k6 Cloud UI.
      // Test runs with the same name will be grouped.
      name: "SE K6 Testing",
      // Define loadZone distribution 
      distribution: {
        AWS_London: { loadZone: 'amazon:gb:london', percent: 100 }
      }
    },
  thresholds: {
    // http errors should be less than 1%  
    http_req_failed: ['rate<0.01'],
    // 95% of requests should be below 600ms
    http_req_duration: ['p(95)<600']},
    
  
    scenarios: {
    GetHomepage: {
      // Constant VUs
      executor: 'constant-vus',
      gracefulStop: '30s',
      duration: '1m',
      vus: 1,

      //Ramping VUs
      // executor: 'ramping-vus',
      // startVUs: 0,
      // stages: [
      //   { target: 100, duration: '30s' },
      //   { target: 100, duration: '1m' },
      //   { target: 200, duration: '30s' },
      //   { target: 200, duration: '1m' },
      // ],      
      // gracefulStop: '30s',
      exec: 'GetHomepage',
    },
  },
}

export function GetHomepage() {
  let response

  group(`page_1 - ${base_url}`, function () {
    // The ${base_url} variable has been set in config.js and imported
    // This variable can be modified at run time by passing the -e HOSTNAME flag e.g k6 run -e HOSTNAME=domain.com simple-script.js
    response = http.get(`https://${base_url}/`,
    {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })
  // Adding check for 200 response code
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
}
