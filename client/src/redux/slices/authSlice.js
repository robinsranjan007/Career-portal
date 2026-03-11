import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import axiosInstance from '../../utils/axiosInstance'

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me")
    return res.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})
 

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true,
        error:"",
        loggedIn:false
    },
    reducers:{

    setUser:(state,action)=>{
        state.user=action.payload
        state.loggedIn=true
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
    setLogout:(state)=>{
        state.loggedIn=false
        state.user=null
    }


    },
    extraReducers: (builder) => {
  builder
   .addCase(fetchMe.pending, (state) => {
  state.loading = true
})
.addCase(fetchMe.fulfilled, (state, action) => {
  state.user = action.payload
  state.loggedIn = true
  state.loading = false
})
.addCase(fetchMe.rejected, (state) => {
  state.user = null
  state.loggedIn = false
  state.loading = false
})
}
})

export const {setError,setLoading,setLogout,setUser}=authSlice.actions

export default authSlice.reducer