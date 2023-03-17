import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import car from '../asset/car.webp'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';
import { Paper } from '@mui/material';

// onScroll = () => {
//     if (window.scrollY > 100) {
//       // scrolling down
//       this.setState({
//         navBarTitle: "navTitleScroll",
//         navBarLogo: [blueLogo],
//         navBarBackground: "navBackgroundScroll",
//         navBarItem: "navItemScroll",
//         navVariant: "light"
//       });
//     } else if (window.scrollY < 100) {
//       // scrolling up
//       this.setState({
//         navBarTitle: "navTitle",
//         navBarLogo: [whiteLogo],
//         navBarBackground: "navBackground",
//         navBarItem: "navItem",
//         navVariant: "dark"
//       });
//     }
//   };

// componentDidMount() {
//     window.addEventListener("scroll", this.onScroll);
//   }

const contenttheme = createTheme({ //Create a theme which set the color
    typography: {
        fontSize: { md: 20 },
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',

    },

});

const StyledAvatar = styled(Typography)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: 'white';
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
})};
  &:hover {
    background-color: ${theme.palette.success.light};
    //transform: scale(1.3);
  }
  `}
`;


export default function mainpage() {

    return (
        <ThemeProvider theme={contenttheme}>
            <Grid container >
                <Grid container md={6} xs={12} sx={{ justifyContent: 'center', height: { xs: '50vh', md: '100vh' }, minHeight: '300px' }}>
                    <Grid sx={{ width: '100%', maxheight: '100%', }}>
                        <StyledAvatar variant="h1" sx={{ textAlign: 'center', border: '1px solid', mt: { xs: '100px', md: '125px' } }}>
                            PIC
                        </StyledAvatar>
                    </Grid>
                </Grid>
                <Grid container md={6} xs={12} sx={{ justifyContent: 'center', height: { xs: '50vh', md: '100vh' }, mb: '100px', minHeight: '300px' }}>
                    <Grid sx={{ width: '100%', maxheight: '100%', }}>
                        <Typography variant="h1" sx={{ textAlign: 'center', border: '1px solid', mt: '100px', overflowWrap: 'break-word' }}>
                            TransportRealtime <br />
                            Welcome to our website
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}