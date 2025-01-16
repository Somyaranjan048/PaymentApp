// src/App.js
import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './ThemeContext';


const App = () => {
   
    return (
        <ThemeProvider>
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
        </ThemeProvider>
    );
};


export default App;