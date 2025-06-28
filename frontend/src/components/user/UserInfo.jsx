import React, { useContext } from 'react'
import styles from './UserInfo.module.css'
import pic from '../../assets/profile.png'
import { AuthContext } from '../context/AuthContext'
import { FormatDate, FormatTime } from '../../FormatDate'

const UserInfo = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className='row mb-4'>
            <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
                <img
                    src={user?.image || pic}
                    alt={`${user?.full_name}'s profile`}
                    className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`} />
                <h4 className='text-center'>{user?.full_name}</h4>
                <p className='text-muted'>{user?.email}</p>
                <button className='btn mt-2'
                    style={{ backgroundColor: '#6050DC', color: 'white' }}>
                    Edit Profile
                </button>
            </div>
            <div className='col-md-9'>
                <div className='card'>
                    <div className='card-header'
                        style={{ backgroundColor: '#6050DC', color: 'white' }}>
                        <h5 className='mb-0'>Account Overview</h5>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <p>
                                    <strong>Username:</strong> {user?.username || 'Not Set'}
                                </p>
                                <p>
                                    <strong>Full Name:</strong> {user?.full_name || 'Not Set'}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user?.email || 'Not Set'}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {user?.phone || 'Not Set'}
                                </p>
                            </div>
                            <div className='col-md-6'>
                                <p>
                                    <strong>City:</strong> {user?.city || 'Not Set'}
                                </p>
                                <p>
                                    <strong>County:</strong> {user?.state || 'Not Set'}
                                </p>
                                <p>
                                    <strong>Joined Date:</strong>{' '}
                                    {FormatDate(user?.last_login)}
                                </p>
                                <p>
                                    <strong>Joined Time:</strong>{' '}
                                    {FormatTime(user?.last_login)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo