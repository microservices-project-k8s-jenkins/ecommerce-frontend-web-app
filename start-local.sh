#!/bin/bash
API_HOST=${API_HOST:-localhost}
API_PORT=${API_PORT:-8080}
ENVIRONMENT=${ENVIRONMENT:-development}
SECRET_TEXT=${SECRET_TEXT:-"not provided"}

mkdir -p src/assets

npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check