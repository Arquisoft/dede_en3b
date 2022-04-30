const express = require('express'); 
import { Request, Response, NextFunction, Router } from "express";
import { SolidConnection } from "../SOLID/API";
import { SessionStorage } from "../SOLID/SessionStorage";

const ensurer: Router = express.Router();

ensurer.use((req: Request, res: Response, next: NextFunction) => {
	next();
});

export default ensurer;
