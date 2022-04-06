const express = require('express'); 
import { Request, Response, Router } from "express";
import { SolidConnection } from "./SOLID/API";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";

const solid: Router = express.Router();

let connection: SolidConnection = 
	new SolidConnection("https://www.solidcommunity.net");

solid.get("/login", async (req: Request, res: Response) => {
	if(req.query.provider !== null)
		connection = new SolidConnection(req.query.provider as string);

	if(!connection.isLoggedIn())
		connection.login("http://localhost:5000/solid/redirect", res);
});

solid.get("/redirect", async (req: Request, res: Response) => {
	await connection
		.tryHandleRedirect(`http://localhost:5000/solid${req.url}`);

	res.redirect("http://localhost:3000/cart");
});

solid.get("/address", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let url = await connection.fetchDatasetFromUser("profile/card")
		.getThingAsync(connection.getWebId().href)
		.then(thing => thing.getUrl(VCARD.hasAddress));

	let address = await connection.fetchDatasetFromUser("profile/card")
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

solid.get("/webId", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	return res.status(200).json({ webId: connection.getWebId() });
});

solid.get("/isLoggedIn", async (_req: Request, res: Response): Promise<Response> => {
	return res.status(200).json({ isLoggedIn: connection.isLoggedIn() });
});

solid.get("/name", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let name = await connection.fetchDatasetFromUser("profile/card")
		.getThingAsync(connection.getWebId().href)
		.then(thing => thing.getString(FOAF.name));
	return res.status(200).json({ name: name });
});

export default solid;
