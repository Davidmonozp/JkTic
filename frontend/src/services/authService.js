import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';  // La URL base de tu API

// Función para registrar al usuario
export const registerUser = async (name, email, password, password_confirmation) => {
    try {
      // Realizamos la solicitud POST para registrar al usuario
      const response = await axios.post(`${API_URL}/register`, { 
        name, 
        email, 
        password, 
        password_confirmation  
      });
  
      const { token } = response.data;  
  
      // Guardamos tanto el token como los datos del usuario en localStorage
      localStorage.setItem('token', token);
  
      return token;  
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error; 
    }
  };
  
// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    // Realizamos la solicitud POST para iniciar sesión
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, user } = response.data;  

    // Guardamos tanto el token como los datos del usuario en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));  

    return token;  
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;  
  }
};

// Función para obtener los datos del usuario desde el localStorage
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Función para obtener el token desde el localStorage
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};




