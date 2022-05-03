FROM node:16.13.1
COPY . /app
WORKDIR /app

RUN npm install --production

#Different in the heroku deployment
ENV APPLICATION_URI="https://dedeen3b.herokuapp.com"
ENV API_URI="https://dedeen3b-restapi.herokuapp.com/api"
ENV SOLIDAPI_URI="https://dedeen3b-restapi.herokuapp.com/solid"
ENV NODE_ENV="production"


RUN npm install

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]
