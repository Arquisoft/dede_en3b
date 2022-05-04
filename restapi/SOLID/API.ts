import { Response } from 'express';

import { 
	Session,
	ISessionInfo,
	getSessionFromStorage,
} from "@inrupt/solid-client-authn-node";

import {
	overwriteFile,
	getSolidDataset, saveSolidDatasetAt, SolidDataset,
	getThing, setThing, Thing,
	getFile,
	getUrl, getUrlAll,
	createThing, buildThing, ThingBuilder,
	getStringNoLocale, getStringNoLocaleAll
} from "@inrupt/solid-client";


export class LogInError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export class DatasetNotFoundError extends Error {
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
		if(!this.isLoggedIn()) {
			await this._session.login({
				redirectUrl: redirect,
				oidcIssuer: this._identityProvider,
				clientName: this.SOLID_CLIENT_NAME,
				handleRedirect: (url) => res.redirect(url)
			});
		} else throw new LogInError("Already logged in");
	}

	public async tryHandleRedirect(url: string) {
		console.log("handle");
		//Try to reload session
		const possibleNewSession = await getSessionFromStorage(this._session.info.sessionId);
		if(possibleNewSession !== undefined)
			this._session = possibleNewSession;

		await this._session.handleIncomingRedirect(url);

		this._isInitialized = true;
		return this;
	}

	public async logout() {
		if(!this.isLoggedIn())
			throw new LogInError("Cannot logout if its not logged in");

		await this._session.logout();
		this._isInitialized = false;
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
			getSolidDataset(datasetUrl, { fetch: this._session.fetch }),
			datasetUrl,
			this
		);
	}

	public fetchDatasetFromUser(datasetUrl: string): DatasetBrowser {
		return this.fetchDatasetFromRawUrl(
			this.convertToLoggedUserUrl(datasetUrl)
		);
	}

	public async saveDataset(dataset: DatasetBrowser)
		: Promise<SolidDataset> 
		{
			return await saveSolidDatasetAt(
				dataset.getUrl(),
				await dataset.getInsides(), { fetch : this._session.fetch }
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

	private _origin: { connection: SolidConnection, url: string };

	constructor(datasetPromise: Promise<SolidDataset>, url: string, connection: SolidConnection) {
		this._datasetPromise = datasetPromise;
		this._origin = { connection: connection, url: url };

		this._datasetPromise.then(dataset => this._dataset = dataset);
	}

	public getThing(
		thingUrl: string,
		callback: (cbParam: ThingBrowser) => void
	): DatasetBrowser 
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

		return new ThingBrowser(insideThing, this);
	}

	public addThing(name: string): ThingBrowser {
		let thing = createThing({ name: name });
		return new ThingBrowser(thing, this);
	}

	public async saveThing(thing: ThingBrowser) {
		await this._waitForDataset();
		this._dataset = setThing(await this.getInsides(), thing.getInsides());
	}

	public async save() {
		await this._waitForDataset();
		this._dataset = await this._origin.connection.saveDataset(this);
	}

	/**
	 * WARNING: Do NOT use this if you don't know what you are doing
	 */
	public async getInsides(): Promise<SolidDataset> {
		await this._waitForDataset();

		if(this._dataset === undefined)
			throw new DatasetNotFoundError(`Dataset ${this._origin.url} not found`);

		return this._dataset;
	}

	public getUrl(): string {
		return this._origin.url;
	}

	private async _waitForDataset() {
		await this._datasetPromise;
	}
}

export class ThingBrowser {
	private _thing: Thing;
	private _origin: DatasetBrowser;
	private _builder: ThingBuilder<Thing> | undefined;

	constructor(thing: Thing, origin: DatasetBrowser) {
		this._thing = thing;
		this._origin = origin;
	}

	public getString(url: string): string | null {
		return getStringNoLocale(this._thing, url);
	}

	public getStringAll(url: string): string[] {
		return getStringNoLocaleAll(this._thing, url);
	}

	public getUrl(url: string): string | null {
		return getUrl(this._thing, url);
	}

	public getUrlAll(url: string): string[] {
		return getUrlAll(this._thing, url);
	}

	public setString(url: string, data: string): ThingBrowser {
		if(this._builder === undefined) this._builder = buildThing(this._thing);

		this._builder?.setStringNoLocale(url, data);
		return this;
	}

	public setUrl(url: string, data: string): ThingBrowser {
		if(this._builder === undefined) this._builder = buildThing(this._thing);

		this._builder?.setUrl(url, data);
		return this;
	}

	public addString(url: string, data: string): ThingBrowser {
		if(this._builder === undefined) this._builder = buildThing(this._thing);

		this._builder?.addStringNoLocale(url, data);
		return this;
	}

	public addUrl(url: string, data: string): ThingBrowser {
		if(this._builder === undefined) this._builder = buildThing(this._thing);

		this._builder?.addUrl(url, data);
		return this;
	}

	public async save(): Promise<DatasetBrowser> {
		if(this._builder !== undefined)
			this._thing = this._builder.build();

		await this._origin.saveThing(this);
		return this._origin;
	}

	/**
	 * WARNING: Do NOT use this if you don't know what you are doing
	 */
	public getInsides(): Thing {
		return this._thing;
	}

}
