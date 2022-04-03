import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import api from "./api";
const mongoose = require('mongoose');
require('dotenv').config();

//mongodb+srv://username:password@pruebaasw.dxqcq.mongodb.net/exampleDatabase?retryWrites=true&w=majority

function async connect() {
	const app: Application = express();
	const port: number = 5000;

	console.log("Application started: " + options.origin);

	const options: cors.CorsOptions = {
		origin: ["http://localhost:3000"],
	};

	const metricsMiddleware: RequestHandler = promBundle({
		includeMethod: true,
	});
	app.use(metricsMiddleware);

	app.use(cors(options));
	app.use(bp.json());

	await restapi();
	await solid();

	app
		.listen(port, (): void => {
			console.log("Restapi listening on " + port);
		})
		.on("error", (error: Error) => {
			console.error("Error occured: " + error.message);
		});
}

function restapi(app: Application) {
	// const mongoUrl = "mongodb://localhost:27017/exampleDatabase";
	//This is the url of the connection to the database, currently the database is stored in MongoDB Atlas (A browser version for MongoDB)
	//The user and the password are for this instance only and will be changed for when this is merged.
	var mongoUrl = process.env.DEDE;
	//Creation of the connection for the database. Pretty simple like any other db.
	mongoose
		.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {

			app.use("/api", api);
		});

	const db = mongoose.connection;
	db.on("error",console.error.bind(db,"Error on connection: "));
};

function solid(app: Application) {
	app.use("/solid", solid);
}

//Timeout to allow the database to finish building.
setTimeout(connect,1000);
