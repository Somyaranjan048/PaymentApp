import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../ThemeContext'; // Adjust path as needed
import {ThemeProvider} from '../../ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');
const PaymentOptionsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {totalAmount} = route.params;
  const {isDarkMode} = useTheme();
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const paymentMethods = [
    {
      name: 'UPI Payment',
      description: 'Pay using any UPI app',
      icons: [
        require('../assets/images/upi.png'),
        require('../assets/images/phonepay.png'),
        require('../assets/images/razerpay.png'),
      ],
      onPress: () => navigation.navigate('UPIScreen'),
      color: isDarkMode ? ['#4A00E0', '#8E2DE2'] : ['#8E2DE2', '#4A00E0'],
    },
    {
      name: 'Card Payment',
      description: 'Credit & Debit cards',
      icons: [
        require('../assets/images/mastercard.png'),
        require('../assets/images/visacard.png'),
      ],
      onPress: () => navigation.navigate('CardpaymentScreen'),
      color: isDarkMode ? ['#2193b0', '#6dd5ed'] : ['#6dd5ed', '#2193b0'],
    },
    {
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: 'language',
      onPress: () => navigation.navigate('NetBankingScreen'),
      color: isDarkMode ? ['#11998e', '#38ef7d'] : ['#38ef7d', '#11998e'],
    },
    {
      name: 'Digital Wallet',
      description: 'Pay using your wallet balance',
      icon: 'account-balance-wallet',
      onPress: () => navigation.navigate('WalletScreen'),
      color: isDarkMode ? ['#F2994A', '#F2C94C'] : ['#F2C94C', '#F2994A'],
    },
  ];

  const cardAnimations = useRef(
    paymentMethods.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    // Header animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Staggered card animations
    Animated.stagger(
      200,
      cardAnimations.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ),
    ).start();
  });
  return (
    <ThemeProvider>
      <LinearGradient
        colors={isDarkMode ? ['#1A1A2E', '#16213E'] : ['#F8F9FA', '#E9ECEF']}
        style={styles.container}>
        <SafeAreaView style={[styles.safeArea]}>
          {/* Enhanced Navbar */}
          <Animated.View
            style={[
              styles.navbar,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={24}
                color={isDarkMode ? '#fff' : '#1B1B2F'}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.navTitle,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Choose Payment Method
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.amountContainer,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}, {scale: scaleAnim}],
              },
            ]}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>₹{totalAmount}</Text>
          </Animated.View>
          {/* Main Content */}
          <ScrollView contentContainerStyle={styles.content}>
            {paymentMethods.map((method, index) => (
              <Animated.View
              key={index}
              style={[
                  {
                      opacity: cardAnimations[index],
                      transform: [
                          { scale: cardAnimations[index] },
                          {
                              translateX: cardAnimations[index].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [width * (index % 2 ? 1 : -1), 0],
                              }),
                          },
                      ],
                  },
              ]}>
              <TouchableOpacity
                  style={styles.card}
                  onPress={method.onPress}
                  activeOpacity={0.9}>
                  <LinearGradient
                      colors={method.color}
                      style={styles.cardGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}>
                      <View style={styles.cardContent}>
                          <View style={styles.cardLeft}>
                              <Text style={styles.cardHeader}>{method.name}</Text>
                              <Text style={styles.cardDescription}>{method.description}</Text>
                              {method.icons ? (
                                  <View style={styles.cardIcons}>
                                      {method.icons.map((icon, idx) => (
                                          <Image
                                              key={idx}
                                              source={icon}
                                              style={styles.iconImage}
                                          />
                                      ))}
                                  </View>
                              ) : (
                                  <Icon
                                      name={method.icon}
                                      size={30}
                                      color="#fff"
                                      style={styles.methodIcon}
                                  />
                              )}
                          </View>
                          <Icon
                              name="arrow-forward-ios"
                              size={20}
                              color="#fff"
                              style={styles.arrowIcon}
                          />
                      </View>
                  </LinearGradient>
              </TouchableOpacity>
          </Animated.View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom:10,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  navTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  amountContainer: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  amountLabel: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
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
    paddingTop: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  cardLeft: {
    flex: 1,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  darkCardHeader: {
    color: '#fff', // White text for dark mode
  },
  lightCardHeader: {
    color: '#07161B', // Dark text for light mode
  },

  iconImage: {
    width: 50,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  methodIcon: {
    marginTop: 8,
  },
  arrowIcon: {
    marginLeft: 16,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#1B1B2F',
  },
});

export default PaymentOptionsScreen;
