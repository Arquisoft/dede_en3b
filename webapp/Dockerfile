FROM node:16.13.1
COPY . /app
WORKDIR /app

RUN npm install --production

#Different in the heroku deployment
ARG APP_URI="https://dedeen3b.herokuapp.com"
ARG API_ENDPOINT="https://dedeen3b-restapi.herokuapp.com/api" 
ARG SOLID_ENDPOINT="https://dedeen3b-restapi.herokuapp.com/solid"
ARG NODE_ENV_PROD="production"
ENV APPLICATION_URI=$APP_URI
ENV API_URI=$API_ENDPOINT
ENV SOLIDAPI_URI=$SOLID_ENDPOINT
ENV NODE_ENV=$NODE_ENV_PROD


RUN npm install

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]
