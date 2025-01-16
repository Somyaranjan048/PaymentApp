import React, { createContext, useState, ReactNode, useContext } from 'react';


// Define the context type
type ThemeContextType = {
    isDarkMode: boolean | undefined;
    toggleTheme: () => void;
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use ThemeContext
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
