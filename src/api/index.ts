import axios, { AxiosError } from "axios";
import { API } from "@/constants";

axios.defaults.baseURL = API;

const getToken = () => {
  return sessionStorage.getItem("token");
};

function handleAxiosError(error: AxiosError, text?: string) {
  if (error.response) {
    return text ? text : "Something went wrong. Try again later.";
  } else if (error.request) {
    return "No response from server!";
  } else {
    return "Request Error!";
  }
}

export const userHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const userAxios = axios.create({
  headers: userHeaders,
});

userAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// functions

export const loginUser = async (initData: string) => {
  try {
    const response = await userAxios.post(`/auth/telegram/login`, { initData });
    const {
      data: { accessToken },
      status,
    } = response;
    sessionStorage.setItem("token", `Bearer ${accessToken}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const checkUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(
      `/users/verify/telegramId/${telegramId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await userAxios.post("/users", data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const deleteUser = async () => {
  try {
    const response = await userAxios.delete("/user/delete");
    const { status } = response;
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const infoUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const updateUser = async (
  telegramId: number,
  data: { username: string | undefined; avatar: string }
) => {
  try {
    const response = await userAxios.put(`/users/${telegramId}`, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const spinController = async (telegramId: number, url: string) => {
  try {
    const response = await userAxios.get(
      `/users/${telegramId}/spinWheel${url}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};
