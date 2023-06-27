FROM nginx:latest

WORKDIR /var/www/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./vhost.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
