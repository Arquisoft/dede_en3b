import { 
	Session,
	ISessionInfo
} from "@inrupt/solid-client-authn-browser";

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
	private readonly _session: Session;

	private _initializePromise: Promise<SolidConnection>;
	private _isInitialized: boolean;

	/**
	 * Constructs the connection and tries to catch
	 * the login callback
	 */
	constructor({ identityProvider?: string, redirectCode?: string }? options) {
		this._identityProvider = identityProvider;
		this._session = new Session();
		this._redirectCode = redirectCode;

		this._initialize();
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
	public async login(redirect?: string): Promise<void> {
		console.log(redirect, window.location.href);
		//Log in to the session, wait for redirect,
		//and return the promise.
		if(!this.isLoggedIn()) 
			await this._session.login({
				oidcIssuer: this._identityProvider,
				clientName: this.SOLID_CLIENT_NAME,
				//If no redirect, then go back to same url
				//else, go to selected url
				redirectUrl: redirect === undefined ?
					window.location.href : 
					`${window.location.origin}/${redirect}`, 
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

	private _initialize() {
		this._initializePromise = new Promise((accept, reject) => 
			this._session.handleIncomingRedirect({ code: this._redirectCode })
			.then(() => accept(this))
			.catch(err => reject(err))
		);

		this._initializePromise.then(() => this._isInitialized = true);
	}

	/**
	 * Returns the initialize promise. This is, a promise that
	 * gets fulfilled when the redirect handle finishes
	 * and the connection knows if its logged in, or not
	 */
	public getLoginPromise(): Promise<SolidConnection> {
		return this._initializePromise;
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
	private _dataset: SolidDataset;

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
