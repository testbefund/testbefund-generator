FROM nginx:alpine
COPY dist/testbefund-generator* /usr/share/nginx/html/
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
# Custom execution script to make the URLs configurable
ADD docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
CMD ["/docker-entrypoint.sh"]
