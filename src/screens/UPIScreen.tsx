import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

const UPIScreen = ({ navigation }:{navigation:any}) => {
  const { isDarkMode } = useContext(ThemeContext) || {};
  const styles = createStyles(isDarkMode ?? false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const inputSlideAnim = useRef(new Animated.Value(width)).current;
  const UpiIcons = [
    require('../assets/images/upi.png'),
    require('../assets/images/phonepay.png'),
    require('../assets/images/razerpay.png'),
  ];
  const iconAnimations = useRef(UpiIcons.map(() => new Animated.Value(-100))).current;

  

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // First animate the header
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
      // Then animate the main card
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      // Finally animate the input section
      Animated.timing(inputSlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Staggered animation for UPI icons
    Animated.stagger(200,
      iconAnimations.map(anim =>
        Animated.spring(anim, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        })
      )
    ).start();
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1A1A2E', '#16213E'] : ['#F8F9FA', '#E9ECEF']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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
          <Text style={[styles.navTitle, isDarkMode ? styles.darkText : styles.lightText]}>
            UPI Payment
          </Text>
        </Animated.View>

        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {/* Main Payment Card */}
          <Animated.View
            style={[
              styles.mainCard,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: slideAnim }
                ],
              },
            ]}>
            {/* PhonePe Section */}
            <TouchableOpacity 
              style={styles.phonepeButton}
              activeOpacity={0.9}>
              <LinearGradient
                colors={isDarkMode ? ['#5B47B8', '#7A64FF'] : ['#7A64FF', '#5B47B8']}
                style={styles.phonepeGradient}>
                <Image
                  source={require('../assets/images/phonepaylogo.png')}
                  style={styles.phonepeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.phonepeText}>Pay with PhonePe</Text>
                <Icon name="arrow-forward-ios" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* UPI Input Section */}
            <Animated.View
              style={[
                styles.upiInputSection,
                {
                  transform: [{ translateX: inputSlideAnim }],
                },
              ]}>
              <Text style={styles.inputLabel}>Enter UPI ID</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="example@upi"
                  placeholderTextColor={isDarkMode ? '#888' : '#CCC'}
                />
                <Icon name="verified-user" size={20} color="#4CAF50" style={styles.inputIcon} />
              </View>
              <TouchableOpacity 
                style={styles.payButton}
                activeOpacity={0.9}>
                <LinearGradient
                  colors={isDarkMode ? ['#4CAF50', '#45A049'] : ['#45A049', '#4CAF50']}
                  style={styles.payButtonGradient}>
                  <Icon name="lock" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.payButtonText}>Pay Securely</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* UPI Icons Section */}
          <View style={styles.supportedUpiContainer}>
            <Text style={styles.supportedText}>Supported UPI Apps</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.iconScrollView}>
              {UpiIcons.map((icon, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.iconContainer,
                    {
                      transform: [{ translateX: iconAnimations[index] }],
                    },
                  ]}>
                  <Image
                    source={icon}
                    style={styles.upiImage}
                    resizeMode="contain"
                  />
                </Animated.View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const createStyles = (isDarkMode:boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
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
    contentContainer: {
      padding: 16,
    },
    mainCard: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#fff',
      borderRadius: 20,
      padding: 20,
      marginTop: 20,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    phonepeButton: {
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 4,
    },
    phonepeGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
    },
    phonepeIcon: {
      width: 40,
      height: 40,
      marginRight: 12,
    },
    phonepeText: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
    },
    orText: {
      paddingHorizontal: 16,
      fontSize: 16,
      color: isDarkMode ? '#888' : '#666',
    },
    upiInputSection: {
      marginTop: 8,
    },
    inputLabel: {
      fontSize: 16,
      marginBottom: 8,
      color: isDarkMode ? '#fff' : '#1B1B2F',
      fontWeight: '600',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#1B1B2F',
    },
    inputIcon: {
      marginLeft: 12,
    },
    payButton: {
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 4,
    },
    payButtonGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    buttonIcon: {
      marginRight: 8,
    },
    payButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    supportedUpiContainer: {
      marginTop: 32,
    },
    supportedText: {
      fontSize: 16,
      marginBottom: 16,
      color: isDarkMode ? '#888' : '#666',
      textAlign: 'center',
    },
    iconScrollView: {
      marginTop: 8,
    },
    iconContainer: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#fff',
      padding: 16,
      marginHorizontal: 8,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    upiImage: {
      width: 60,
      height: 60,
    },
    darkText: {
      color: '#fff',
    },
    lightText: {
      color: '#1B1B2F',
    },
  });

export default UPIScreen;