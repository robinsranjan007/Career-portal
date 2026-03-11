import Api from "@/utils/axiosInstance";


export const applyJob = async (jobId) => {
    const res = await Api.post(`/application/${jobId}`)
    return res.data
}
export const getMyApplication = async () => {
    const res = await Api.get('/application')
    return res.data
}

export const getJobApplication = async (jobId) => {
    const res = await Api.get(`/application/${jobId}`)
    return res.data
}
export const updateApplication = async (data,applicationId) => {
    const res = await Api.put(`/application/${applicationId}`, data)
    return res.data
}
export const deleteApplicaiton = async (applicationId) => {
    const res = await Api.delete(`/application/${applicationId}`)
    return res.data
}