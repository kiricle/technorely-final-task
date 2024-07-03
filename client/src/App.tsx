import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { Layout } from './Layout/Layout';
import { CompaniesPage } from './pages/CompaniesPage/CompaniesPage';
import { CompanyPage } from './pages/CompanyPage/CompanyPage';

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
                        path="/companies"
                        element={<CompaniesPage />}
                    />
                    <Route
                        path="/companies/:name"
                        element={<CompanyPage />}
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
