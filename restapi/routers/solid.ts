const express = require('express'); 
import "express-session";
import { Request, Response, Router } from "express";
import { SolidConnection } from "../SOLID/API";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";

const solid: Router = express.Router();

/**
 * TODO: Deshardcodear esto.
 */
const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dedeen3b-restapi.herokuapp.com/solid';
//const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/solid';

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

	console.log("logged in " + req.session.connection?.getWebId());
	res.redirect(`https://dedeen3b.herokuapp.com/`);
	//res.redirect(`http://localhost:3000/`);
});

solid.get("/address", async (req: Request, res: Response)
	: Promise<Response> => 
{
	if(!req.session.connection?.isLoggedIn()) 
		return res.status(403).json(
			{ message: "User not logged in" }
		);

	let urls = await connection
		?.fetchDatasetFromUser("profile/card")
		.getThingAsync(req.session.connection?.getWebId().href)
		.then(thing => thing.getUrlAll(VCARD.hasAddress));

	let addresses = await Promise.all(
		urls.map(url => 
			req.session.connection
			?.fetchDatasetFromUser("profile/card")
			.getThingAsync(url)
			.then(thing => ({
				country_name: thing.getString(VCARD.country_name),
				locality: thing.getString(VCARD.locality),
				postal_code: thing.getString(VCARD.postal_code),
				region: thing.getString(VCARD.region),
				street_address: thing.getString(VCARD.street_address),
			}))
		)
	);

	if(addresses.length !== 0) return res.status(200).json(addresses);
	else return res.status(404).json({ 
		message: "User has no addresses" 
	});
});

solid.post(
	"/address",
	async (req: Request, res:Response): Promise<Response> => {
		if(!req.sesion.connection?.isLoggedIn()) 
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
		let webId = req.session.connection?.getWebId();
		let urlId = `${webId.origin}${webId.pathname}#${id}`;

		let urlDataset = await req.session.connection
			?.fetchDatasetFromUser("profile/card");
		let urlThing = await urlDataset.getThingAsync(req.session.connection?.getWebId().href);
		console.log(urlThing.getUrlAll(VCARD.hasAddress));
		await urlThing
			.addUrl(VCARD.hasAddress, urlId)
			.save();

		console.log(urlThing.getUrlAll(VCARD.hasAddress));

		await urlDataset.save();

		urlThing = await urlDataset.getThingAsync(req.session.connection?.getWebId().href);
		console.log(urlThing.getUrlAll(VCARD.hasAddress));

		let dataset = req.session.connection?.fetchDatasetFromUser("profile/card");
		await dataset
			.addThing(id)
			.addString(VCARD.street_address, req.body.street)
			.addString(VCARD.locality, req.body.locality)
			.addString(VCARD.postal_code, req.body.postal_code)
			.addString(VCARD.region, req.body.region)
			.addString(VCARD.country_name, req.body.country_name)
			.save();

		await dataset.save();

		return res.status(200).json(await dataset.getInsides());
	}
);

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
