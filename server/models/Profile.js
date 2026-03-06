import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
   
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    education:{type:String,required:true},
    experience:{type:String,required:true},
    skills:{type:[String],required:true},
    bio:{type:String,required:true},
    PhofilePhoto:{type:String},
address:{
country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    pincode:{type:String,required:true},
}
    
})

const Profile = mongoose.model('Profile',profileSchema)
export default Profile