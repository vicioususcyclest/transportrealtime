import Header from "../components/Header";
import Mainpage from "../components/Mainpage";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import { border } from "@mui/system";

export default function mainpage() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', }}>
            <Grid xs={12}>
                <Header />
            </Grid>

            <Grid xs={12} sx={{ minHeight: '500px' }} maxWidth="xl">
                <Mainpage />
            </Grid>

            <Grid xs={12} >
                <Footer />
            </Grid>
        </Grid >
    )
}