import axios from 'axios';

const API_URL = 'http://localhost:5000/api/exercises';

export const getExercises = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createExercise = async (exerciseData) => {
    const response = await axios.post(API_URL, exerciseData);
    return response.data;
}