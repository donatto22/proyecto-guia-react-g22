import { ChakraProvider } from '@chakra-ui/react'
// import { Provider } from 'react-redux'
// import { store } from './shared/store/sessionStore'
import { UserProvider } from './shared/context/UserContext'
import AppRouter from './router/AppRouter'

const App = () => {
    return (
        <ChakraProvider disableGlobalStyle>
            {/* <Provider store={store}> */}
            <UserProvider>
                <AppRouter />
            </UserProvider>
            {/* </Provider> */}
        </ChakraProvider>
    )
}

export default App