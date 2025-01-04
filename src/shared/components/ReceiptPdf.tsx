import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { DummyProduct } from '../declarations/Dummyjson'

// Create styles
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 30
    },

    page: {
        gap: 100,
        marginTop: 20
    },
    section: {
        color: 'red'
    },

    products: {
        color: 'blue'
    },

    logo: {
        width: 80
    }
});

// Create Document Component
const ReceiptPdf = ({ signUrl, cartProducts, profileName, totalPrice }: {
    signUrl: string
    cartProducts: DummyProduct[]
    profileName: string
    totalPrice: number
}) => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src='./my-logo.png' style={styles.logo} />
                    <Text>Boleta de Compra de la Tienda X</Text>
                </View>
                <View style={styles.section}>
                    {
                        cartProducts.map(product => (
                            <Text key={product.id} style={styles.products}>{product.title} - S/. {(product.price * product.quantity).toFixed(2)}</Text>
                        ))
                    }

                    <Text>{totalPrice}</Text>
                </View>

                <View>
                    <Text>Firma de : {profileName}</Text>
                    <Image src={signUrl} />
                </View>

            </Page>
        </Document>
    )
}

export default ReceiptPdf