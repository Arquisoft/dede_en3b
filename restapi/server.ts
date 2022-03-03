import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import api from "./api";
const mongoose = require('mongoose');

//mongodb+srv://username:password@pruebaasw.dxqcq.mongodb.net/exampleDatabase?retryWrites=true&w=majority

function connect() {
  // const mongoUrl = "mongodb://localhost:27017/exampleDatabase";
  //This is the url of the connection to the database, currently the database is stored in MongoDB Atlas (A browser version for MongoDB)
  //The user and the password are for this instance only and will be changed for when this is merged.
  const mongoUrl = "mongodb+srv://username:password@pruebaasw.dxqcq.mongodb.net/exampleDatabase?retryWrites=true&w=majority";
  //Creation of the connection for the database. Pretty simple like any other db.
  mongoose
    .connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      //All the code that was previously in the server.ts
      const app: Application = express();

      const port: number = 5000;

      const options: cors.CorsOptions = {
        origin: ["http://localhost:3000"],
      };

      console.log("Application started: " + options.origin);

      const metricsMiddleware: RequestHandler = promBundle({
        includeMethod: true,
      });
      app.use(metricsMiddleware);

      app.use(cors(options));
      app.use(bp.json());

      app.use("/api", api);
      app
        .listen(port, (): void => {
          console.log("Restapi listening on " + port);
        })
        .on("error", (error: Error) => {
          console.error("Error occured: " + error.message);
        });
    });

    const db = mongoose.connection;
    db.on("error",console.error.bind(db,"Error on connection: "));
};

//Timeout to allow the database to finish building.
setTimeout(connect,5000);
