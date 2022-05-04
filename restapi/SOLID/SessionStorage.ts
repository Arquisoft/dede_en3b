import { SolidConnection } from "./API";

export class SessionStorage {
	//Time until a session goes out, refreshed each time
	private static readonly TIMEOUT = 30 * 60 * 1000;

	private static _instance: SessionStorage;

	private _connections: Map<string, SolidConnection>;
	private _timeouts: Map<string, ReturnType<typeof setTimeout>>;

	private constructor() {
		this._connections = new Map();
		this._timeouts = new Map();
	}

	public static get instance(): SessionStorage {
		if(this._instance === undefined)
			this._instance = new SessionStorage()

		return this._instance;
	}

	public set(con: SolidConnection) {
		if(!con.isLoggedIn())
			throw new Error("Solid not logged in, cannot store");

		//TODO: check if it works changing this also
		this._connections.set(con.getWebId().href, con);
		this.resetTimeout(con.getWebId());
	}

	public get(webId: URL | undefined): SolidConnection {
		if(webId === undefined)
			throw new Error("Webid not in connections");

		let res = this._connections.get(this.convertWebId(webId));
		if(res === undefined)
			throw new Error("Webid not in connections");

		this.resetTimeout(webId);

		return res;
	}

	public has(webId: URL | undefined): boolean {
		if(webId === undefined) return false;
		//this is some nasty code we have here
		return this._connections.has(this.convertWebId(webId));
	}

	public remove(webId: URL | undefined) {
		let converted = this.convertWebId(webId);
		if(this.has(webId)) {
			this._connections.delete(converted);
			this._timeouts.delete(converted);
		}
	}
	
	private resetTimeout(webId: URL | undefined) {
		let converted = this.convertWebId(webId);

		let id = this._timeouts.get(converted);
		if(id !== undefined) clearTimeout(id);
		id = setTimeout(
			this.remove.bind(this, webId),
			SessionStorage.TIMEOUT
		);
		this._timeouts.set(converted, id);
	}

	private convertWebId(webId: URL | undefined): string {
		return webId + "";
	}
}
