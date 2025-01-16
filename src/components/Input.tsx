import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {LucideIcon} from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={20} color="#6b7280" />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            Icon && styles.inputWithIcon,
            error && styles.inputError,
          ]}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444',
  },
});

export default Input;