import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import car from '../asset/car.webp'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';
import { Button, Paper, Card, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import DirectionsBusFilledSharpIcon from '@mui/icons-material/DirectionsBusFilledSharp';

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
        fontSize: { md: '20' },
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
    const value1 = 'NEW BUS'
    const value2 = '238X'
    const res = [
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop1",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 1,
            module_type: "Instructional",
            module_name: "Stop2",
            duration: 20,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop3",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop4",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop5",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop6",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        },
        {
            module_id: 2,
            module_type: "Instructional",
            module_name: "Stop7",
            duration: 30,
            course: {
                course_id: 1,
                course_name: "AWS"
            }
        }
    ];

    const getModules = () => {
        return res.map((r, i) => {
            const className = i % 1 === 0 ? "custom-even-class" : "custom-odd-class";
            return (
                <TimelineItem classes={{ alignAlternate: className }} key={r.module_id}>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{r.module_name}</TimelineContent>
                </TimelineItem>
            );
        });
    };


    return (
        <ThemeProvider theme={contenttheme}>
            <Grid container sx={{ height: { xs: '85vh', md: '100vh' }, minHeight: '300px', justifyContent: 'center' }} >

                <Grid container xs={11} sx={{ height: { xs: '5vh' }, border: 'solid 1px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid xs={12} sm={2} >
                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                            Search:
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ width: { xs: '100vw', sm: '40vw' } }}>
                        <TextField variant='outlined' size="small" fullWidth />
                    </Grid>
                    <Grid xs={12} sm={1} sx={{ width: { xs: '80vw', sm: '100px' }, ml: '10px' }}>
                        <Button fullWidth variant='contained' color='success'>Submit</Button>
                    </Grid>
                </Grid>

                <Grid container xs={11} sx={{ height: { xs: '5vh' }, border: 'red solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid xs={12} sm={3} >
                        <FormControl fullWidth>
                            <InputLabel >Direction</InputLabel>
                            <Select
                                variant='outlined'
                                label="Direction"
                            >
                                <MenuItem value={10}>A to B</MenuItem>
                                <MenuItem value={20}>B to A</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={4} >
                        <Typography variant='h1' sx={{ textAlign: 'center' }}>Company: {value1}</Typography>
                    </Grid>

                    <Grid xs={12} sm={4} >
                        <Typography variant='h1' sx={{ textAlign: 'center' }}>Bus Route: {value2}</Typography>
                    </Grid>
                </Grid>

                <Grid container xs={11} sx={{ height: { xs: '80vh' }, border: 'green solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid xs={12} sm={6} sx={{ width: { xs: '100vw', sm: '40vw' } }}>
                        <Card sx={{ height: { xs: '60vh' } }}>
                            <Timeline align="alternate">
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot>
                                            <DirectionsBusFilledSharpIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent></TimelineContent>
                                </TimelineItem>

                                {getModules()}
                            </Timeline>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} sx={{ width: { xs: '80vw', sm: '40vw' }, ml: '10px' }}>
                        <Card sx={{ height: { xs: '60vh' } }}>
                            <Typography variant='h1' sx={{ textAlign: 'center' }}>Information</Typography>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
        </ThemeProvider >
    )
}