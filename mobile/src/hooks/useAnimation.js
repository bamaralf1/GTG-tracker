import { useRef, useCallback, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export function useFadeIn(duration = 400, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [duration, delay]);

  return opacity;
}

export function useSlideIn(direction = 'up', duration = 400, delay = 0) {
  const translateY = useRef(new Animated.Value(direction === 'up' ? 30 : -30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration, delay]);

  return { opacity, transform: [{ translateY }] };
}

export function useScaleIn(duration = 300, delay = 0) {
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  return { opacity, transform: [{ scale }] };
}

export function usePulse(animValue, duration = 1500) {
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [animValue, duration]);
}

export function useCountdown(seconds, onComplete, running) {
  const animValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!running) {
      animValue.setValue(1);
      return;
    }
    Animated.timing(animValue, {
      toValue: 0,
      duration: seconds * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && onComplete) onComplete();
    });
  }, [running, seconds]);

  return animValue;
}
