
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Importamos el componente de rutas

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes /> 
        </BrowserRouter>
    );
};

export default App;

