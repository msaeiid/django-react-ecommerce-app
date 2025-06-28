import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import NavBarLink from './NavBarLink'

const NavBar = (numberOfItems) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
      <div className="container" >
        <Link className="navbar-brand fw-bold text-uppercase" to="/">SHOPPIT</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarConvent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink />
          <Link to="/card" className={`btn btn-dark ms-3 rounder-pill position-relative ${styles.responsiveCart}`}>
            <FaCartShopping />
            {numberOfItems.numberOfItems > 0  ? 
            <span className='postion-absolute top-0 start-100 translate-middle badge rounded-pill'
              style={{ fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#6050DC' }}>
              {numberOfItems.numberOfItems}
            </span> : null}

          </Link>
        </div>
      </div>
    </nav >
  )
}

export default NavBar