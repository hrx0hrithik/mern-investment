import api from "./axios";

export const createInvestment = (payload) =>
  api.post("/investments", payload);
