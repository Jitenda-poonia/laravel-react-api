import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            // Optionally set password if it is provided by the API response
            // setPassword(response.data.password || '');
        } catch (error) {
            setErrors({ general: 'Failed to fetch user details. Please try again.' });
            setTimeout(() => setErrors({}), 2000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.put(`http://localhost:8000/api/users/${id}`, { name, email, password });
            navigate('/', { state: { successMessage: 'User updated successfully.' } });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Failed to update user. Please try again.' });
            }
            setTimeout(() => setErrors({}), 2000);
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
