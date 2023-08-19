import React from "react";
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { Navbar, } from 'react-bootstrap';
import useAuth from "./Hooks/index.jsx";
import AuthProvider from './Contexts/AuthContext.jsx';
import routes from './routes.js';
import LoginPage from './Components/LoginPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100 ">
        <Navbar />
        <Routes>
          <Route
            path={routes.mainPage()}
            element={(null)}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);
  
  export default App;