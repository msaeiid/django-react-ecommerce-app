import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <header className='py-5' style={{ backgroundColor: '#6050DC' }}>
            <div className='container px-4 px-lg-5 my-5'>
                <div className='text-center text-white'>
                    <h2 className='display-4 fw-bold text-warning'>Payment Failed</h2>
                    <p className='lead fw-normal text-white-75 mb-4'>Oops! Something went wrong with your payment.</p>
                    <span>
                        <Link to='/checkout' className='btn btn-light btn-lg px-4 py-2 mx-3'>Try Again</Link>
                        <Link to='#contact' className='btn btn-light btn-lg px-4 py-2 mx-3'>Contact Support</Link>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default PaymentFailed;