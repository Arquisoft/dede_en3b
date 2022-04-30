import {Paper, Typography, Grid, Box} from '@mui/material';
import {useState} from 'react';
import {Review} from '../../shared/shareddtypes';
import ProductReview from './ProductReview';
import { StyledButton } from '../../routes/Product.styles';

type ProductReviewListProps = {
    reviewList: Review[];
};

export default function ProductReviewList( props: ProductReviewListProps ) {
    let [rating, setRating] = useState<boolean>(false);

    const startReviewing = () => {
        setRating(true);
    }

    return (
        <Paper elevation={4} >
            <Typography
                variant='h5'
                sx={{color: 'text.dark', m:3, p:2}}    
            >
                See what other users thought
            </Typography>
            <Box sx={{display: 'flex'}}>
                {!rating && (<StyledButton
                sx={{marginLeft:'auto', marginRight:4}}
                onClick={startReviewing}
                >
                    Add review
                </StyledButton>)}
                {rating && (
                    <Box sx={{}}>
                        
                    </Box>
                )}
            </Box>
            
            {props.reviewList.length > 0 && (
                <Grid container>
                {props.reviewList.map((review: Review) =>(
                    <Grid item xs={12} sx={{m: 2, p:2}}>
                        <ProductReview review={review} />
                    </Grid>
                ))}
                </Grid>
            )}                    
            
        </Paper>
    );
};