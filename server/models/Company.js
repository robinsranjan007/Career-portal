import mongoose from "mongoose";

const companySchema = mongoose.Schema({
user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
companyName:{type:String,required:true},
companyLogo:{type:String,required:true},
companyLocation:{type:String,required:true},
companyDescription:{type:String,required:true},

})

const Company= mongoose.model('company',companySchema)

export default Company