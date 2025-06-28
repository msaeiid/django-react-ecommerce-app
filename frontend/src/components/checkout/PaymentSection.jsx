import React from 'react'
// import styles from './PaymentSection.module.css'
import { loadStripe } from '@stripe/stripe-js';
import api from '../../Api'
import { toast } from 'react-toastify'



const PaymentSection = ({ setLoadingPayment }) => {

    const handleCheckoutStripe = async () => {
        setLoadingPayment(true)
        try {
            const res = await api.post('payment/stripe/', { card_code: localStorage.getItem('card_code') });
            const data = res.data;
            toast.success('Redirecting to Stripe for payment.')
            const stripe = await loadStripe(data.publishable_key);
            // setLoadingPayment(false)
            stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            toast.error(error);
            setLoadingPayment(false)
        }
    };


    const handleCheckoutPaypal = async () => {
        try {
            const res = await api.post('payment/paypal/', { card_code: localStorage.getItem('card_code') })
            if (res.data.approval_url) {
                toast.success('Redirecting to PayPal for payment.')
                window.location.href = res.data.approval_url;
            }
            else {
                toast.error('Error creating PayPal payment.');
            }
        }
        catch (error) {
            toast.error(error);
        }

    };

    return (
        <div className='col-md-4'>
            <div className={`card ${StyleSheet.card}`}>
                <div className='card-header' style={{ backgroundColor: '#6050DC', color: 'white' }}>
                    <h5>Payment Method</h5>
                </div>
                <div className='card-body'>
                    <button className={`btn btn-primary w-100 mb-3 ${StyleSheet.paypalButton}`}
                        id='paypal-button'
                        onClick={handleCheckoutPaypal}
                    >
                        <i className='bi bi-paypal'></i>Pay with PayPal
                    </button>
                    <button className={`btn btn-warning w-100 text-white ${StyleSheet.stripeButton}`}
                        id='stripe-button'
                        onClick={handleCheckoutStripe}
                    >
                        <i className='bi bi-credit-card'></i>Pay with Stripe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSection