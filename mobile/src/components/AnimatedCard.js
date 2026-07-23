import { Animated } from 'react-native';
import { useScaleIn } from '../hooks/useAnimation';
import { shadows } from '../theme/shadows';

export default function AnimatedCard({ children, style, delay = 0, ...props }) {
  const anim = useScaleIn(350, delay);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#121212',
          borderWidth: 1,
          borderColor: '#1e1e1e',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          ...shadows.sm,
        },
        style,
        anim,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
