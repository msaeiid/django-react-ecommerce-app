import React from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainter from './OrderHistoryItemContainter'


const UserProfilePage = () => {
    return (
        <div className='container my-5'>
            <UserInfo />
            <OrderHistoryItemContainter />
        </div>
    )
}

export default UserProfilePage