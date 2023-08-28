import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

// import PublicPage from './PublicPage.jsx';
import AuthContext from '../Contexts/index.jsx';
import useAuth from '../Hooks/index.jsx';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import ErrorPage from './ErrorPage.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
    <div className="d-flex flex-column h-100">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/public">Public page</Nav.Link>
          <Nav.Link as={Link} to="/private">Private page</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>
        <Routes>
          <Route path="/" element={null} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signUpPage()} element={<SignUpPage />} />
          <Route path={routes.errorPage()} element={<ErrorPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>

    </Router>
  </AuthProvider>
);

export default App;