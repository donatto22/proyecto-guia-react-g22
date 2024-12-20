import useAppwrite from '@hooks/useAppwrite'
import { Models } from 'appwrite'
import { createContext, ReactNode, useState } from 'react'

type UserContext = {
    session: Models.Session
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Models.Session>()
    const { fromSession } = useAppwrite()

    const login = async (email: string, password: string) => {
        const appwriteSession = await fromSession().login(email, password)
        setSession(appwriteSession)
    }

    const logout = async () => {
        await fromSession().logout(session?.$id)
    }

    return (
        <UserContext.Provider value={{ session, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}