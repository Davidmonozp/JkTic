import React from 'react';
import Nabvar from '../components/Navbar';
import TaskList from '../pages/tasks/TaskList';

const Dashboard = () => {

  


  return (
    <div>
        <Nabvar/>
      <TaskList/>
    </div>
  );
};

export default Dashboard;














// // src/pages/Dashboard.jsx
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import '../styles/dashboard.css';

// const Dashboard = () => {
//   const { handleLogout } = useContext(AuthContext);  // Accedemos a la función handleLogout desde el contexto

//   return (
//     <div>
//       <h1 className="white-text">Hola Mundo</h1>

//       {/* Botón de logout */}
//       <button 
//         className="btn btn-danger"  // Estiliza el botón como un botón de peligro (rojo)
//         onClick={handleLogout}     // Llama a handleLogout cuando se hace click
//       >
//         Cerrar sesión
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
