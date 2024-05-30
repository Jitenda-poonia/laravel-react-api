import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post('http://localhost:8000/api/users', { name, email, password });
            navigate('/', { state: { successMessage: 'User added successfully.' } });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Failed to add user. Please try again.' });
            }
        }
    };

    return (
        <div>
            <h1>Add User</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddUser;
