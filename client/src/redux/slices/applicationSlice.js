import { createSlice } from "@reduxjs/toolkit";


const applicationSlice= createSlice({
    name:"application",
    initialState:{
        myApplications:[],
        jobApplications:[],
         error:'',
        loading:false
    },

    reducers:{
        setMyApplications:(state,action)=>{state.myApplications=action.payload},
        setJobApplications:(state,action)=>{state.jobApplications=action.payload},
         setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
    }
})

export const {setJobApplications,setMyApplications,setLoading,setError}= applicationSlice.actions
export default applicationSlice.reducer