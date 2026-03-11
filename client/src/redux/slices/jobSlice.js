import { createSlice } from "@reduxjs/toolkit";
 

const jobSlice = createSlice({
    name:"job",
    initialState:{
        jobs:[],
        error:'',
        loading:false
    },
    reducers:{

    setJobs:(state,action)=>{
        state.jobs= action.payload
    },
   setError:(state,action)=>{
        state.error=action.payload
    },
     setLoading:(state,action)=>{
        state.loading=action.payload
    },
    }

})


export const {setError,setJobDetails,setLoading,setJobs}=jobSlice.actions
export default jobSlice.reducer