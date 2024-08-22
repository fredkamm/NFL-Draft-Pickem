import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);

  const handleLogout = () => {
    Auth.logout();
    setLoggedIn(false); // Update the state to trigger a re-render
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {loggedIn ? (
            <>
              <li>
                <Link to={`/entries/${Auth.getProfile().username}`}>Entries</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
