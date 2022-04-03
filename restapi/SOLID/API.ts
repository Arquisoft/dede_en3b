import { Response } from 'express';

import { 
	Session,
	ISessionInfo,
	getSessionFromStorage,
} from "@inrupt/solid-client-authn-node";

import {
	getFile, getUrl,
	overwriteFile,
	getSolidDataset, SolidDataset,
	getThing, Thing,
	getStringNoLocale
} from "@inrupt/solid-client";

export class LogInError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export class ThingNotFoundError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

/**
 * Represents a connection to a solid pod. This 
 * is actually a Facade for the Session object
 * in the inrupt API
 */
export class SolidConnection {
	//This is the name that identifies this application in the pod.
	public readonly SOLID_CLIENT_NAME: string = "DeDe";

	private _identityProvider: string | undefined;
	private _session: Session;

	private _isInitialized: boolean;

	/**
	 * Constructs the connection and tries to catch
	 * the login callback
	 */
	constructor(identityProvider?: string) {
		this._identityProvider = identityProvider;
		this._session = new Session();

		this._isInitialized = false;
	}

	/**
	 * Logs in. This will redirect the user to another page
	 * for authentification, and then back to this page.
	 * (by default, the same, but can be changed with the
	 * redirect param). Returns a promise that will end
	 * just before the first redirect happens.
	 *
	 * It is neccesary to catch the redirect when it comes back,
	 * the constructor does this automatically
	 */
	public async login(redirect: string, res: Response): Promise<void> {
		//Log in to the session, wait for redirect,
		//and return the promise.
		if(!this.isLoggedIn()) 
			await this._session.login({
				redirectUrl: redirect,
				oidcIssuer: this._identityProvider,
				clientName: this.SOLID_CLIENT_NAME,
				handleRedirect: (url) => res.redirect(url)
			});
		else throw new LogInError("Already logged in");
	}

	/**
	 * Converts an URL to the same url but the base is
	 * now the base of user's webID
	 */
	public convertToLoggedUserUrl(fileUrl: string): string {
		if(!this.isLoggedIn())
			throw new LogInError("Not logged in");

		let webIdUrl = this.getWebId(); 
		return `${webIdUrl.origin}/${fileUrl}`;
	}

	/**
	 * Returns specified url.
	 */
	public async getFileFromRawUrl(fileUrl: string)
		: Promise<Blob> 
	{
		let result = await getFile(
			fileUrl,
			{ fetch: this._session.fetch }
		);
		return result;
	}

	/**
	 * Returns specified url.
	 * This method converts the passed in url to a url with the
	 * base of the webID of the user.
	 */
	public async getFileFromLoggedUser(fileUrl: string) 
		: Promise<Blob>
	{
		return this.getFileFromRawUrl(
			this.convertToLoggedUserUrl(fileUrl)
		);
	}

	/**
	 * Overwrites the specified file (or creates it, if it doesnt exist)
	 * with the passed in file. 
	 */
	public async overwriteFileInRawUrl(fileUrl: string, file: File)
		: Promise<void>
	{
		await overwriteFile(
			fileUrl,
			file,
			{ contentType: file.type, fetch: this._session.fetch }
		);
	}

	/**
	 * Overwrites the specified file (or creates it, if it doesnt exist)
	 * with the passed in file. 
	 * This method converts the passed in url to a url with the
	 * base of the webID of the user.
	 */
	public async overwriteFileInLoggedUserUrl(fileUrl: string, file: File) 
		: Promise<void>
	{
		return this.overwriteFileInRawUrl(
			this.convertToLoggedUserUrl(fileUrl), file
		);
	}

	public fetchDatasetFromRawUrl(datasetUrl: string): DatasetBrowser {
		return new DatasetBrowser(
			getSolidDataset(datasetUrl, { fetch: this._session.fetch })
		);
	}

	public fetchDatasetFromUser(datasetUrl: string): DatasetBrowser {
		return this.fetchDatasetFromRawUrl(
			this.convertToLoggedUserUrl(datasetUrl)
		);
	}

	/**
	 * Returns wether the user is logged in or not
	 */
	public isLoggedIn(): boolean {
		return this._session.info.isLoggedIn;
	}

	public getWebId(): URL {
		if(!this.isLoggedIn() || this._session.info.webId === undefined)
			throw new LogInError("Not logged in");
		return new URL(this._session.info.webId);
	}

	public async tryHandleRedirect(url: string) {
		//Try to reload session
		const possibleNewSession = await getSessionFromStorage(this._session.info.sessionId);
		if(possibleNewSession !== undefined) this._session = possibleNewSession;

		await this._session.handleIncomingRedirect(url);

		this._isInitialized = true;
		return this;
	}

	//Note: This WILL logout the current user
	public setIdentityProvider(provider: string) {
		if(this.isLoggedIn())
			this._session.logout();

		this._identityProvider = provider;
	}
}

export class DatasetBrowser {
	private readonly _datasetPromise: Promise<SolidDataset>;
	private _dataset: SolidDataset | undefined;

	constructor(datasetPromise: Promise<SolidDataset>) {
		this._datasetPromise = datasetPromise;

		this._datasetPromise.then(dataset => this._dataset = dataset);
	}

	public getThing(thingUrl: string, callback: (cbParam: ThingBrowser) => void)
		: DatasetBrowser 
	{
		this.getThingAsync(thingUrl).then(callback);
		return this;
	}

	public async getThingAsync(thingUrl: string): Promise<ThingBrowser> {
		await this._waitForDataset();
		if(this._dataset === undefined)
			throw new ThingNotFoundError(`Thing ${thingUrl} not found`);

		let insideThing = getThing(this._dataset, thingUrl);
		if(insideThing === null)
			throw new ThingNotFoundError(`Thing ${thingUrl} not found`);

		return new ThingBrowser(insideThing);
	}

	private async _waitForDataset() {
		await this._datasetPromise;
	}
}

export class ThingBrowser {
	private _thing: Thing;

	constructor(thing: Thing) {
		this._thing = thing;
	}

	public getString(url: string): string | null {
		return getStringNoLocale(this._thing, url);
	}

	public getUrl(url: string): string | null {
		return getUrl(this._thing, url);
	}
}
