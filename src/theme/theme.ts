import { TextStyle, ViewStyle } from 'react-native';

export interface Theme {
  colors: {
    // Primary Arcanea Colors
    primary: string;
    primaryDark: string;
    primaryLight: string;
    
    // Elemental Colors
    fire: string;
    fireLight: string;
    fireDark: string;
    
    water: string;
    waterLight: string;
    waterDark: string;
    
    earth: string;
    earthLight: string;
    earthDark: string;
    
    wind: string;
    windLight: string;
    windDark: string;
    
    void: string;
    voidLight: string;
    voidDark: string;
    
    // Neutral Palette
    background: string;
    backgroundDark: string;
    surface: string;
    surfaceDark: string;
    
    text: string;
    textLight: string;
    textDark: string;
    
    textSecondary: string;
    textTertiary: string;
    
    border: string;
    borderLight: string;
    borderDark: string;
    
    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Premium Accents
    gold: string;
    goldLight: string;
    platinum: string;
    crystal: string;
    
    // Gradient Colors
    gradientStart: string;
    gradientEnd: string;
    magicGradient: string[];
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  
  typography: {
    // Font Families
    primary: string;
    secondary: string;
    mono: string;
    
    // Font Sizes
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    huge: number;
    
    // Font Weights
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    black: string;
    
    // Line Heights
    tight: number;
    normal: number;
    relaxed: number;
  };
  
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    full: number;
  };
  
  shadows: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xl: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    glow: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  
  animations: {
    fast: number;
    normal: number;
    slow: number;
    slower: number;
  };
}

export const arcaneaTheme: Theme = {
  colors: {
    // Primary Arcanea Colors - Premium Purple/Indigo Palette
    primary: '#6B46C1',
    primaryDark: '#553C9A',
    primaryLight: '#805AD5',
    
    // Elemental Colors - Vibrant & Mystical
    fire: '#FF6B35',
    fireLight: '#FF8C42',
    fireDark: '#E85D2C',
    
    water: '#4FC3F7',
    waterLight: '#29B6F6',
    waterDark: '#039BE5',
    
    earth: '#8D6E63',
    earthLight: '#A1887F',
    earthDark: '#6D4C41',
    
    wind: '#81C784',
    windLight: '#66BB6A',
    windDark: '#4CAF50',
    
    void: '#424242',
    voidLight: '#616161',
    voidDark: '#212121',
    
    // Neutral Palette - Sophisticated Grays
    background: '#FAFAFA',
    backgroundDark: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceDark: '#FFFFFF',
    
    text: '#212121',
    textLight: '#424242',
    textDark: '#000000',
    
    textSecondary: '#757575',
    textTertiary: '#9E9E9E',
    
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    borderDark: '#BDBDBD',
    
    // Status Colors - Clear & Professional
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Premium Accents - Luxurious Touches
    gold: '#FFD700',
    goldLight: '#FFEB3B',
    platinum: '#E5E4E2',
    crystal: '#F0F8FF',
    
    // Gradient Colors - Magical Effects
    gradientStart: '#6B46C1',
    gradientEnd: '#4FC3F7',
    magicGradient: ['#6B46C1', '#4FC3F7', '#FF6B35', '#81C784', '#8D6E63', '#424242'],
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  typography: {
    // Premium Font Families
    primary: 'SF Pro Display', // iOS
    secondary: 'Roboto', // Android
    mono: 'SF Mono',
    
    // Sophisticated Font Scale
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
    
    // Premium Font Weights
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
    
    // Elegant Line Heights
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 16,
    },
    glow: {
      shadowColor: '#6B46C1',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
  },
  
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },
};

// Elemental Theme Variants
export const elementalThemes = {
  fire: {
    ...arcaneaTheme,
    colors: {
      ...arcaneaTheme.colors,
      primary: arcaneaTheme.colors.fire,
      primaryDark: arcaneaTheme.colors.fireDark,
      primaryLight: arcaneaTheme.colors.fireLight,
    },
  },
  water: {
    ...arcaneaTheme,
    colors: {
      ...arcaneaTheme.colors,
      primary: arcaneaTheme.colors.water,
      primaryDark: arcaneaTheme.colors.waterDark,
      primaryLight: arcaneaTheme.colors.waterLight,
    },
  },
  earth: {
    ...arcaneaTheme,
    colors: {
      ...arcaneaTheme.colors,
      primary: arcaneaTheme.colors.earth,
      primaryDark: arcaneaTheme.colors.earthDark,
      primaryLight: arcaneaTheme.colors.earthLight,
    },
  },
  wind: {
    ...arcaneaTheme,
    colors: {
      ...arcaneaTheme.colors,
      primary: arcaneaTheme.colors.wind,
      primaryDark: arcaneaTheme.colors.windDark,
      primaryLight: arcaneaTheme.colors.windLight,
    },
  },
  void: {
    ...arcaneaTheme,
    colors: {
      ...arcaneaTheme.colors,
      primary: arcaneaTheme.colors.void,
      primaryDark: arcaneaTheme.colors.voidDark,
      primaryLight: arcaneaTheme.colors.voidLight,
    },
  },
} as const;

export type ElementalTheme = keyof typeof elementalThemes;