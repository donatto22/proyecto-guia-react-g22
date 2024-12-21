import useAppwrite from '@hooks/useAppwrite'
import { Models, Query } from 'appwrite'
import { createContext, ReactNode, Suspense, useEffect, useState } from 'react'
import { Appwrite } from '../lib/env'
import Loading from '@components/Loading'
import { PersonalProduct } from '../declarations/Database'
interface Profile extends Models.Document {
    age: number
    bannerId: string
    photoId: string
    nickname: string
    userId: string
    photoUrl: string
    bannerUrl: string
    products: Array<PersonalProduct>
}

type UserContext = {
    session: Models.Session
    profile: Profile
    products: Array<PersonalProduct>
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    getProfileProducts: () => void
}


export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Models.Session | null>()
    const [profile, setProfile] = useState<Profile | null>()
    const [products, setProducts] = useState<Array<PersonalProduct> | null>()

    const [loading, setLoading] = useState(true)

    const { fromSession, fromDatabase, fromStorage } = useAppwrite()
    const profileCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.profiles)
    const profileBucket = fromStorage().bucket(Appwrite.buckets.profile)

    const login = async (email: string, password: string) => {
        const appwriteSession = await fromSession().login(email, password)
        setSession(appwriteSession)

        localStorage.setItem('session', JSON.stringify(appwriteSession))
    }

    const logout = async () => {
        await fromSession().logout(session?.$id)
        localStorage.removeItem('session')

        setProfile(null)
        setSession(null)
    }

    const getProfile = async (previousSession: object) => {

        const { documents } = session ?
            await profileCollection.getDocuments([
                Query.equal('userId', session?.userId)
            ])
            :
            await profileCollection.getDocuments([
                Query.equal('userId', previousSession?.userId)
            ])

        // const photoUrl = (await profileBucket.getFile(profile?.photoId)).previewUrl
        let bannerUrl = ''

        if (documents[0].bannerId != null) {
            bannerUrl = (await profileBucket.getFile(documents[0].bannerId)).previewUrl
        }

        const profile2 = {
            ...documents[0],
            bannerUrl: bannerUrl
        }

        setProfile(profile2)
    }

    const getProfileProducts = async () => {
        const { documents } = await profileCollection.getDocuments([
            Query.equal('userId', session?.userId)
        ])

        setProducts(documents[0].products)
    }

    const loadData = async () => {
        const previousSession = JSON.parse(localStorage.getItem('session')!)

        if (previousSession) {
            setSession(previousSession)
        }

        await getProfile(previousSession)
        await getProfileProducts()
        console.log(products)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    if (!loading) {
        return <div>Cargando...</div>
    }

    return (
        <UserContext.Provider value={{ session, profile, products, login, logout, getProfileProducts }}>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </UserContext.Provider>
    )
}