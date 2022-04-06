
import { ICartItem } from '../components/ICartItem';
import {IUser, IProduct, IOrder, Address} from '../shared/shareddtypes';

export async function addUser(user:IUser):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<IUser[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
    let response = await fetch(apiEndPoint+'/api/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

/**
 * This fucntion returns the productst that are currently stored in the databse.
 * First we get the api endpoint that we are going to be listening on.
 * Then we call the api function with the address that we want to request at. (localhost:5000/products/list)
 * Then we send back the response.
 */
export async function getProducts():Promise<IProduct[]> {
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
    let response = await fetch(apiEndPoint+'/products/list');
    return response.json();
}

export async function getProduct(id:string):Promise<IProduct> {
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
  var str:string = apiEndPoint+'/products/'+id;
  console.log(str);
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to query the database looking for products realated with title name
 * @param id 
 * @returns 
 */
export async function findProductsByName(name: string): Promise<IProduct[]> {
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
  var str: string = apiEndPoint + '/products/search/' + name;
  let response = await fetch(str);
  return response.json();
}

export async function filterProducts(type:string): Promise<IProduct[]> {
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
  var str: string = apiEndPoint + '/products/filter/' + type;
  let response = await fetch(str);
  return response.json();
}

/**
 * 
 * @param user Function to add orders to the db
 * @returns 
 */
export async function addOrder(orders:ICartItem[], webId:string, address:Address, price:number, date:Date):Promise<boolean>{
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint= process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
  
  let response = await fetch(apiEndPoint+'/orders/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'webId':webId, products:orders.map((item) => ({ id: item.product._id.toString(), quantity:item.units })), 'address': address, 'price':price, 'date':date})
    });
  if (response.status===200)
    return true;
  else
    return false;
}

/**
 * Function to query the database looking for products realated with title name
 * @param id 
 * @returns 
 */
 export async function findOrdersByUser(webId: string): Promise<IOrder[]> {
   //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'https://dede-en3b-jesus-restapi.herokuapp.com/api'
  var str: string = apiEndPoint + '/orders/' + webId;
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to get solid name
 */
export async function getSolidName(): Promise<any> {
  //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/'
  var str: string = apiEndPoint + '/solid/name';
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to get webId
 */
 export async function getSolidWebId(): Promise<Object> {
   //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/'
  var str: string = apiEndPoint + '/solid/webId';
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to get solid address
 */
 export async function getSolidAddress(): Promise<Address> {
   //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
  const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/'
  var str: string = apiEndPoint + '/solid/address';
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to solid login
 */
 export async function doSolidLogin(): Promise<any> {
   //const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
   const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dede-en3b-jesus-restapi.herokuapp.com/';
   var str: string = apiEndPoint + '/solid/login';
   console.log(str);
   //await fetch(str);
   window.location.href = str;
   console.log(window.location.href);
}