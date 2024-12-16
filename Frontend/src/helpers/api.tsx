import axios from "axios";



const api = axios.create({
  baseURL: "http://localhost:8888/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const logInUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  console.log("Before API call");
  const res = await api.get("/user/auth-status");
  console.log("After API call");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return res.data;
};