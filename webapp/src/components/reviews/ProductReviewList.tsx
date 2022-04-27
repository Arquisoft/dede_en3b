import {Paper, Typography, Grid} from '@mui/material';

import {Review} from '../../shared/shareddtypes';
import ProductReview from './ProductReview';

type ProductReviewListProps = {
    reviewList: Review[];
};

export default function ProductReviewList( props: ProductReviewListProps ) {
    return (
        <Paper elevation={4} >
            <Typography
                variant='h5'
                sx={{color: 'text.dark', m:3, p:2}}    
            >
                See what other users thought
            </Typography>
            
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