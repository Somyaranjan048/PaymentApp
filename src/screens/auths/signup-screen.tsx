import React, { useState, useEffect, useMemo } from 'react';
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
    ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const SignupScreen = ({ navigation }: { navigation: any }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // Animation values
    const fadeIn = useMemo(() => new Animated.Value(0),[]);
    const slideUp = useMemo(() => new Animated.Value(50),[]);
    const socialButtonsSlide = useMemo(() => new Animated.Value(100),[]);
    const formOpacity = useMemo(() => new Animated.Value(0),[]);

    useEffect(() => {
        // Start animations when component mounts
        Animated.parallel([
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideUp, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(socialButtonsSlide, {
                toValue: 0,
                duration: 1000,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.timing(formOpacity, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start();
    },[fadeIn, formOpacity, slideUp, socialButtonsSlide] );

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
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
                        name="user-plus"
                        size={60}
                        color={isDarkMode ? '#CEC7BF' : '#07161B'}
                    />
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our community today!</Text>
                </Animated.View>

                {/* Social Signup Buttons */}
                <Animated.View
                    style={[
                        styles.socialSection,
                        {
                            opacity: formOpacity,
                            transform: [{ translateX: socialButtonsSlide }],
                        },
                    ]}
                >
                    <Text style={styles.quickSignupText}>Quick Sign Up with</Text>
                    <View style={styles.socialButtonsRow}>
                        <TouchableOpacity style={styles.socialIconButton}>
                            <LinearGradient
                                colors={['#EA4335', '#DB4437']}
                                style={styles.socialIconGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Icons name="google" size={25} color="#FFF" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialIconButton}>
                            <LinearGradient
                                colors={['#4267B2', '#3b5998']}
                                style={styles.socialIconGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Icons name="facebook" size={25} color="#FFF" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialIconButton}>
                            <LinearGradient
                                colors={['#000000', '#333333']}
                                style={styles.socialIconGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Icons name="apple" size={25} color="#FFF" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>or sign up with email</Text>
                        <View style={styles.divider} />
                    </View>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.formContainer,
                        {
                            opacity: formOpacity,
                            transform: [{ translateY: slideUp }],
                        },
                    ]}
                >
                    {/* Full Name Input */}
                    <View style={styles.inputContainer}>
                        <Icons name="user" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

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

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <Icons name="lock" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity>
                            <Icons name="eye" size={20} color={isDarkMode ? '#CEC7BF' : '#666'} />
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#0DBAA3', '#0D8B99']}
                            style={styles.gradientButton}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                        >
                            <Text style={styles.buttonText}>Create Account</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Terms and Conditions */}
                    <Text style={styles.termsText}>
                        By signing up, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>

                    {/* Login Link */}
                    <TouchableOpacity
                        style={styles.loginContainer}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <Text style={[styles.loginText, styles.loginLink]}>Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </LinearGradient>
    );
};

const createStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
        },
        headerContainer: {
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 60 : 40,
            paddingBottom: 20,
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
        socialSection: {
            paddingHorizontal: 20,
            marginBottom: 20,
        },
        quickSignupText: {
            textAlign: 'center',
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#666',
            marginBottom: 15,
        },
        socialButtonsRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
        },
        socialIconButton: {
            borderRadius: 12,
            overflow: 'hidden',
        },
        socialIconGradient: {
            padding: 15,
            borderRadius: 12,
            width: 55,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
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
        formContainer: {
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
        button: {
            height: 55,
            borderRadius: 12,
            overflow: 'hidden',
            marginVertical: 20,
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
        termsText: {
            textAlign: 'center',
            fontSize: 12,
            color: isDarkMode ? '#CEC7BF' : '#666',
            marginTop: 10,
        },
        termsLink: {
            color: '#448A99',
            textDecorationLine: 'underline',
        },
        loginContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 30,
        },
        loginText: {
            color: isDarkMode ? '#CEC7BF' : '#666',
            fontSize: 14,
        },
        loginLink: {
            color: '#448A99',
            fontWeight: '500',
        },
    });

export default SignupScreen;