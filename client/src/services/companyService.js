import Api from "@/utils/axiosInstance";


export const createCompany = async (data) => {
    const res = await Api.post('/company', data)
    return res.data
}
export const getAllCompany = async () => {
    const res = await Api.get('/company')
    return res.data
}

export const getCompanyById = async (companyId) => {
    const res = await Api.get(`/company/${companyId}`)
    return res.data
}
export const updateCompany = async (data,companyId) => {
    const res = await Api.put(`/company/${companyId}`, data)
    return res.data
}
export const deleteCompany = async (companyId) => {
    const res = await Api.delete(`/company/${companyId}`)
    return res.data
}