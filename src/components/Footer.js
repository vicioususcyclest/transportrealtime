import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';

// {/* <Grid sx={{
//     // position: 'static',
//     bottom: '0px',
//     width: '100%',
//     height: '200px',
//     backgroundColor: '#2e7d32',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center'

// }}> */}


export default function footer() {
    return (
        <Grid container sx={{
            // position: 'static',
            bottom: '0px',
            width: '100%',
            height: '200px',
            backgroundColor: '#2e7d32',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='div' color='white' sx={{ fontFamily: 'Gloock', fontSize: 15, }}>
                <Grid>
                    <Grid>
                        TransportRealtime
                    </Grid>
                    <Grid> Author: Felix Wong</Grid>
                    <Grid>phone : +852 9342 8421</Grid>
                    <Grid>Email : felix99923@gmail.com</Grid>
                    <Grid>
                        Location : Hong Kong
                    </Grid>
                    <Grid>Office Hour : Monday to Friday from 9:00AM - 5:00PM (GMT+8)</Grid>
                </Grid>
            </Typography>
        </Grid >
    )
}