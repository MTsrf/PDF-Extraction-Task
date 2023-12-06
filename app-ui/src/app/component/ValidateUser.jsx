import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
const ValidateUser = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const { pathname } = useLocation();
    return (
        <>
            {!isAuthenticated ?
                (children)
                : (
                    <Navigate replace to="/view/default" state={{ from: pathname }} />
                )
            }

        </>
    )
}

export default ValidateUser
