import { IProduct } from "../../../restapi/model/Products";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from "@mui/icons-material/ContactPage";

type ProductListProps = {
    products: IProduct[];
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
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

export default ProductList;