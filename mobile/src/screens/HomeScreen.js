import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, fontSize, shadows } from '../theme';
import { StatCard } from '../components/StatCard';
import AnimatedCard from '../components/AnimatedCard';
import { useFadeIn, useSlideIn } from '../hooks/useAnimation';
import { getHoje, getNivel } from '@gtg/shared';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const headerAnim = useFadeIn(300);

  const loadStats = useCallback(() => {
    const hoje = getHoje();
    const level = getNivel(0);
    setStats({ hoje, level, seriesHoje: 0, repsHoje: 0, xpTotal: 0, streak: 0 });
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadStats();
    setRefreshing(false);
  }, [loadStats]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />}>
        <Animated.View style={{ opacity: headerAnim }}>
          <View style={styles.header}>
            <Text style={styles.date}>{stats?.hoje || '—'}</Text>
            <Text style={styles.title}>GTG TRACKER</Text>
            <Text style={styles.subtitle}>FORÇA E RESISTÊNCIA</Text>
          </View>
        </Animated.View>

        <AnimatedCard delay={100}>
          <View style={styles.row}>
            <StatCard icon="🎖" label="PATENTE" value={stats?.level?.nome || 'RECRUTA'} accent={colors.gold} />
            <View style={{ width: spacing.md }} />
            <StatCard icon="🔥" label="STREAK" value={`${stats?.streak || 0}d`} accent={colors.orange} />
          </View>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <View style={styles.row}>
            <StatCard icon="⚡" label="SÉRIES HOJE" value={String(stats?.seriesHoje || 0)} accent={colors.gold} />
            <View style={{ width: spacing.md }} />
            <StatCard icon="💪" label="REPS HOJE" value={String(stats?.repsHoje || 0)} accent={colors.gold} />
          </View>
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <StatCard icon="⭐" label="XP TOTAL" value={String(stats?.xpTotal || 0)} sub="Toque para detalhes do ranking" accent={colors.green} />
        </AnimatedCard>

        <Animated.View style={{ opacity: headerAnim }}>
          <Text style={styles.sectionTitle}>ACESSO RÁPIDO</Text>
        </Animated.View>

        <View style={styles.menuGrid}>
          {[
            { icon: '🏋', label: 'EXERCÍCIOS', screen: 'Exercises', tab: true },
            { icon: '🪖', label: 'PRONTIDÃO', screen: 'Readiness', tab: true },
            { icon: '⏱', label: 'TIMER', screen: 'Timer', tab: true },
            { icon: '📊', label: 'HISTÓRICO', screen: 'History', tab: true },
            { icon: '🎖', label: 'PATENTES', screen: 'Rank' },
            { icon: '🌳', label: 'SKILL TREE', screen: 'SkillTree' },
            { icon: '🔥', label: 'ATIVAÇÃO', screen: 'Warmup' },
            { icon: '⚡', label: 'QUICK LOG', screen: 'QuickLog' },
            { icon: '📅', label: 'PLANNER', screen: 'Planner' },
            { icon: '💪', label: 'EXPORTAR', screen: 'History' },
          ].map((item, i) => (
            <TouchableOpacity
              key={item.screen + (item.tab ? '-tab' : '')}
              style={styles.menuItem}
              onPress={() => { if (item.tab) navigation.navigate('Tabs', { screen: item.screen }); else navigation.navigate(item.screen); }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: spacing.xxl, marginTop: spacing.lg },
  date: { fontFamily: 'ShareTechMono_400Regular', fontSize: 10, color: colors.textMuted, letterSpacing: 2, marginBottom: spacing.sm },
  title: { fontFamily: 'BebasNeue_400Regular', fontSize: 36, color: colors.gold, letterSpacing: 6 },
  subtitle: { fontFamily: 'ShareTechMono_400Regular', fontSize: 11, color: colors.textSecondary, letterSpacing: 4, marginTop: spacing.xs },
  row: { flexDirection: 'row' },
  sectionTitle: { fontFamily: 'ShareTechMono_400Regular', fontSize: 10, color: colors.gold, letterSpacing: 3, marginBottom: spacing.md, marginTop: spacing.md },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  menuItem: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 8, padding: spacing.lg, alignItems: 'center', width: '47%',
    minWidth: 140, ...shadows.sm,
  },
  menuIcon: { fontSize: 28, marginBottom: spacing.sm },
  menuLabel: { fontFamily: 'ShareTechMono_400Regular', fontSize: 11, color: colors.text, letterSpacing: 2 },
});
