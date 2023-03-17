import minibus from '../pages/minibus'
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
} from "../reducers/minibusSlice";

const mapStateToProps = (state) => ({
    minibus: state.minibus,
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

export default connect(mapStateToProps, mapDispatchToProps)(minibus);