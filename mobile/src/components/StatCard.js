import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';

export function StatCard({ label, value, sub, icon, color, accent = colors.gold }) {
  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: spacing.lg,
    marginBottom: spacing.md,
    minWidth: 140,
    flex: 1,
  },
  icon: { fontSize: 20, marginBottom: spacing.xs },
  value: { fontSize: fontSize.xxl, fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 2 },
  label: { fontSize: fontSize.xs, color: colors.textSecondary, letterSpacing: 2, marginTop: spacing.xs, fontFamily: 'monospace' },
  sub: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.xs, fontFamily: 'monospace' },
});
