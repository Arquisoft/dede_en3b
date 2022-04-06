import {IProduct} from '../shared/shareddtypes';


export interface ICartItem {
    product: IProduct,
    units: number,
}