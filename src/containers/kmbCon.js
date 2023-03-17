import kmb from '../pages/kmb'
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
} from "../reducers/kmbSlice";

const mapStateToProps = (state) => ({
    kmb: state.kmb,
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

export default connect(mapStateToProps, mapDispatchToProps)(kmb);