import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PrivatePage } from './pages/PrivatePage/PrivatePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { Layout } from './Layout/Layout';

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
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
                </Route>
            </Routes>
        </>
    );
}

export default App;
