import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import User from '../Components/User/User';

const ProtectedRoute = () => {
    const { login } = React.useContext(UserContext);

    if (login === true) return (
        <Routes>
            <Route path='*' element={<User />} />
        </Routes>
    )
    else if (login === false) return <Navigate to='/login' />;
    else return null;
}

export default ProtectedRoute;
