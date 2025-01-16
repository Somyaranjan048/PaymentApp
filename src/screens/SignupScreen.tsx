// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext'; // Adjust path as needed
import { ThemeProvider } from '../../ThemeContext'; // Adjust the path as needed


const SignupScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isDarkMode } = useTheme(); // Access dark mode from ThemeContext
    const styles = isDarkMode ? darkStyles : lightStyles;

    const handleSignup = () => {
        // Handle user signup logic
        navigation.navigate('LoginScreen');
    };

    return (
        <ThemeProvider>
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
        </ThemeProvider>
    );
};

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '90%',
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#007bff',
        fontSize: 14,
        marginTop: 16,
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#bbb',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#1e1e1e',
        fontSize: 16,
        color: '#fff',
    },
    button: {
        width: '90%',
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#4e9ff5',
        fontSize: 14,
        marginTop: 16,
    },
});

export default SignupScreen;
