import React from "react";
import Header from "../components/Header";
import Mainpage from "../components/MiniBus";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';

// function User() { // Rule 2: call hooks in function component
//     const alert111 = useSelector(state => state.minibus.alert1) // Rule 1: call hooks in top-level
//     return { alert111 }
// }

export default function minibus({
    minibus,
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

            <Grid xs={12} maxWidth="xl">
                <Mainpage minibus={minibus}
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
                // position: 'static',
                position: "relative",
                bottom: '0px',
                width: '100%',
                height: '200px',
                backgroundColor: '#2e7d32',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 'auto',
                overflowWrap: 'break-word',
            }}>
                <Footer />
            </Grid>
        </Grid >
    )
}