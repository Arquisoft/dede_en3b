import { SolidConnection } from "./API";

export class SessionStorage {
	private static _instance: SessionStorage;

	private _connections: Map<string, SolidConnection>;

	private constructor() {
		this._connections = new Map();
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
	}

	public get(webId: URL | undefined): SolidConnection {
		if(webId === undefined)
			throw new Error("Webid not in connections");

		let res = this._connections.get(this.convertWebId(webId));
		if(res === undefined)
			throw new Error("Webid not in connections");

		return res;
	}

	public has(webId: URL | undefined): boolean {
		if(webId === undefined) return false;
		//this is some nasty code we have here
		return this._connections.has(this.convertWebId(webId));
	}

	public remove(webId: URL | undefined) {
		if(this.has(webId))
			this._connections.delete(this.convertWebId(webId));
	}

	private convertWebId(webId: URL | undefined): string {
		return webId + "";
	}
}
