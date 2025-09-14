import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL,});

export const createProperty= (propertyData)=>API.post("/properties",propertyData);

// Get properties with filters
export const getProperties = async (filters = {}) => {
  const res = await API.get("/properties", { params: filters });
  return res.data;
};
