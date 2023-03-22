import React from "react";
import Header from "../components/Header";
import Mainpage from "../components/KMB";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';

// function User() { // Rule 2: call hooks in function component
//     const alert111 = useSelector(state => state.kmb.alert1) // Rule 1: call hooks in top-level
//     return { alert111 }
// }

export default function kmb({
    kmb,
    setRoute,
    setBaseURl,
    setDirection,
    setCompany,
    setData,
    setloadings2,
    setloadinginfo,
    setStopinfo,
    setTempETAarr,

    setGetallstopinfo, }) {

    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', overflowWrap: 'break-word' }}>
            <Grid xs={12}>
                <Header />
            </Grid>

            <Grid xs={12} sx={{ minHeight: { xs: '280vh', sm: '120vh', lg: '100vh' } }} maxWidth="xl">
                <Mainpage kmb={kmb}
                    setRoute={setRoute}
                    setBaseURl={setBaseURl}
                    setDirection={setDirection}
                    setCompany={setCompany}
                    setData={setData}
                    setloadings2={setloadings2}
                    setloadinginfo={setloadinginfo}
                    setStopinfo={setStopinfo}
                    setTempETAarr={setTempETAarr}

                    setGetallstopinfo={setGetallstopinfo} />
            </Grid>

            <Grid xs={12} sx={{
                position: 'static',
                bottom: '0px',
            }}>
                <Footer />
            </Grid>
        </Grid >
    )
}