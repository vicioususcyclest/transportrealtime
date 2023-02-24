import Header from "../components/Header";
import Mainpage from "../components/NewBus";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';


export default function mainpage() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', overflowWrap: 'break-word' }}>
            <Grid xs={12}>
                <Header />
            </Grid>

            <Grid xs={12} maxWidth="xl">
                <Mainpage />
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