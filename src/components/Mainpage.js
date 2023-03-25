import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import bus from '../asset/Bus.png'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';
import {Avatar, Paper } from '@mui/material';

const contenttheme = createTheme({ //Create a theme which set the color
    typography: {
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',
    },
});

contenttheme.typography.h1 = {
    fontFamily: 'Lilita One',

    [contenttheme.breakpoints.only('xs')]: {
      fontSize: '40px',
    },
    [contenttheme.breakpoints.only('sm')]: {
        fontSize: '70px',
      },
    [contenttheme.breakpoints.up('md')]: {
        fontSize: '100px',
      },
  };




export default function mainpage() {
    return (
        <ThemeProvider theme={contenttheme}>
            <Grid container >

                <Grid container md={12} xs={12} sx={{ justifyContent: 'center', height: { xs: '100vh' }, mb: '100px', minHeight: '300px' }}>
                    <Grid sx={{ width: '100%', maxheight: '100%', }}>
                        <Typography variant="h1" sx={{ textAlign: 'center', mt: '100px', overflowWrap: 'break-word' }}>
                            TransportRealtime <br />
                            Welcome to our website
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}