
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res,next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "No access token",
        success: false,
      });
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESSTOKEN_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const authorizedMiddleware= async(req,res,next)=>{

try {

    if(req.user.role!="admin")
    {
      return  res.status(400).json({
            message:"Not authorized",
            success:false
        })
    }
next()


} catch (error) {
    return  res.status(500).json({
            message:"server error",
            success:false
        })
}



}