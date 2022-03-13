import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import { IProduct } from "../../../restapi/model/Products";
import Types from "mongoose";
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/api';

type IndividualProductProps = {
    product: IProduct;
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
        console.log('a');
    }, []);

    if (typeof product === "undefined"){
        return (
            <React.Fragment>
                <h2>No such product exists</h2>
            </React.Fragment>
        );
    } else {

        let imageRef: string = require("../static/images/" + id + ".png");
        console.log(id);
        return (
            <React.Fragment>
                <h2>Product</h2>
                <Grid item xs={8}>
                    <Grid item xs>
                        <img
                            src={imageRef}
                            alt="Product"
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default IndividualProduct;