import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    jobPosition:{type:String,required:true},
    jobDescription:{type:String,required:true},
    jobSkills:{type:[String],required:true},
    jobExperience:{type:String,required:true},
    salary:{type:String,required:true},
    joblocation:{type:String,required:true},
    jobstatus:{type:String,enum:['open','closed']}
})

const Job = mongoose.model('Job',jobSchema)
export default Job