import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { useCartStore } from '../store/useCartStore';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        gap: 100,
        backgroundColor: '#E4E4E4'
    },
    section: {
        color: 'red'
    },

    products: {
        color: 'blue'
    },

    logo: {
        width: 100
    }
});

// Create Document Component
const DemoPdf = () => {
    const { cartProducts } = useCartStore()

    return (
        <PDFViewer width={800} height={1000}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Image src='./my-logo.png' style={styles.logo} />
                    </View>
                    <View style={styles.section}>
                        {
                            cartProducts.map(product => (
                                <Text style={styles.products}>{product.title}</Text>
                            ))
                        }
                        <View style={styles.section}>
                            {
                                cartProducts.map(product => (
                                    <Text style={styles.products}>{product.title}</Text>
                                ))
                            }
                        </View>
                    </View>

                </Page>
            </Document>
        </PDFViewer>
    )
}

export default DemoPdf