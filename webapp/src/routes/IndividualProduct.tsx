import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import { IProduct } from "../../../restapi/model/Products";
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/api';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ICartItem } from "../components/ICartItem";
import { styled } from '@mui/material/styles';

type IndividualProductProps = {
    product: IProduct;
    onAddToCart: (clickedproduct: ICartItem) => void;
}


const IndividualProduct = (props: IndividualProductProps) => {

    //Id
    const { id } = useParams();
    const [product, setProduct] =useState<IProduct>();
    
    const selectProduct = async () => {
        if (props.product == null) setProduct( await getProduct(id!));
        else setProduct(props.product);
    }

    useEffect(() =>{ 
        selectProduct();
        console.log(product?.name);
        console.log(product?._id);
    }, []);

    const productToItem = (prod: IProduct) => ({ product: prod, units: 1 });

    if (typeof product === "undefined"){
        return (
            <React.Fragment>
                <h2>No such product exists</h2>
            </React.Fragment>
        );
    } else {

        let imageRef: string = require("../static/images/" + id + ".png");
        const StyledButton = styled(Button)`
            background: #9681f2;

            color: black;

            :hover {
                background: #81c9f2;
            }
        `;

        const StyledImg = styled('img')({
            margin: 20,
            marginLeft: 90,
            display: 'inline-block',
            height: '500px',
            borderRadius: 25
        });
        
        const StyledOuterGrid = styled(Grid)({
            margin: '1em',
            borderRadius: 25,
            alignItems: "center", 
            justifyContent: "center",
            resizeMode: 'cover'
        });

        return (
            <React.Fragment>
                
                <StyledOuterGrid container>

                    <Grid item xs={4}>
                        <div className="product-pic">
                            <StyledImg
                                src={imageRef}
                                alt="Product"
                            />
                        </div>
                    </Grid>

                    <Grid item xs={4} direction="column">
                        <div className="product-info">
                            <h2>Product name: {product.name}</h2>
                            <Card sx={{maxWidth: 550}}>
                                <Typography>Description {product.description}</Typography>
                            </Card>
                            <h3>Price: {product.price}€</h3>
                        
                            <StyledButton onClick={event => props.onAddToCart(productToItem(props.product))}>Add to cart</StyledButton>
                        </div>
                    </Grid>
                </StyledOuterGrid>
            </React.Fragment>
        );
    }
}

export default IndividualProduct;