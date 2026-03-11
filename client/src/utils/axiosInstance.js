import axios from "axios";
 

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response, // success — seedha return

  async (error) => {
    const originalRequest = error.config;

    // 401 aaya aur retry nahi hua abhi tak
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh token se naya access token lo
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // original request dobara karo
        return Api(originalRequest);
      } catch (refreshError) {
        // refresh bhi fail — logout karo
        const { default: store } = await import("../redux/store");
        const { setLogout } = await import("../redux/slices/authSlice");
        store.dispatch(setLogout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;