import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Register from './components/auth/Register';
import Layout from './components/layout/Layout';
import Dashboard from './components/layout/dashboard/Dashboard';
import Profile from './components/layout/profile/Profile';
import UpdateProfile from './components/layout/profile/UpdateProfile';
import BookList from './components/layout/book/BookList';
import BookDetail from './components/layout/book/BookDetail';
import BorrowedBooks from './components/layout/book/BorrowBook';

function App () {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Register /> } />
        <Route path='/forgot-password' element={ <ForgetPassword /> } />
        <Route path='/reset-password' element={ <ResetPassword /> } />
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Navigate to="dashboard" replace /> } />
          <Route path='dashboard' element={ <Dashboard /> } />
          <Route path='profile' element={ <Profile /> } />
          <Route path='update-profile' element={ <UpdateProfile /> } />
          <Route path="/books" element={ <BookList /> } />
          <Route path="/books/:id" element={ <BookDetail /> } />
          <Route path="/borrowed" element={ <BorrowedBooks /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
