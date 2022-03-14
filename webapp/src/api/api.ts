import {IUser} from '../../../restapi/model/User';
import {IProduct} from '../../../restapi/model/Products'
import {OrderProduct} from '../../../restapi/model/Order'

export async function addUser(user:IUser):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
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
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
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
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/products/list');
    return response.json();
}

export async function getProduct(id:string):Promise<IProduct> {
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'http://localhost:5000/api'
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
  const apiEndPoint = process.env.REACT_APP_API_URI|| 'http://localhost:5000/api'
  var str: string = apiEndPoint + '/products/' + name;

  console.log(str);
  let response = await fetch(str);
  return response.json();
}

/**
 * 
 * @param user Function to add orders to the db
 * @returns 
 */
export async function addOrder(orders:OrderProduct[], webId:string, adress:string):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/orders/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'webId':webId, products:orders, 'adress':adress})
    });
  if (response.status===200)
    return true;
  else
    return false;
}


