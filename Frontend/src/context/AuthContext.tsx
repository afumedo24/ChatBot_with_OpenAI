import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {checkAuthStatus, logInUser} from '../helpers/api'
type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>

}

const AuthContext = createContext<UserAuth | null>(null)
export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggednIn] = useState(false)

    useEffect(() => {
        async function checkStatus() {
        try {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggednIn(true);
            }
        } catch (err) {
        console.error("Error checking auth status:", err);
        }
        }
    checkStatus()
    }, [])

    const login = async (email:string, password:string) => {
        const data =await logInUser(email, password)
        if (data) {
            setUser({email:data.email, name: data.name})
            setIsLoggednIn(true)
        }
    }
    const logout = async () => {}
    const signup = async (name: string, email:string, password:string) => {}

    const value = {
        user, isLoggedIn, login, logout, signup
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () =>  useContext(AuthContext) 
