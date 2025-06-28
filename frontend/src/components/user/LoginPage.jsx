import React, { useState, useContext } from 'react'
import './LoginPage.css'; // Assuming you have a CSS file for styling
import api from '../../Api'; // Adjust the import path as necessary
import Error from '../ui/Error'; // Assuming you have an Error component for displaying errors
import { useLocation, useNavigate } from 'react-router-dom'; // Importing hooks for navigation and location handling
import { AuthContext } from '../context/AuthContext';


const LoginPage = () => {
    const { setIsAuthenticated, get_user } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const credentials = {
        username: username,
        password: password
    };

    function handleLogin(event) {
        setLoading(true);
        event.preventDefault();
        api.post('api/token/', credentials).then((response) => {
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setLoading(false);
            setError(null);
            setUsername('');
            setPassword('');
            get_user(); // Fetch user profile after successful login
            setIsAuthenticated(true);


            const from = location?.state?.from.pathname || '/';
            navigate(from, { replace: true });
        })
            .catch((error) => {
                setError(error.message);
                if (error.response.status === 401) {
                    setError('Invalid username or password');
                }
                setLoading(false);
                setUsername('');
                setPassword('');
            });
    }

    return (
        <div className="login-container my-5">
            <div className="login-card shadow">
                {error && <Error error={error} />}
                <h2 className="login-title">Welcome back</h2>
                <p className='login-subtitle'>Please login to your account</p>
                <form onSubmit={(e) => { handleLogin(e) }}>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input type='username'
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            className='form-control' id='email' placeholder='Enter your username' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className='form-control' id='password' placeholder='Enter your password' required />
                    </div>
                    <button type='submit'
                        disabled={loading}
                        className='btn btn-primary w-100'>Login</button>
                </form>
                <div className='login-footer'>
                    <p><a href='#'>Forgot Password?</a></p>
                    <p>Don't have an account? <a href='#'>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage