import { createSlice } from "@reduxjs/toolkit";


const profileSlice= createSlice({
    name:"profile",
initialState:{profile:null,loading:false,error:""},
reducers:{
    setProfile:(state,action)=>{state.profile=action.payload},
       setError:(state,action)=>{
        state.error=action.payload
    },
     setLoading:(state,action)=>{
        state.loading=action.payload
    },
    }


})


export const {setProfile,setError,setLoading} = profileSlice.actions
export default profileSlice.reducer