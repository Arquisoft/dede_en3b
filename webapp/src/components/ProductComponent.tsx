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
      <Card sx={{ width: { md: 345, xs: 250 }, height: { md:500, xs: 350}, bgcolor:"background.card", borderRadius: 8, boxShadow:'10'}}>
      <CardMedia
        component="img"
        sx={{height: { md:300, xs: 150}}}
          image={imageRef}
        alt={props.product.description}
      />
      <CardContent sx={{height: {xs:100, md: 110} }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ typography: { md: 'h5', xs: 'h6' }}}>
        {props.product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ typography: { md: 'h5', xs: 'h6' }}}>
        {props.product.price} €
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ typography: { md: 'body2', xs: 'body3' }}}>
        {props.product.description}
        </Typography>
      </CardContent>
      <CardActions >
        {//<Button size="small">Share</Button>
}
        <Button sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark', ml: { xs: 0, md: 6}}} 
          onClick={_event => onAddToCart(productToItem(props.product))}>
            Add to cart
            </Button>
        <Button sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
          onClick={_event => navigate(`/products/${props.product._id}`)}>
          See more
          </Button>
      </CardActions>
    </Card>
    )
}

export default ProductComponent;
   


