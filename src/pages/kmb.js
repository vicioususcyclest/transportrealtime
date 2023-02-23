import Header from "../components/Header";
import Section from "../components/KMB";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';

export default function kmb() {
    return (
        <Grid Container>
            <Grid>
                <Header />
            </Grid>
            <Grid sx={{ height: '100vh' }}>
                <Section />
            </Grid>
            <Grid sx={{
                // position: 'static',
                bottom: '0px',
                width: '100%',
                height: '200px',
                backgroundColor: '#2e7d32',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <Footer />
            </Grid>
        </Grid >
    )
}