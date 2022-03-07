import { render } from "@testing-library/react";
import React from "react";
import { IProduct } from "./IProduct";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ProductComponentProps = {
    product: IProduct;
}

function ProductComponent(props: ProductComponentProps) : JSX.Element {

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.product.image}
        alt={props.product.description}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.price} pavos
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">See More</Button>
      </CardActions>
    </Card>
    )
}

export default ProductComponent;
   


