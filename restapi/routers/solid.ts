const express = require('express'); 
import { Request, Response, Router } from "express";
import { SolidConnection } from "../SOLID/API";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";

const solid: Router = express.Router();

/**
 * TODO: Deshardcodear esto.
 */
const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dedeen3b-restapi.herokuapp.com/solid';

solid.get("/login", async (req: Request, res: Response) => {
	if(req.query.provider !== null)
		req.session.connection =
			new SolidConnection(req.query.provider as string);

	if(!req.session.connection?.isLoggedIn())
		req.session.connection?.login(`${apiEndPoint}/redirect`, res);
});

solid.get("/redirect", async (req: Request, res: Response) => {
	await req.session.connection
		?.tryHandleRedirect(`${apiEndPoint}${req.url}`);

	res.redirect(`https://dedeen3b.herokuapp.com/`);
});

solid.get("/address", async (req: Request, res: Response): Promise<Response> => {
	if(!req.session.connection?.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let url = await req.session.connection
		?.fetchDatasetFromUser("profile/card")
		.getThingAsync(req.session.connection?.getWebId().href)
		.then(thing => thing.getUrl(VCARD.hasAddress));

	let address = await req.session.connection
		?.fetchDatasetFromUser("profile/card")
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
	if(!req.session.connection?.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	return res.status(200).json({ 
		webId: req.session.connection?.getWebId() 
	});
});

solid.get("/isLoggedIn", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).json({
		isLoggedIn: req.session.connection?.isLoggedIn() 
	});
});

solid.get("/name", async (req: Request, res: Response): Promise<Response> => {
	if(!req.session.connection?.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let name = await req.session.connection
		?.fetchDatasetFromUser("profile/card")
		.getThingAsync(req.session.connection?.getWebId().href)
		.then(thing => thing.getString(FOAF.name));
	return res.status(200).json({ name: name });
});

export default solid;
