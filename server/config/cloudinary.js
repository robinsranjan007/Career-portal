import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


const profilePhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'careerportal/profile-photos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: `photo_${req.params.profileId}`,
  }),
})

// Resume storage
const resumeStorage = new CloudinaryStorage({
  cloudinary,
 params: async (req, file) => ({
    folder: 'careerportal/resumes',
    allowed_formats: ['pdf'],
    resource_type: 'image',
    public_id: `resume_${req.params.profileId}`,  
    access_mode: 'public',
  }),
})

export const uploadProfilePhoto = multer({ storage: profilePhotoStorage })
export const uploadResume = multer({ storage: resumeStorage })