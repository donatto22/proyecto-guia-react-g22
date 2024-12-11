import { Client } from 'appwrite'
import { Appwrite } from './env'

const client = new Client()
client.setProject(Appwrite.projectId)