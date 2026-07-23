import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSize } from '../../theme/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ChartsTab() {
  const CHART_HEIGHT = 160;

  // Mock data for chart preview
  const data = [3, 5, 2, 8, 4, 6, 7, 3, 9, 5, 4, 7, 6, 8];
  const maxVal = Math.max(...data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VOLUME DE TREINO</Text>
      <Text style={styles.subtitle}>ÚLTIMOS 14 DIAS</Text>

      <View style={styles.chartContainer}>
        <View style={styles.barChart}>
          {data.map((val, i) => {
            const h = (val / maxVal) * CHART_HEIGHT;
            return (
              <View key={i} style={styles.barWrapper}>
                <View style={[styles.bar, { height: h }]} />
                <Text style={styles.barLabel}>{i + 1}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>52</Text>
          <Text style={styles.statLabel}>SÉRIES</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>1,247</Text>
          <Text style={styles.statLabel}>REPS</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>STREAK</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.xl },
  title: { fontSize: fontSize.lg, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.xs },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, letterSpacing: 2, fontFamily: 'monospace', marginBottom: spacing.lg },
  chartContainer: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, marginBottom: spacing.xxl },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, paddingTop: 20 },
  barWrapper: { alignItems: 'center', flex: 1 },
  bar: { width: '70%', backgroundColor: colors.gold, borderRadius: 3, minHeight: 4, opacity: 0.9 },
  barLabel: { fontSize: 8, color: colors.textMuted, marginTop: 4, fontFamily: 'monospace' },
  statsGrid: { flexDirection: 'row', gap: spacing.md },
  statBox: { flex: 1, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, alignItems: 'center' },
  statValue: { fontSize: fontSize.xl, color: colors.gold, fontWeight: 'bold', fontFamily: 'monospace' },
  statLabel: { fontSize: fontSize.xs, color: colors.textMuted, letterSpacing: 2, marginTop: spacing.xs, fontFamily: 'monospace' },
});
