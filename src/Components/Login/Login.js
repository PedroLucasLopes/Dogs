import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import LoginCreate from './LoginCreate/LoginCreate';
import LoginLost from './LoginLost/LoginLost';
import LoginReset from './LoginReset/LoginReset';
import NotFound from '../NotFound/NotFound';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';

const Login = () => {
    const { login } = React.useContext(UserContext);

    if (login) return <Navigate to='/conta' />;
    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                    <Route path='criar' element={<LoginCreate />} />
                    <Route path='perdeu' element={<LoginLost />} />
                    <Route path='reset' element={<LoginReset />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </section>
    )
}

export default Login;
