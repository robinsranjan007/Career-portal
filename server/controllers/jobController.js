import Job from "../models/Jobs.js";
import Company from "../models/Company.js";

export const createJob = async (req, res) => {
  try {
    const {
      jobPosition,
      jobDescription,
      jobSkills,
      jobExperience,
      salary,
      joblocation,
      jobstatus,
    } = req.body;
    const company = await Company.findOne({ user: req.user.id });

    if (
      !jobPosition ||
      !jobDescription ||
      !jobSkills ||
      !jobExperience ||
      !salary ||
      !joblocation ||
      !jobstatus ||
      !company
    ) {
      return res.status(400).json({
        message: "Field is missing",
        success: false,
      });
    }

    const JobCreated = await Job.create({
      jobPosition,
      jobDescription,
      jobSkills,
      jobExperience,
      salary,
      joblocation,
      jobstatus,
      company: company._id,
    });

    if (!JobCreated) {
      return res.status(404).json({
        success: false,
        message: "Job create failed",

      });
    }

     return res.status(201).json({
        success: true,
        message: "Job created Successfully",
        data: JobCreated,
      });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};


export const getAllJob = async(req,res)=>{
try {    
const jobs= await Job.find().populate("company","companyName")
if(jobs.length===0)
{
    return res.status(400).json({
        message:"no job found",
        success:false
    })
}

return res.status(200).json({
    message:"jobs found successfully",
    success:true,
    data:jobs
})


} catch (error) {
     return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
}




}


export const getJobById=async(req,res)=>{
try {
 
const {jobId} = req.params

    const job= await Job.findById(jobId).populate("company", "companyName companyLogo companyLocation")

    if(!job)
    {
 return res.status(404).json({
        message:"job not found",
        success:false
    })
    }
    
    return res.status(200).json({
        message:"job found",
        success:true,
        data:job
    })



} catch (error) {
 return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
}

}


export const updateJob=async(req,res)=>{
try {

  const {jobstatus,joblocation,salary,jobExperience,jobSkills,jobDescription,jobPosition}=req.body
  const {jobId}= req.params

  const updateData={jobstatus,joblocation,salary,jobExperience,jobSkills,jobDescription,jobPosition}


  const job= await Job.findByIdAndUpdate(jobId,updateData,{new:true})


  if(!job)
  {
    return res.status(404).json({
      message:"update failed",
      success:false
    })
  }
  return res.status(200).json({
    message:"update Successfull",
    success:true,
    data:job
  })


  
} catch (error) {
   return res.status(500).json({
      message:"server Error",
      success:false,
      error:error.message
    })


}

}


export const deleteJob= async(req,res)=>{

try {
  
  const {jobId} = req.params

  const job= await Job.findByIdAndDelete(jobId)

  if(!job)
  {
    return res.status(404).json({
      message: "Job not found",
      success: false,
    });
  }
  return res.status(200).json({
    message:"successfully deleted",
    success:true
})



} catch (error) {
  return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
}


}