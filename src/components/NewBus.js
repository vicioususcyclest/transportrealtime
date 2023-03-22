import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import car from '../asset/car.webp'
import { useScroll, animated, useSpring } from '@react-spring/web'
import { auto } from '@popperjs/core';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Paper, Card, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, CardContent } from '@mui/material';
import PlaceSharpIcon from '@mui/icons-material/PlaceSharp';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import LoadingButton from '@mui/lab/LoadingButton';
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
        fontSize: { md: 20 },
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',

    },

});


export default function Newbus({ newbus,
    setRoute,
    setBaseURl,
    setDirection,
    setCompany,
    setData,
    setloadings2,
    setStopinfo,
    setTempETAarr,
    setGetallstopinfo,
    setloadinginfo,
}) {
    //- Original -
    // useRef = reference a value that’s not needed for rendering
    //const input1 = useRef();
    // const [Route, setRoute] = useState('')
    // const [baseURL, setBaseURl] = useState('')
    // const [direction, setDirection] = useState('')
    // const [company, setCompany] = useState('')
    // const [data, setData] = useState('')
    // const [loadings2, setloadings2] = useState(false)
    // const [loadinginfo, setloadinginfo] = useState(false)
    // const [stopinfo, setStopinfo] = useState([])
    // const [tempETAarr, setTempETAarr] = useState([])
    const [timeline, setTimeline] = useState('') // non-serializable value cannot put in state/action
    // const [getallstopinfo, setGetallstopinfo] = useState(false)
    const [ifclear, setifclear] = useState("")
    var temparr = []

    function clear() {
        console.log(newbus.route)
        setRoute('')
        setBaseURl('')
        setDirection('')
        setCompany('')
        setData('')
        setStopinfo([])
        setTempETAarr([])
        setGetallstopinfo(false)
        setTimeline('')
        setloadings2(false)
    }




    // 1. after select the company, set the state of company / after select the dir, set the state of dir
    function setCom(value) {
        setCompany(value.target.value)
    }

    function setRou(value) {
        setRoute(value)
    }

    function setDir(value) {
        setDirection(value.target.value)
    }

    //2. the state of company change, call handle company / the state of dir change, call handle dir
    useEffect(() => { handleinput() }, [newbus.company])
    useEffect(() => { handleinput() }, [newbus.direction])
    useEffect(() => { handleinput() }, [newbus.route])

    //3. Call handle company/dir and setBaseURl
    function handleinput() {
        if (newbus.route !== '' && newbus.direction !== '' && newbus.company !== '') {
            console.log('I am handleinput(): route=' + newbus.route + ' Direction=' + newbus.direction + ' Company=' + newbus.company)
            console.log('BaseURl= https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + newbus.company + '/' + newbus.route + '/' + newbus.direction)
            setBaseURl('https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + newbus.company + '/' + newbus.route + '/' + newbus.direction);
        }
    }

    //new 4. after clicking search, call GetRoute to get the route data
    //Cant put all in a single func -> useEffect is needed
    function Search() {

        setifclear("false")
        console.log(newbus.baseURL)
        setData('')
        console.log(newbus.stopinfo)
        setStopinfo("clear")
        setTempETAarr([])
        setGetallstopinfo(false)
        setTimeline('')
    }
    //new 4.1

    useEffect(() => {
        console.log(newbus.stopinfo)
        if (ifclear == "false") Resetclear()
        else if (ifclear == "true") GetRoute()
    }, [ifclear])

    function Resetclear() {
        setifclear("true")
    }



    //new 4.2

    //5. Get the whole route via axios and set the data
    async function GetRoute() { //asynchronous programming 
        if (newbus.route !== '' && newbus.company !== '' && newbus.direction !== '') {
            console.log('I am axios GetRoute: ' + newbus.baseURL)
            await axios.get(newbus.baseURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        setData(res.data);  //Update the state with the fetched data
                    }
                })
        }
    }

    //6. After the data is set, call getstop
    useEffect(() => { getStop() }, [newbus.data])

    //7. Call getstop to calling getstopinfo to add the seq and sort
    const getStop = () => {
        if (newbus.data === '') { }
        else {
            newbus.data.data.map((r, i) => {
                GetStopInfo(r.stop, newbus.stopinfo, r.seq)
            })

        }
    }

    //8. Call getstop, add seq into the data, Update the stop info whrough stpinfo.push (pass by reference)
    async function GetStopInfo(stop, seq) { //asynchronous programming 
        var stationInfoURL = 'https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/stop/' + stop
        if (newbus.route !== '' && newbus.company !== '' && newbus.data !== '') {
            //console.log('I am axios GetStopInfo: ' + stationInfoURL)

            await axios.get(stationInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); }
                    else {
                        //Use axios to get the data from the URL
                        res.data.data.seq = seq;
                        setStopinfo(res.data.data)
                    }
                }
                )
        }
    }

    //9. Check the stopinfo are all gotten
    useEffect(() => { Isgetallstopinfo() }, [newbus.stopinfo])

    function Isgetallstopinfo() {
        if (newbus.data != '' && newbus.stopinfo != []) {
            //console.log("newbus.data.data.length: " + newbus.data.data.length + " //newbus.stopinfo.length: " + newbus.stopinfo.length)
            if (newbus.data.data.length == newbus.stopinfo.length) {
                setGetallstopinfo(true)
                setTimeout(setloadings2(false), 2000)
            }
        }
    }

    //10. After all stop infos got, call getModules
    useEffect(() => { getModules() }, [newbus.getallstopinfo])

    const getModules = () => {
            if (newbus.data === '') { }
            else {
                console.log(newbus.data.data)
                console.log(newbus.stopinfo)
                setTimeline(
                    newbus.data.data.map((r, i) => {
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
                                <TimelineContent>{newbus.stopinfo[r.seq - 1].name_tc}{newbus.stopinfo[r.seq - 1].name_en}</TimelineContent>
                            </TimelineItem>
                        );
                    }))
            }
    }

    //11. After clicking the stop button, call the GetETAInfo
    async function GetETAInfo(stop) { //asynchronous programming 
        if (newbus.route !== '' && newbus.company !== '' && newbus.data !== '') {
            var ETAInfoURL = 'https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/eta/' + newbus.company + '/' + stop + '/' + newbus.route
            console.log('I am axios GetETAInfo: ' + ETAInfoURL)
            await axios.get(ETAInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        if (newbus.direction === 'inbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.stop === stop && item.dir === "I"))
                        }
                        else if (newbus.direction === 'outbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.stop === stop && item.dir === "O"))
                        }
                    }
                })
        }
    }

    useEffect(() => { }, [newbus.tempETAarr])
    useEffect(() => { }, [newbus.data])


    function Getdate(date) {
        if (date == null) return "No Service"
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

            <Grid container sx={{ height: { xs: '85vh', md: '100vh' }, minHeight: '300px', justifyContent: 'center', marginTop: '10px'  }} >

                <Grid container xs={12} sx={{ height: { xs: '5vh' }, border: 'solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <Grid container xs={12} sm={2} sx={{ width: { xs: '100vw', sm: '15vw' }, alignItems: 'center' }}>
                        <Grid xs={4}>
                            <Typography variant='h2' sx={{ textAlign: 'center' }}>
                                Route:&nbsp;
                            </Typography>
                        </Grid>
                        <Grid xs={8}>
                            <TextField variant='outlined' size="small" fullWidth
                                // onFocus={(e) => {
                                //     console.log('Focused on input');
                                // }}
                                // onBlur={(e) => {
                                //     console.log(e.target.value)
                                // }}
                                onChange={(e) => {
                                    setRou(e.target.value)
                                }}
                                value={newbus.route}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={2} >
                        <FormControl fullWidth>
                            <InputLabel >Direction</InputLabel>
                            <Select
                                variant='outlined'
                                label="Direction"
                                value={newbus.direction}
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
                                value={newbus.company}
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
                        <LoadingButton loading={newbus.loadings2} fullWidth variant='contained' color='success' onClick={(e) => { setloadings2(true); Search(); /*setTimeout(Search, 2000)*/ }}>Search</LoadingButton>
                    </Grid>
                    <Grid xs={12} sm={1} >
                        <Button fullWidth variant='contained' color='success' onClick={(e) => { clear() }}>Clear</Button>
                    </Grid>
                    {/* <Grid xs={12} sm={1} sx={{ width: { xs: '80vw', sm: '100px' }, ml: '10px' }}>
                        <Button fullWidth variant='contained' color='success'
                            onClick={(e) => {
                                setRoute(input1.current.target.value)
                            }}>Submit</Button>
                    </Grid> */}
                    {/* <Button onClick={(e) => { console.log(newbus.alert1) }}>get</Button> */}
                </Grid>

                <Grid container xs={12} sx={{ height: { xs: '5vh' }, border: 'red solid 1px', justifyContent: 'space-evenly', alignItems: 'center' }}>




                    <Grid xs={12} sm={4} >
                        <Typography variant='h1' sx={{ textAlign: 'center' }}>Bus Route: {newbus.route}</Typography>
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
                        <Card sx={{ height: { xs: '60vh' }, overflow: 'auto', minWidth: 650 }}>
                            <CardContent>
                                <Typography component="h1" sx={{ textAlign: 'center' }}>Estimated Time:
                                </Typography>
                                <LinearProgress sx={{ minWidth: 650, transition: 'none' }} color="success" />

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Order </TableCell>
                                                <TableCell >Time Left (min) :</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {newbus.tempETAarr.map((row) => (
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
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
        </ThemeProvider >
    )
}