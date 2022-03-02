import { 
	Session,
	ISessionInfo
} from "@inrupt/solid-client-authn-browser";

//TODO(Mario): Maybe change this to a state design pattern?

/**
 * Represents a connection to a solid pod. This 
 * is actually a Facade for the Session object
 * in the inrupt API
 */
export class SolidConnection {
	//This is the name that identifies this application in the pod.
	public readonly SOLID_CLIENT_NAME: string = "DeDe";

	private _identityProvider: string;
	private readonly _session: Session;

	private _initializePromise: Promise<ISessionInfo>;
	private _isInitialized: boolean;

	/**
	 * Constructs the connection and tries to catch
	 * the login callback
	 */
	constructor(identityProvider?: string) {
		this._identityProvider = identityProvider;
		this._session = new Session();

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
		//Log in to the session, wait for redirect,
		//and return the promise.
		if(!this._session.info.isLoggedIn) 
			await this._session.login({
				oidcIssuer: this._identityProvider,
				clientName: this.SOLID_CLIENT_NAME,
				//If no redirect, then go back to same url
				//else, go to selected url
				redirectUrl: redirect === null ?
					window.location.href : 
					`${window.location.origin}/${redirect}`, 
			});
	}

	/**
	 * Returns wether the user is logged in or not
	 */
	public isLoggedIn(): boolean {
		return this._session.info.isLoggedIn;
	}

	private _initialize() {
		this._initializePromise =
			this._session.handleIncomingRedirect();
		this._initializePromise.then(() => this._isInitialized = true);
	}

	/**
	 * Returns the initialize promise. This is, a promise that
	 * gets fulfilled when the redirect handle finishes
	 * and the connection knows if its logged in, or not
	 */
	public getInitializePromise(): Promise<ISessionInfo> {
		return this._initializePromise;
	}

	//Note: This WILL logout the current user
	public setIdentityProvider(provider: string) {
		if(this._session.info.isLoggedIn)
			this._session.logout();

		this._identityProvider = provider;
	}
}
