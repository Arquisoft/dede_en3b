import React, {useState, useEffect} from "react";
import {IProduct, Review} from '../shared/shareddtypes';
import {useParams} from 'react-router-dom';
import {getProduct, getReviewsOfProduct} from '../api/api';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import { StyledButton, StyledImg } from './Product.styles';
import NumberPicker from "react-widgets/NumberPicker";
import Box from '@mui/material/Box';
import { addItem } from "../redux/slices/cartSlice";
import {useDispatch} from 'react-redux';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import ProductReviewList from '../components/reviews/ProductReviewList';

type IndividualProductProps = {
    product: IProduct;
}

function BreadcrumbsProduct(props:any) {
    return(
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/" >
          <Typography
          variant='h6'
          sx={{color: 'text.secondary'}}>
              Home
          </Typography>
        </Link>
        <Link underline="hover" href="/shop" >
        <Typography variant='h6'
          sx={{color: 'text.secondary'}}>
              Catalogue
          </Typography>
          </Link>
          <Typography variant='h6'
          sx={{color: 'text.secondary'}}>
              {props.product}
          </Typography>
      </Breadcrumbs>
    );
  }


const IndividualProduct = (props: IndividualProductProps) => {

    const dispatch = useDispatch();

    //Id
    const { id } = useParams();
    const [product, setProduct] =useState<IProduct>();
    const rating = 3;
    const [reviews, setReviews] = useState<Review[]>([]);
    
    const selectProduct = async () => {
        if (props.product == null) setProduct( await getProduct(id!));
        else setProduct(props.product);

        setReviews(await getReviewsOfProduct(id!));
    }
    // eslint-disable-next-line
    useEffect(() =>{ 
        // eslint-disable-next-line
        selectProduct();
    },
    // eslint-disable-next-line
    []);


    const [value, setValue] = useState<number>(1);

    const productToItem = (prod: IProduct) => ({ product: prod, units: value });    

    if (typeof product === "undefined"){
        return (
            <Box sx={{bgcolor: 'background.default', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', height: '150vh'}}>
                
                <Typography
                    variant='h4'
                    sx={{color:'text.default', padding: 4}}>
                    No such product exists
                </Typography>
                
            </Box>
        );
    } else {

        const addProductToCart = () => {
            dispatch(addItem(productToItem(product)));
            setValue(1);
        }

        let imageRef: string = require("../static/images/" + product._id + ".png");

        return (
            <Box sx={{bgcolor: 'background.default', display: 'flex', flexWrap: 'wrap', 
                        height: '100%', justifyContent: 'center', pb: 5}}>
                
                <Box sx={{flexDirection: 'column', pt:2, pl: 5}}>
                <BreadcrumbsProduct product={product.name}/>           

                <Box sx={{borderRadius: 25, justifyContent: "center", padding: 10,
                            display: 'flex',  flexDirection: {xs: 'column', lg: 'row'} }}>
     
                    <Box >
                        <div className="product-pic">
                            <StyledImg
                                sx={{ height: {xs: 500, md: 600} }}
                                src={imageRef}
                                alt={product.name}
                            />
                        </div>
                    </Box>


                    <Box sx={{ height: '500px', width: '100%'}} >
                        <div className="product-info">
                            <Typography
                                variant='h3'
                                sx={{color: 'text.default', pt: 4, pb: 4}}
                            >
                                {product.name}
                            </Typography>
                            <Rating value={rating} readOnly sx={{pb:2}}/>
                            <Card sx={{maxWidth: 550, p: 2, bgcolor: 'background.light'}}>
                                <Typography sx={{color: 'text.dark'}}>{product.description}</Typography>
                            </Card>
                            <Typography
                                variant='h5'
                                sx={{pt: 4, pb:4, color: 'text.default'}}
                            >
                                Price: {product.price}€
                            </Typography>
                            <Box
                                sx={{ display: 'flex', flexDirection: {xs: 'column', sm:  'row'}, p: 2, alignItems: 'center', justifyContent: 'space-between'}}
                            >
                                <NumberPicker min={1} value={value} onChange={value => { if (value !== null ) setValue(value)}} 
                                style={{ }}
                                ></NumberPicker>
                        
                                <StyledButton sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
                                onClick={addProductToCart}>Add to cart</StyledButton>
                            </Box>
                            
                        </div>
                    </Box>
                    </Box>                    
                    <ProductReviewList productId={product._id.toString()} reviewList={reviews} />
                </Box>
            </Box>
        );
    }
}

export default IndividualProduct;