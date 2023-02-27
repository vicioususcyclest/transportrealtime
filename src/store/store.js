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
            <Route path='*' element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<My404Component />} />
            <Route path="/" element={<MainpageCon />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/kmb" element={<KMB />} />
            <Route path="/newbus" element={<NEWBUS />} />
            <Route path="/minibus" element={<MINIBUS />} />
        </Routes>
    )
}