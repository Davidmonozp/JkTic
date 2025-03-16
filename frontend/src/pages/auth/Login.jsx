

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/authService';  
import Swal from 'sweetalert2';  
import '../../styles/login-register.css';  

const Login = () => {
  const navigate = useNavigate();

  // Validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo inválido')
      .required('El correo es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,  
    onSubmit: async (values) => {
      try {
        // Llamamos al servicio de autenticación con las credenciales
        const token = await loginUser(values.email, values.password);
        localStorage.setItem('token', token); 
        navigate('/dashboard'); 
      } catch {
        Swal.fire('Error', 'Las credenciales son incorrectas', 'error');  
      }
    },
  });

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">Iniciar Sesión</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Correo electrónico"
                className="form-control"
              />
              {/* Muestra el error en blanco si existe */}
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Contraseña"
                className="form-control"
              />
              {/* Muestra el error en blanco si existe */}
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{' '}
            <a href="/register">Crear cuenta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



