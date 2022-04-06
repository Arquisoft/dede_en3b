FROM node:16.13.1
COPY . /app
WORKDIR /app

RUN npm install --production

#Different in the heroku deployment
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

RUN npm install

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]
