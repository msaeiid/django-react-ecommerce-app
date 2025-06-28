import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    useState(() => {
        localStorage.removeItem('card_code')
    })
    return (
        <header className='py-5' style={{ backgroundColor: '#6050DC' }}>
            <div className='container px-4 px-lg-5 my-5'>
                <div className='text-center text-white'>
                    <h2 className='display-4 fw-bold'>Payment Successful</h2>
                    <p className='lead fw-normal text-white-75 mb-4'>
                        Your payment has been successfully verified. Thank you for your purchase!
                    </p>
                    <span>
                        <Link to='/profile' className='btn btn-light btn-lg px-4 py-2 mx-3'>Order Details</Link>
                        <Link to='/' className='btn btn-light btn-lg px-4 py-2 mx-3'>Continue Shopping</Link>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default PaymentSuccess;