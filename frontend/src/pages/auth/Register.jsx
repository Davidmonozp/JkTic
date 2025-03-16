import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../services/authService';  // Función para registrar al usuario
import Swal from 'sweetalert2';  // Librería para mostrar alertas
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import '../../styles/login-register.css'

const Register = () => {
  
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es obligatorio'),
      email: Yup.string()
        .email('Correo inválido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de la contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      try {
        // Llamar al servicio de registro del usuario
        await registerUser(values.name, values.email, values.password, values.password_confirmation);
        
      
        Swal.fire('¡Éxito!', 'Usuario registrado correctamente', 'success');

       
        navigate('/login');  

      } catch  {
        
        Swal.fire('Error', 'Hubo un error al registrar el usuario', 'error');
      }
    },
  });

  return (
    <div className="register-container">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">Registrar Cuenta</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre"
                className="form-control"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-message">{formik.errors.name}</div>
              )}
            </div>

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
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirmar Contraseña"
                className="form-control"
              />
              {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                <div className="error-message">{formik.errors.password_confirmation}</div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>

          <p className="mt-3 text-center">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
