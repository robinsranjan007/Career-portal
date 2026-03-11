import Api from "@/utils/axiosInstance";


export const createProfile = async (data) => {
    const res = await Api.post('/profile', data)
    return res.data
}
export const getAllProfile = async () => {
    const res = await Api.get('/profile')
    return res.data
}

export const getProfileById = async (profileId) => {
    const res = await Api.get(`/profile/${profileId}`)
    return res.data
}
export const updateProfile = async (data,profileId) => {
    const res = await Api.put(`/profile/${profileId}`, data)
    return res.data
}
export const deleteProfile = async (profileId) => {
    const res = await Api.delete(`/profile/${profileId}`)
    return res.data
}