// services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addCourse = async (course: any) => {
  return await axios.post(`${API_URL}/courses`, course);
};

export const addLecturer = async (lecturer: any) => {
  return await axios.post(`${API_URL}/lecturers`, lecturer);
};

export const addHall = async (hall: any) => {
  return await axios.post(`${API_URL}/halls`, hall);
};

export const generateTimetable = async (data: any) => {
  return await axios.post(`${API_URL}/generate-timetable`, data);
};

export const getTimetable = async () => {
  return await axios.get(`${API_URL}/timetable`);
};

// Add other API calls as needed
