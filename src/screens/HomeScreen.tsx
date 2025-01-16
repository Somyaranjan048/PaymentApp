import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../ThemeContext';
import Drawer from '../components/Drawer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext) || {};
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [amount, setAmount] = useState<string>('');

    const handleSendMoney = () => {
        if (amount.trim() === '') {
            Alert.alert('Error', 'Please enter an amount');
            return;
        }
        navigation.navigate('CheckoutScreen', { amount });
        setAmount('');
    };

    const handleProfileNavigation = () => {
        navigation.navigate('UserProfile');
    };

    const styles = createStyles(isDarkMode ?? false);

    const transactions = [
        { id: '1', title: 'Grocery Shopping', amount: '$50', date: '03-Dec-2024' },
        { id: '2', title: 'Electricity Bill', amount: '$100', date: '01-Dec-2024' },
        { id: '3', title: 'Netflix Subscription', amount: '$15', date: '30-Nov-2024' },
        { id: '4', title: 'Dining Out', amount: '$75', date: '28-Nov-2024' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#448A99' : '#448A99'}
            />

            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => setDrawerVisible(!isDrawerVisible)}>
                    <Icon name="menu" size={28} color={isDarkMode ? '#CEC7BF' : '#07161B'} />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Payment Transfer</Text>
                <View style={styles.navRight}>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                    <TouchableOpacity onPress={handleProfileNavigation} style={styles.profileIcon}>
                        <Icon name="person" size={28} color={isDarkMode ? '#CEC7BF' : '#07161B'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Drawer */}
            {isDrawerVisible && (
                <>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setDrawerVisible(false)}
                    />
                    <View style={styles.drawerContainer}>
                        <Drawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />
                    </View>
                </>
            )}

            {/* Body Content */}
            <View style={styles.content}>
                {/* Send Money Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Send Money</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor={isDarkMode ? '#888' : '#000'}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendMoney}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>

                {/* Transaction Details */}
                <View>
                    <Text style={styles.sectionHeader}>Transaction Details</Text>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.transactionCard}>
                                <Text style={styles.transactionTitle}>{item.title}</Text>
                                <Text style={styles.transactionAmount}>{item.amount}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#07161B' : '#f2f2f2',
        },
        navbar: {
            height: 60,
            backgroundColor: isDarkMode ? '#07161B' : '#448A99',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#CEC7BF' : '#07161B',
            zIndex: 100,
        },
        navTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#CEC7BF' : '#07161B',
        },
        navRight: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        profileIcon: {
            marginLeft: 12,
        },
        content: {
            flex: 1,
            marginTop: 8,
            zIndex: 1,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: SCREEN_WIDTH,
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
        },
        drawerContainer: {
            position: 'absolute',
            top: 60, // Push down below the Navbar
            left: 0,
            width: 250,
            height: '100%',
            backgroundColor: isDarkMode ? '#448A99' : '#FFF',
            zIndex: 3,
        },
        card: {
            backgroundColor: isDarkMode ? '#448A99' : '#CEC7BF',
            padding: 16,
            margin: 16,
            borderRadius: 12,
            elevation: 3,
        },
        sectionHeader: {
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? '#CEC7BF' : '#07161B',
            marginBottom: 16,
            marginLeft: 10,
        },
        input: {
            height: 50,
            borderWidth: 1,
            borderColor: isDarkMode ? '#CEC7BF' : '#EEE',
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#07161B',
            backgroundColor: isDarkMode ? '#07161B' : '#FFF',
            marginBottom: 16,
        },
        button: {
            backgroundColor: isDarkMode ? '#CEC7BF' : '#07161B',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: isDarkMode ? '#07161B' : '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
        },
        transactionCard: {
            backgroundColor: isDarkMode ? '#448A99' : '#CEC7BF',
            padding: 16,
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 8,
            elevation: 2,
        },
        transactionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkMode ? '#CEC7BF' : '#07161B',
        },
        transactionAmount: {
            fontSize: 14,
            color: isDarkMode ? '#CEC7BF' : '#07161B',
            marginTop: 4,
        },
        transactionDate: {
            fontSize: 12,
            color: isDarkMode ? '#888' : '#555',
            marginTop: 4,
        },
    });

export default HomeScreen;
