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
        fontSize: 20,
        mr: 2,
        fontFamily: 'Lilita One',
        color: 'white',
        textDecoration: 'none',
    },
});


export default function KMB({ kmb,
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
    const [loadingword, setloadingword] = useState("determinate")
    const [loadingval, setloadingval] = useState(0)

    function clear() {
        console.log(kmb.route)
        setRoute('')
        setBaseURl('')
        setDirection('')
        setCompany('kmb')
        setData('')
        setStopinfo([])
        setTempETAarr([])
        setGetallstopinfo(false)
        setTimeline('')
        setloadings2(false)
        setloadingword("determinate")
        setloadingval(0)
    }




    //1. after select the company, set the state of company / after select the dir, set the state of dir
    function setCom(value) {
        setCompany(value.target.value)
    }

    function setRou(value) {
        setRoute(value.toUpperCase())
    }

    function setDir(value) {
        setDirection(value.target.value)
    }

    //2. the state of company change, call handle company / the state of dir change, call handle dir
    useEffect(() => { handleinput() }, [kmb.company])
    useEffect(() => { handleinput() }, [kmb.direction])
    useEffect(() => { handleinput() }, [kmb.route])

    //3. Call handle company/dir and setBaseURl
    function handleinput() {
        console.log('kmb.route:' + kmb.route + 'kmb.direction' + kmb.direction + 'kmb.company' + kmb.company)
        if (kmb.route !== '' && kmb.direction !== '' && kmb.company !== '') {
            console.log('I am handleinput(): route=' + kmb.route + ' Direction=' + kmb.direction + ' Company=' + kmb.company)
            console.log('BaseURl= https://rt.data.gov.hk/v1.1/transport/citybus-nwfb/route-stop/' + kmb.company + '/' + kmb.route + '/' + kmb.direction)
            setBaseURl('https://data.etabus.gov.hk/v1/transport/kmb/route-stop/' + kmb.route + '/' + kmb.direction + '/1');
        }
    }

    //new 4. after clicking search, call GetRoute to get the route data
    //Cant put all in a single func -> useEffect is needed
    function Search() {
        setifclear("false")
        console.log(kmb.baseURL)
        setData('')
        console.log(kmb.stopinfo)
        setStopinfo("clear")
        setTempETAarr([])
        setGetallstopinfo(false)
        setTimeline('')
        setloadingword("determinate")
        setloadingval(0)
    }
    //new 4.1

    useEffect(() => {
        console.log(kmb.stopinfo)
        if (ifclear == "false") Resetclear()
        else if (ifclear == "true") GetRoute()
    }, [ifclear])

    function Resetclear() {
        setifclear("true")
    }



    //new 4.2

    //5. Get the whole route via axios and set the data
    async function GetRoute() { //asynchronous programming 
        if (kmb.route !== '' && kmb.company !== '' && kmb.direction !== '') {
            console.log('I am axios GetRoute: ' + kmb.baseURL)
            await axios.get(kmb.baseURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        setData(res.data);  //Update the state with the fetched data
                    }
                })
        }
    }

    //6. After the data is set, call getstop
    useEffect(() => { getStop() }, [kmb.data])

    //7. Call getstop to calling getstopinfo to add the seq and sort
    const getStop = () => {
        if (kmb.data === '') { }
        else {
            kmb.data.data.map((r, i) => {
                GetStopInfo(r.stop, r.seq)
            })

        }
    }

    //8. Call getstop, add seq into the data, Update the stop info whrough stpinfo.push (pass by reference)
    async function GetStopInfo(stop, seq) { //asynchronous programming 
        var stationInfoURL = 'https://data.etabus.gov.hk/v1/transport/kmb/stop/' + stop
        if (kmb.route !== '' && kmb.company !== '' && kmb.data !== '') {
            //console.log('I am axios GetStopInfo: ' + stationInfoURL)

            await axios.get(stationInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); }
                    else {
                        //Use axios to get the data from the URL
                        res.data.data.seq = seq;
                        console.log(seq)
                        console.log(res.data.data)
                        setStopinfo(res.data.data)
                    }
                }
                )
        }
    }

    //9. Check the stopinfo are all gotten
    useEffect(() => { Isgetallstopinfo() }, [kmb.stopinfo])

    function Isgetallstopinfo() {
        if (kmb.data != '' && kmb.stopinfo != []) {
            //console.log("kmb.data.data.length: " + kmb.data.data.length + " //kmb.stopinfo.length: " + kmb.stopinfo.length)
            if (kmb.data.data.length == kmb.stopinfo.length) {
                setGetallstopinfo(true)
                setTimeout(setloadings2(false), 2000)
            }
        }
    }

    //10. After all stop infos got, call getModules
    useEffect(() => { getModules() }, [kmb.getallstopinfo])

    const getModules = () => {
        {
            if (kmb.data === '') { }
            else {
                console.log(kmb.data.data)
                console.log(kmb.stopinfo)
                setTimeline(
                    kmb.data.data.map((r, i) => {
                        return (
                            <TimelineItem classes={{ alignAlternate: "custom-odd-class" }} key={r.seq}>
                                {/* <TimelineOppositeContent color="textSecondary">
                                    09:30 am
                                </TimelineOppositeContent> */}
                                <TimelineSeparator>
                                    {/* <TimelineDot> */}
                                    <IconButton size="small" onClick={() => { setloadingword("indeterminate"); GetETAInfo(r.stop) }}>
                                        <PlaceSharpIcon sx={{ minWidth: '30px', minHeight: '30px' }} />
                                    </IconButton>
                                    {/* </TimelineDot> */}
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>{kmb.stopinfo[r.seq - 1].name_tc}{kmb.stopinfo[r.seq - 1].name_en}</TimelineContent>
                            </TimelineItem>
                        );
                    }))
            }

        }
    }

    useEffect(() => { }, [loadingword])


    //11. After clicking the stop button, call the GetETAInfo
    async function GetETAInfo(stop) { //asynchronous programming 
        if (kmb.route !== '' && kmb.company !== '' && kmb.data !== '') {
            var ETAInfoURL = 'https://data.etabus.gov.hk/v1/transport/kmb/eta/' + stop + '/' + kmb.route + '/1'
            console.log('I am axios GetETAInfo: ' + ETAInfoURL)
            await axios.get(ETAInfoURL).
                then((res) => {
                    if (res.code === '422') { alert(res.message); } else {
                        //Use axios to get the data from the URL
                        if (kmb.direction === 'inbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.dir === "I"))
                        }
                        else if (kmb.direction === 'outbound') {
                            setTempETAarr((Array)(res.data)[0].data.filter(item => item.dir === "O"))
                        }
                        setloadingword("determinate")
                        setloadingval(100)
                    }
                })
        }
    }

    useEffect(() => { }, [kmb.tempETAarr])
    useEffect(() => { }, [kmb.data])


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

            <Grid container sx={{ height: { xs: '100vh' }, minHeight: '800px', justifyContent: 'center', alignContent: 'flex-start', }} >

                <Grid container xs={12} sx={{ marginTop: '1vh', justifyContent: 'space-evenly', alignItems: 'center', minHeight: { xs: '120px' } }} spacing={{ xs: 1, sm: 2, lg: 0, xl: 0 }}>

                    <Grid label='route' container xs={12} sm={10} xl={2} sx={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Grid xs={3} xl={5}>
                            <Typography variant='h6' sx={{ textAlign: 'center' }}>
                                Route:&nbsp;
                            </Typography>
                        </Grid>
                        <Grid xs={8} xl={7}>
                            <TextField variant='outlined' size="small" fullWidth

                                onChange={(e) => {
                                    setRou(e.target.value)
                                }}
                                value={kmb.route}
                            />
                        </Grid>
                    </Grid>

                    <Grid label='direction' xs={10} sm={5} lg={3} xl={2}>
                        <FormControl fullWidth>
                            <InputLabel >Direction</InputLabel>
                            <Select
                                variant='outlined'
                                label="Direction"
                                value={kmb.direction}
                                onChange={val => {
                                    setDir(val);
                                }}
                            >
                                <MenuItem value='inbound'>Inbound</MenuItem>
                                <MenuItem value='outbound'>Outbound</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid label='company' xs={10} sm={5} lg={3} xl={2}>
                        <FormControl fullWidth>
                            <InputLabel >Company</InputLabel>
                            <Select
                                variant='outlined'
                                label="Company"
                                // value={kmb.company}
                                value='KMB'
                                onChange={val => {
                                    setCom(val);
                                }}
                            >
                                <MenuItem value='KMB'>KMB</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={10} sm={4} lg={3} xl={2} >
                        <LoadingButton loading={kmb.loadings2} fullWidth variant='contained' color='success' onClick={(e) => { setloadings2(true); Search(); /*setTimeout(Search, 2000)*/ }}>Search</LoadingButton>
                    </Grid>
                    <Grid xs={10} sm={4} lg={2} xl={1} >
                        <Button fullWidth variant='contained' color='success' onClick={(e) => { clear() }}>Clear</Button>
                    </Grid>
                </Grid>

                <Grid label='BusRoute' container xs={12} sx={{ height: { xs: '200vh', sm: '80vh' }, justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <Grid xs={12} >
                        <Typography variant='h5' sx={{ textAlign: 'center' }}>Bus Route: {kmb.route}</Typography>
                    </Grid>

                    <Grid xs={10} sm={5} md={4} >
                        <Card sx={{ height: { xs: '70vh', sm: '70vh' }, overflow: 'auto' }}>
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

                    <Grid xs={10} sm={5} md={4} >
                        <Card sx={{ height: { xs: '70vh', sm: '70vh' }, overflow: 'auto', minWidth: '100%' }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ textAlign: 'center' }}>Estimated Time:
                                </Typography>
                                <LinearProgress sx={{ minWidth: '100%', transition: 'none' }} variant={loadingword} value={loadingval} color="success" />

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Order </TableCell>
                                                <TableCell >Time Left (min) :</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {kmb.tempETAarr.map((row) => (
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