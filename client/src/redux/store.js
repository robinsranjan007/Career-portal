import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/authSlice'
import jobReducer from '../redux/slices/jobSlice'
import profileReducer from '../redux/slices/profileSlice'
import companyReducer from '../redux/slices/companySlice'
import applicationReducer from '../redux/slices/applicationSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        application:applicationReducer,
        job:jobReducer,
        profile:profileReducer,
        company:companyReducer
    }
})

export default store