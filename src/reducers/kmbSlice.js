import { createSlice } from "@reduxjs/toolkit";

// const [Route, setRoute] = useState('')
// const [baseURL, setBaseURl] = useState('')
// const [direction, setDirection] = useState('')
// const [company, setCompany] = useState('')
// const [data, setData] = useState('')
// const [loadings2, setloadings2] = useState(false)
// const [loadinginfo, setloadinginfo] = useState(false)
// const [stopinfo, setStopinfo] = useState([])
// const [tempETAarr, setTempETAarr] = useState([])
// const [timeline, setTimeline] = useState('')
// const [getallstopinfo, setGetallstopinfo] = useState(false)

const kmbStateInit = {
    route: '',
    baseURL: '',
    direction: '',
    company: '',
    data: '',
    loadings2: false,
    loadinginfo: false,
    stopinfo: [],
    tempETAarr: [],
    timeline: '',
    getallstopinfo: false,
};

const kmbSlice = createSlice({
    name: "kmbState",
    initialState: kmbStateInit,
    reducers: {
        setRoute(state, action) {
            state.route = action.payload
        },
        setBaseURl(state, action) {
            state.baseURL = action.payload
        },
        setDirection(state, action) {
            state.direction = action.payload
        },
        setCompany(state, action) {
            state.company = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        setloadings2(state, action) {
            state.loadings2 = action.payload
        },
        setloadinginfo(state, action) {
            state.loadinginfo = action.payload
        },
        setStopinfo(state, action) {
            state.stopinfo.push(action.payload)
            state.stopinfo.sort((a, b) => a.seq - b.seq);
        },
        setTempETAarr(state, action) {
            state.tempETAarr = action.payload
        },

        setGetallstopinfo(state, action) {
            state.getallstopinfo = action.payload
        },

    },
});

export const {
    setRoute,
    setBaseURl,
    setDirection,
    setCompany,
    setData,
    setloadings2,
    setloadinginfo,
    setStopinfo,
    setTempETAarr,
    setTimeline,
    setGetallstopinfo,
} = kmbSlice.actions;

export default kmbSlice.reducer;