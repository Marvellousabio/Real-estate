import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL,});

export const createProperty= (propertyData)=>API.post("/properties",propertyData);

export const getProperties = (filters={})=>API.get("/properties",{params:filters});