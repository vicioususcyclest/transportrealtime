import Typography from "@mui/material/Typography";


export default function footer() {
    return (
        <div className="footer-container">
            <Typography color='white' sx={{ fontFamily: 'Gloock', }}>
                <div className="footer">
                    <div>
                        <div className="footer-title">
                            TransportRealtime
                        </div>
                        <div className="footer-desc"> Author: Felix Wong</div>
                    </div>
                    <div className="footer-contact">
                        <div>phone : +852 9342 8421</div>
                        <div>Email : felix99923@gmail.com</div>

                        <div>
                            Location : Hong Kong
                        </div>
                        <div>Opening : Monday to Friday from 8:30AM - 6:00PM (GMT+4)</div>
                    </div>
                </div>
                <div className="footer-divider" />
            </Typography>
        </div>
    )
}