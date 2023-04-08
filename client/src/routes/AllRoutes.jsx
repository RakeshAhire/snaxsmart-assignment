import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes'
import Dashboard from '../pages/Dashboard';
import Machine from '../pages/Machine';
import Employee from '../pages/Employee';
const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/machines' element={<Machine />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            <Route path='/dashboard' element={<PrivateRoutes><Dashboard /></PrivateRoutes>}></Route>
        </Routes>
    )
}

export default AllRoutes;
