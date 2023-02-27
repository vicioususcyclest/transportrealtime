import newbus from '../pages/newbus'
import { connect } from "react-redux";
import { testing } from "../reducers/newbusSlice";

const mapStateToProps = (state) => ({
    newbus: state.newbus,
});

const mapDispatchToProps = { testing };

export default connect(mapStateToProps, mapDispatchToProps)(newbus);