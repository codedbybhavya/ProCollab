import api from "./axios";

export const loginUser = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};
