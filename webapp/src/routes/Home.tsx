import React from "react";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

const Home = () => {

    const imageShop = {
        url: '../static/images/buttons/shop.png',
        title: 'Start shopping',
        width: '50%',
      };

    const imageOrders = 
        {
          url: '/static/images/buttons/burgers.jpg',
          title: 'Check your orders',
          width: '50%',
        };
      
      const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
          zIndex: 1,
          '& .MuiImageBackdrop-root': {
            opacity: 0.15,
          },
          '& .MuiImageMarked-root': {
            opacity: 0,
          },
          '& .MuiTypography-root': {
            border: '4px solid currentColor',
          },
        },
      }));
      
      const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      });
      
      const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
      const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      }));
      
      const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }));
      
      let navigate = useNavigate();

    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            spacing={10}>
                <Grid item xs="auto">
                    <Typography 
                        variant="h1"
                        align="center"
                        color="text.primary">
                            Welcome to DeDe
                    </Typography>
                    <Grid item xs={10}/>
                    <Typography 
                        variant="h4"
                        align="center"
                        color="text.primary"
                        paragraph>
                            You can start shopping our products keeping your privacy
                    </Typography>
                </Grid>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '80%' }}>
                    
                    <ImageButton
                    focusRipple
                    key={imageShop.title}
                    style={{
                        width: imageShop.width,
                    }}
                    >
                    <Link to="shop">
                    <ImageSrc style={{ backgroundImage: `url(${imageShop.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        >
                        {imageShop.title}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </Link>
                    </ImageButton>

                    <ImageButton
                    focusRipple
                    key={imageOrders.title}
                    style={{
                        width: imageOrders.width,
                    }}
                    >
                    <Link to="/">
                    <ImageSrc style={{ backgroundImage: `url(${imageOrders.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        >
                        {imageOrders.title}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                    </Link>
                    </ImageButton>
                </Box>
        </Grid>
    );
};

export default Home;