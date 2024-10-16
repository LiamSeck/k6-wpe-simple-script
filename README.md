# Execution Steps

- On MacOS install K6 by running `brew install k6` or by following the K6 Docs: https://grafana.com/docs/k6/latest/set-up/install-k6/ 

- To execute the script using your local machines resources run `k6 run simple-script.js`. 

- To execute the script using K6 Cloud first authenticate with K6 Cloud by running `k6 login cloud --token token_ID` then to execute the script by running `k6 cloud run simple-script.js`.

- To define the hostname at run time add the `-e HOSTNAME=domain.com` flag: `k6 run -e HOSTNAME=domain.com simple-script.js` or `k6 cloud run -e HOSTNAME=domain.com simple-script.js`.

