import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../../services/taskService';
import { Link } from 'react-router-dom';  
import { FaTrash } from 'react-icons/fa';  
import Swal from 'sweetalert2';  
import '../../styles/taskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);   
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación. Por favor, inicie sesión.');
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const taskData = await getTasks(token);
        setTasks(taskData);
      } catch (err) {
        setError('No se pudieron obtener las tareas. Error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Función para eliminar tarea
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación. Por favor, inicie sesión.');
      return;
    }

    // Mostrar confirmación con SweetAlert2
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta tarea se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
      
        await deleteTask(taskId, token);
        
        setTasks(tasks.filter((task) => task.id !== taskId));

      
        Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
      } catch (err) {
        setError('No se pudo eliminar la tarea. Error: ' + err.message);
        Swal.fire('Error', 'Hubo un problema al eliminar la tarea.', 'error');
      }
    }
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className='list-task'>
      <h1 className='titulo'>Lista de Tareas JkTic</h1>

    
      {error && <p style={{ color: 'red' }}>{error}</p>}

     
      <Link to="/addtask">
        <button>Agregar Tarea</button>
      </Link>

    
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <div className="task-cards">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>

            
              <FaTrash 
                onClick={() => handleDelete(task.id)} 
                className="delete-icon" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
