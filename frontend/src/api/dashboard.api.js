import api from "./axios";

export const getDashboard = () => api.get("/dashboard");
export const getReferralTree = () => api.get("/referrals/tree");
export const getDailyROI = () => api.get("investments/roi/daily");