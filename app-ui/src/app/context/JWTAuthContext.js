import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from '../../axios.js'
import { SessionStorage } from '../utils/utils.js'
import { useNavigate } from 'react-router-dom'
import { AppLoading } from '../component';
import { AlertService } from '../service/alertService.js'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const initialState = {
    isAuthenticated: false,
    user: {
        name: ""
    },
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        SessionStorage.set('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        SessionStorage.remove('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}
const setUserObjectSession = (user) => {
    if (user) {
        ;
        SessionStorage.setObject('userobject', user)

    } else {
        SessionStorage.remove('userobject')
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()


    const login = async (formData, IsLoading) => {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
        try {
            const response = await axios.post(baseUrl + "user-login", formData)
            const { accessToken } = response.data
            setSession(accessToken)
        } catch (error) {
            IsLoading(false)
            return
        }
        try {
            var res = await axios.get(`${baseUrl}/user-details`)
        } catch (error) {
            IsLoading(false)
            return
        }
        if (res === undefined) {
            logout();
            return;
        } else {
            initialState.user = res.data.data;
            setUserObjectSession(res.data.data);
            navigate("/view/default")

        }
        IsLoading(false)

        dispatch({
            type: 'LOGIN',
            payload: {
                user: initialState.user,
            },
        })
    }

    const register = async (formData, IsLoading) => {
        console.log(formData)
        try {
            const response = await axios.post(baseUrl + 'user_signup', formData)
            const { accessToken } = response.data
            setSession(accessToken)
        } catch (error) {
            IsLoading(false)
            return
        }
        try {
            var res = await axios.get(`${baseUrl}/user-details`)
        } catch (error) {
            IsLoading(false)
            return
        }
        if (res === undefined) {
            logout();
            return;
        } else {
            initialState.user = res.data.data;
            setUserObjectSession(res.data.data);
            navigate("/view/default")

        }
        IsLoading(false)
        dispatch({
            type: 'REGISTER',
            payload: {
                user: initialState.user,
            },
        })

    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                ;
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const userobj = JSON.parse(window.localStorage.getItem('userobject'));
                    if (userobj === undefined) {
                        logout();
                        return;
                    }
                    else {
                        ;
                        initialState.user = userobj;
                    }


                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: initialState.user,
                        },
                    })
                } else {

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <AppLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
