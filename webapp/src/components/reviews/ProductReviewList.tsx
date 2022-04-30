import {Paper, Typography, Grid, Box} from '@mui/material';
import {useState} from 'react';
import {Review} from '../../shared/shareddtypes';
import ProductReview from './ProductReview';
import { StyledButton } from '../../routes/Product.styles';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

type ProductReviewListProps = {
    reviewList: Review[];
};

export default function ProductReviewList( props: ProductReviewListProps ) {
    let [reviewing, setReviewing] = useState<boolean>(false);
    let [comment, setComment] = useState();
    let [rating, setRating] = useState<number>(3);

    const startReviewing = () => {
        setReviewing(true);
    }

    const endReviewing = () => {

    }

    return (
        <Paper elevation={4} sx={{bgcolor: 'background.card'}}>
            <Typography
                variant='h5'
                sx={{color: 'text.default', m:3, p:2}}    
            >
                See what other users thought
            </Typography>
            <Box sx={{display: 'flex'}}>
                {!reviewing && (
                <StyledButton
                sx={{marginLeft:'auto', marginRight:4}}
                onClick={startReviewing}
                >
                    Add review
                </StyledButton>)}
                {reviewing && (
                    <Box sx={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                        <Box sx={{marginLeft:4}}>
                            <Rating value={rating}></Rating>
                        </Box>
                        <Box sx={{marginLeft:4}}>
                            <Rating value={rating}></Rating>
                        </Box>
                    <Box sx={{m:4, display: 'flex', flex: 1}}>
                        <TextField 
                        sx={{ input: { color: 'text.dark'}}}
                        label='What did you think?' 
                        multiline 
                        rows={4} 
                        fullWidth                        
                        value={comment}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{marginLeft: 'auto', marginRight: 4}}>
                        <StyledButton
                        onClick={endReviewing}>
                            Send
                        </StyledButton>
                    </Box>
                    
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