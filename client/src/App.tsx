import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { PrivatePage } from './pages/PrivatePage/PrivatePage';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/login"
                    element={<h1>Login</h1>}
                />
                <Route path='/private' element={<PrivatePage />} />
                <Route
                    path="*"
                    element={<Navigate to="/register" />}
                />
            </Routes>
        </>
    );
}

export default App;
