FROM nginx

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html