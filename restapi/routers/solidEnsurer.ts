const express = require('express'); 
import { Request, Response, NextFunction, Router } from "express";
import { SolidConnection } from "../SOLID/API";

const ensurer: Router = express.Router();

ensurer.use((req: Request, res: Response, next: NextFunction) => {
	if(req.session.connection === undefined)
		req.session.connection = new SolidConnection();

	next();
});

export default ensurer;
