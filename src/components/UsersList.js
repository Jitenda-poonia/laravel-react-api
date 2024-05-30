import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setTimeout(() => setSuccessMessage(''), 2000);
        }
        fetchUsers();
    }, [location.state]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data);
        } catch (error) {
            setErrorMessage('Failed to fetch users. Please try again.');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`);
            fetchUsers();
            setSuccessMessage('User deleted successfully.');
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            setErrorMessage('Failed to delete user. Please try again.');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    return (
        <div>
            <h1>Users List</h1>
            <Link to="/add">Add User</Link>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <table border='1' cellSpacing='0'>
                <thead>
                    <tr>
                        <th>SR.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`}>Edit</Link> ||
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
