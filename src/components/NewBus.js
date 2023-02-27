import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import car from '../asset/car.webp'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';
import { Button, Paper, Card, TextField, Select, MenuItem, InputLabel, FormControl, IconButton } from '@mui/material';
import PlaceSharpIcon from '@mui/icons-material/PlaceSharp';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import DirectionsBusFilledSharpIcon from '@mui/icons-material/DirectionsBusFilledSharp';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const contenttheme = createTheme({ //Create a theme which set the color
    typography: {
        fontSize: { md: '20' },
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',

    },

});


export default function Newbus({ newbus, }) {
    const input1 = useRef(); // useRef = reference a value that’s not needed for rendering
    const [Route, setRoute] = useState('')
    const [baseURL, setBaseURl] = useState('')
    const [direction, setDirection] = useState('')
    const [company, setCompany] = useState('')
    const [data, setData] = useState('')
    // const [tempstationtc, setTempstationtc] = useState('')
    // const [tempstationen, setTempstationen] = useState('')
    const [stopinfo, setStopinfo] = useState([])
    const [tempETAarr, setTempETAarr] = useState([])
    const [timeline, setTimeline] = useState('')
    const [getallstopinfo, setGetallstopinfo] = useState(false)

    // 1. after select the company, set the state of company / after select the dir, set the state of dir
    function setCom(value) {
        setCompany(value.target.value)
    }

    function setDir(value) {
        setDirection(value.target.value)
    }

    //2. the state of company change, call handle company / the state of dir change, call handle dir
    useEffect(() => { handlecompany() }, [company])
    useEffect(() => { handledirection() }, [direction])

    //3. Call handle company/dir and setBaseURl
    function handlecompany() {
        if (Route !== '' && direction !== '' && company !== '') {
            console.log('I am handlecompany: ' + company)
            console.log('https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + company + '/' + Route + '/' + direction)
            setBaseURl('https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + company + '/' + Route + '/' + direction);
        }
    }

    function handledirection() {
        if (Route !== '' && company !== '' && company !== '') {
            console.log('i am handledirection:' + direction)
            console.log('https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + company + '/' + Route + '/' + direction)
            setBaseURl('https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + company + '/' + Route + '/' + direction);
        }
    }

    //4. after the baseURL changed, call getroute
    useEffect(() => { GetRoute() }, [baseURL])

    //5. Get the whole route via axios and set the data
    async function GetRoute() { //asynchronous programming 
        if (Route !== '' && company !== '' && company !== '') {
            console.log('I am axios GetRoute: ' + baseURL)
            await axios.get(baseURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        setData(res.data);  //Update the state with the fetched data
                    }
                })
        }
    }

    //6. After the data is set, call getstop
    useEffect(() => { getStop() }, [data])

    //7. Call getstop to calling getstopinfo to add the seq and sort
    const getStop = () => {
        if (data === '') { }
        else {
            data.data.map((r, i) => {
                // console.log(GetStopInfo(r.stop, stopinfo, r.seq).then((val)=>{}))
                GetStopInfo(r.stop, stopinfo, r.seq)
                // .then((item) => {
                //     if (item.length === data.data.length) {
                //          return updatestopinfo(item)
                //     }
                // })
            })

        }
    }

    //8. Call getstop, add seq into the data, Update the stop info whrough stpinfo.push (pass by reference)
    async function GetStopInfo(stop, stpinfo, seq) { //asynchronous programming 
        var stationInfoURL = 'https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/stop/' + stop
        if (Route !== '' && company !== '' && data !== '') {
            console.log('I am axios GetStopInfo: ' + stationInfoURL)
            await axios.get(stationInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); }
                    else {
                        //Use axios to get the data from the URL
                        res.data.data.seq = seq;
                        stpinfo.push(res.data.data)
                        stpinfo.sort((a, b) => a.seq - b.seq);
                    }
                }
                )
        }
    }

    function Search2() {
        console.log({ stopinfo })
        setGetallstopinfo(true)
    }

    useEffect(() => { getModules() }, [getallstopinfo])

    const getModules = () => {
        {
            if (data === '') { }
            else {
                console.log(stopinfo)
                setTimeline(
                    data.data.map((r, i) => {
                        return (
                            <TimelineItem classes={{ alignAlternate: "custom-odd-class" }} key={r.seq}>
                                {/* <TimelineOppositeContent color="textSecondary">
                                    09:30 am
                                </TimelineOppositeContent> */}
                                <TimelineSeparator>
                                    {/* <TimelineDot> */}
                                    <IconButton size="small" onClick={() => { GetETAInfo(r.stop) }}>
                                        <PlaceSharpIcon sx={{ minWidth: '30px', minHeight: '30px' }} />
                                    </IconButton>
                                    {/* </TimelineDot> */}
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>{stopinfo[r.seq - 1].name_tc}{stopinfo[r.seq - 1].name_en}</TimelineContent>
                            </TimelineItem>
                        );
                    }))
            }

        }
    }

    async function GetETAInfo(stop) { //asynchronous programming 

        if (Route !== '' && company !== '' && data !== '') {
            var ETAInfoURL = 'https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/eta/' + company + '/' + stop + '/' + Route
            console.log('I am axios GetETAInfo: ' + ETAInfoURL)
            await axios.get(ETAInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        if (direction === 'inbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.stop === stop && item.dir === "I"))
                        }
                        else if (direction === 'outbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.stop === stop && item.dir === "O"))
                        }

                    }
                })
        }
    }

    useEffect(() => { console.log(tempETAarr) }, [tempETAarr])
    useEffect(() => { }, [data])

    function Getdate(date) {
        var currentdate = new Date();
        // console.log(currentdate)
        var est = new Date(date);
        var diff = Math.abs(est - currentdate);
        var minutes = Math.floor((diff / 1000) / 60);

        return minutes
        // var day = currentdate.getTime() - (Date(date)).getTime;
        // console.log(day)
        // return day;
    }

    return (
        <ThemeProvider theme={contenttheme}>

            <Grid container sx={{ height: { xs: '85vh', md: '100vh' }, minHeight: '300px', justifyContent: 'center' }} >

                <Grid container xs={12} sx={{ height: { xs: '5vh' }, border: 'solid 1px', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid xs={12} sm={2} >
                        <Typography variant='h2' sx={{ textAlign: 'center' }}>
                            Search:
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ width: { xs: '100vw', sm: '40vw' } }}>
                        <TextField variant='outlined' size="small" fullWidth
                            onChange={val => {
                                input1.current = val;
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sm={1} sx={{ width: { xs: '80vw', sm: '100px' }, ml: '10px' }}>
                        <Button fullWidth variant='contained' color='success'
                            onClick={(e) => {
                                setRoute(input1.current.target.value)
                            }}>Submit</Button>
                    </Grid>
                    <Button onClick={(e) => { console.log(newbus.alert1) }}>get</Button>
                </Grid>

                <Grid container xs={12} sx={{ height: { xs: '5vh' }, border: 'red solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid xs={12} sm={3} >
                        <FormControl fullWidth>
                            <InputLabel >Direction</InputLabel>
                            <Select
                                variant='outlined'
                                label="Direction"
                                value={direction}
                                onChange={val => {
                                    setDir(val);
                                }}
                            >
                                <MenuItem value='inbound'>A to B</MenuItem>
                                <MenuItem value='outbound'>B to A</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={2} >
                        <FormControl fullWidth>
                            <InputLabel >Company</InputLabel>
                            <Select
                                variant='outlined'
                                label="Company"
                                value={company}
                                onChange={val => {
                                    setCom(val);
                                }}
                            >
                                <MenuItem value='NWFB'>New Bus</MenuItem>
                                <MenuItem value='CTB'>City Bus</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={2} >
                        <Button fullWidth variant='contained' color='success' onClick={(e) => { setTimeout(Search2(), 2000) }}>Search</Button>
                    </Grid>
                    <Grid xs={12} sm={4} >
                        <Typography variant='h1' sx={{ textAlign: 'center' }}>Bus Route: {Route}</Typography>
                    </Grid>
                </Grid>

                <Grid container xs={12} sx={{ height: { xs: '80vh' }, border: 'green solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid xs={12} sm={4} sx={{ /*width: { xs: '100vw', sm: '40vw'*/ }}>
                        <Card sx={{ height: { xs: '60vh' }, overflow: 'auto' }}>
                            <Timeline align="alternate" sx={{ border: '1px solid' }}>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot>
                                            <DirectionsBusFilledSharpIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent></TimelineContent>
                                </TimelineItem>
                                {timeline}
                            </Timeline>
                        </Card>
                    </Grid>

                    <Grid sx={{ /*width: { xs: '80vw', sm: '40vw' },*/ ml: '10px' }}>
                        <Card sx={{ height: { xs: '60vh' }, overflow: 'auto' }}>
                            <Typography variant='h1' sx={{ textAlign: 'center' }}>Estimated Time:
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> Order </TableCell>
                                            <TableCell >Time Left (min) :</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tempETAarr.map((row) => (
                                            <TableRow
                                                key={row.eta_seq}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.eta_seq}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {Getdate(row.eta)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
        </ThemeProvider >
    )
}