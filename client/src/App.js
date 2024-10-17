import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Book from './components/Book';

function App () {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Register /> } />
        <Route path='/forgot-password' element={ <ForgetPassword /> } />
        <Route path='/forgot-password' element={ <ResetPassword /> } />
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Navigate to="dashboard" replace /> } />
          <Route path='dashboard' element={ <Dashboard /> } />
          <Route path='profile' element={ <Profile /> } />
          <Route path='books' element={ <Book /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
