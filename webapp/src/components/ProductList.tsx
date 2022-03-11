import { IProduct } from "../../../restapi/model/Products";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {getProduct} from '../api/api';
import ProductComponent from "./ProductComponent";
import { ICartItem } from "./ICartItem";

type ProductListProps = {
    products: IProduct[];
    onAddToCart: (clickedItem: ICartItem) => void;
}

const getCurrentProduct = async (id:IProduct) => {
    console.log(id);
    const a:IProduct = await getProduct(id.name);
    console.log("We got the product " + id.name + id.description + id.photo + id.price);
    //setProduct(await getProduct(id));
}

function ProductList(props: ProductListProps): JSX.Element {
    return (
        <>
            <List className="prodList">
                
                {props.products.map((product,i)=>{
                    return (
                        //<ProductComponent key={i} product={product} onAddToCart={props.onAddToCart(product)}></ProductComponent>
                        <></>
                    );
                })}
            </List>
        </>
    );
}

export default ProductList;