import { IProduct } from "../../../restapi/model/Products";


export interface ICartItem {
    product: IProduct,
    units: number,
}