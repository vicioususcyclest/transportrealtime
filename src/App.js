import './App.css';
import MainpageCon from './containers/mainpageCon'
import AboutUs from './containers/aboutusCon'
import ContactUs from './containers/contactusCon'
import KMB from './containers/kmbCon'
import NEWBUS from './containers/newbusCon'
import MINIBUS from './containers/minibusCon'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainpageCon />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/kmb" element={<KMB />} />
        <Route path="/newbus" element={<NEWBUS />} />
        <Route path="/minibus" element={<MINIBUS />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;