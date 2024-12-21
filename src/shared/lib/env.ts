export const Appwrite = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_STORE_DATABASE_ID,
    collections: {
        products: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        profiles: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID
    },

    buckets: {
        pictures: import.meta.env.VITE_APPWRITE_PICTURES_BUCKET_ID,
        profile: import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID
    }
}