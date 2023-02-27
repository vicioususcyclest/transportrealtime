import React from "react";
import Header from "../components/Header";
import Mainpage from "../components/NewBus";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from "@mui/material";

// function User() { // Rule 2: call hooks in function component
//     const alert111 = useSelector(state => state.newbus.alert1) // Rule 1: call hooks in top-level
//     return { alert111 }
// }

export default function newbus({ newbus, testing }) {
    // const alert1 = User()

    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', overflowWrap: 'break-word' }}>
            <Grid xs={12}>
                <Header />
            </Grid>

            {/* <Button onClick={(e) => { console.log(newbus.alert1) }}>get</Button>
            <Button onClick={(e) => { testing() }}>post</Button> */}
            <Grid xs={12} maxWidth="xl">
                <Mainpage newbus={newbus} testing={testing} />
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