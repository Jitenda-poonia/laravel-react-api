import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
        </div>
    );
}

export default App;
