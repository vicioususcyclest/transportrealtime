import Grid from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';

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
    [contenttheme.breakpoints.up('sm')]: {
        fontSize: '70px',
      },

  };




export default function mainpage() {
    return (
        <ThemeProvider theme={contenttheme}>
            <Grid container >

                <Grid container md={12} xs={12} sx={{ justifyContent: 'center', height: { xs: '100vh' }, mb: '100px', minHeight: '300px' }}>
                    <Grid sx={{ width: '100%', maxheight: '100%', }}>
                        <Typography variant="h1" sx={{ textAlign: 'center', mt: '100px', overflowWrap: 'break-word' }}>
                            About Us <br />
                            </Typography>
                                     <Typography variant="h1" sx={{ textAlign: 'center', mt: '100px', overflowWrap: 'break-word' }}>
                                     This is a website about the estimation time of KMB , City Bus and New Bus    </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}