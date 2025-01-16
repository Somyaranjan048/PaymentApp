import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext, ThemeProvider} from '../../ThemeContext'; // Adjust path as needed
import {SafeAreaView} from 'react-native-safe-area-context';

const CheckoutScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const {amount} = route.params; // Receive amount from HomeScreen
  const convenienceFee = 100; // Fixed convenience fee
  const totalAmount = parseFloat(amount) + convenienceFee;

  const handleProceed = () => {
    navigation.navigate('PaymentOptionsScreen', {totalAmount});
  };

  const {isDarkMode} = useContext(ThemeContext) || {};
  const styles = createStyles(isDarkMode ?? false);

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color={isDarkMode ? '#fff' : '#07161B'}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.navTitle,
              isDarkMode ? styles.darkNavTitle : styles.lightNavTitle,
            ]}>
            Payment Method
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.header}>Checkout</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.label}>Entered Amount:</Text>
            <Text style={styles.value}>₹{amount}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.label}>Convenience Fee:</Text>
            <Text style={styles.value}>₹{convenienceFee}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#07161B' : '#f2f2f2',
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? '#448A99' : '#448A99',
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
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    content: {
      margin: 16,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#07161B' : '#CEC7BF',
      padding:12,
      borderRadius: 12,
    },
    amountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    label: {
      fontSize: 18,
      color: '#555',
    },
    value: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#E91E63',
    },
    button: {
      backgroundColor: '#448A99',
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 24,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default CheckoutScreen;
