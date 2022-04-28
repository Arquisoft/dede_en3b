FROM node:16.13.1

#Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --production

ARG MONGO_URI="mongodb+srv://dedeAdmin:aswLosMejores_3b@DeDe-en3b-Cluster.iqslm.mongodb.net/Database?retryWrites=true&w=majority"
ENV MONGO_URI=$MONGO_URI

RUN npm install
# bundle app source
COPY server.ts ./
COPY ./routers/api.ts ./routers/solid.ts  ./routers/
ADD model ./model
ADD SOLID ./SOLID
ADD util ./util

CMD [ "npm", "start" ]
