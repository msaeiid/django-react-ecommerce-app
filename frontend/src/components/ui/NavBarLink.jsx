import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const NavBarLink = () => {

    const { isAuthenticated, user, setIsAuthenticated } = useContext(AuthContext);

    function handleLogout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
    }

    return (
        // NavLink automatically applies the "active" class when the current URL matches the "to" prop.
        // The "isActive" property provided by NavLink can be used to conditionally apply styles or classes.
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ?
                <>
                    <li className="nav-item">
                        <NavLink to='/profile'
                            className={({ isActive }) =>
                                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}>
                            Hi, {user?.first_name}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to='/'
                            onClick={handleLogout}
                            className={({ isActive }) =>
                                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}>
                            Logout
                        </NavLink>
                    </li>
                </>
                :
                <>
                    <li className="nav-item">
                        <NavLink
                            to='/login'
                            className={({ isActive }) =>
                                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}>
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/register'
                            className={({ isActive }) =>
                                isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}>
                            Register
                        </NavLink>
                    </li>
                </>
            }
        </ul>
    )
}

export default NavBarLink