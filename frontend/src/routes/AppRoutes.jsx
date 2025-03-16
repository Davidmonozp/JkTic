// src/AppRoutes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AddTask from '../pages/tasks/AddTask';
import TaskList from '../pages/tasks/TaskList';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      
      
      <Route path="/dashboard" element={<Dashboard />} />
      
     
      <Route path="/addtask" element={<AddTask />} />
      
      
      <Route path="/task-list" element={<TaskList />} />
      
     
      <Route path="/login" element={<Login />} />
      

      <Route path="/register" element={<Register />} />
     
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
