import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { PrivatePage } from './pages/PrivatePage/PrivatePage';
import { SignInPage } from './pages/SignInPage/SignInPage';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/sign-up"
                    element={<RegisterPage />}
                />
                <Route
                    path="/sign-in"
                    element={<SignInPage />}
                />
                <Route
                    path="/private"
                    element={<PrivatePage />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/sign-up" />}
                />
            </Routes>
        </>
    );
}

export default App;
