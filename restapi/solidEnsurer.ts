const express = require('express'); 

const ensurer: Router = express.Router();
import { Request, Response, NextFunction, Router } from "express";
import { SolidConnection } from "./SOLID/API";

ensurer.use((req: Request, res: Response, next: NextFunction) => {
	if( req.session.connection == undefined )
		req.session.connection = new SolidConnection();

	next();
});

export default ensurer;
