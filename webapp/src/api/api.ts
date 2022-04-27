
import { ICartItem } from '../shared/shareddtypes';
import {IUser, IProduct, IOrder, Address} from '../shared/shareddtypes';


// const apiEndPoint = process.env.REACT_APP_API_URI || 'https://dedeen3b-restapi.herokuapp.com/api'
const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
const solidEndPoint = apiEndPoint.replace('/api', '/solid');

export async function addUser(user:IUser):Promise<boolean>{
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
    let response = await fetch(apiEndPoint+'/products/list');
    return response.json();
}

export async function getProduct(id:string):Promise<IProduct> {
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
  var str: string = apiEndPoint + '/products/search/' + name;
  let response = await fetch(str);
  return response.json();
}

export async function filterProducts(type:string): Promise<IProduct[]> {
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
  
  let response = await fetch(apiEndPoint+'/orders/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'webId':webId, products:orders.map((item) => ({ id: item.product._id.toString(), name : item.product.name, quantity:item.units })), 'address': address, 'price':price, 'date':date})
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
  var str: string = apiEndPoint + '/orders/find?webId=' + encodeURIComponent(webId);
  let response = await fetch(str);
  return response.json();
}

export async function getOrder(id:string):Promise<IOrder> {
  var str:string = apiEndPoint+'/orders/'+id;
  console.log(str);
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to get solid name
 */
export async function getSolidName(): Promise<any> {
  var str: string = solidEndPoint + '/name';
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to get webId
 */
 export async function getSolidWebId(): Promise<string> {
  var str: string = solidEndPoint + '/webId';
  let response = await fetch(str);
  let webId = await response.json();
  return webId.webId;
}

/**
 * Function to get solid address
 */
 export async function getSolidAddress(): Promise<Address> {
   var str: string = solidEndPoint + '/address';
  let response = await fetch(str);
  return response.json();
}

/**
 * Function to solid login
 */
 export async function doSolidLogin(provider : string): Promise<any> {
   var str: string = solidEndPoint + '/login?provider=' + provider;
   console.log(str);
   window.location.href = str;
}

export async function isLoggedIn(): Promise<any> {
  var str: string = solidEndPoint + '/isLoggedIn';
  let response = await fetch(str);
  return response.json();
}

// // //SHIPPING WITH FEDEX API
// // /**
// //  * API GET call to get the shipping costs from one location to another
// //  */
// //  export function getShippingCosts() {


// //   console.log('ifheuifj');
// //   var input = {
// //     "accountNumber": {
// //       "value": "Your account number"
// //     },
// //     "rateRequestControlParameters": {
// //       "returnTransitTimes": false,
// //       "servicesNeededOnRateFailure": true,
// //       "variableOptions": "FREIGHT_GUARANTEE",
// //       "rateSortOrder": "SERVICENAMETRADITIONAL"
// //     },
// //     "requestedShipment": {
// //       "shipper": {
// //         "address": {
// //           "streetLines": [
// //             "1550 Union Blvd",
// //             "Suite 302"
// //           ],
// //           "city": "Beverly Hills",
// //           "stateOrProvinceCode": "TN",
// //           "postalCode": "65247",
// //           "countryCode": "US",
// //           "residential": false
// //         }
// //       },
// //       "recipient": {
// //         "address": {
// //           "streetLines": [
// //             "1550 Union Blvd",
// //             "Suite 302"
// //           ],
// //           "city": "Beverly Hills",
// //           "stateOrProvinceCode": "TN",
// //           "postalCode": "65247",
// //           "countryCode": "US",
// //           "residential": false
// //         }
// //       },
// //       "serviceType": "STANDARD_OVERNIGHT",
// //       "emailNotificationDetail": {
// //         "recipients": [
// //           {
// //             "emailAddress": "string",
// //             "notificationEventType": [
// //               "ON_DELIVERY"
// //             ],
// //             "smsDetail": {
// //               "phoneNumber": "string",
// //               "phoneNumberCountryCode": "string"
// //             },
// //             "notificationFormatType": "HTML",
// //             "emailNotificationRecipientType": "BROKER",
// //             "notificationType": "EMAIL",
// //             "locale": "string"
// //           }
// //         ],
// //         "personalMessage": "string",
// //         "PrintedReference": {
// //           "printedReferenceType": "BILL_OF_LADING",
// //           "value": "string"
// //         }
// //       },
// //       "preferredCurrency": "USD",
// //       "rateRequestType": [
// //         "ACCOUNT",
// //         "LIST"
// //       ],
// //       "shipDateStamp": "2019-09-06",
// //       "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
// //       "requestedPackageLineItems": [
// //         {
// //           "subPackagingType": "BAG",
// //           "groupPackageCount": 1,
// //           "contentRecord": [
// //             {
// //               "itemNumber": "string",
// //               "receivedQuantity": 0,
// //               "description": "string",
// //               "partNumber": "string"
// //             }
// //           ],
// //           "declaredValue": {
// //             "amount": "100",
// //             "currency": "USD"
// //           },
// //           "weight": {
// //             "units": "LB",
// //             "value": 22
// //           },
// //           "dimensions": {
// //             "length": 10,
// //             "width": 8,
// //             "height": 2,
// //             "units": "IN"
// //           },
// //           "variableHandlingChargeDetail": {
// //             "rateType": "ACCOUNT",
// //             "percentValue": 0,
// //             "rateLevelType": "BUNDLED_RATE",
// //             "fixedValue": {
// //               "amount": "100",
// //               "currency": "USD"
// //             },
// //             "rateElementBasis": "NET_CHARGE"
// //           },
// //           "packageSpecialServices": {
// //             "specialServiceTypes": [
// //               "DANGEROUS_GOODS"
// //             ],
// //             "alcoholDetail": {
// //               "alcoholRecipientType": "LICENSEE",
// //               "shipperAgreementType": "Retailer"
// //             },
// //             "dangerousGoodsDetail": {
// //               "offeror": "Offeror Name",
// //               "accessibility": "ACCESSIBLE",
// //               "emergencyContactNumber": "3268545905",
// //               "options": [
// //                 "BATTERY"
// //               ],
// //               "containers": [
// //                 {
// //                   "offeror": "Offeror Name",
// //                   "hazardousCommodities": [
// //                     {
// //                       "quantity": {
// //                         "quantityType": "GROSS",
// //                         "amount": 0,
// //                         "units": "LB"
// //                       },
// //                       "innerReceptacles": [
// //                         {
// //                           "quantity": {
// //                             "quantityType": "GROSS",
// //                             "amount": 0,
// //                             "units": "LB"
// //                           }
// //                         }
// //                       ],
// //                       "options": {
// //                         "labelTextOption": "Override",
// //                         "customerSuppliedLabelText": "LabelText"
// //                       },
// //                       "description": {
// //                         "sequenceNumber": 0,
// //                         "processingOptions": [
// //                           "INCLUDE_SPECIAL_PROVISIONS"
// //                         ],
// //                         "subsidiaryClasses": "subsidiaryClass",
// //                         "labelText": "labelText",
// //                         "technicalName": "technicalName",
// //                         "packingDetails": {
// //                           "packingInstructions": "instruction",
// //                           "cargoAircraftOnly": false
// //                         },
// //                         "authorization": "Authorization Information",
// //                         "reportableQuantity": false,
// //                         "percentage": 10,
// //                         "id": "ID",
// //                         "packingGroup": "DEFAULT",
// //                         "properShippingName": "ShippingName",
// //                         "hazardClass": "hazardClass"
// //                       }
// //                     }
// //                   ],
// //                   "numberOfContainers": 10,
// //                   "containerType": "Copper Box",
// //                   "emergencyContactNumber": {
// //                     "areaCode": "202",
// //                     "extension": "3245",
// //                     "countryCode": "US",
// //                     "personalIdentificationNumber": "9545678",
// //                     "localNumber": "23456"
// //                   },
// //                   "packaging": {
// //                     "count": 20,
// //                     "units": "Liter"
// //                   },
// //                   "packingType": "ALL_PACKED_IN_ONE",
// //                   "radioactiveContainerClass": "EXCEPTED_PACKAGE"
// //                 }
// //               ],
// //               "packaging": {
// //                 "count": 20,
// //                 "units": "Liter"
// //               }
// //             },
// //             "packageCODDetail": {
// //               "codCollectionAmount": {
// //                 "amount": 12.45,
// //                 "currency": "USD"
// //               },
// //               "codCollectionType": "ANY"
// //             },
// //             "pieceCountVerificationBoxCount": 0,
// //             "batteryDetails": [
// //               {
// //                 "material": "LITHIUM_METAL",
// //                 "regulatorySubType": "IATA_SECTION_II",
// //                 "packing": "CONTAINED_IN_EQUIPMENT"
// //               }
// //             ],
// //             "dryIceWeight": {
// //               "units": "LB",
// //               "value": 10
// //             }
// //           }
// //         }
// //       ],
// //       "documentShipment": false,
// //       "pickupDetail": {
// //         "companyCloseTime": "string",
// //         "pickupOrigin": {
// //           "accountNumber": {
// //             "value": 123456789
// //           },
// //           "address": {
// //             "addressVerificationId": "string",
// //             "countryCode": "US",
// //             "streetLines": [
// //               "string"
// //             ]
// //           },
// //           "contact": {
// //             "companyName": "Fedex",
// //             "faxNumber": "string",
// //             "personName": "John Taylor",
// //             "phoneNumber": "1234567890"
// //           }
// //         },
// //         "geographicalPostalCode": "string",
// //         "requestType": "FUTURE_DAY",
// //         "buildingPartDescription": "string",
// //         "courierInstructions": "string",
// //         "buildingPart": "APARTMENT",
// //         "latestPickupDateTime": "string",
// //         "packageLocation": "string",
// //         "readyPickupDateTime": "string",
// //         "earlyPickup": true
// //       },
// //       "variableHandlingChargeDetail": {
// //         "rateType": "ACCOUNT",
// //         "percentValue": 0,
// //         "rateLevelType": "BUNDLED_RATE",
// //         "fixedValue": {
// //           "amount": "100",
// //           "currency": "USD"
// //         },
// //         "rateElementBasis": "NET_CHARGE"
// //       },
// //       "packagingType": "YOUR_PACKAGING",
// //       "totalPackageCount": 3,
// //       "totalWeight": 87.5,
// //       "shipmentSpecialServices": {
// //         "returnShipmentDetail": {
// //           "returnType": "PRINT_RETURN_LABEL"
// //         },
// //         "deliveryOnInvoiceAcceptanceDetail": {
// //           "recipient": {
// //             "accountNumber": {
// //               "value": 123456789
// //             },
// //             "address": {
// //               "streetLines": [
// //                 "10 FedEx Parkway",
// //                 "Suite 30"
// //               ],
// //               "countryCode": "US"
// //             },
// //             "contact": {
// //               "companyName": "FedEx",
// //               "faxNumber": "9013577890",
// //               "personName": "John Taylor",
// //               "phoneNumber": "9013577890"
// //             }
// //           }
// //         },
// //         "internationalTrafficInArmsRegulationsDetail": {
// //           "licenseOrExemptionNumber": "432345"
// //         },
// //         "pendingShipmentDetail": {
// //           "pendingShipmentType": "EMAIL",
// //           "processingOptions": {
// //             "options": [
// //               "ALLOW_MODIFICATIONS"
// //             ]
// //           },
// //           "recommendedDocumentSpecification": {
// //             "types": [
// //               "ANTIQUE_STATEMENT_EUROPEAN_UNION"
// //             ]
// //           },
// //           "emailLabelDetail": {
// //             "recipients": [
// //               {
// //                 "emailAddress": "string",
// //                 "optionsRequested": {
// //                   "options": [
// //                     "PRODUCE_PAPERLESS_SHIPPING_FORMAT"
// //                   ]
// //                 },
// //                 "role": "SHIPMENT_COMPLETOR",
// //                 "locale": {
// //                   "country": "string",
// //                   "language": "string"
// //                 }
// //               }
// //             ],
// //             "message": "string"
// //           },
// //           "documentReferences": [
// //             {
// //               "documentType": "CERTIFICATE_OF_ORIGIN",
// //               "customerReference": "string",
// //               "description": "ShippingDocumentSpecification",
// //               "documentId": "98123"
// //             }
// //           ],
// //           "expirationTimeStamp": "2012-12-31",
// //           "shipmentDryIceDetail": {
// //             "totalWeight": {
// //               "units": "LB",
// //               "value": 10
// //             },
// //             "packageCount": 12
// //           }
// //         },
// //         "holdAtLocationDetail": {
// //           "locationId": "YBZA",
// //           "locationContactAndAddress": {
// //             "address": {
// //               "streetLines": [
// //                 "10 FedEx Parkway",
// //                 "Suite 302"
// //               ],
// //               "city": "Beverly Hills",
// //               "stateOrProvinceCode": "CA",
// //               "postalCode": "38127",
// //               "countryCode": "US",
// //               "residential": false
// //             },
// //             "contact": {
// //               "personName": "person name",
// //               "emailAddress": "email address",
// //               "parsedPersonName": {
// //                 "firstName": "first name",
// //                 "lastName": "last name",
// //                 "middleName": "middle name",
// //                 "suffix": "suffix"
// //               },
// //               "phoneNumber": "phone number",
// //               "phoneExtension": "phone extension",
// //               "companyName": "company name",
// //               "faxNumber": "fax number"
// //             }
// //           },
// //           "locationType": "FEDEX_ONSITE"
// //         },
// //         "shipmentCODDetail": {
// //           "addTransportationChargesDetail": {
// //             "rateType": "ACCOUNT",
// //             "rateLevelType": "BUNDLED_RATE",
// //             "chargeLevelType": "CURRENT_PACKAGE",
// //             "chargeType": "COD_SURCHARGE"
// //           },
// //           "codRecipient": {
// //             "accountNumber": {
// //               "value": 123456789
// //             }
// //           },
// //           "remitToName": "FedEx",
// //           "codCollectionType": "ANY",
// //           "financialInstitutionContactAndAddress": {
// //             "address": {
// //               "streetLines": [
// //                 "10 FedEx Parkway",
// //                 "Suite 302"
// //               ],
// //               "city": "Beverly Hills",
// //               "stateOrProvinceCode": "CA",
// //               "postalCode": "38127",
// //               "countryCode": "US",
// //               "residential": false
// //             },
// //             "contact": {
// //               "personName": "person name",
// //               "emailAddress": "email address",
// //               "parsedPersonName": {
// //                 "firstName": "first name",
// //                 "lastName": "last name",
// //                 "middleName": "middle name",
// //                 "suffix": "suffix"
// //               },
// //               "phoneNumber": "phone number",
// //               "phoneExtension": "phone extension",
// //               "companyName": "company name",
// //               "faxNumber": "fax number"
// //             }
// //           },
// //           "returnReferenceIndicatorType": "INVOICE"
// //         },
// //         "shipmentDryIceDetail": {
// //           "totalWeight": {
// //             "units": "LB",
// //             "value": 10
// //           },
// //           "packageCount": 12
// //         },
// //         "internationalControlledExportDetail": {
// //           "type": "DEA_036"
// //         },
// //         "homeDeliveryPremiumDetail": {
// //           "phoneNumber": {
// //             "areaCode": "areaCode",
// //             "extension": "extension",
// //             "countryCode": "countryCode",
// //             "personalIdentificationNumber": "personalIdentificationNumber",
// //             "localNumber": "localNumber"
// //           },
// //           "shipTimestamp": "2020-04-24",
// //           "homedeliveryPremiumType": "APPOINTMENT"
// //         },
// //         "specialServiceTypes": [
// //           "BROKER_SELECT_OPTION"
// //         ]
// //       },
// //       "customsClearanceDetail": {
// //         "commercialInvoice": {
// //           "shipmentPurpose": "GIFT"
// //         },
// //         "freightOnValue": "CARRIER_RISK",
// //         "dutiesPayment": {
// //           "payor": {
// //             "responsibleParty": {
// //               "address": {
// //                 "streetLines": [
// //                   "10 FedEx Parkway",
// //                   "Suite 302"
// //                 ],
// //                 "city": "Beverly Hills",
// //                 "stateOrProvinceCode": "CA",
// //                 "postalCode": "90210",
// //                 "countryCode": "US",
// //                 "residential": false
// //               },
// //               "contact": {
// //                 "personName": "John Taylor",
// //                 "emailAddress": "sample@company.com",
// //                 "parsedPersonName": {
// //                   "firstName": "first name",
// //                   "lastName": "last name",
// //                   "middleName": "middle name",
// //                   "suffix": "suffix"
// //                 },
// //                 "phoneNumber": "1234567890",
// //                 "phoneExtension": "phone extension",
// //                 "companyName": "Fedex",
// //                 "faxNumber": "fax number"
// //               },
// //               "accountNumber": {
// //                 "value": "123456789"
// //               }
// //             }
// //           },
// //           "paymentType": "SENDER"
// //         },
// //         "commodities": [
// //           {
// //             "description": "DOCUMENTS",
// //             "weight": {
// //               "units": "LB",
// //               "value": 22
// //             },
// //             "quantity": 1,
// //             "customsValue": {
// //               "amount": "100",
// //               "currency": "USD"
// //             },
// //             "unitPrice": {
// //               "amount": "100",
// //               "currency": "USD"
// //             },
// //             "numberOfPieces": 1,
// //             "countryOfManufacture": "US",
// //             "quantityUnits": "PCS",
// //             "name": "DOCUMENTS",
// //             "harmonizedCode": "080211",
// //             "partNumber": "P1"
// //           }
// //         ]
// //       },
// //       "groupShipment": true,
// //       "serviceTypeDetail": {
// //         "carrierCode": "FDXE",
// //         "description": "string",
// //         "serviceName": "string",
// //         "serviceCategory": "string"
// //       },
// //       "smartPostInfoDetail": {
// //         "ancillaryEndorsement": "ADDRESS_CORRECTION",
// //         "hubId": "5531",
// //         "indicia": "MEDIA_MAIL",
// //         "specialServices": "USPS_DELIVERY_CONFIRMATION"
// //       },
// //       "expressFreightDetail": {
// //         "bookingConfirmationNumber": "string",
// //         "shippersLoadAndCount": 0
// //       },
// //       "groundShipment": false
// //     },
// //     "carrierCodes": [
// //       "FDXE"
// //     ]
// //   }

// //   // 'input' refers to JSON Payload
// //   var data = JSON.stringify(input);
  
// //   var xhr = new XMLHttpRequest();
// //   xhr.withCredentials = true;

// //   xhr.addEventListener("readystatechange", function () {
// //     if (this.readyState === 4) {
// //       console.log(this.responseText);
// //     }
// //   });

// //   xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
  
// //   xhr.setRequestHeader("Content-Type", "application/json");
// //   xhr.setRequestHeader("X-locale", "en_US");
// //   xhr.setRequestHeader("Authorization", "l74a8df092ee534debaf4f774dde46824a");

// //   xhr.send(data);
// // };

// //SHIPPING WITH FEDEX API
// /**
//  * API GET call to get the shipping costs from one location to another
//  */
// export function getShippingCost() {


//   console.log('ifheuifj');
//   var input = {
//     "accountNumber": {
//       "value": "740562274"
//     },
//     "rateRequestControlParameters": {
//       "returnTransitTimes": false,
//       "servicesNeededOnRateFailure": true,
//       "variableOptions": "FREIGHT_GUARANTEE",
//       "rateSortOrder": "SERVICENAMETRADITIONAL"
//     },
//     "requestedShipment": {
//       "shipper": {
//         "address": {
//           "streetLines": [
//             "1550 Union Blvd",
//             "Suite 302"
//           ],
//           "city": "Beverly Hills",
//           "stateOrProvinceCode": "TN",
//           "postalCode": "65247",
//           "countryCode": "US",
//           "residential": false
//         }
//       },
//       "recipient": {
//         "address": {
//           "streetLines": [
//             "1550 Union Blvd",
//             "Suite 302"
//           ],
//           "city": "Beverly Hills",
//           "stateOrProvinceCode": "TN",
//           "postalCode": "65247",
//           "countryCode": "US",
//           "residential": false
//         }
//       },
//       "serviceType": "STANDARD_OVERNIGHT",
//       "emailNotificationDetail": {
//         "recipients": [
//           {
//             "emailAddress": "string",
//             "notificationEventType": [
//               "ON_DELIVERY"
//             ],
//             "smsDetail": {
//               "phoneNumber": "string",
//               "phoneNumberCountryCode": "string"
//             },
//             "notificationFormatType": "HTML",
//             "emailNotificationRecipientType": "BROKER",
//             "notificationType": "EMAIL",
//             "locale": "string"
//           }
//         ],
//         "personalMessage": "string",
//         "PrintedReference": {
//           "printedReferenceType": "BILL_OF_LADING",
//           "value": "string"
//         }
//       },
//       "preferredCurrency": "USD",
//       "rateRequestType": [
//         "ACCOUNT",
//         "LIST"
//       ],
//       "shipDateStamp": "2019-09-06",
//       "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
//       "requestedPackageLineItems": [
//         {
//           "subPackagingType": "BAG",
//           "groupPackageCount": 1,
//           "contentRecord": [
//             {
//               "itemNumber": "string",
//               "receivedQuantity": 0,
//               "description": "string",
//               "partNumber": "string"
//             }
//           ],
//           "declaredValue": {
//             "amount": "100",
//             "currency": "USD"
//           },
//           "weight": {
//             "units": "LB",
//             "value": 22
//           },
//           "dimensions": {
//             "length": 10,
//             "width": 8,
//             "height": 2,
//             "units": "IN"
//           },
//           "variableHandlingChargeDetail": {
//             "rateType": "ACCOUNT",
//             "percentValue": 0,
//             "rateLevelType": "BUNDLED_RATE",
//             "fixedValue": {
//               "amount": "100",
//               "currency": "USD"
//             },
//             "rateElementBasis": "NET_CHARGE"
//           },
//           "packageSpecialServices": {
//             "specialServiceTypes": [
//               "DANGEROUS_GOODS"
//             ],
//             "alcoholDetail": {
//               "alcoholRecipientType": "LICENSEE",
//               "shipperAgreementType": "Retailer"
//             },
//             "dangerousGoodsDetail": {
//               "offeror": "Offeror Name",
//               "accessibility": "ACCESSIBLE",
//               "emergencyContactNumber": "3268545905",
//               "options": [
//                 "BATTERY"
//               ],
//               "containers": [
//                 {
//                   "offeror": "Offeror Name",
//                   "hazardousCommodities": [
//                     {
//                       "quantity": {
//                         "quantityType": "GROSS",
//                         "amount": 0,
//                         "units": "LB"
//                       },
//                       "innerReceptacles": [
//                         {
//                           "quantity": {
//                             "quantityType": "GROSS",
//                             "amount": 0,
//                             "units": "LB"
//                           }
//                         }
//                       ],
//                       "options": {
//                         "labelTextOption": "Override",
//                         "customerSuppliedLabelText": "LabelText"
//                       },
//                       "description": {
//                         "sequenceNumber": 0,
//                         "processingOptions": [
//                           "INCLUDE_SPECIAL_PROVISIONS"
//                         ],
//                         "subsidiaryClasses": "subsidiaryClass",
//                         "labelText": "labelText",
//                         "technicalName": "technicalName",
//                         "packingDetails": {
//                           "packingInstructions": "instruction",
//                           "cargoAircraftOnly": false
//                         },
//                         "authorization": "Authorization Information",
//                         "reportableQuantity": false,
//                         "percentage": 10,
//                         "id": "ID",
//                         "packingGroup": "DEFAULT",
//                         "properShippingName": "ShippingName",
//                         "hazardClass": "hazardClass"
//                       }
//                     }
//                   ],
//                   "numberOfContainers": 10,
//                   "containerType": "Copper Box",
//                   "emergencyContactNumber": {
//                     "areaCode": "202",
//                     "extension": "3245",
//                     "countryCode": "US",
//                     "personalIdentificationNumber": "9545678",
//                     "localNumber": "23456"
//                   },
//                   "packaging": {
//                     "count": 20,
//                     "units": "Liter"
//                   },
//                   "packingType": "ALL_PACKED_IN_ONE",
//                   "radioactiveContainerClass": "EXCEPTED_PACKAGE"
//                 }
//               ],
//               "packaging": {
//                 "count": 20,
//                 "units": "Liter"
//               }
//             },
//             "packageCODDetail": {
//               "codCollectionAmount": {
//                 "amount": 12.45,
//                 "currency": "USD"
//               },
//               "codCollectionType": "ANY"
//             },
//             "pieceCountVerificationBoxCount": 0,
//             "batteryDetails": [
//               {
//                 "material": "LITHIUM_METAL",
//                 "regulatorySubType": "IATA_SECTION_II",
//                 "packing": "CONTAINED_IN_EQUIPMENT"
//               }
//             ],
//             "dryIceWeight": {
//               "units": "LB",
//               "value": 10
//             }
//           }
//         }
//       ],
//       "documentShipment": false,
//       "pickupDetail": {
//         "companyCloseTime": "string",
//         "pickupOrigin": {
//           "accountNumber": {
//             "value": 123456789
//           },
//           "address": {
//             "addressVerificationId": "string",
//             "countryCode": "US",
//             "streetLines": [
//               "string"
//             ]
//           },
//           "contact": {
//             "companyName": "Fedex",
//             "faxNumber": "string",
//             "personName": "John Taylor",
//             "phoneNumber": "1234567890"
//           }
//         },
//         "geographicalPostalCode": "string",
//         "requestType": "FUTURE_DAY",
//         "buildingPartDescription": "string",
//         "courierInstructions": "string",
//         "buildingPart": "APARTMENT",
//         "latestPickupDateTime": "string",
//         "packageLocation": "string",
//         "readyPickupDateTime": "string",
//         "earlyPickup": true
//       },
//       "variableHandlingChargeDetail": {
//         "rateType": "ACCOUNT",
//         "percentValue": 0,
//         "rateLevelType": "BUNDLED_RATE",
//         "fixedValue": {
//           "amount": "100",
//           "currency": "USD"
//         },
//         "rateElementBasis": "NET_CHARGE"
//       },
//       "packagingType": "YOUR_PACKAGING",
//       "totalPackageCount": 3,
//       "totalWeight": 87.5,
//       "shipmentSpecialServices": {
//         "returnShipmentDetail": {
//           "returnType": "PRINT_RETURN_LABEL"
//         },
//         "deliveryOnInvoiceAcceptanceDetail": {
//           "recipient": {
//             "accountNumber": {
//               "value": 123456789
//             },
//             "address": {
//               "streetLines": [
//                 "10 FedEx Parkway",
//                 "Suite 30"
//               ],
//               "countryCode": "US"
//             },
//             "contact": {
//               "companyName": "FedEx",
//               "faxNumber": "9013577890",
//               "personName": "John Taylor",
//               "phoneNumber": "9013577890"
//             }
//           }
//         },
//         "internationalTrafficInArmsRegulationsDetail": {
//           "licenseOrExemptionNumber": "432345"
//         },
//         "pendingShipmentDetail": {
//           "pendingShipmentType": "EMAIL",
//           "processingOptions": {
//             "options": [
//               "ALLOW_MODIFICATIONS"
//             ]
//           },
//           "recommendedDocumentSpecification": {
//             "types": [
//               "ANTIQUE_STATEMENT_EUROPEAN_UNION"
//             ]
//           },
//           "emailLabelDetail": {
//             "recipients": [
//               {
//                 "emailAddress": "string",
//                 "optionsRequested": {
//                   "options": [
//                     "PRODUCE_PAPERLESS_SHIPPING_FORMAT"
//                   ]
//                 },
//                 "role": "SHIPMENT_COMPLETOR",
//                 "locale": {
//                   "country": "string",
//                   "language": "string"
//                 }
//               }
//             ],
//             "message": "string"
//           },
//           "documentReferences": [
//             {
//               "documentType": "CERTIFICATE_OF_ORIGIN",
//               "customerReference": "string",
//               "description": "ShippingDocumentSpecification",
//               "documentId": "98123"
//             }
//           ],
//           "expirationTimeStamp": "2012-12-31",
//           "shipmentDryIceDetail": {
//             "totalWeight": {
//               "units": "LB",
//               "value": 10
//             },
//             "packageCount": 12
//           }
//         },
//         "holdAtLocationDetail": {
//           "locationId": "YBZA",
//           "locationContactAndAddress": {
//             "address": {
//               "streetLines": [
//                 "10 FedEx Parkway",
//                 "Suite 302"
//               ],
//               "city": "Beverly Hills",
//               "stateOrProvinceCode": "CA",
//               "postalCode": "38127",
//               "countryCode": "US",
//               "residential": false
//             },
//             "contact": {
//               "personName": "person name",
//               "emailAddress": "email address",
//               "parsedPersonName": {
//                 "firstName": "first name",
//                 "lastName": "last name",
//                 "middleName": "middle name",
//                 "suffix": "suffix"
//               },
//               "phoneNumber": "phone number",
//               "phoneExtension": "phone extension",
//               "companyName": "company name",
//               "faxNumber": "fax number"
//             }
//           },
//           "locationType": "FEDEX_ONSITE"
//         },
//         "shipmentCODDetail": {
//           "addTransportationChargesDetail": {
//             "rateType": "ACCOUNT",
//             "rateLevelType": "BUNDLED_RATE",
//             "chargeLevelType": "CURRENT_PACKAGE",
//             "chargeType": "COD_SURCHARGE"
//           },
//           "codRecipient": {
//             "accountNumber": {
//               "value": 123456789
//             }
//           },
//           "remitToName": "FedEx",
//           "codCollectionType": "ANY",
//           "financialInstitutionContactAndAddress": {
//             "address": {
//               "streetLines": [
//                 "10 FedEx Parkway",
//                 "Suite 302"
//               ],
//               "city": "Beverly Hills",
//               "stateOrProvinceCode": "CA",
//               "postalCode": "38127",
//               "countryCode": "US",
//               "residential": false
//             },
//             "contact": {
//               "personName": "person name",
//               "emailAddress": "email address",
//               "parsedPersonName": {
//                 "firstName": "first name",
//                 "lastName": "last name",
//                 "middleName": "middle name",
//                 "suffix": "suffix"
//               },
//               "phoneNumber": "phone number",
//               "phoneExtension": "phone extension",
//               "companyName": "company name",
//               "faxNumber": "fax number"
//             }
//           },
//           "returnReferenceIndicatorType": "INVOICE"
//         },
//         "shipmentDryIceDetail": {
//           "totalWeight": {
//             "units": "LB",
//             "value": 10
//           },
//           "packageCount": 12
//         },
//         "internationalControlledExportDetail": {
//           "type": "DEA_036"
//         },
//         "homeDeliveryPremiumDetail": {
//           "phoneNumber": {
//             "areaCode": "areaCode",
//             "extension": "extension",
//             "countryCode": "countryCode",
//             "personalIdentificationNumber": "personalIdentificationNumber",
//             "localNumber": "localNumber"
//           },
//           "shipTimestamp": "2020-04-24",
//           "homedeliveryPremiumType": "APPOINTMENT"
//         },
//         "specialServiceTypes": [
//           "BROKER_SELECT_OPTION"
//         ]
//       },
//       "customsClearanceDetail": {
//         "commercialInvoice": {
//           "shipmentPurpose": "GIFT"
//         },
//         "freightOnValue": "CARRIER_RISK",
//         "dutiesPayment": {
//           "payor": {
//             "responsibleParty": {
//               "address": {
//                 "streetLines": [
//                   "10 FedEx Parkway",
//                   "Suite 302"
//                 ],
//                 "city": "Beverly Hills",
//                 "stateOrProvinceCode": "CA",
//                 "postalCode": "90210",
//                 "countryCode": "US",
//                 "residential": false
//               },
//               "contact": {
//                 "personName": "John Taylor",
//                 "emailAddress": "sample@company.com",
//                 "parsedPersonName": {
//                   "firstName": "first name",
//                   "lastName": "last name",
//                   "middleName": "middle name",
//                   "suffix": "suffix"
//                 },
//                 "phoneNumber": "1234567890",
//                 "phoneExtension": "phone extension",
//                 "companyName": "Fedex",
//                 "faxNumber": "fax number"
//               },
//               "accountNumber": {
//                 "value": "123456789"
//               }
//             }
//           },
//           "paymentType": "SENDER"
//         },
//         "commodities": [
//           {
//             "description": "DOCUMENTS",
//             "weight": {
//               "units": "LB",
//               "value": 22
//             },
//             "quantity": 1,
//             "customsValue": {
//               "amount": "100",
//               "currency": "USD"
//             },
//             "unitPrice": {
//               "amount": "100",
//               "currency": "USD"
//             },
//             "numberOfPieces": 1,
//             "countryOfManufacture": "US",
//             "quantityUnits": "PCS",
//             "name": "DOCUMENTS",
//             "harmonizedCode": "080211",
//             "partNumber": "P1"
//           }
//         ]
//       },
//       "groupShipment": true,
//       "serviceTypeDetail": {
//         "carrierCode": "FDXE",
//         "description": "string",
//         "serviceName": "string",
//         "serviceCategory": "string"
//       },
//       "smartPostInfoDetail": {
//         "ancillaryEndorsement": "ADDRESS_CORRECTION",
//         "hubId": "5531",
//         "indicia": "MEDIA_MAIL",
//         "specialServices": "USPS_DELIVERY_CONFIRMATION"
//       },
//       "expressFreightDetail": {
//         "bookingConfirmationNumber": "string",
//         "shippersLoadAndCount": 0
//       },
//       "groundShipment": false
//     },
//     "carrierCodes": [
//       "FDXE"
//     ]
//   }

//   // 'input' refers to JSON Payload
//   var data = JSON.stringify(input);
  
//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
  
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.setRequestHeader("X-locale", "en_US");
//   xhr.setRequestHeader("Authorization", "l74a8df092ee534debaf4f774dde46824a");

//   xhr.send(data);
// };

// // Ejemplo implementando el metodo POST:
// export async function getShippingCosts(url = 'https://apis.fedex.com/rate/v1/rates/quotes', data = {
//   "accountNumber": {
//     "value": "Your account number"
//   },
//   "rateRequestControlParameters": {
//     "returnTransitTimes": false,
//     "servicesNeededOnRateFailure": true,
//     "variableOptions": "FREIGHT_GUARANTEE",
//     "rateSortOrder": "SERVICENAMETRADITIONAL"
//   },
//   "requestedShipment": {
//     "shipper": {
//       "address": {
//         "streetLines": [
//           "1550 Union Blvd",
//           "Suite 302"
//         ],
//         "city": "Beverly Hills",
//         "stateOrProvinceCode": "TN",
//         "postalCode": "65247",
//         "countryCode": "US",
//         "residential": false
//       }
//     },
//     "recipient": {
//       "address": {
//         "streetLines": [
//           "1550 Union Blvd",
//           "Suite 302"
//         ],
//         "city": "Beverly Hills",
//         "stateOrProvinceCode": "TN",
//         "postalCode": "65247",
//         "countryCode": "US",
//         "residential": false
//       }
//     },
//     "serviceType": "STANDARD_OVERNIGHT",
//     "emailNotificationDetail": {
//       "recipients": [
//         {
//           "emailAddress": "string",
//           "notificationEventType": [
//             "ON_DELIVERY"
//           ],
//           "smsDetail": {
//             "phoneNumber": "string",
//             "phoneNumberCountryCode": "string"
//           },
//           "notificationFormatType": "HTML",
//           "emailNotificationRecipientType": "BROKER",
//           "notificationType": "EMAIL",
//           "locale": "string"
//         }
//       ],
//       "personalMessage": "string",
//       "PrintedReference": {
//         "printedReferenceType": "BILL_OF_LADING",
//         "value": "string"
//       }
//     },
//     "preferredCurrency": "USD",
//     "rateRequestType": [
//       "ACCOUNT",
//       "LIST"
//     ],
//     "shipDateStamp": "2019-09-06",
//     "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
//     "requestedPackageLineItems": [
//       {
//         "subPackagingType": "BAG",
//         "groupPackageCount": 1,
//         "contentRecord": [
//           {
//             "itemNumber": "string",
//             "receivedQuantity": 0,
//             "description": "string",
//             "partNumber": "string"
//           }
//         ],
//         "declaredValue": {
//           "amount": "100",
//           "currency": "USD"
//         },
//         "weight": {
//           "units": "LB",
//           "value": 22
//         },
//         "dimensions": {
//           "length": 10,
//           "width": 8,
//           "height": 2,
//           "units": "IN"
//         },
//         "variableHandlingChargeDetail": {
//           "rateType": "ACCOUNT",
//           "percentValue": 0,
//           "rateLevelType": "BUNDLED_RATE",
//           "fixedValue": {
//             "amount": "100",
//             "currency": "USD"
//           },
//           "rateElementBasis": "NET_CHARGE"
//         },
//         "packageSpecialServices": {
//           "specialServiceTypes": [
//             "DANGEROUS_GOODS"
//           ],
//           "alcoholDetail": {
//             "alcoholRecipientType": "LICENSEE",
//             "shipperAgreementType": "Retailer"
//           },
//           "dangerousGoodsDetail": {
//             "offeror": "Offeror Name",
//             "accessibility": "ACCESSIBLE",
//             "emergencyContactNumber": "3268545905",
//             "options": [
//               "BATTERY"
//             ],
//             "containers": [
//               {
//                 "offeror": "Offeror Name",
//                 "hazardousCommodities": [
//                   {
//                     "quantity": {
//                       "quantityType": "GROSS",
//                       "amount": 0,
//                       "units": "LB"
//                     },
//                     "innerReceptacles": [
//                       {
//                         "quantity": {
//                           "quantityType": "GROSS",
//                           "amount": 0,
//                           "units": "LB"
//                         }
//                       }
//                     ],
//                     "options": {
//                       "labelTextOption": "Override",
//                       "customerSuppliedLabelText": "LabelText"
//                     },
//                     "description": {
//                       "sequenceNumber": 0,
//                       "processingOptions": [
//                         "INCLUDE_SPECIAL_PROVISIONS"
//                       ],
//                       "subsidiaryClasses": "subsidiaryClass",
//                       "labelText": "labelText",
//                       "technicalName": "technicalName",
//                       "packingDetails": {
//                         "packingInstructions": "instruction",
//                         "cargoAircraftOnly": false
//                       },
//                       "authorization": "Authorization Information",
//                       "reportableQuantity": false,
//                       "percentage": 10,
//                       "id": "ID",
//                       "packingGroup": "DEFAULT",
//                       "properShippingName": "ShippingName",
//                       "hazardClass": "hazardClass"
//                     }
//                   }
//                 ],
//                 "numberOfContainers": 10,
//                 "containerType": "Copper Box",
//                 "emergencyContactNumber": {
//                   "areaCode": "202",
//                   "extension": "3245",
//                   "countryCode": "US",
//                   "personalIdentificationNumber": "9545678",
//                   "localNumber": "23456"
//                 },
//                 "packaging": {
//                   "count": 20,
//                   "units": "Liter"
//                 },
//                 "packingType": "ALL_PACKED_IN_ONE",
//                 "radioactiveContainerClass": "EXCEPTED_PACKAGE"
//               }
//             ],
//             "packaging": {
//               "count": 20,
//               "units": "Liter"
//             }
//           },
//           "packageCODDetail": {
//             "codCollectionAmount": {
//               "amount": 12.45,
//               "currency": "USD"
//             },
//             "codCollectionType": "ANY"
//           },
//           "pieceCountVerificationBoxCount": 0,
//           "batteryDetails": [
//             {
//               "material": "LITHIUM_METAL",
//               "regulatorySubType": "IATA_SECTION_II",
//               "packing": "CONTAINED_IN_EQUIPMENT"
//             }
//           ],
//           "dryIceWeight": {
//             "units": "LB",
//             "value": 10
//           }
//         }
//       }
//     ],
//     "documentShipment": false,
//     "pickupDetail": {
//       "companyCloseTime": "string",
//       "pickupOrigin": {
//         "accountNumber": {
//           "value": 123456789
//         },
//         "address": {
//           "addressVerificationId": "string",
//           "countryCode": "US",
//           "streetLines": [
//             "string"
//           ]
//         },
//         "contact": {
//           "companyName": "Fedex",
//           "faxNumber": "string",
//           "personName": "John Taylor",
//           "phoneNumber": "1234567890"
//         }
//       },
//       "geographicalPostalCode": "string",
//       "requestType": "FUTURE_DAY",
//       "buildingPartDescription": "string",
//       "courierInstructions": "string",
//       "buildingPart": "APARTMENT",
//       "latestPickupDateTime": "string",
//       "packageLocation": "string",
//       "readyPickupDateTime": "string",
//       "earlyPickup": true
//     },
//     "variableHandlingChargeDetail": {
//       "rateType": "ACCOUNT",
//       "percentValue": 0,
//       "rateLevelType": "BUNDLED_RATE",
//       "fixedValue": {
//         "amount": "100",
//         "currency": "USD"
//       },
//       "rateElementBasis": "NET_CHARGE"
//     },
//     "packagingType": "YOUR_PACKAGING",
//     "totalPackageCount": 3,
//     "totalWeight": 87.5,
//     "shipmentSpecialServices": {
//       "returnShipmentDetail": {
//         "returnType": "PRINT_RETURN_LABEL"
//       },
//       "deliveryOnInvoiceAcceptanceDetail": {
//         "recipient": {
//           "accountNumber": {
//             "value": 123456789
//           },
//           "address": {
//             "streetLines": [
//               "10 FedEx Parkway",
//               "Suite 30"
//             ],
//             "countryCode": "US"
//           },
//           "contact": {
//             "companyName": "FedEx",
//             "faxNumber": "9013577890",
//             "personName": "John Taylor",
//             "phoneNumber": "9013577890"
//           }
//         }
//       },
//       "internationalTrafficInArmsRegulationsDetail": {
//         "licenseOrExemptionNumber": "432345"
//       },
//       "pendingShipmentDetail": {
//         "pendingShipmentType": "EMAIL",
//         "processingOptions": {
//           "options": [
//             "ALLOW_MODIFICATIONS"
//           ]
//         },
//         "recommendedDocumentSpecification": {
//           "types": [
//             "ANTIQUE_STATEMENT_EUROPEAN_UNION"
//           ]
//         },
//         "emailLabelDetail": {
//           "recipients": [
//             {
//               "emailAddress": "string",
//               "optionsRequested": {
//                 "options": [
//                   "PRODUCE_PAPERLESS_SHIPPING_FORMAT"
//                 ]
//               },
//               "role": "SHIPMENT_COMPLETOR",
//               "locale": {
//                 "country": "string",
//                 "language": "string"
//               }
//             }
//           ],
//           "message": "string"
//         },
//         "documentReferences": [
//           {
//             "documentType": "CERTIFICATE_OF_ORIGIN",
//             "customerReference": "string",
//             "description": "ShippingDocumentSpecification",
//             "documentId": "98123"
//           }
//         ],
//         "expirationTimeStamp": "2012-12-31",
//         "shipmentDryIceDetail": {
//           "totalWeight": {
//             "units": "LB",
//             "value": 10
//           },
//           "packageCount": 12
//         }
//       },
//       "holdAtLocationDetail": {
//         "locationId": "YBZA",
//         "locationContactAndAddress": {
//           "address": {
//             "streetLines": [
//               "10 FedEx Parkway",
//               "Suite 302"
//             ],
//             "city": "Beverly Hills",
//             "stateOrProvinceCode": "CA",
//             "postalCode": "38127",
//             "countryCode": "US",
//             "residential": false
//           },
//           "contact": {
//             "personName": "person name",
//             "emailAddress": "email address",
//             "parsedPersonName": {
//               "firstName": "first name",
//               "lastName": "last name",
//               "middleName": "middle name",
//               "suffix": "suffix"
//             },
//             "phoneNumber": "phone number",
//             "phoneExtension": "phone extension",
//             "companyName": "company name",
//             "faxNumber": "fax number"
//           }
//         },
//         "locationType": "FEDEX_ONSITE"
//       },
//       "shipmentCODDetail": {
//         "addTransportationChargesDetail": {
//           "rateType": "ACCOUNT",
//           "rateLevelType": "BUNDLED_RATE",
//           "chargeLevelType": "CURRENT_PACKAGE",
//           "chargeType": "COD_SURCHARGE"
//         },
//         "codRecipient": {
//           "accountNumber": {
//             "value": 123456789
//           }
//         },
//         "remitToName": "FedEx",
//         "codCollectionType": "ANY",
//         "financialInstitutionContactAndAddress": {
//           "address": {
//             "streetLines": [
//               "10 FedEx Parkway",
//               "Suite 302"
//             ],
//             "city": "Beverly Hills",
//             "stateOrProvinceCode": "CA",
//             "postalCode": "38127",
//             "countryCode": "US",
//             "residential": false
//           },
//           "contact": {
//             "personName": "person name",
//             "emailAddress": "email address",
//             "parsedPersonName": {
//               "firstName": "first name",
//               "lastName": "last name",
//               "middleName": "middle name",
//               "suffix": "suffix"
//             },
//             "phoneNumber": "phone number",
//             "phoneExtension": "phone extension",
//             "companyName": "company name",
//             "faxNumber": "fax number"
//           }
//         },
//         "returnReferenceIndicatorType": "INVOICE"
//       },
//       "shipmentDryIceDetail": {
//         "totalWeight": {
//           "units": "LB",
//           "value": 10
//         },
//         "packageCount": 12
//       },
//       "internationalControlledExportDetail": {
//         "type": "DEA_036"
//       },
//       "homeDeliveryPremiumDetail": {
//         "phoneNumber": {
//           "areaCode": "areaCode",
//           "extension": "extension",
//           "countryCode": "countryCode",
//           "personalIdentificationNumber": "personalIdentificationNumber",
//           "localNumber": "localNumber"
//         },
//         "shipTimestamp": "2020-04-24",
//         "homedeliveryPremiumType": "APPOINTMENT"
//       },
//       "specialServiceTypes": [
//         "BROKER_SELECT_OPTION"
//       ]
//     },
//     "customsClearanceDetail": {
//       "commercialInvoice": {
//         "shipmentPurpose": "GIFT"
//       },
//       "freightOnValue": "CARRIER_RISK",
//       "dutiesPayment": {
//         "payor": {
//           "responsibleParty": {
//             "address": {
//               "streetLines": [
//                 "10 FedEx Parkway",
//                 "Suite 302"
//               ],
//               "city": "Beverly Hills",
//               "stateOrProvinceCode": "CA",
//               "postalCode": "90210",
//               "countryCode": "US",
//               "residential": false
//             },
//             "contact": {
//               "personName": "John Taylor",
//               "emailAddress": "sample@company.com",
//               "parsedPersonName": {
//                 "firstName": "first name",
//                 "lastName": "last name",
//                 "middleName": "middle name",
//                 "suffix": "suffix"
//               },
//               "phoneNumber": "1234567890",
//               "phoneExtension": "phone extension",
//               "companyName": "Fedex",
//               "faxNumber": "fax number"
//             },
//             "accountNumber": {
//               "value": "123456789"
//             }
//           }
//         },
//         "paymentType": "SENDER"
//       },
//       "commodities": [
//         {
//           "description": "DOCUMENTS",
//           "weight": {
//             "units": "LB",
//             "value": 22
//           },
//           "quantity": 1,
//           "customsValue": {
//             "amount": "100",
//             "currency": "USD"
//           },
//           "unitPrice": {
//             "amount": "100",
//             "currency": "USD"
//           },
//           "numberOfPieces": 1,
//           "countryOfManufacture": "US",
//           "quantityUnits": "PCS",
//           "name": "DOCUMENTS",
//           "harmonizedCode": "080211",
//           "partNumber": "P1"
//         }
//       ]
//     },
//     "groupShipment": true,
//     "serviceTypeDetail": {
//       "carrierCode": "FDXE",
//       "description": "string",
//       "serviceName": "string",
//       "serviceCategory": "string"
//     },
//     "smartPostInfoDetail": {
//       "ancillaryEndorsement": "ADDRESS_CORRECTION",
//       "hubId": "5531",
//       "indicia": "MEDIA_MAIL",
//       "specialServices": "USPS_DELIVERY_CONFIRMATION"
//     },
//     "expressFreightDetail": {
//       "bookingConfirmationNumber": "string",
//       "shippersLoadAndCount": 0
//     },
//     "groundShipment": false
//   },
//   "carrierCodes": [
//     "FDXE"
//   ]
// }) {

//   // Opciones por defecto estan marcadas con un *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       "authorization" : "f633326be39440239770945fd993a729"
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   console.log(response);
//   return response; // parses JSON response into native JavaScript objects
// }
