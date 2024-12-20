import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './router/AppRouter'
import { UserProvider } from './shared/context/UserContext'

const App = () => {
    return (
        <ChakraProvider disableGlobalStyle>
            <UserProvider>
                <AppRouter />
            </UserProvider>
        </ChakraProvider>
    )
}

export default App