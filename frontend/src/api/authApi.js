import API from "./axios";

export const loginUser = (email, password) => {
  return API.post("/auth/login", { email, password });
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};
