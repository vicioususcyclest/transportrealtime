import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles'//import theme (to config some style) 
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

const Headertheme = createTheme({ //Create a theme which set the color
  // palette: { //set the mannual color
  //   primary: {
  //     main: '#212D48',
  //     darker: '#053e85', //darkmode but unused
  //     contrastText: 'white'
  //   },
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      hd: 800
    }
  },

  typography: {
    fontSize: 20,
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'Lilita One',
    //fontWeight: 700,
    // letterSpacing: '.3rem',
    color: 'white',
    textDecoration: 'none',
  },

});
// 
export default function Header({ page, background }) {
  return (
    <ThemeProvider theme={Headertheme}>
      <AppBar position="relative" color='success'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container xs={12} sm={12} md={12} xl={12} >
              <Grid sm={6} hd={4} container sx={{ alignItems: 'center' }}>
                <Grid>
                  <IconButton aria-label="Home" >
                    <Link to={"/"} style={{ color: '#FFF' }}>
                      <DepartureBoardIcon sx={{ mr: 1, }} />
                    </Link>
                  </IconButton>
                  <Link to={"/"} style={Headertheme.typography}>TransportRealtime</Link>
                </Grid>
              </Grid>
              <Grid id="button" container hd={8} sm={6} sx={{ alignItems: 'center', justifyContent: { hd: 'flex-end' } }}>
                <Grid sx={{ justifyContent: 'flex-right' }}>
                  <Link to={"/aboutus"} style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#FFF', }}>About Us</Button>
                  </Link>
                  <Link to={"/newbus"} style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#FFF' }}>New Bus</Button>
                  </Link>
                  {/* <Link to={"/minibus"} style={{ textDecoration: 'none', }}>
                    <Button sx={{ color: '#FFF', marign: '0px' }}><span>Minibus</span></Button>
                  </Link> */}
                  <Link to={"/kmb"} style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#FFF', }}>KMB</Button>
                  </Link>
                  {/* <Link to={"/contactus"} style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: '#FFF', }}>Contact</Button>
                  </Link> */}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}