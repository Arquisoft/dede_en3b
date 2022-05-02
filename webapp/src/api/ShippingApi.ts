// eslint-disable-next-line
import { json } from "stream/consumers";
import { Address } from "../shared/shareddtypes";

const storeGeolocation = "43.53544 -6.71935"; // Our Store, located in Navia
const ERROR_CODE = -1;

/**
 * Function that returns the shipping costs
 * 
*/
export async function getShippingCosts(address: Address): Promise<any> {
    var geocodedAddress = await geocodeAddress(address);

    if (geocodedAddress === ERROR_CODE)
        return ERROR_CODE;
    
    var url = "https://dev.virtualearth.net/REST/v1/Routes?key=AsxEiJLEKsTRnwiuhBCOaXeqAtwTcUG - 9NsEBfhO - ZbOeu2yvGxvncrXdbKQ2UYO&waypoint.2="
        + geocodedAddress
        + "&waypoint.1=" + storeGeolocation;
    
    let response = await fetch(url);
    return response.json().then(value => { return value.resourceSets[0].resources[0].travelDistance}).catch(e => -1);
} 
  
async function geocodeAddress(address: Address) : (Promise<string | number>) {
    var url = "https://dev.virtualearth.net/REST/v1/Locations?countryRegion=" + address.region
        + "&locality=" + address.locality
        + "&postalCode=" + address.postal_code
        + "&addressLine=" + address.street_address
        + "&maxResults=1&key=AsxEiJLEKsTRnwiuhBCOaXeqAtwTcUG - 9NsEBfhO - ZbOeu2yvGxvncrXdbKQ2UYO";
    
    let response = await fetch(url);
    return response.json()
        .then(value => { return value.resourceSets[0].resources[0].geocodePoints[0].coordinates[0] + " " + value.resourceSets[0].resources[0].geocodePoints[0].coordinates[1] })
        .catch(e => ERROR_CODE);
        
}

