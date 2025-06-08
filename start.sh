#!/bin/bash

API_HOST=${API_HOST:-localhost}
API_PORT=${API_PORT:-8080}
ENVIRONMENT=${ENVIRONMENT:-development}
SECRET_TEXT=${SECRET_TEXT:-"not provided"}

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

echo "{\"secretText\": \"$SECRET_TEXT\"}" > /home/app/src/assets/config.json

nginx &

cd /home/app

if [ "$ENVIRONMENT" = "production" ]; then
    echo "Iniciando Angular en modo producción"
    ng serve --host 0.0.0.0 --port 4200 --configuration production --disable-host-check
else
    echo "Iniciando Angular en modo desarrollo"
    ng serve --host 0.0.0.0 --port 4200 --disable-host-check
fi
