import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL,});

export const createProperty= (propertyData)=>API.post("/properties",propertyData);

export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await API.get(`/properties?${params.toString()}`);
  return res.data;
};