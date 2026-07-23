import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { colors, spacing, fontSize, shadows } from '../theme';
import { EXERCICIOS_DEFAULT, getRestPhase, getRestPhaseLabel } from '@gtg/shared';
import AnimatedRing from '../components/AnimatedRing';
import { useFadeIn } from '../hooks/useAnimation';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function TimerScreen() {
  const [selectedEx, setSelectedEx] = useState(null);
  const [time, setTime] = useState(900);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const headerOpacity = useFadeIn(400);
  const ringRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (running) {
      Animated.loop(
        Animated.timing(ringRotate, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      ringRotate.setValue(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const total = 900;
  const pct = total > 0 ? time / total : 0;
  const phase = getRestPhase(pct);
  const phaseColor = phase === 'critical' ? colors.red : phase === 'urgent' ? colors.orange : phase === 'warning' ? colors.amber : colors.gold;

  const spinInterpolation = ringRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: headerOpacity }}>
          <Text style={styles.title}>TIMER</Text>
          <Text style={styles.subtitle}>CRONÔMETRO TÁTICO</Text>
        </Animated.View>

        <View style={styles.exSelector}>
          <Text style={styles.exLabel}>EXERCÍCIO</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {EXERCICIOS_DEFAULT.map(ex => (
              <TouchableOpacity
                key={ex.id}
                style={[styles.exChip, selectedEx === ex.id && styles.exChipActive]}
                onPress={() => setSelectedEx(ex.id)}
              >
                <Text style={[styles.exChipText, selectedEx === ex.id && styles.exChipTextActive]}>{ex.nome}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.ringWrap}>
          <AnimatedRing pct={pct} phase={phase} size={220}>
            <View style={styles.centerContent}>
              <Text style={[styles.timeDisplay, { color: phaseColor }]}>{formatTime(time)}</Text>
              <Text style={[styles.phaseLabel, { color: phaseColor }]}>{getRestPhaseLabel(phase)}</Text>
            </View>
          </AnimatedRing>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={[styles.btn, styles.btnPause, shadows.gold]} onPress={() => setRunning(!running)}>
            <Text style={styles.btnIcon}>{running ? '⏸' : '▶'}</Text>
            <Text style={styles.btnLabel}>{running ? 'PAUSAR' : 'INICIAR'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={() => { clearInterval(intervalRef.current); setRunning(false); setTime(900); }}>
            <Text style={[styles.btnIcon, { color: colors.text }]}>↺</Text>
            <Text style={[styles.btnLabel, { color: colors.textSecondary }]}>RESET</Text>
          </TouchableOpacity>
        </View>

        {selectedEx && (
          <View style={styles.exInfo}>
            <Text style={styles.exInfoText}>
              🎯 {EXERCICIOS_DEFAULT.find(e => e.id === selectedEx)?.nome || selectedEx}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  title: { fontFamily: 'BebasNeue_400Regular', fontSize: 32, color: colors.gold, letterSpacing: 4, textAlign: 'center' },
  subtitle: { fontFamily: 'ShareTechMono_400Regular', fontSize: 10, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl },
  exSelector: { marginBottom: spacing.xxl },
  exLabel: { fontFamily: 'ShareTechMono_400Regular', fontSize: 10, color: colors.gold, letterSpacing: 3, marginBottom: spacing.sm },
  exChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, backgroundColor: colors.bgCard },
  exChipActive: { borderColor: colors.gold, backgroundColor: 'rgba(212,168,67,0.1)' },
  exChipText: { fontFamily: 'ShareTechMono_400Regular', fontSize: 12, color: colors.textSecondary },
  exChipTextActive: { color: colors.gold },
  ringWrap: { alignItems: 'center', marginVertical: spacing.xxl },
  centerContent: { alignItems: 'center' },
  timeDisplay: { fontFamily: 'BebasNeue_400Regular', fontSize: 52, letterSpacing: 4 },
  phaseLabel: { fontFamily: 'ShareTechMono_400Regular', fontSize: 11, letterSpacing: 3, marginTop: spacing.xs },
  controls: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  btn: { flex: 1, padding: spacing.lg, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  btnPause: { backgroundColor: 'rgba(212,168,67,0.12)', borderWidth: 1, borderColor: 'rgba(212,168,67,0.3)' },
  btnReset: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  btnIcon: { fontSize: 18, color: colors.gold },
  btnLabel: { fontFamily: 'ShareTechMono_400Regular', fontSize: 13, color: colors.gold, letterSpacing: 2 },
  exInfo: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, alignItems: 'center', ...shadows.sm },
  exInfoText: { fontFamily: 'ShareTechMono_400Regular', fontSize: 13, color: colors.text, letterSpacing: 1 },
});
