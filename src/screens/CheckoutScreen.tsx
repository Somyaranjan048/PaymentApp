import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext, ThemeProvider } from '../../ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

// const { width} = Dimensions.get('window');

const CheckoutScreen = ({ route, navigation }:{route:any,navigation:any}) => {
  const { amount } = route.params;
  const convenienceFee = 100;
  const totalAmount = parseFloat(amount) + convenienceFee;

  const { isDarkMode } = useContext(ThemeContext) || {};
  const styles = createStyles(isDarkMode ?? false);

  // Multiple animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // First fade in and slide up the content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]),
      // Then scale up the content
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      // Finally, slight rotation animation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
    ]).start();

    // Button pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, slideAnim, scaleAnim, rotateAnim, buttonScaleAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '0deg'],
  });

  const handleProceed = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate('PaymentOptionsScreen', { totalAmount }));
  };

  return (
    <ThemeProvider>
      <LinearGradient
        colors={isDarkMode ? ['#1A1A2E', '#16213E'] : ['#F8F9FA', '#E9ECEF']}
        style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          {/* Enhanced Navbar */}
          <Animated.View
            style={[
              styles.navbar,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
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
            <Text style={[styles.navTitle, isDarkMode ? styles.darkNavTitle : styles.lightNavTitle]}>
              Checkout Details
            </Text>
          </Animated.View>

          {/* Main Content */}
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                  { rotate: spin },
                ],
              },
            ]}>
            <View style={styles.headerContainer}>
              <Icon
                name="wallet"
                size={32}
                color={isDarkMode ? '#FFD700' : '#1B1B2F'}
              />
              <Text style={styles.header}>Payment Summary</Text>
            </View>

            {/* Amount Details */}
            <View style={styles.card}>
              <View style={styles.amountContainer}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>₹{amount}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.amountContainer}>
                <Text style={styles.label}>Convenience Fee:</Text>
                <Text style={styles.value}>₹{convenienceFee}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>₹{totalAmount}</Text>
              </View>
            </View>

            {/* Proceed Button */}
            <Animated.View
              style={[
                styles.buttonContainer,
                {
                  transform: [{ scale: buttonScaleAnim }],
                },
              ]}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleProceed}
                activeOpacity={0.8}>
                <Icon name="lock" size={20} color="#FFF" style={styles.buttonIcon} />
                <LinearGradient
                      colors={['#0DBAA3', '#0D8B99']}
                      style={styles.gradientButton}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      >
                      <Text style={styles.buttonText}>Proceed to Pay</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ThemeProvider>
  );
};

const createStyles = (isDarkMode:boolean) =>
  StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    backButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    navTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 16,
    },
    darkNavTitle: {
      color: '#FFF',
    },
    lightNavTitle: {
      color: '#1B1B2F',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginLeft: 12,
      color: isDarkMode ? '#FFD700' : '#1B1B2F',
    },
    content: {
      margin: 16,
      padding: 20,
      borderRadius: 24,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#FFF',
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    card: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
    },
    amountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      marginVertical: 8,
    },
    label: {
      fontSize: 18,
      color: isDarkMode ? '#AAA' : '#666',
    },
    value: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#FFD700' : '#1B1B2F',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    totalLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFF' : '#1B1B2F',
    },
    totalValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FF6B6B',
    },
    buttonContainer: {
      marginTop: 24,
    },
    button: {
      height: 75,
      borderRadius: 12,
      overflow: 'hidden',
      marginVertical: 10,
    },
    gradientButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonIcon: {
      marginRight: 8,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default CheckoutScreen;