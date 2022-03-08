import { IProduct } from "../../../restapi/model/Products";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {getProduct} from '../api/api';

type ProductListProps = {
    products: IProduct[];
}

// const getCurrentProduct = async (id:string) => {
//     console.log(id);
//     const a:IProduct = await getProduct(id);
//     console.log(a);
//     //setProduct(await getProduct(id));
// }

// function ProductList(props: ProductListProps): JSX.Element {
//     return (
//         <>
//             <List>
//                 {props.products.map((product,i)=>{
//                     return (
//                         <ListItem key={product.name}>
//                             <ListItemIcon>
//                                 <img src={product.photo} alt="Foto de la sudadera."/>
//                             </ListItemIcon>
//                             <ListItemText primary={product.name} secondary={product.description}/>
//                             <Button onClick={e => getCurrentProduct(product.name)}>Accept</Button>
//                         </ListItem>
//                     );
//                 })}
//             </List>
//         </>
//     );
// }

const getCurrentProduct = async (id:IProduct) => {
    console.log(id);
    const a:IProduct = await getProduct(id.name);
    console.log("We got the product " + id.name + id.description + id.photo + id.price);
    //setProduct(await getProduct(id));
}

function ProductList(props: ProductListProps): JSX.Element {
    return (
        <>
            <List>
                {props.products.map((product,i)=>{
                    return (
                        <ListItem key={product.name}>
                            <ListItemIcon>
                                <img src={product.photo} alt="Foto de la sudadera."/>
                            </ListItemIcon>
                            <ListItemText primary={product.name} secondary={product.description}/>
                            <p> {product.price} </p>
                            <Button onClick={e => getCurrentProduct(product)}>Accept</Button>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

export default ProductList;