import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionScreen';
import { ThemeProvider } from '../../ThemeContext';
import UPIScreen from '../screens/UPIScreen';
import CardpaymentScreen from '../screens/CardpaymentScreen';
import UserProfile from  '../components/Profile';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PaymentOptionsScreen" component={PaymentOptionsScreen} />
          <Stack.Screen name="UPIScreen" component={UPIScreen} />
          <Stack.Screen name="CardpaymentScreen" component={CardpaymentScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile}/>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
