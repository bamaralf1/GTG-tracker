import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import { NIVEIS, getNivel, getXpProgress } from '@gtg/shared';

export default function RankScreen({ route }) {
  const xpData = route?.params?.xpData || { total: 0, nivel: 'RECRUTA', nivelAtualEm: 0, proximoNivelEm: 1000 };
  const { level, pct } = getXpProgress(xpData);
  const levelIdx = NIVEIS.indexOf(level);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerCard}>
          <Text style={styles.levelIcon}>{level.icone}</Text>
          <Text style={styles.levelName}>{level.nome}</Text>
          <Text style={styles.levelSub}>NÍVEL {levelIdx + 1} · {level.divisao.toUpperCase()}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.progressText}>{pct}%</Text>
          </View>
          <Text style={styles.xpRange}>{xpData.total} / {level.proximo} XP</Text>
        </View>

        <Text style={styles.sectionTitle}>TODAS AS PATENTES</Text>
        {NIVEIS.map((n, i) => {
          const unlocked = xpData.total >= n.min;
          const isCurrent = level.nome === n.nome;
          return (
            <View key={n.nome} style={[styles.rankRow, isCurrent && styles.rankRowCurrent, !unlocked && styles.rankRowLocked]}>
              <Text style={[styles.rankIcon, !unlocked && styles.locked]}>{n.icone}</Text>
              <View style={styles.rankInfo}>
                <Text style={[styles.rankName, isCurrent && styles.currentText, !unlocked && styles.lockedText]}>{n.nome}</Text>
                <Text style={styles.rankDesc}>{n.descricao}</Text>
              </View>
              {isCurrent && <Text style={styles.currentBadge}>ATUAL</Text>}
              {!isCurrent && unlocked && <Text style={styles.checkIcon}>✓</Text>}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  headerCard: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.gold,
    borderRadius: 12, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xxl,
  },
  levelIcon: { fontSize: 64, marginBottom: spacing.md },
  levelName: { fontSize: fontSize.xxl, color: colors.gold, fontWeight: 'bold', letterSpacing: 3 },
  levelSub: { fontSize: fontSize.xs, color: colors.textMuted, letterSpacing: 3, marginTop: spacing.xs, fontFamily: 'monospace' },
  progressContainer: { width: '100%', marginTop: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  progressBg: { flex: 1, height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 4 },
  progressText: { fontSize: fontSize.sm, color: colors.gold, fontFamily: 'monospace' },
  xpRange: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.xs, fontFamily: 'monospace' },
  sectionTitle: { fontSize: fontSize.xs, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.md },
  rankRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  rankRowCurrent: { backgroundColor: 'rgba(212,168,67,0.05)' },
  rankRowLocked: { opacity: 0.35 },
  rankIcon: { fontSize: 28, marginRight: spacing.lg, width: 36, textAlign: 'center' },
  rankInfo: { flex: 1 },
  rankName: { fontSize: fontSize.md, color: colors.text, fontWeight: 'bold', letterSpacing: 2 },
  rankDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2, fontFamily: 'monospace' },
  currentText: { color: colors.gold },
  lockedText: { color: colors.textMuted },
  locked: { opacity: 0.4 },
  currentBadge: { fontSize: fontSize.xs, color: colors.gold, borderWidth: 1, borderColor: colors.gold, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 4, fontFamily: 'monospace' },
  checkIcon: { fontSize: 18, color: colors.green },
});
