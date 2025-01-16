import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icons from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const { login } = useContext(AuthContext)!;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme(); // Detect system default mode

    const isDarkMode = colorScheme === 'dark';

    const handleLogin = () => {
        login({ email }); // Simulate login
        navigation.navigate('HomeScreen');
    };

    const styles = createStyles(isDarkMode);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
            <Icons name="google-wallet" size={100} color={isDarkMode ? '#CEC7BF' : '#07161B'} style={styles.icon} />
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please log in to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const createStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: isDarkMode ? '#07161B' : '#F8F9FA',
        },
        icon: {
            marginTop: 60, // Adjust for punch-hole or notch spacing
        },
        title: {
            fontSize: 28,
            color: isDarkMode ? '#CEC7BF' : '#333',
            marginBottom: 8,
            fontFamily:'Poppins-Bold',
        },
        subtitle: {
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#666',
            marginBottom: 20,
            fontFamily:'Roboto_Condensed-black',
        },
        input: {
            width: '90%',
            borderColor: isDarkMode ? '#CEC7BF' : '#DDD',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginVertical: 8,
            backgroundColor: isDarkMode ? '#448A99' : '#FFF',
            fontSize: 16,
            color: isDarkMode ? '#CEC7BF' : '#333',
        },
        button: {
            width: '90%',
            backgroundColor: '#448A99',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
        },
        buttonText: {
            color: '#FFF',
            fontSize: 18,
            fontFamily:'Roboto_Condensed-Bold',
        },
        signUpText: {
            color: '#448A99',
            fontSize: 14,
            marginTop: 16,
            fontFamily:'Poppins-Light',
        },
    });

export default LoginScreen;
