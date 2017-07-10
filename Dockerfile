# take default image of node boron i.e  node 6.x
FROM node:6.10.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# set the service tah here
# Environment Variables
ENV IMAS_TAG service_three

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]