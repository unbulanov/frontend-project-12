import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuth from './hooks/useAuth';
import routes from './routes';
import AuthProvider from './contexts/AuthContext';
import ChatApiProvider from './contexts/ChatContext'
import Navbar from './Components/Navbar';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ErrorPage from './Pages/ErrorPage';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

const App = ({ socket }) => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100 ">
        <Navbar />
        <Routes>
          <Route
            path={routes.mainPage()}
            element={(
              <ChatApiProvider socket={socket}>
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              </ChatApiProvider>
          )}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SignUpPage />} />
          <Route path={routes.errorPage()} element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);

export default App;
