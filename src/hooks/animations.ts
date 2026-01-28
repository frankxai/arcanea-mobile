import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

// Premium animation hooks and utilities
export const useFadeIn = (duration: number = 300, delay: number = 0) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [fadeAnim, duration, delay]);

  return fadeAnim;
};

export const useSlideUp = (duration: number = 400, delay: number = 0) => {
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [slideAnim, duration, delay]);

  return slideAnim;
};

export const useScaleIn = (duration: number = 300, delay: number = 0) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 150,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [scaleAnim, duration, delay]);

  return scaleAnim;
};

export const usePulse = (duration: number = 2000) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [pulseAnim, duration]);

  return pulseAnim;
};

export const useShimmer = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  return shimmerAnim;
};

// Animated wrapper components
interface FadeInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: any;
}

export const FadeInView: React.FC<FadeInViewProps> = ({ 
  children, 
  duration = 300, 
  delay = 0, 
  style 
}) => {
  const fadeAnim = useFadeIn(duration, delay);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

interface SlideUpViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: any;
}

export const SlideUpView: React.FC<SlideUpViewProps> = ({ 
  children, 
  duration = 400, 
  delay = 0, 
  style 
}) => {
  const slideAnim = useSlideUp(duration, delay);

  return (
    <Animated.View style={[
      style, 
      { 
        transform: [{ translateY: slideAnim }],
        opacity: slideAnim.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
        })
      }
    ]}>
      {children}
    </Animated.View>
  );
};

interface ScaleInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: any;
}

export const ScaleInView: React.FC<ScaleInViewProps> = ({ 
  children, 
  duration = 300, 
  delay = 0, 
  style 
}) => {
  const scaleAnim = useScaleIn(duration, delay);

  return (
    <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
      {children}
    </Animated.View>
  );
};

interface PulseViewProps {
  children: React.ReactNode;
  duration?: number;
  style?: any;
}

export const PulseView: React.FC<PulseViewProps> = ({ 
  children, 
  duration = 2000, 
  style 
}) => {
  const pulseAnim = usePulse(duration);

  return (
    <Animated.View style={[style, { transform: [{ scale: pulseAnim }] }]}>
      {children}
    </Animated.View>
  );
};

// Premium button press animation
export const useButtonPress = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return { scaleAnim, pressIn, pressOut };
};

// Elemental glow animations
export const useElementalGlow = (element: string, intensity: number = 1) => {
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const glowColor = getElementColor(element);

  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: intensity,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    glowAnimation.start();

    return () => glowAnimation.stop();
  }, [glowAnim, intensity]);

  const glowStyle = {
    shadowColor: glowColor,
    shadowOpacity: glowAnim,
    shadowRadius: glowAnim.interpolate({
      inputRange: [0.3, 1],
      outputRange: [10, 30],
    }),
    elevation: glowAnim.interpolate({
      inputRange: [0.3, 1],
      outputRange: [5, 15],
    }),
  };

  return glowStyle;
};

const getElementColor = (element: string): string => {
  const colors = {
    fire: '#FF6B35',
    water: '#4FC3F7', 
    earth: '#8D6E63',
    wind: '#81C784',
    void: '#424242',
    integration: '#9C27B0',
  };
  return colors[element as keyof typeof colors] || '#6B46C1';
};