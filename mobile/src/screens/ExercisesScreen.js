import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import { EXERCICIOS_DEFAULT } from '@gtg/shared';

export default function ExercisesScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>EXERCÍCIOS</Text>
        <Text style={styles.subtitle}>GREASE THE GROOVE</Text>

        {EXERCICIOS_DEFAULT.map(ex => (
          <TouchableOpacity
            key={ex.id}
            style={[styles.card, selected === ex.id && styles.cardActive]}
            onPress={() => setSelected(selected === ex.id ? null : ex.id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.exName}>{ex.nome}</Text>
              <Text style={styles.exType}>{ex.tipo === "tempo" ? "⏱" : "🔁"}</Text>
            </View>
            <Text style={styles.exInst}>{ex.instrucoes}</Text>

            {selected === ex.id && ex.detalhes && (
              <View style={styles.details}>
                <Text style={styles.detailTitle}>EXECUÇÃO</Text>
                {ex.detalhes.execucao?.map((pass, i) => (
                  <Text key={i} style={styles.detailText}>{i + 1}. {pass}</Text>
                ))}
                {ex.detalhes.gtgDica && (
                  <>
                    <Text style={[styles.detailTitle, { marginTop: spacing.md }]}>DICA GTG</Text>
                    <Text style={styles.detailText}>{ex.detalhes.gtgDica}</Text>
                  </>
                )}
                {ex.detalhes.pavelQuote && (
                  <Text style={styles.quote}>"{ex.detalhes.pavelQuote}"</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  title: { fontSize: fontSize.xxl, color: colors.gold, letterSpacing: 4, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl, fontFamily: 'monospace' },
  card: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, marginBottom: spacing.md },
  cardActive: { borderColor: colors.gold },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  exName: { fontSize: fontSize.lg, color: colors.text, fontWeight: 'bold', letterSpacing: 2 },
  exType: { fontSize: 18 },
  exInst: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 18, fontFamily: 'monospace' },
  details: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md },
  detailTitle: { fontSize: fontSize.xs, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.sm },
  detailText: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.xs, fontFamily: 'monospace' },
  quote: { fontSize: fontSize.sm, color: colors.goldLight, fontStyle: 'italic', marginTop: spacing.md, paddingLeft: spacing.md, borderLeftWidth: 2, borderLeftColor: colors.gold, lineHeight: 20 },
});
