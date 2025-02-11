#!/bin/bash

function tearDown {
  echo -e "\nBye!"
  exit 0
}

trap tearDown SIGINT SIGHUP SIGTERM

# Available env variables passed from docker commandline are
# ICORE_BASE_URL_WITH_PORT
# ICORE_BASE_URL
# ICORE_APP_URL

if [[ -z "${ICORE_BASE_URL_WITH_PORT}" ]]; then
  echo "-------Did not find any URL, hence using localhost as url"
else
  echo "-------Creating documentation for URL: ${ICORE_BASE_URL_WITH_PORT}"
  pwd
  file="/usr/share/nginx/html/ilims"
  ls $file
  URL_ONLY=$(echo $ICORE_BASE_URL | awk -F[/:] '{print $4}')
  find /usr/share/nginx/html -not -empty -type f -name *.js -exec sed -i "s|https://localhost.indx.ai:3000|$ICORE_BASE_URL_WITH_PORT|g" {} +
  find /usr/share/nginx/html -not -empty -type f -name *.js -exec sed -i "s|https://localhost.indx.ai|https://$URL_ONLY|g" {} +
fi

exec "$@"
