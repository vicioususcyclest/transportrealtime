import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'//import theme (to config some style) 
import car from '../asset/car.webp'

const Headertheme = createTheme({ //Create a theme which set the color
    typography: {
        fontSize: 20,
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',
    },

});

export default function mainpage() {
    return (
        <ThemeProvider theme={Headertheme}>
            <Container maxWidth="xl">
                <Grid container >
                    <Grid xl={6} md={6}>
                        <img src={car} alt="Car" style={{ maxWidth:'50%', position: 'relative', top: '100px' }} />
                    </Grid>
                    <Grid xl={6} md={6}>
                        <h1>TransportRealtime</h1>
                        <h2>Welcome to our website</h2>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}