import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import car from '../asset/car.webp'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';

const contenttheme = createTheme({ //Create a theme which set the color
    typography: {
        fontSize: { md: '20' },
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',

    },

});




export default function mainpage() {

    return (
        <ThemeProvider theme={contenttheme}>
            {/* <Container  > */}
            <Grid container >
                <Grid container md={12} xs={12} sx={{ justifyContent: 'center', border: '1px solid', height: { xs: '50vh', md: '100vh' }, }}>
                    <Grid sx={{ width: '100%' }}>
                        <Typography variant="h1" sx={{ textAlign: 'center', border: '1px solid', mt: '100px', overflowWrap: 'break-word' }}>
                            404 NOT FOUND
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {/* </Container> */}
        </ThemeProvider>
    )
}