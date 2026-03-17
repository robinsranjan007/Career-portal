import Profile from "../models/Profile.js"


export const createProfile =async(req,res)=>{

    try {
        
        const { education, experience, skills, bio, address } = req.body

        if(!education|| !experience || !skills ||!bio ||!address)
        {
    return res.status(400).json({
      message:"missing details",
      success:false 
    })
        }

        const profileData= await Profile.create({user:req.user.id,education,experience,skills,bio,address})

        if(!profileData)
        {
            return res.status(404).json({
      message:"failed to create profile",
      success:false
    }) 
        }

        return res.status(200).json({
            message:"successfully created",
            success:true,
            data:profileData
        })



    } catch (error) {
        return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
    }

}


export const getProfileById=async(req,res)=>{
try {
    const {profileId} = req.params

 const profileDetails = await Profile.findOne({ user: profileId })

    if(!profileDetails)
    {
       return res.status(404).json({
      message:"missing details",
      success:false
    })   
    }

    return  res.status(200).json({
            message:"profile detauls",
            success:true,
            data:profileDetails
        })


} catch (error) {
     return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
}




}



export const updateProfile=async(req,res)=>{

try {
 const {profileId} = req.params
 const   { education, experience, skills, bio, address } = req.body


 const updatedProfile = await Profile.findByIdAndUpdate(profileId, { education, experience, skills, bio, address },{new:true})

 if(!updatedProfile)
 {
 return res.status(400).json({
      message:"no profile exist",
      success:false
    })
 }

  return res.status(200).json({
      message:"successfully updated",
      success:true,
      data:updatedProfile
    })
  
    


} catch (error) {
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
}

    
}


export const deleteProfile= async(req,res)=>{

try {
    
    const {profileId} = req.params

    const deletedProfile= await Profile.findByIdAndDelete(profileId)

    if(!deletedProfile)
    {
         return res.status(400).json({
      message:"no profile found",
      success:false
    })
    }

    return res.status(200).json({
            message:"successfully deleted",
            success:true
        })



} catch (error) {
    

 return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
}

}

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Profile found",
      success: true,
      data: profile
    })
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    })
  }
}

export const updateProfilePhoto = async (req, res) => {
  try {
    const { profileId } = req.params
    const profilePhoto = req.file.path  // Cloudinary URL automatically aata hai
    
    const profile = await Profile.findByIdAndUpdate(
      profileId, 
      { profilePhoto }, 
      { new: true }
    )
    return res.status(200).json({ success: true, data: profile })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const updateResume = async (req, res) => {
  try {
    const { profileId } = req.params
    
    
    const resume = req.file.path 
    
    const profile = await Profile.findByIdAndUpdate(profileId, { resume }, { new: true })
    return res.status(200).json({ success: true, data: profile })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}