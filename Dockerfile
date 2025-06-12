FROM node:18-alpine

RUN apk add --no-cache nginx gettext bash

RUN npm install -g pnpm

RUN npm set registry https://registry.npmmirror.com

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN mkdir -p $PNPM_HOME && \
    pnpm add -g @angular/cli@13.3.9

COPY nginx.conf /etc/nginx/nginx.conf.template
COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN mkdir -p /home/app /var/run/nginx

WORKDIR /home/app

COPY package*.json ./
RUN pnpm install

COPY src ./src
COPY angular.json ./
COPY tsconfig*.json ./
COPY karma.conf.js ./

EXPOSE 80

CMD ["/start.sh"]
