import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import compnayRoutes from './routes/companyRoutes.js'
import applicationRoutes from './routes/applicaitonRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import './models/User.js'
import './models/Company.js'
import './models/Jobs.js'
import './models/Application.js'
import './models/Profile.js'
const app= express()

dotenv.config()


app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))





//middleware 
app.use(cookieParser())
app.use(express.json())
 


//routes

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/job',jobRoutes)
app.use('/api/v1/company',compnayRoutes)
app.use('/api/v1/application',applicationRoutes)
app.use('/api/v1/profile',profileRoutes)


mongoDB()


app.listen(process.env.PORT,()=>{

console.log("server is listening port"+process.env.PORT);


})


