import axios from 'axios';
import getConfig from "../config/getConfig";

const BEARER = "Bearer";
const axiosInstance = axios.create({
  baseURL: getConfig("backendUrl"),
  headers: {
    Accept: "application/json",
  },
});
  
export const get = async (url, authToken) => {
  try {
    const response = await axiosInstance.get(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${BEARER} ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error();
  }
};

export const post = async (url, data, authToken) => {
  try {
    const response = await axiosInstance.post(`${url}`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const register = async (formData) => {
  try {
    const response = await axiosInstance.post(`/users`, formData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};