import React from 'react'
import NavBar from '../ui/NavBar.jsx'
import Footer from '../ui/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


const MainLayout = ({ numberOfItems }) => {

    return (
        <>
            <NavBar numberOfItems={numberOfItems} />
            <ToastContainer />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout