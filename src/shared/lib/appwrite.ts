import { Client, Databases, Storage, ID, Account } from 'appwrite'
import { Appwrite } from './env'

const client = new Client()
client.setProject(Appwrite.projectId)
    .setEndpoint('https://cloud.appwrite.io/v1')

const database = new Databases(client)
const storage = new Storage(client)
const account = new Account(client)

export {
    database, storage, ID, account
}