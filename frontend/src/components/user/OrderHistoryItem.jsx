import React from 'react'
import styles from './OrderHistoryItem.module.css'
import { BASE_URL } from '../../Api'
import { FormatDate, FormatTime } from '../../FormatDate'

const OrderHistoryItem = ({ item }) => {

    return (
        <div className='card-body'>
            <div className={`order-item mb-3 ${styles.orderItem}`}>
                <div className='row'>
                    <div className='col-md-2'>
                        <img
                            src={`${BASE_URL}${item.product.image}`}
                            alt={`${item.product.name}`}
                            className='img-fluid'
                            style={{ borderRadius: '5px' }}
                        />
                    </div>
                    <div className='col-md-6'>
                        <h6>{`${item.product.name}`}</h6>
                        <p className='text-muted'>{`Order Date: ${FormatDate(item.order_date)} ${FormatTime(item.order_date)}`}</p>
                        <p className='text-muted'>Order ID: {`${item.order_id}`}</p>
                    </div>
                    <div className='col-md-2 text-center'>
                        <h6 className='text-muted'>{`Quantity: ${item.quantity}`}</h6>
                    </div>
                    <div className='col-md-2 text-center'>
                        <h6 className='text-muted'>{`$${item.product.price}`}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryItem