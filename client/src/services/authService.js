import Api from "@/utils/axiosInstance";
 

export const register = async (data) => {
  try {
    const res = await Api.post("auth/register", data);

    return res.data;
  } catch (error) {
   throw error.response?.data?.message || error.message || "Something went wrong"
  }
};


export const login= async(data)=>{
try {
    const res= await Api.post('auth/login',data)
    return res.data
} catch (error) {
    throw error.response?.data?.message || error.message || "Something went wrong"
}
}

export const logout= async(data)=>{
    try {
    const res= await Api.post('auth/logout',data)
    return res.data
} catch (error) {
    throw error.response?.data?.message || error.message || "Something went wrong"

}
}

export const getAllUsers = async()=>{
    try {
        const res= await Api.get('auth/users')
        return res.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Something went wrong"

    }
}

export const deleteUsers= async(userId)=>{
    try {
        const res= await Api.delete(`auth/${userId}`)
        return res.data
    } catch (error) {
        throw error.response?.data?.message || error.message || "Something went wrong"

    }
}