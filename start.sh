#!/bin/bash

API_HOST=${API_HOST:-localhost}
API_PORT=${API_PORT:-8080}
ENVIRONMENT=${ENVIRONMENT:-development}

echo "Configurando nginx con API_HOST=$API_HOST, API_PORT=$API_PORT"

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx &

cd /home/app

if [ "$ENVIRONMENT" = "production" ]; then
    echo "Iniciando Angular en modo producción"
    ng serve --host 0.0.0.0 --port 4200 --configuration production
else
    echo "Iniciando Angular en modo desarrollo"
    ng serve --host 0.0.0.0 --port 4200
fi
