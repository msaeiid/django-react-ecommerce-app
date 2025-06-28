import React, { useState } from 'react'
import OrderSummary from './OrderSummary';
import PaymentSection from './PaymentSection';
import useCardData from '../../hooks/useCardData';
import Spinner from '../ui/Spinner'




const CheckoutPage = ({ setNumberOfItems }) => {

    const { card, loading, items, cardTotal, dataFetched, setCard, setCardTotal, setItems, tax } = useCardData({ setNumberOfItems })

    const [loadingPayment, setLoadingPayment] = useState(false)

    if (loadingPayment) {
        return <Spinner loading={loadingPayment} />
    }

    return (
        <div className='container my-3'>

            <div className='row'>
                <OrderSummary items={items} cardTotal={cardTotal} tax={tax} />
                <PaymentSection setLoadingPayment={setLoadingPayment} />
            </div>
        </div>
    )
}

export default CheckoutPage