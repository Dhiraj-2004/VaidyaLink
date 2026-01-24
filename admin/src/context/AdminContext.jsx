import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/'

    // Set up axios interceptor for auth token
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (aToken) {
                    config.headers.Authorization = `Bearer ${aToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [aToken]);

    const value = {
        aToken, setAToken,
        backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;