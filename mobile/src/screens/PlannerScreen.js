import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import { getHoje, getInicioSemana, EXERCICIOS_DEFAULT } from '@gtg/shared';

const DIAS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

function getWeekDays() {
  const inicio = getInicioSemana(getHoje());
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(inicio + "T12:00:00");
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().slice(0, 10);
    days.push({ data: ds, label: DIAS[i], hoje: ds === getHoje() });
  }
  return days;
}

export default function PlannerScreen() {
  const [weekDays] = useState(getWeekDays());
  const [selectedDay, setSelectedDay] = useState(getHoje());
  const [plan, setPlan] = useState({});

  const toggleExercise = (day, exId) => {
    setPlan(prev => {
      const key = `${day}-${exId}`;
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>PLANEJADOR</Text>
        <Text style={styles.subtitle}>TREINO DA SEMANA</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekBar}>
          {weekDays.map(day => (
            <TouchableOpacity
              key={day.data}
              style={[styles.dayChip, day.hoje && styles.dayChipToday, selectedDay === day.data && styles.dayChipSelected]}
              onPress={() => setSelectedDay(day.data)}
            >
              <Text style={[styles.dayLabel, day.hoje && styles.dayLabelToday]}>{day.label}</Text>
              <Text style={styles.dayDate}>{day.data.slice(8)}</Text>
              {plan[`${day.data}-flexao`] && <Text style={styles.dayDot}>•</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>{selectedDay === getHoje() ? 'HOJE' : selectedDay}</Text>

        {EXERCICIOS_DEFAULT.map(ex => {
          const key = `${selectedDay}-${ex.id}`;
          const isPlanned = !!plan[key];
          return (
            <TouchableOpacity
              key={ex.id}
              style={[styles.exRow, isPlanned && styles.exRowPlanned]}
              onPress={() => toggleExercise(selectedDay, ex.id)}
            >
              <View style={[styles.checkCircle, isPlanned && styles.checkCircleActive]}>
                {isPlanned && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={[styles.exName, isPlanned && styles.exNamePlanned]}>{ex.nome}</Text>
              <Text style={styles.exType}>{ex.tipo === 'tempo' ? '⏱' : '🔁'}</Text>
            </TouchableOpacity>
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
  weekBar: { flexDirection: 'row', marginBottom: spacing.xxl },
  dayChip: { alignItems: 'center', padding: spacing.md, borderRadius: 8, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, backgroundColor: colors.bgCard, minWidth: 56 },
  dayChipToday: { borderColor: colors.redBright },
  dayChipSelected: { borderColor: colors.gold, backgroundColor: 'rgba(212,168,67,0.08)' },
  dayLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontFamily: 'monospace', letterSpacing: 1 },
  dayLabelToday: { color: colors.redBright },
  dayDate: { fontSize: fontSize.lg, color: colors.text, fontWeight: 'bold', fontFamily: 'monospace' },
  dayDot: { fontSize: 10, color: colors.gold, marginTop: 2 },
  sectionLabel: { fontSize: fontSize.xs, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.md },
  exRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  exRowPlanned: { backgroundColor: 'rgba(212,168,67,0.04)' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.textMuted, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  checkCircleActive: { borderColor: colors.gold, backgroundColor: colors.gold },
  checkMark: { fontSize: 12, color: colors.black, fontWeight: 'bold' },
  exName: { flex: 1, fontSize: fontSize.md, color: colors.text, letterSpacing: 1 },
  exNamePlanned: { color: colors.gold },
  exType: { fontSize: 18 },
});
