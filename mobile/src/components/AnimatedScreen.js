import { Animated, StyleSheet } from 'react-native';
import { useFadeIn } from '../hooks/useAnimation';
import { colors } from '../theme/colors';

export default function AnimatedScreen({ children, style, ...props }) {
  const opacity = useFadeIn(300);

  return (
    <Animated.View style={[styles.container, { opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
