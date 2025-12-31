import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            console.log("hh");
        } catch (error) {
            console.log("Error in chechAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    
    signUp: async (data) => {
        set({ isSigningUp: true })
    }
}));

