import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../../ThemeContext'; // Adjust path as needed

const UPIScreen = ({navigation}: {navigation: any}) => {
  const {isDarkMode} = useContext(ThemeContext) || {};

  const styles = createStyles(isDarkMode ?? false);

  const UpiIcons = [
    require('../assets/images/upi.png'),
    require('../assets/images/phonepay.png'),
    require('../assets/images/razerpay.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar with Back Button */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={28}
            color={isDarkMode ? '#CEC7BF' : '#07161B'}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>UPI</Text>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.upicard}>
        {/* Option: PhonePe Icon */}
        <TouchableOpacity style={styles.phonepeButton}>
          <Image
            source={require('../assets/images/phonepaylogo.png')}
            style={styles.phonepeIcon}
            resizeMode="contain"
          />
          <Text style={styles.phonepeText}>PhonePe</Text>
        </TouchableOpacity>

        {/* Option: Enter UPI ID */}
        <Text style={styles.orText}>OR</Text>
        <View style={styles.upiInputContainer}>
           <View style={styles.upiidtextcard}>
              <Text style={styles.upiidtext}>UPI ID</Text>
           </View>
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID"
            placeholderTextColor={isDarkMode ? '#888' : '#CCC'}
          />
          <TouchableOpacity style={styles.paybutton}>
            <Text style={styles.paytext}>Pay</Text>
          </TouchableOpacity>
        </View>
        </View>
        {/* Horizontal ScrollView for UPI Icons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.iconScrollView}>
          {UpiIcons.map((icon, index) => (
            <View key={index} style={styles.iconContainer}>
              <Image
                source={icon}
                style={styles.upiImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#07161B' : '#448A99',
    },
    upicard:{
        width:'100%',
        alignItems:'center',
        backgroundColor: isDarkMode ? '#448A99' : '#1C3A47',
        padding:15,
        borderRadius:8,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    navTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 16,
      color: isDarkMode ? '#CEC7BF' : '#07161B',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    phonepeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1C3A47' : '#CCE8F0',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      width: '90%',
    },
    phonepeIcon: {
      width: 48,
      height: 48,
      marginRight: 1,
    },
    phonepeText: {
      fontSize: 16,
      color: isDarkMode ? '#FFF' : '#07161B',
    },
    orText: {
      fontSize: 16,
      color: isDarkMode ? '#888' : '#555',
      marginVertical: 5,
    },
    upiInputContainer: {
      width: '100%',
      alignItems:'center',
    },
    upiidtextcard:{
        width: '100%',
        padding:8,
    },
    upiidtext:{
        fontSize: 18,
        color: isDarkMode ? '#FFF' : '#CEC7BF',
        fontWeight:600,
        padding:15,
    },
    input: {
      width: '90%',
      padding: 18,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#CCC',
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#1C3A47' : '#FFF',
      color: isDarkMode ? '#FFF' : '#07161B',
      marginBottom: 16,
    },
    paybutton: {
      width: '90%',
      padding: 16,
      backgroundColor: '#CEC7BF',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paytext: {
      fontSize: 18,
      color: isDarkMode ? '#FFF' : '#07161B',
      fontWeight:'600',
    },
    iconScrollView: {
      marginTop: 16,
    },
    iconContainer: {
      marginHorizontal: 10,
    },
    upiImage: {
      width: 100,
      height: 100,
    },
  });

export default UPIScreen;
