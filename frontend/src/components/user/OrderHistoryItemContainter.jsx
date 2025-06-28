import OrderHistoryItem from './OrderHistoryItem'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const OrderHistoryItemContainter = () => {
    const { user } = useContext(AuthContext)
    const items = user?.items || []

    return (
        <div className='row' style={{ height: '300px', overflow: 'auto' }}>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'
                        style={{ backgroundColor: '#5060DC', color: 'white' }}>
                        <h5 className='mb-0'>Order History</h5>
                    </div>
                    {items.map((item) => <OrderHistoryItem key={item.id} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryItemContainter