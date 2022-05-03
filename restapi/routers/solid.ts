const express = require('express'); 
import "express-session";
import { Request, Response, Router } from "express";
import { SolidConnection } from "../SOLID/API";
import { SessionStorage } from "../SOLID/SessionStorage";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";
const { v4: uuidv4 } = require('uuid');

const solid: Router = express.Router();

/**
 * TODO: Deshardcodear esto.
 */
//const apiEndPoint = process.env.SOLIDAPI_URI || 'http://localhost:5000/solid';
const apiEndPoint = "https://dedeen3b-restapi.herokuapp.com/solid";

solid.get("/login", async (req: Request, res: Response) => {
	console.log(apiEndPoint, process.env.SOLIDAPI_URI);
	let connection;
	if(req.query.provider !== null)
		connection =
			new SolidConnection(req.query.provider as string);
	else if(SessionStorage.instance.has(req.session.webId))
		connection = SessionStorage.instance.get(req.session.webId);

	if(connection === undefined)
		connection = new SolidConnection();

	if(!connection.isLoggedIn()) {
		try {
			await connection.login(`${apiEndPoint}/redirect`, res);
		} catch(error: unknown) {
			return res.status(400).json({ cause: error });
		}
	} else {
		req.session.webId = connection.getWebId();
		return res.status(200);
	}
});

solid.get("/logout", async (req: Request, res: Response) => {
	let connection;
	if(SessionStorage.instance.has(req.session.webId))
		connection = SessionStorage.instance.get(req.session.webId);

	if(connection === undefined || !connection.isLoggedIn())
		return res.status(403).json({ message: "User not logged in" });

	await connection.logout();

	//Now, eliminate connection from storage
	SessionStorage.instance.remove(req.session.webId);
	return res.status(200);
});

solid.get("/redirect", async (req: Request, res: Response) => {
	let connection;
	if(SessionStorage.instance.has(req.session.webId))
		connection = SessionStorage.instance.get(req.session.webId);
	else 
		connection = new SolidConnection();

	try {
		await connection
			.tryHandleRedirect(`${apiEndPoint}${req.url}`);
	} catch(error: unknown) {
		return res.status(500).json({
			message: `Error trying to connect to solid: ${error}`
		});
	}

	SessionStorage.instance.set(connection);
	req.session.webId = connection.getWebId();
	//req.session.save();

	console.log("Logged in " + req.session.webId)

	console.log("http://localhost:3000");
	//res.redirect(process.env.APPLICATION_URI || "http://localhost:3000");
	res.redirect(process.env.APPLICATION_URI || "https://dedeen3b.herokuapp.com");
});

solid.get("/address", async (req: Request, res: Response)
	: Promise<Response> => 
	{
		if(!SessionStorage.instance.has(req.session.webId))
			return res.status(403).json({
				message: "Connection not initialized" 
			});
		let connection = SessionStorage.instance.get(req.session.webId);
		if(connection === undefined)
			return res.status(403).json({
				message: "Connection not initialized" 
			});

		if(!connection.isLoggedIn()) 
			return res.status(403).json(
				{ message: "User not logged in" }
			);

		let urls = await connection
			.fetchDatasetFromUser("profile/card")
			.getThingAsync(connection.getWebId().href)
			.then(thing => thing.getUrlAll(VCARD.hasAddress));

		let addresses = await Promise.all(
			urls.map(url => 
				connection
				.fetchDatasetFromUser("profile/card")
				.getThingAsync(url)
				.then(thing => {
					let res = {
						country_name: thing.getString(VCARD.country_name),
						locality: thing.getString(VCARD.locality),
						postal_code: thing.getString(VCARD.postal_code),
						region: thing.getString(VCARD.region),
						street_address: thing.getString(VCARD.street_address),
					};
					return res;
				})
			)
		);

		if (addresses.length !== 0) return res.status(200).json(addresses);
		else return res.status(404).json({
			message: "User has no addresses"
		});
	});

solid.post(
	"/address",
	async (req: Request, res:Response): Promise<Response> => 
	{
		if(!SessionStorage.instance.has(req.session.webId))
			return res.status(403).json({ message: "Connection not initialized" });
		let connection = SessionStorage.instance.get(req.session.webId);

		if(!connection.isLoggedIn()) 
			return res.status(403).json(
				{ message: "User not logged in" }
			);

		const address = {
			street_address: req.body.street_address,
			locality: req.body.locality,
			postal_code: req.body.postal_code,
			region: req.body.region,
			country_name: req.body.country_name,
		};

		let id = `id${uuidv4()}`;

		let webId = connection.getWebId();
		let urlId = `${webId.origin}${webId.pathname}#${id}`;

		let urlDataset = await connection
			.fetchDatasetFromUser("profile/card");
		let urlThing = await urlDataset.getThingAsync(connection.getWebId().href);
		await urlThing
			?.addUrl(VCARD.hasAddress, urlId)
			?.save();

		await urlDataset.save();

		urlThing = await urlDataset.getThingAsync(connection.getWebId().href);

		let dataset = connection.fetchDatasetFromUser("profile/card");
		await dataset
			?.addThing(id)
			?.addString(VCARD.street_address, req.body.street_address)
			?.addString(VCARD.locality, req.body.locality)
			?.addString(VCARD.postal_code, req.body.postal_code)
			?.addString(VCARD.region, req.body.region)
			?.addString(VCARD.country_name, req.body.country_name)
			?.save();

		await dataset.save();

		return res.status(200).json(await dataset.getInsides());
	}
);

solid.get("/webId", async (req: Request, res: Response): Promise<Response> => {
	if(!SessionStorage.instance.has(req.session.webId))
		return res.status(403).json({ message: "Connection not initialized" });
	let connection = SessionStorage.instance.get(req.session.webId);

	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	return res.status(200).json({
		webId: connection.getWebId()
	});
});

solid.get("/isLoggedIn", async (req: Request, res: Response): Promise<Response> => {
	console.log("user " + req.session.webId);
	if(!SessionStorage.instance.has(req.session.webId))
		return res.status(200).json({ isLoggedIn: false });
	let connection = SessionStorage.instance.get(req.session.webId);


	return res.status(200).json({
		isLoggedIn: connection.isLoggedIn()
	});
});

solid.get("/name", async (req: Request, res: Response): Promise<Response> => {
	if(!SessionStorage.instance.has(req.session.webId))
		return res.status(403).json({ message: "Connection not initialized" });
	let connection = SessionStorage.instance.get(req.session.webId);

	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let name = await connection
		.fetchDatasetFromUser("profile/card")
		.getThingAsync(connection.getWebId().href)
		.then(thing => thing.getString(FOAF.name));
	return res.status(200).json({ name: name });
});

export default solid;
