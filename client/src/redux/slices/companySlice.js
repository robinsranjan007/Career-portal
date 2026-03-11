import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({

name:"company",
initialState:{
    company:[],
    companyDetails:null,
     error:'',
        loading:false
},
reducers:{
    setCompany:(state,action)=>{state.company=action.payload},
    setCompanyDetails:(state,action)=>{state.companyDetails=action.payload},
    setError:(state,action)=>{state.error=action.payload},
    setLoading:(state,action)=>{state.loading=action.payload},
    
}


})

export const {setCompany,setCompanyDetails,setError,setLoading} = companySlice.actions

export default companySlice.reducer