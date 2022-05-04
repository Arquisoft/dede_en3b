// eslint-disable-next-line
import React from "react";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

export default function Home() {

    const imageShop = {
        url: require("../static/images/buttons/shop.png"),
        title: 'Start shopping',
        width: '50%',
      };

    const imageOrders = 
        {
          url: require("../static/images/buttons/orders.png"),
          title: 'Check your orders',
          width: '50%',
        };
      
      const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 250,
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
      
    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{ 
              bgcolor: "background.default",
              height:"93vh"
            }}>
                <Grid item xs wrap="wrap">
                    <Typography 
                        variant="h1"
                        align="center"
                        sx={{color:"text.primary", typography: { md: 'h1', xs: 'h2' }}}
                        >
                            Welcome to DeDe
                    </Typography>
                    <Typography 
                        variant="h5"
                        align="center"
                        sx={{color:"text.secondary",  typography: { md: 'h5', xs: 'h6' }}}
                        paragraph 
                        style={{ wordWrap: "break-word" }}
                        >
                            <br/>Welcome to the clothing store where we value your privacy<br/>
                            You can start shopping our products or checking your previous orders
                    </Typography>
                </Grid>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '80%', p: { xs:2, } }}>
                    
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
                    <Link to="/orders/find">
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