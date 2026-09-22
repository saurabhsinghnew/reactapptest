import axios from "axios";

const API_URL = "https://localhost:7246/api/Values/GetEmployee"; // replace with your hosted API

export const getEmployees = () => axios.get(API_URL);
export const createEmployee = (employee) => axios.post(API_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
