import React from 'react';
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Easing,
} from 'react-native';

const Drawer = ({
    isVisible,
    onClose,
}: {
    isVisible: boolean;
    onClose: () => void;
}) => {
    const drawerWidth = Dimensions.get('window').width * 0.75;
    const slideAnim = React.useRef(new Animated.Value(-drawerWidth)).current;

    // Array of menu items
    const menuItems = [
        'Profile',
        'E-KYC',
        'FAQ\'s',
        'Help',
        'Settings',
        'Dashboard',
    ];

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : -drawerWidth,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start();
    }, [drawerWidth, isVisible, slideAnim]);

    return (
        <View style={StyleSheet.absoluteFill}>
            {isVisible && (
                <TouchableOpacity style={styles.overlay} onPress={onClose} />
            )}
            <Animated.View
                style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
            >
                <Text style={styles.title}>Menu</Text>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        activeOpacity={0.6} // Adds a subtle click effect
                    >
                        <Text style={styles.menuText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    drawer: {
        width: Dimensions.get('window').width * 0.75,
        backgroundColor: '#FFF',
        height: '100%',
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5, // Android shadow
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginBottom: 8,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent by default
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    // Add hover effect
    menuItemHovered: {
        backgroundColor: '#6200EE',
    },
    menuTextHovered: {
        color: '#FFF',
    },
});

export default Drawer;
