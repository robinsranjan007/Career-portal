import Api from '@/utils/axiosInstance'

export const getStats = async () => {
  const res = await Api.get('/stats')
  return res.data
}