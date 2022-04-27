const express = require('express'); 
import { Request, Response, Router } from "express";
import { SolidConnection } from "../SOLID/API";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";

const solid: Router = express.Router();

let connection: SolidConnection = new SolidConnection();

/**
 * TODO: Deshardcodear esto.
 */
//const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dedeen3b-restapi.herokuapp.com/solid';
const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/solid';

solid.get("/login", async (req: Request, res: Response) => {
	if(req.query.provider !== null)
		connection =
			new SolidConnection(req.query.provider as string);

	if(!connection.isLoggedIn())
		connection.login(`${apiEndPoint}/redirect`, res);
});

solid.get("/redirect", async (req: Request, res: Response) => {
	await connection
		.tryHandleRedirect(`${apiEndPoint}${req.url}`);

	console.log("logged in " + connection.getWebId());
	res.redirect(`https://dedeen3b.herokuapp.com/`);
});

solid.get("/address", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let url = await connection
		.fetchDatasetFromUser("profile/card")
		.getThingAsync(connection.getWebId().href)
		.then(thing => thing.getUrl(VCARD.hasAddress));

	console.log(url);

	let address = await connection
		.fetchDatasetFromUser("profile/card")
		.getThingAsync(url ?? "")
		.then(thing => ({
			country_name: thing.getString(VCARD.country_name),
			locality: thing.getString(VCARD.locality),
			postal_code: thing.getString(VCARD.postal_code),
			region: thing.getString(VCARD.region),
			street_address: thing.getString(VCARD.street_address),
		}));

	if(address !== null) return res.status(200).json(address);
	else return res.status(404).json({ message: "Address not found" });
});

solid.post(
	"/address",
	async (req: Request, res:Response): Promise<Response> => {
		if(!connection.isLoggedIn()) 
			return res.status(403).json(
				{ message: "User not logged in" }
			);

		const address = {
			street: req.body.street,
			locality: req.body.locality,
			postal_code: req.body.postal_code,
			region: req.body.region,
			country_name: req.body.country_name,
		};

		let id = `id${Math.floor(Math.random() * 1e14)}`;
		let webId = connection.getWebId();
		webId.hash = "";
		let urlId = `${webId}${id}`;

		let urlDataset = await connection
			.fetchDatasetFromUser("profile/card");
		(await urlDataset.getThingAsync(connection.getWebId().href))
			.addUrl(VCARD.hasAddress, urlId)
			.save();

		await urlDataset.save();

		let dataset = connection.fetchDatasetFromUser("profile/card");
		await dataset
			.addThing(id)
			.addString(VCARD.street_address, req.body.street)
			.addString(VCARD.locality, req.body.locality)
			.addString(VCARD.postal_code, req.body.postal_code)
			.addString(VCARD.region, req.body.region)
			.addString(VCARD.country_name, req.body.country_name)
			.save();

		await dataset.save();

		return res.sendStatus(200);
	}
);

solid.get("/webId", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	return res.status(200).json({ 
		webId: connection.getWebId() 
	});
});

solid.get("/isLoggedIn", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).json({
		isLoggedIn: connection.isLoggedIn() 
	});
});

solid.get("/name", async (req: Request, res: Response): Promise<Response> => {
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
