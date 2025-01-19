/*
  ..Project:  udyampay paymentgetway System
  ..Author:   Somya Ranjan Behera
  ..Date:     2025-03-28
  ..Time:     14:30:00
  ..Version:  1.0
  ..Status:   Development
  ..React Version: 3.9.7
  ..Description: This screen is use for login
  ..Parameters: None
  ..Returns: None
  ..Note: This screen is use for login
  ..Email: somyaranjan048@gmail.com
  ..Github: https://github.com/Somyaranjan048
  ..LinkedIn: https://www.linkedin.com/in/somya-ranjan-behera-
  ..Stackoverflow: https://stackoverflow.com/users/15196608/somya-ranjan
  """
*/
//Import files
import React, { useContext, useState, useEffect, useMemo} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    useColorScheme,
    Animated,
    Platform,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const { login } = useContext(AuthContext)!;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // Animation values
    const fadeIn = useMemo(() => new Animated.Value(0), []);
    const slideUp = useMemo(() => new Animated.Value(50), []);
    const socialButtonsSlide = useMemo(() => new Animated.Value(100), []);

    useEffect(() => {
        // Start animations when component mounts
        Animated.parallel([
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 1800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUp, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(socialButtonsSlide, {
                toValue: 0,
                duration: 1000,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeIn, slideUp, socialButtonsSlide]);

    const handleLogin = () => {
        // Add button press animation here
        Animated.sequence([
            Animated.timing(fadeIn, {
                toValue: 0.5,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            login({ email });
            navigation.navigate('HomeScreen');
        });
    };

    const styles = createStyles(isDarkMode);

    return (
        <LinearGradient
            colors={isDarkMode ? ['#1A1A2E', '#16213E'] : ['#F8F9FA', '#E8EAF6']}
            style={styles.container}
        >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />
            <Animated.View
                style={[
                    styles.headerContainer,
                    {
                        opacity: fadeIn,
                        transform: [{ translateY: slideUp }],
                    },
                ]}
            >
                <Icons
                    name="google-wallet"
                    size={80}
                    color={isDarkMode ? '#CEC7BF' : '#07161B'}
                />
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Please log in to continue</Text>
            </Animated.View>
            <Animated.View
                style={[
                    styles.formContainer,
                    {
                        opacity: fadeIn,
                        transform: [{ translateY: slideUp }],
                    },
                ]}
            >
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Icons name="envelope" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        accessibilityLabel="Email Input"
                        accessibilityHint="Enter your email address here"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Icons name="lock" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity>
                        <Icons name="eye" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#0DBAA3', '#0D8B99']}
                        style={styles.gradientButton}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Social Login Section */}
                <Animated.View
                    style={[
                        styles.socialSection,
                        {
                            transform: [{ translateX: socialButtonsSlide }],
                        },
                    ]}
                >
                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <LinearGradient
                                colors={['#EA4335', '#DB4437']}
                                style={styles.socialGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Icons name="google" size={20} color="#FFF" />
                            </LinearGradient>
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <LinearGradient
                                colors={['#4267B2', '#3b5998']}
                                style={styles.socialGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Icons name="facebook" size={20} color="#FFF" />
                            </LinearGradient>
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Sign Up Link */}
                <TouchableOpacity
                    style={styles.signUpContainer}
                    onPress={() => navigation.navigate('SignupScreen')}
                >
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <Text style={[styles.signUpText, styles.signUpLink]}>Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
};

const createStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            flex: 0.35,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 60 : 40,
        },
        formContainer: {
            flex: 0.65,
            backgroundColor: isDarkMode ? '#0D1B2A' : '#FFFFFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            paddingTop: 30,
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 5,
                },
            }),
        },
        title: {
            fontSize: 32,
            color: isDarkMode ? '#CEC7BF' : '#333',
            marginVertical: 8,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#666',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1B263B' : '#F8F9FA',
            borderRadius: 12,
            marginVertical: 8,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2C394B' : '#E0E0E0',
            height: 55,
        },
        input: {
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#333',
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            marginVertical: 15,
        },
        forgotPasswordText: {
            color: '#448A99',
            fontSize: 14,
        },
        button: {
            height: 55,
            borderRadius: 12,
            overflow: 'hidden',
            marginVertical: 10,
        },
        gradientButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
        },
        socialSection: {
            marginTop: 20,
        },
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        },
        divider: {
            flex: 1,
            height: 1,
            backgroundColor: isDarkMode ? '#2C394B' : '#E0E0E0',
        },
        dividerText: {
            color: isDarkMode ? '#CEC7BF' : '#666',
            paddingHorizontal: 10,
            fontSize: 14,
        },
        socialButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        socialButton: {
            flex: 0.47,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1B263B' : '#F8F9FA',
            borderRadius: 12,
            padding: 12,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2C394B' : '#E0E0E0',
        },
        socialGradient: {
            padding: 8,
            borderRadius: 8,
            marginRight: 10,
        },
        socialButtonText: {
            color: isDarkMode ? '#CEC7BF' : '#333',
            fontSize: 16,
            fontWeight: '500',
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
        },
        signUpText: {
            color: isDarkMode ? '#CEC7BF' : '#666',
            fontSize: 14,
        },
        signUpLink: {
            color: '#448A99',
            fontWeight: '500',
        },
    });

export default LoginScreen;
