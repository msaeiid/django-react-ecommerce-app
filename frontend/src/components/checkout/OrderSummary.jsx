import React from 'react'
import OrderItem from './OrderItem'
import styles from './OrderSummary.module.css'

const OrderSummary = ({ items, cardTotal, tax }) => {

    const totalWithTax = cardTotal
    return (
        <div className='col-md-8'>
            <div className={`card mb-4 ${styles.card}`}>
                <div className='card-header' style={{ backgroundColor: '#6050DC', color: 'white' }}>
                    <h5>Card Summary</h5>
                </div>
                <div className='card-body'>
                    <div className='px-3' style={{ height: '300px', overflowY: 'auto' }}>
                        {items.map((item, index) => <OrderItem key={item.id} item={item} />)}
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h6 className='mb-0'>Total</h6>
                        <h6 className='mb-0'>{`$${totalWithTax.toFixed(2)}`}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary