import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import { READINESS_FACTOR_KEYS, getReadinessStatus, getUsuarioFatorDisplay } from '@gtg/shared';

export default function ReadinessScreen() {
  const [factors, setFactors] = useState({
    sono: 5, stress: 5, dor: 5, energia: 5,
    hidratacao: 5, alimentacao: 5, motivacao: 5
  });

  const score = Math.round(
    (Object.values(factors).reduce((a, b) => a + b, 0) / (Object.keys(factors).length * 10)) * 100
  );
  const status = getReadinessStatus(score);

  const updateFactor = (key, value) => {
    setFactors(prev => ({ ...prev, [key]: Math.round(value) }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>PRONTIDÃO</Text>
        <Text style={styles.subtitle}>READINESS ASSESSMENT</Text>

        <View style={[styles.scoreCard, { borderColor: status.cor === 'green' ? colors.green : status.cor === 'gold' ? colors.gold : status.cor === 'orange' ? colors.orange : colors.red }]}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreLabel}>{status.label}</Text>
          <Text style={styles.scoreIcon}>{status.icone}</Text>
        </View>

        {READINESS_FACTOR_KEYS.map(key => {
          const info = getUsuarioFatorDisplay(key);
          const val = factors[key];
          return (
            <View key={key} style={styles.factorCard}>
              <View style={styles.factorHeader}>
                <Text style={styles.factorIcon}>{info.icone}</Text>
                <Text style={styles.factorName}>{info.nome}</Text>
                <Text style={[styles.factorValue, {
                  color: val >= 7 ? colors.gold : val >= 4 ? colors.textSecondary : colors.red
                }]}>{val}/10</Text>
              </View>
              <View style={styles.sliderRow}>
                {[1, 3, 5, 7, 10].map(mark => (
                  <Text key={mark} style={[styles.sliderMark, val === mark && styles.sliderMarkActive]}>
                    {mark === 10 ? '10' : mark % 2 === 1 ? mark : ''}
                  </Text>
                ))}
              </View>
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
  title: { fontSize: fontSize.xxl, color: colors.gold, letterSpacing: 4, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl, fontFamily: 'monospace' },
  scoreCard: {
    backgroundColor: colors.bgCard, borderWidth: 2, borderRadius: 12,
    padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xxl,
  },
  scoreValue: { fontSize: 56, color: colors.gold, fontWeight: 'bold', fontFamily: 'monospace' },
  scoreLabel: { fontSize: fontSize.lg, color: colors.text, letterSpacing: 3, marginTop: spacing.sm },
  scoreIcon: { fontSize: 36, marginTop: spacing.md },
  factorCard: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 8, padding: spacing.lg, marginBottom: spacing.md,
  },
  factorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  factorIcon: { fontSize: 22, marginRight: spacing.md },
  factorName: { flex: 1, fontSize: fontSize.md, color: colors.text, letterSpacing: 2, fontFamily: 'monospace' },
  factorValue: { fontSize: fontSize.lg, fontWeight: 'bold', fontFamily: 'monospace' },
  sliderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.xs },
  sliderMark: { fontSize: fontSize.xs, color: colors.textMuted, fontFamily: 'monospace', width: 28, textAlign: 'center' },
  sliderMarkActive: { color: colors.gold, fontWeight: 'bold' },
});
