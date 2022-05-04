import { Paper, Typography, Grid, Box, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Review } from '../../shared/shareddtypes';
import ProductReview from './ProductReview';
import { StyledButton } from '../../routes/Product.styles';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { addReview } from '../../api/api';

type ProductReviewListProps = {
    productId: string;
    reviewList: Review[];
};

export default function ProductReviewList(props: ProductReviewListProps) {
    let [reviewing, setReviewing] = useState<boolean>(false);
    let [comment, setComment] = useState<string>('');
    let [rating, setRating] = useState<number | null>(3);
    let [name, setName] = useState<string>('anonymous');
    let [addName, setAddName] = useState<boolean>(false);

    const startReviewing = () => {
        setReviewing(true);
    }

    const endReviewing = () => {
        if (rating === null) {
            setRating(5);
            if (rating !== null)
                addReview(props.productId, name, rating, comment);
        } else {
            addReview(props.productId, name, rating, comment);
        }

        setReviewing(false);
        setAddName(false);
        setComment('');
        setName('');
        setRating(3);
    }

    const handleNameChange = () => {
        setName('');
        setAddName(!addName);
    }

    return (
        <Paper elevation={4} sx={{bgcolor: 'background.card', ml: 0, mr: 4}}>
            <Typography
                variant='h5'
                sx={{ color: 'text.default', m: 3, p: 2 }}
            >
                See what other users thought
            </Typography>
            <Box sx={{ display: 'flex' }}>
                {!reviewing && (
                    <StyledButton
                        sx={{ marginLeft: 'auto', marginRight: 4, bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
                        onClick={startReviewing}
                    >
                        Add review
                    </StyledButton>)}
                {reviewing && (
                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <Box sx={{ marginLeft: 4 }}>
                            <Rating value={rating} onChange={(_event, newValue) => {
                                setRating(newValue);
                            }} sx={{ pb: 2 }} />
                        </Box>
                        <Box sx={{ marginLeft: 4 }}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="anon"
                                onChange={handleNameChange}
                                name="radio-buttons-group"
                                sx={{ display: 'flex', flexDirection: 'row' }}
                            >
                                <FormControlLabel value="anon" control={<Radio />} label="Anonymous" />
                                <FormControlLabel value="write" control={<Radio />} label="Write your name" />
                                {addName && (
                                    <TextField
                                        sx={{ input: { color: 'text.default' } }}
                                        label='Name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    >
                                    </TextField>
                                )}
                            </RadioGroup>
                        </Box>
                        <Box sx={{ m: 4, display: 'flex', flex: 1 }}>
                            <TextField
                                sx={{ input: { color: 'text.dark' } }}
                                label='What did you think?'
                                inputProps={{ "data-testid": "comment" }}
                                multiline
                                rows={4}
                                fullWidth
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            >
                            </TextField>
                        </Box>
                        <Box sx={{ marginLeft: 'auto', marginRight: 4 }}>
                            <StyledButton
                                sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
                                onClick={endReviewing}>
                                Send
                            </StyledButton>
                        </Box>

                    </Box>
                )}
            </Box>

            {props.reviewList.length > 0 && (
                <Grid container>
                    {props.reviewList.map((review: Review) => (
                        <Grid item xs={12} sx={{ m: 2, p: 2 }}>
                            <ProductReview review={review} />
                        </Grid>
                    ))}
                </Grid>
            )}

        </Paper>
    );
};