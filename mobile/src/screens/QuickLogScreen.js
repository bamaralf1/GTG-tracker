import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import { EXERCICIOS_DEFAULT } from '@gtg/shared';

export default function QuickLogScreen() {
  const [selectedEx, setSelectedEx] = useState(null);
  const [reps, setReps] = useState('');
  const [peso, setPeso] = useState('');
  const [logging, setLogging] = useState(false);

  const selectedExercise = EXERCICIOS_DEFAULT.find(e => e.id === selectedEx);

  const handleLog = () => {
    if (!selectedEx || !reps) return;
    setLogging(true);
    setTimeout(() => {
      setLogging(false);
      setSelectedEx(null);
      setReps('');
      setPeso('');
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>REGISTRO RÁPIDO</Text>
        <Text style={styles.subtitle}>QUICK LOG</Text>

        <Text style={styles.sectionLabel}>EXERCÍCIO</Text>
        <View style={styles.exGrid}>
          {EXERCICIOS_DEFAULT.map(ex => (
            <TouchableOpacity
              key={ex.id}
              style={[styles.exChip, selectedEx === ex.id && styles.exChipActive]}
              onPress={() => setSelectedEx(ex.id)}
            >
              <Text style={[styles.exChipText, selectedEx === ex.id && styles.exChipTextActive]}>{ex.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedExercise && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{selectedExercise.nome}</Text>

            {selectedExercise.tipo !== 'tempo' && (
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>REPS</Text>
                <TextInput
                  style={styles.input}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            )}

            {selectedExercise.tipo === 'tempo' && (
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>SEGUNDOS</Text>
                <TextInput
                  style={styles.input}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            )}

            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>PESO (KG)</Text>
              <TextInput
                style={styles.input}
                value={peso}
                onChangeText={setPeso}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <TouchableOpacity
              style={[styles.logBtn, (!selectedEx || !reps) && styles.logBtnDisabled]}
              onPress={handleLog}
              disabled={!selectedEx || !reps}
            >
              <Text style={styles.logBtnText}>{logging ? '✓ REGISTRADO!' : '⚡ REGISTRAR SÉRIE'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  title: { fontSize: fontSize.xxl, color: colors.gold, letterSpacing: 4, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl, fontFamily: 'monospace' },
  sectionLabel: { fontSize: fontSize.xs, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.md },
  exGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xxl },
  exChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  exChipActive: { borderColor: colors.gold, backgroundColor: 'rgba(212,168,67,0.1)' },
  exChipText: { fontSize: fontSize.sm, color: colors.textSecondary, fontFamily: 'monospace' },
  exChipTextActive: { color: colors.gold },
  formCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.xl },
  formTitle: { fontSize: fontSize.lg, color: colors.gold, letterSpacing: 2, marginBottom: spacing.xl, textAlign: 'center', fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  inputLabel: { fontSize: fontSize.sm, color: colors.textSecondary, letterSpacing: 2, fontFamily: 'monospace', width: 100 },
  input: { flex: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 6, padding: spacing.md, color: colors.text, fontSize: fontSize.lg, fontFamily: 'monospace', textAlign: 'center' },
  logBtn: { backgroundColor: 'rgba(212,168,67,0.15)', borderWidth: 1, borderColor: colors.gold, borderRadius: 8, padding: spacing.lg, alignItems: 'center', marginTop: spacing.md },
  logBtnDisabled: { opacity: 0.4 },
  logBtnText: { fontSize: fontSize.md, color: colors.gold, letterSpacing: 2, fontFamily: 'monospace' },
});
