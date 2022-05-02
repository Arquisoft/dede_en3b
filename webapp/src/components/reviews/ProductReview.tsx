import {Paper, Typography, Grid, Box} from '@mui/material';

import {Review} from '../../shared/shareddtypes';
import Rating from '@mui/material/Rating';

type ProductReviewProps = {
    review: Review | undefined;
};

export default function ProductReview(props: ProductReviewProps) {
    return(
        <Paper elevation={2} sx={{p: 1, bgcolor: 'background.light'}}>
            <Grid container direction="row" sx={{minHeight: '15vh'}}>
                <Grid item xs={12}>
                    <Box sx={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography
                        variant='h6'
                        sx={{color: 'text.lighterdark'}}>
                            {props.review?.name}
                            </Typography>
                        <Rating 
                            value={props.review?.rating}
                            readOnly/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                    variant='h6'
                    sx={{color: 'text.dark', pl: 2}}>
                        {props.review?.comment}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}