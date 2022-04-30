import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from '../shared/shareddtypes';
import { ICartItem } from "../shared/shareddtypes";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addItem} from '../redux/slices/cartSlice';



type ProductComponentProps = {
  product: IProduct;
}

function ProductComponent(props: ProductComponentProps): JSX.Element {

  const productToItem = (prod: IProduct) => ({ product: prod, units: 1 });

  const dispatch = useDispatch();

  const onAddToCart = (clickedItem: ICartItem) => {
    dispatch(addItem(clickedItem));
  }
  let imageRef: string = require("../static/images/" + props.product._id + ".png");
  const navigate = useNavigate();
    return (
      <Card sx={{ maxWidth: 345, minWidth: 345, height:500, bgcolor:"background.card", borderRadius: 8, boxShadow:'10'}}>
      <CardMedia
        component="img"
        height="300"
          image={imageRef}
        alt={props.product.description}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.price} €
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        {//<Button size="small">Share</Button>
}
        <Button onClick={event => onAddToCart(productToItem(props.product))}>Add to cart</Button>
        <Button onClick={event => navigate(`/products/${props.product._id}`)}>See more</Button>
      </CardActions>
    </Card>
    )
}

export default ProductComponent;
   


