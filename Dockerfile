FROM node:14-alpine

RUN apk add --no-cache nginx gettext bash
RUN npm i -g npm@8.1.4
RUN npm i -g @angular/cli@13.0.3

COPY nginx.conf /etc/nginx/nginx.conf.template
COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /home/app

RUN mkdir -p /var/run/nginx

WORKDIR /home/app

COPY package*.json ./
RUN npm i

COPY src ./src
COPY angular.json ./
COPY tsconfig*.json ./
COPY karma.conf.js ./

EXPOSE 80

CMD ["/start.sh"]
