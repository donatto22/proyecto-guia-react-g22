import Navbar from '@components/Navbar'

const BaseLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default BaseLayout