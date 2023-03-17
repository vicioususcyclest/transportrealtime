import newbus from '../pages/newbus'
import { connect } from "react-redux";
import {
    setRoute,
    setBaseURl,
    setDirection,
    setCompany,
    setData,
    setloadings2,
    setloadinginfo,
    setStopinfo,
    setTempETAarr,

    setGetallstopinfo,
} from "../reducers/newbusSlice";

const mapStateToProps = (state) => ({
    newbus: state.newbus,
});

const mapDispatchToProps = {
    setRoute,
    setBaseURl,
    setDirection,
    setCompany,
    setData,
    setloadings2,
    setloadinginfo,
    setStopinfo,
    setTempETAarr,

    setGetallstopinfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(newbus);