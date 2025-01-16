import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Modal,
    Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have this package installed

const Profile = ({ navigation }: { navigation: any }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
          <View >
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Profile Image with Pencil Icon */}
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with dynamic source if needed
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon} onPress={toggleModal}>
                    <Icon name="pencil" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Profile Details */}
            <View style={styles.profileDetails}>
                <Text style={styles.detailText}>Name: John Doe</Text>
                <Text style={styles.detailText}>Email: john.doe@example.com</Text>
                <Text style={styles.detailText}>Mobile: +1234567890</Text>
            </View>

            {/* Modal for Edit Options */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Profile Picture</Text>
                        <Button title="Change Picture" onPress={() => console.log('Change Picture')} />
                        <Button title="Remove Picture" onPress={() => console.log('Remove Picture')} />
                        <Button title="Cancel" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
         </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFD700', // Golden border color
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 4,
        borderWidth: 2,
        borderColor: '#FFD700', // Golden border color
    },
    profileDetails: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Android shadow
    },
    detailText: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Profile;
