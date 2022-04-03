import express, { Request, Response, Router } from "express";
import { SolidConnection } from "./SOLID/API";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";

const api: Router = express.Router();

let connection: SolidConnection = 
	new SolidConnection("https://www.solidcommunity.net");

api.get("/login", async (req: Request, res: Response) => {
	if(req.query.provider !== null)
		connection = new SolidConnection(req.query.provider as string);

	if(!connection.isLoggedIn())
		connection.login("http://localhost:5000/api/redirect", res);
});

api.get("/redirect", async (req: Request, res: Response) => {
	await connection
		.tryHandleRedirect(`http://localhost:5000/api${req.url}`);

	res.redirect("/");
});

api.get("/address", async (req: Request, res: Response): Promise<Response> => {
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

	return res.status(200).json(address);
});

api.get("/webId", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	return res.status(200).json({ webId: connection.getWebId() });
});

api.get("/name", async (req: Request, res: Response): Promise<Response> => {
	if(!connection.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let name = await connection.fetchDatasetFromUser("profile/card")
		.getThingAsync(connection.getWebId().href)
		.then(thing => thing.getString(FOAF.name));
	return res.status(200).json({ name: name });
});

export default api;
