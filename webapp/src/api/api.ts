import {IProduct, IOrder, Address, Review, ICartItem} from '../shared/shareddtypes';

const apiEndPoint = process.env.API_URI || 'https://dedeen3b-restapi.herokuapp.com/api';
const solidEndPoint = process.env.SOLIDAPI_URI || 'https://dedeen3b-restapi.herokuapp.com/solid';
//const apiEndPoint = process.env.API_URI || 'http://localhost:5000/api';
//const solidEndPoint = process.env.SOLIDAPI_URI || 'http://localhost:5000/solid';

/**
 * This fucntion returns the productst that are currently stored in the databse.
 * First we get the api endpoint that we are going to be listening on.
 * Then we call the api function with the address that we want to request at. (localhost:5000/products/list)
 * Then we send back the response.
 */
export async function getProducts(): Promise<IProduct[]> {
	let response = await fetch(apiEndPoint + "/products/list");
	return response.json();
}

export async function getProduct(id: string): Promise<IProduct> {
	var str: string = apiEndPoint + "/products/" + id;
	let response = await fetch(str);
	return response.json();
}

/**
 * Function to query the database looking for products realated with title name
 * @param id
 * @returns
 */
export async function findProductsByName(name: string): Promise<IProduct[]> {
	var str: string = apiEndPoint + "/products/search/" + name;
	let response = await fetch(str);
	return response.json();
}

export async function filterProducts(type: string): Promise<IProduct[]> {
	var str: string = apiEndPoint + "/products/filter/" + type;
	let response = await fetch(str);
	return response.json();
}

/**
 *
 * @param user Function to add orders to the db
 * @returns
 */
export async function addOrder(
	orders: ICartItem[],
	webId: string,
	address: Address,
	price: number,
	date: Date
): Promise<boolean> {
	let response = await fetch(apiEndPoint + "/orders/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			webId: webId,
			products: orders.map((item) => ({
				id: item.product._id.toString(),
				name: item.product.name,
				quantity: item.units,
			})),
			address: address,
			price: price,
			date: date,
		}),
	});
	if (response.status === 200) return true;
	else return false;
}

/**
 * Function to query the database looking for products realated with title name
 * @param id
 * @returns
 */
export async function findOrdersByUser(webId: string): Promise<IOrder[]> {
	var str: string =
		apiEndPoint + "/orders/find?webId=" + encodeURIComponent(webId);
	let response = await fetch(str);
	return response.json();
}

export async function getOrder(id: string): Promise<IOrder> {
	var str: string = apiEndPoint + "/orders/" + id;
	let response = await fetch(str);
	return response.json();
}

/**
 * Function to get solid name
 */
export async function getSolidName(): Promise<any> {
	var str: string = solidEndPoint + "/name";
	let response = await fetch(str, {
		credentials: "same-origin",
	});
	return response.json();
}

/**
 * Function to get webId
 */
export async function getSolidWebId(): Promise<string> {
	var str: string = solidEndPoint + "/webId";
	let response = await fetch(str, {
		credentials: "same-origin",
	});
	let webId = await response.json();
	return webId.webId;
}

/**
 * Function to get solid address
 */
export async function getSolidAddress(): Promise<Address[]> {
	var str: string = solidEndPoint + "/address";
	let response = await fetch(str, {
		credentials: "same-origin",
	});
	console.log(response);
	return response.json();
}

/**
 * Function to solid login
 */
export async function doSolidLogin(provider: string): Promise<any> {
	var str: string = solidEndPoint + "/login?provider=" + provider;
	console.log(str);
	window.location.href = str;
}

/**
 * Function to solid logout
 */
 export async function doSolidLogout(): Promise<any> {
	var str: string = solidEndPoint + '/logout';
	 await fetch(str);
	 console.log(isLoggedIn());
}

export async function isLoggedIn(): Promise<any> {
	var str: string = solidEndPoint + "/isLoggedIn";
	console.log(str);
	let response = await fetch(str, {
		credentials: "same-origin",
	});
	return response.json();
}

/**
 * Return a list of reviews of a product
 */
export async function getReviewsOfProduct(id: string): Promise<Review[]> {
	var str: string = apiEndPoint + "/reviews/list/" + id;
	let response = await fetch(str);
	return response.json();
}

/**
 * Add a new review of a product
 */
export async function addReview(
	productId: string,
	name: string,
	rating: number,
	comment: string
): Promise<boolean> {
	let response = await fetch(apiEndPoint + "/reviews/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			productId: productId,
			name: name,
			rating: rating,
			comment: comment,
		}),
	});
	if (response.status === 200) return true;
	else return false;
}

/**
 * Return a list of reviews of a product
 */
export async function addAddressToSolid(address: Address) {
	var str: string = solidEndPoint + "/address";

	let _data = {
		country_name: address.country_name,
		region: address.region,
		locality: address.locality,
		street_address: address.street_address,
		postal_code: address.postal_code,
	};

	fetch(str, {
		method: "POST",
		body: JSON.stringify(_data),
		headers: { "Content-type": "application/json; charset=UTF-8" },
		credentials: "same-origin",
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}
