import { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function AnimatedRing({ pct, phase, size = 220, strokeWidth = 4, children }) {
  const animValue = useRef(new Animated.Value(0)).current;

  const phaseColor = phase === 'critical' ? colors.red
    : phase === 'urgent' ? colors.orange
    : phase === 'warning' ? colors.amber
    : colors.gold;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: pct,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [pct]);

  const glowOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.06],
  });

  const circumference = Math.PI * (size - strokeWidth);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.ring, {
        width: size, height: size, borderRadius: size / 2,
        borderColor: phaseColor,
      }]}>
        <View style={[styles.glow, {
          width: size + 8, height: size + 8, borderRadius: (size + 8) / 2,
          borderColor: phaseColor,
        }]} />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  ring: { borderWidth: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' },
  glow: {
    position: 'absolute', borderWidth: 2, opacity: 0.2,
  },
  content: { position: 'absolute', alignItems: 'center' },
});
