import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../ThemeContext'; // Adjust path as needed
import { ThemeProvider } from '../../ThemeContext';

const PaymentOptionsScreen = ({ route, navigation }: { route: any; navigation: any }) => {
    const { totalAmount } = route.params;
    const { isDarkMode } = useTheme();

    const paymentMethods = [
        {
            name: 'UPI',
            icons: [
                require('../assets/images/upi.png'),
                require('../assets/images/phonepay.png'),
                require('../assets/images/razerpay.png'),
            ],
            onPress: () => navigation.navigate('UPIScreen'),
        },
        {
            name: 'Card',
            icons: [
                require('../assets/images/mastercard.png'),
                require('../assets/images/visacard.png'),
            ],
            onPress: () => navigation.navigate('CardpaymentScreen'),
        },
        {
            name: 'Net Banking',
            icon: 'language',
            onPress: () => navigation.navigate('NetBankingScreen'),
        },
        {
            name: 'Wallet',
            icon: 'account-balance-wallet',
            onPress: () => navigation.navigate('WalletScreen'),
        },
    ];

    return (
        <ThemeProvider>
        <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#07161B'} />
                </TouchableOpacity>
                <Text style={[styles.navTitle, isDarkMode ? styles.darkNavTitle : styles.lightNavTitle]}>Payment Method</Text>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Amount: ₹{totalAmount}</Text>

                {paymentMethods.map((method, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={method.onPress}
                    >
                        <View style={styles.cardLeft}>
                            <Text style={[styles.cardHeader, isDarkMode ? styles.darkCardHeader : styles.lightCardHeader]}>{method.name}</Text>
                            <View style={styles.cardIcons}>
                                {method.icons &&
                                    method.icons.map((icon, idx) => (
                                        <Image
                                            key={idx}
                                            source={icon}
                                            style={styles.iconImage}
                                        />
                                    ))}
                            </View>
                        </View>
                        <Icon
                            name="chevron-right"
                            size={24}
                            color={isDarkMode ? '#fff' : '#0448A99'}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    darkContainer: {
        backgroundColor: '#07161B',
    },
    lightContainer: {
        backgroundColor: '#448A99',
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#448A99',
    },
    navTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    darkNavTitle: {
        color: '#fff', // White text for dark mode
    },
    lightNavTitle: {
        color: '#07161B', // Dark text for light mode
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    darkTitle: {
        color: '#CEC7BF', // Light color for dark mode
    },
    lightTitle: {
        color: '#07161B', // Dark color for light mode
    },
    content: {
        padding: 16,
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#CEC7BF',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardLeft: {
        flex: 1,
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    darkCardHeader: {
        color: '#fff', // White text for dark mode
    },
    lightCardHeader: {
        color: '#07161B', // Dark text for light mode
    },
    cardIcons: {
        flexDirection: 'row',
        marginTop: 8,
    },
    iconImage: {
        width: 50,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    arrowIcon: {
        marginLeft: 16,
    },
});

export default PaymentOptionsScreen;
