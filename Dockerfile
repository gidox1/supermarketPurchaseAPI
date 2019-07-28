#Using pre-defined node base image
FROM node:10.0.0


RUN mkdir /var/www
WORKDIR /var/www

# Copy package.json. To take advantage of cached Docker layer
ADD package.json /var/www/


# Install nodemon to restart server on changes and the express
# packages for routing and path
RUN npm install
RUN npm install nodemon 

ADD . /var/www/

# Expose web service
EXPOSE 8080

CMD [ "node", "server.js" ]
 