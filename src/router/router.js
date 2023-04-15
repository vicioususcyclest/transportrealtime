import MainpageCon from '../containers/mainpageCon'
import AboutUs from '../containers/aboutusCon'
import ContactUs from '../containers/contactusCon'
import KMB from '../containers/kmbCon'
import NEWBUS from '../containers/newbusCon'
import MINIBUS from '../containers/minibusCon'
import { Routes, Route, Navigate } from "react-router-dom"
import My404Component from '../containers/404Con'

export default function router() {
    return (
        <Routes>
            <Route path='/transportrealtime/*' element={<Navigate to="/transportrealtime/404" replace />} />
            <Route path="/transportrealtime/404" element={<My404Component />} />
            <Route path="/transportrealtime/" element={<MainpageCon />} />
            <Route path="/transportrealtime/aboutus" element={<AboutUs />} />
            {/* <Route path="/contactus" element={<ContactUs />} /> */}
            <Route path="/transportrealtime/kmb" element={<KMB />} />
            <Route path="//transportrealtime/newbus" element={<NEWBUS />} />
            {/* <Route path="/minibus" element={<MINIBUS />} /> */}
        </Routes>
    )
}