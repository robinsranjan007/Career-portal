import Api from "@/utils/axiosInstance";


export const createJob = async (data) => {
    const res = await Api.post('/job', data)
    return res.data
}
export const getAllJob = async () => {
    const res = await Api.get('/job')
    return res.data
}
export const getJobById = async (jobId) => {
    const res = await Api.get(`/job/${jobId}`)
    return res.data
}
export const updateJob = async (data,jobId) => {
    const res = await Api.put(`/job/${jobId}`, data)
    return res.data
}
export const deleteJob = async (jobId) => {
    const res = await Api.delete(`/job/${jobId}`)
    return res.data
}
export const getMyJobs = async () => {
  const res = await Api.get("/job/my-jobs")
  return res.data
}
