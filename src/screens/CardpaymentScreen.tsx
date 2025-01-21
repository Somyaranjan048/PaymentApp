import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../../ThemeContext'; // Adjust path as needed
import {ThemeProvider} from '../../ThemeContext'; // Adjust the path as needed
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const EnterCardDetailsScreen = ({navigation}: {navigation: any}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isBack, setIsBack] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  //const animationValue = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  const {isDarkMode} = useContext(ThemeContext) || {};
  const styles = createStyles(isDarkMode ?? false);

  //Screen Loading Animation 
  useEffect(()=>{
    Animated.parallel([
      Animated.timing(fadeAnim,{
        toValue:1,
        duration:1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim,{
        toValue: 0,
        tension:20,
        friction:7,
        useNativeDriver:true,
      }),
    ]).start();
  },[fadeAnim, slideAnim]);

  //Card flip animation configuration
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isBack) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsBack(!isBack);
  };

  const validateCardNumber = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({...prev, cardNumber: 'Only numbers are allowed.'}));
    } else if (value.length > 16) {
      setErrors(prev => ({
        ...prev,
        cardNumber: 'Card number must be 16 digits.',
      }));
    } else {
      setErrors(prev => ({...prev, cardNumber: ''}));
    }
    setCardNumber(value);
  };

  const validateCardHolder = (value: string) => {
    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        cardHolder: 'Only letters and spaces are allowed.',
      }));
    } else {
      setErrors(prev => ({...prev, cardHolder: ''}));
    }
    setCardHolder(value);
  };

  const validateExpiryDate = (value: string) => {
    let formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters.
    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
    }
    // Automatically append '/' after two digits
    if (formattedValue.length === 2 && !value.includes('/')) {
      formattedValue += '/';
    }
    // Validate month
    const [month] = formattedValue.split('/');
    if (month && (parseInt(month, 10) > 12 || parseInt(month, 10) === 0)) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: 'Invalid month. Use MM/YY format.',
      }));
    } else if (!/^(0[1-9]|1[0-2])\/?\d{0,2}$/.test(formattedValue)) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: 'Invalid format. Use MM/YY.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        expiryDate: '',
      }));
    }
    setExpiryDate(formattedValue);
  };
  const validateCVV = (value: string) => {
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({...prev, cvv: 'Only numbers are allowed.'}));
    } else if (value.length > 3) {
      setErrors(prev => ({...prev, cvv: 'CVV must be 3 digits.'}));
    } else {
      setErrors(prev => ({...prev, cvv: ''}));
    }
    setCvv(value);
  };

  return (
    <ThemeProvider>
     <LinearGradient colors={isDarkMode ? ['#07161B', '#0A2833'] : ['#448A99', '#66A5B3']}
     style= {styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/*Animation Holder */}
        <Animated.View
            style={[
              styles.navbar,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
        {/* Navbar with Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={28}
              color={isDarkMode ? '#CEC7BF' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Enter Card Details</Text>
        </Animated.View>
        <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
        {/*Card Container with Shadow*/}
          <View style={styles.cardContainer}>
            {/* Card Front view*/}
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{rotateY: frontInterpolate}],
                },
              ]}>
              <LinearGradient
                  colors={isDarkMode ? ['#2C5364', '#203A43'] : ['#56CCF2', '#2F80ED']}
                  style={styles.cardGradient}>
              <View style={styles.chipImageContent}>
                  <Image source={require('../assets/images/contactless.png')} style={styles.chipImage}/>
                  <Image source={require('../assets/images/chip.png')} style={styles.chipImage}/>
              </View>
              <Text style={styles.cardNumber}>
                {cardNumber.replace(/(.{4})/g,'$1').trim() || '•••• •••• •••• ••••'}
              </Text>
              <View style={styles.cardDetailsRow}>
                <Text style={styles.cardHolderLabel}>Card Holder</Text>
                <Text style={styles.expiryLabel}>Expires</Text>
              </View>
              <View style={styles.cardDetailsRow}>
                <Text style={styles.cardHolder}>
                  {cardHolder.toUpperCase() || 'FULL NAME'}
                </Text>
                <Text style={styles.expiry}>{expiryDate || 'MM/YY'}</Text>
              </View>
              </LinearGradient>
            </Animated.View>

            {/* Back of the card view*/}
            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                {
                  transform: [{rotateY: backInterpolate}],
                },
              ]}>
              <LinearGradient
                  colors={isDarkMode ? ['#2C5364', '#203A43'] : ['#56CCF2', '#2F80ED']}
                  style={styles.cardGradient}>
              <View style={styles.backContentBox}>
                <View style={styles.blackstrap} />
                <View style={styles.ccvcontent}>
                  <Text style={styles.cvvLabel}>CVV</Text>
                  <Text style={styles.cvv}>{cvv || '•••'}</Text>
                </View>
              </View>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={[styles.input, errors.cardNumber && styles.errorInput]}
              placeholder="Enter Card Number"
              keyboardType="number-pad"
              onChangeText={validateCardNumber}
              maxLength={16}
              value={cardNumber}
              placeholderTextColor= '#999'
            />
            {errors.cardNumber ? (
              <Text style={styles.errorText}>{errors.cardNumber}</Text>
            ) : null}

            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              style={[styles.input, errors.cardHolder && styles.errorInput]}
              placeholder="Enter Card Holder Name"
              value={cardHolder}
              onChangeText={validateCardHolder}
            />
            {errors.cardHolder ? (
              <Text style={styles.errorText}>{errors.cardHolder}</Text>
            ) : null}

            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={[styles.input, errors.expiryDate && styles.errorInput]}
              placeholder="MM/YY"
              maxLength={5}
              value={expiryDate}
              onChangeText={validateExpiryDate}
            />
            {errors.expiryDate ? (
              <Text style={styles.errorText}>{errors.expiryDate}</Text>
            ) : null}

            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter CVV"
              keyboardType="number-pad"
              maxLength={3}
              value={cvv}
              onFocus={flipCard}
              onBlur={flipCard}
              onChangeText={validateCVV}
            />
            {errors.cvv ? (
              <Text style={styles.errorText}>{errors.cvv}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={() => {
                if (Object.values(errors).some(error => error)) {
                  Alert.alert('Please correct the errors before proceeding.');
                } else {
                  navigation.navigate('NextScreen');
                }
              }}>
              <LinearGradient
                  colors={isDarkMode ? ['#2C5364', '#203A43'] : ['#56CCF2', '#2F80ED']}
                  style={styles.gradientButton}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ThemeProvider>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea:{
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      zIndex: 10,
    },
    backButton:{
      padding:8,
      borderRadius:20,
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    navTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      color: isDarkMode ? '#CEC7BF' : '#07161B',
    },
    content: {
      flex: 1,
      marginTop: 80,
    },
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      position: 'relative',
    },
    card: {
      width: width -40,
      height: 200,
      borderRadius: 16,
      position:'absolute',
      backfaceVisibility:'hidden',
      elevation:5,
      shadowColor:'#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity:0.25,
      shadowRadius:3.84,
    },
    cardGradient:{
      flex:1,
      padding:20,
      borderRadius: 16,
    },
    cardBack: {
      backgroundColor: isDarkMode ?  '#448A99' : '#CEC7BF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backContentBox: {
      position: 'absolute',
      width: '100%',
      margin: 0,
    },
    blackstrap: {
      width: '100%',
      backgroundColor: '#000',
      height: 50,
    },
    ccvcontent: {
      width:150,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#f2f2f2',
      marginTop: 16,
      padding:10,
    },
    chipImageContent:{
      width:'100%',
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'flex-end',
    },
    chipImage: {
      width: 35,
      height: 35,
      marginRight:5,
      color: isDarkMode ? '#FFFFFF' : '#fff',
    },
    cardNumber: {
      fontSize: 20,
      color: isDarkMode ? '#FFFFFF' : '#fff',
      // letterSpacing: 2,
      marginBottom: 20,
    },
    cardDetailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardHolderLabel: {
      color: isDarkMode ? '#FFFFFF' : '#fff',
      fontSize: 12,
    },
    expiryLabel: {
      color: isDarkMode ? '#FFFFFF' : '#fff',
      fontSize: 12,
    },
    cardHolder: {
      color: isDarkMode ? '#FFFFFF' : '#fff',
      fontSize: 16,
    },
    expiry: {
      color: isDarkMode ? '#FFFFFF' : '#fff',
      fontSize: 16,
    },
    cvvLabel: {
      color: isDarkMode ? '#07161B' : '#000',
      fontSize: 12,
    },
    cvv: {
      color: isDarkMode ? '#07161B' : '#000',
      fontSize: 16,
    },
    inputContainer: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
      borderRadius:16,
      padding: 20,
      marginTop: 20,
    },
    inputWrapper:{
      marginBottom:20,
    },
    label: {
      fontSize: 14,
      color: isDarkMode ? '#CEC7BF' : '#666',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#ddd',
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#333',
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
    },
    gradientButton: {
      borderRadius: 12,
      padding: 16,
    },
    proceedButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    errorInput: {
      borderColor: '#E53E3E',
    },
    errorText: {
      color: '#E53E3E',
      fontSize: 12,
      marginBottom: 8,
    },
    proceedButton: {
      backgroundColor: isDarkMode ? '#448A99' : '#07161B',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
  });

export default EnterCardDetailsScreen;
