import axios from "axios";

const API = "https://student-management-1-a7x3.onrender.com/students";

export const getStudents = (params = {}) => axios.get(API, { params });
export const getStudent = (id) => axios.get(`${API}/${id}`);
export const createStudent = (data) => axios.post(API, data);
export const updateStudent = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);