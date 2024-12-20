import useAppwrite from '@hooks/useAppwrite'
import { Models, Query } from 'appwrite'
import { createContext, ReactNode, Suspense, useEffect, useState } from 'react'
import { Appwrite } from '../lib/env'
import Loading from '@components/Loading'
interface Profile extends Models.Document {
    age: number
    bannerId: string
    photoId: string
    nickname: string
    userId: string
}

type UserContext = {
    session: Models.Session
    profile: Profile
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}


export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Models.Session>()
    const [profile, setProfile] = useState<Profile>()

    const { fromSession, fromDatabase } = useAppwrite()


    const login = async (email: string, password: string) => {
        const appwriteSession = await fromSession().login(email, password)
        setSession(appwriteSession)

        localStorage.setItem('session', JSON.stringify(appwriteSession))
    }

    const logout = async () => {
        await fromSession().logout(session?.$id)
        localStorage.removeItem('session')
    }

    const getProfile = async (previousSession) => {
        const profileCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.profiles)

        const { documents } = session ?
            await profileCollection.getDocuments([
                Query.equal('userId', session?.userId)
            ])
            :
            await profileCollection.getDocuments([
                Query.equal('userId', previousSession?.userId)
            ])

        setProfile(documents[0])
    }

    useEffect(() => {
        const previousSession = JSON.parse(localStorage.getItem('session')!)

        if (previousSession) {
            setSession(previousSession)
        }

        getProfile(previousSession)
    }, [])

    return (
        <UserContext.Provider value={{ session, profile, login, logout }}>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </UserContext.Provider>
    )
}