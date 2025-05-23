import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/Auth/RegisterPage';
import LoginPage from './Pages/Auth/LoginPage';
import DashBoard from './Pages/admin/DashBoard';
import { useAuth } from './context/AuthContext';
import AccountPage from './Pages/Auth/AccountPage';
import BookingPage from './Pages/BookingPage';

function App() {
  const { isAdmin, isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/account" element={isAuthenticated ? <AccountPage /> : <Navigate to={'/'} />} />
        <Route path="/account" >
          <Route path="admin" element={isAdmin ? <DashBoard /> : <Navigate to={'/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;