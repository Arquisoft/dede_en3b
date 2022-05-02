import "@testing-library/jest-dom/extend-expect"
import { Address } from "../shared/shareddtypes"
import {getShippingCosts} from "../api/ShippingApi";

jest.setTimeout(10000)

test("Getting the right amount of cost for our adress", async() => {
    
    const address:Address = {
        country_name: "España",
        locality:"Posada de Llanera",
        postal_code:"33424",
        region:"Asturias",
        street_address: "Avenida Arzobispo Franciso Alvarez Martinez"
    }
    

    const expectedResult = 96.872
    const result = await getShippingCosts(address)
    expect(result).toBe(expectedResult);
});

test("We get an error code for an invalid address", async () => {
    const address:Address = {
        country_name: "",
        locality:"",
        postal_code:"",
        region:"",
        street_address: ""
    }

    const expectedResult = -1;
    const result = await getShippingCosts(address);
    expect(result).toBe(expectedResult);
})