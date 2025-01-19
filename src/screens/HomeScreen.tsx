import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Switch,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../ThemeContext';
import Drawer from '../components/Drawer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext) || {};
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Animate screen fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  });

  const handleSendMoney = () => {
    if (amount.trim() === '') {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    // Animate button click
    Animated.timing(fadeAnim, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('CheckoutScreen', { amount });
        setAmount('');
      });
    });
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
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={isDarkMode ? ['#07161B', '#0D3B4D'] : ['#F4F8FB', '#A6CCE5']}
        style={styles.gradientBackground}
      >
        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => setDrawerVisible(!isDrawerVisible)}>
            <Icon name="menu" size={28} color={isDarkMode ? '#F4F8FB' : '#07161B'} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Payment Transfer</Text>
          <View style={styles.navRight}>
            <Switch value={isDarkMode} onValueChange={toggleTheme} style={styles.switch} />
            <TouchableOpacity onPress={handleProfileNavigation} style={styles.profileIcon}>
              <Icon name="person" size={28} color={isDarkMode ? '#F4F8FB' : '#07161B'} />
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
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Send Money Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Send Money</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor={isDarkMode ? '#888' : '#555'}
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
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientBackground: {
      flex: 1,
    },
    navbar: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 10,
      zIndex: 100,
    },
    navTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#F4F8FB' : '#07161B',
    },
    navRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switch: {
      marginRight: 8,
    },
    profileIcon: {
      marginLeft: 12,
    },
    content: {
      flex: 1,
      marginTop: 8,
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
      top: 60,
      left: 0,
      width: 250,
      height: '100%',
      backgroundColor: isDarkMode ? '#07161B' : '#F4F8FB',
      zIndex: 3,
    },
    card: {
      backgroundColor: isDarkMode ? '#FFFFFF' : '#FFFFFF',
      padding: 16,
      margin: 16,
      borderRadius: 12,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#07161B' : '#07161B',
      marginBottom: 16,
    },
    input: {
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#F0F0F0' : '#E8E8E8',
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#0DBAA3',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#F4F8FB' : '#07161B',
      marginBottom: 16,
      marginLeft: 10,
    },
    transactionCard: {
      backgroundColor: isDarkMode ? '#F4F8FB' : '#FFFFFF',
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 3,
    },
    transactionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#07161B' : '#07161B',
    },
    transactionAmount: {
      fontSize: 14,
      color: isDarkMode ? '#07161B' : '#07161B',
      marginTop: 4,
    },
    transactionDate: {
      fontSize: 12,
      color: '#448A99',
      marginTop: 4,
    },
  });

export default HomeScreen;
