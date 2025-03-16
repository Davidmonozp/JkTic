// src/services/taskService.js
import axios from 'axios';

// URL de la API (ajustar según tu configuración)
const API_URL = 'http://127.0.0.1:8000/api/tasks'; 

// Obtener tareas
export const getTasks = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
    return response.data[0]; 
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};


// Agregar tarea
export const addTask = async (token, taskData) => {
    try {
      const response = await axios.post(API_URL, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      throw error;
    }
  };

  export const deleteTask = async (taskId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch  {
      throw new Error('Error al eliminar la tarea');
    }
  };
