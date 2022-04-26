
import { Address } from "../shared/shareddtypes";

const storeGeolocation = "43.53544 -6.71935"; // Our Store, located in Navia

/**
 * Function that returns the shipping costs
 * 
*/
export async function getShippingCosts(address: Address): Promise<any> {
    console.log(address);
    var url = "http://dev.virtualearth.net/REST/v1/Routes?key=AsxEiJLEKsTRnwiuhBCOaXeqAtwTcUG - 9NsEBfhO - ZbOeu2yvGxvncrXdbKQ2UYO&waypoint.2="
        + (await geocodeAddress(address))
        + "&waypoint.1=" + storeGeolocation;
    console.log(url);
    
    let response = await fetch(url);
    return response.json().then(value => { return value.resourceSets[0].resources[0].travelDistance});
} 
  
async function geocodeAddress(address: Address) : Promise<string> {
    var url = "http://dev.virtualearth.net/REST/v1/Locations?countryRegion=" + address.region
        + "&locality=" + address.locality
        + "&postalCode=" + address.postal_code
        + "&addressLine=" + address.street_address
        + "&maxResults=1&key=AsxEiJLEKsTRnwiuhBCOaXeqAtwTcUG - 9NsEBfhO - ZbOeu2yvGxvncrXdbKQ2UYO";
        console.log(url);
    
    let response = await fetch(url);
    return response.json().then(value => { return value.resourceSets[0].resources[0].geocodePoints[0].coordinates[0] + " " + value.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]});
}

