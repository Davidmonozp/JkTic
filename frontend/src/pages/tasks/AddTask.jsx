// src/pages/tasks/AddTask.jsx
import React, { useState } from 'react';
import { addTask } from '../../services/taskService'; 
import { useNavigate } from 'react-router-dom';  
import Swal from 'sweetalert2';  
import Nabvar from '../../components/Navbar';
import '../../styles/addTask.css';

const AddTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();  

        // Recuperar el token de localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No hay token de autenticación. Por favor, inicie sesión.');
            return;
        }

        // Validar datos
        if (!name || !description) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        const taskData = { name, description };

        try {
            // Llamar a la función para agregar la tarea
            const response = await addTask(token, taskData);
            setMessage(response.message);  
            setName('');  // Limpiar los campos del formulario
            setDescription('');

            
            navigate('/dashboard'); 

          
            Swal.fire({
                icon: 'success',
                title: '¡Tarea agregada con éxito!',
                text: 'La tarea ha sido agregada correctamente.',
                confirmButtonText: 'Aceptar'
            });
        } catch {
            setError('Error al agregar la tarea. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Nabvar />

            <div className='addTask'>
                <h1>Agregar Nueva Tarea</h1>

                {/* Mostrar mensajes de error o éxito */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de la tarea:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ingrese el nombre de la tarea"
                        />
                    </div>

                    <div>
                        <label>Descripción de la tarea:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ingrese la descripción de la tarea"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar Tarea'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
