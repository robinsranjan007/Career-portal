import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { name, email, contactNumber, password, role } =
      req.body;

    if (
      !name ||
      !email ||
      !contactNumber ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "please provide the missing field",
        success: false,
      });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        message: "Email exist",
        success: false,
      });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        message: "Password is too short",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      contactNumber,
      password,
      role,
    };

    const userData = await User.create({ ...user, password: hashedpassword });

    return res.status(201).json({
      success:true,  
      message: "successfully register",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const login =async(req,res)=>{

    const {email,password} = req.body
try {
    
    
    if(!email || !password){
 return res.status(400).json({
        message: "please enter the credentials",
        success: false,
      });

    }

    const user = await User.findOne({email})

    if(!user)
    {
         return res.status(400).json({
        message: "Please register, email not found",
        success: false,
      });
    }

    const hashedpassword = user.password

    const validPassword=await bcrypt.compare(password,hashedpassword)

    if(!validPassword)
    {
         return res.status(400).json({
        message: "Password is wrong",
        success: false,
      });
    }

const accessToken= jwt.sign(
    {id:user._id,role:user.role},
    process.env.SECRET_ACCESSTOKEN_KEY,
    {expiresIn:"15m"}
)


const refreshToken = jwt.sign(
    {id:user._id,role:user.role},
    process.env.SECRET_REFRESHTOKEN_KEY,
    {expiresIn:"7d"}
)

return res.status(200).cookie('refreshToken',refreshToken,{
       httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
}).cookie("accessToken",accessToken,{  httpOnly: true,
    secure: false, 
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000  }).json({
   message:"Login Successfull",
   success:true,
   data:{
    id:user._id,
    name:user.name,
    email:user.email,
    role:user.role
   }
})



} catch (error) {
    
return res.status(500).json({
    message:"server error",
    success:false
})

}

}


export const logout = async(req,res)=>{

try {
    
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
}
    res.clearCookie("accessToken",cookieOptions) 
    res.clearCookie("refreshToken",cookieOptions) 
     return res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });


} catch (error) {
        
return res.status(500).json({
    message:"server error",
    success:false
})
}


}


export const refreshToken = async(req,res)=>{
    try {
        
const token = req.cookies.refreshToken

if(!token)
{
     return res.status(401).json({
        message: "No refresh token",
        success: false,
      });
}


const decode = jwt.verify(token,process.env.SECRET_REFRESHTOKEN_KEY)

const accessToken=jwt.sign({
    id:decode.id,role:decode.role
},process.env.SECRET_ACCESSTOKEN_KEY,{expiresIn:"15m"})

 return res.status(200).cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    }).json({
      message: "Token refreshed",
      success: true,
    });



    } catch (error) {
        
 return res.status(401).json({
      message: "Invalid refresh token",
      success: false,
    });

    }
}

export const getMe= async(req,res)=>{
  try {
    
const user = await User.findById(req.user.id).select("-password")
return res.status(200).json({
  success:true,
  data:user
})

  } catch (error) {
    
return res.status(500).json({ success: false, message: "Server error" })

  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    return res.status(200).json({ success: true, data: users })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findByIdAndDelete(userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    return res.status(200).json({ success: true, message: "User deleted" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" })
  }
}