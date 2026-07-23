import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';
import ChartsTab from './history/ChartsTab';
import ExportTab from './history/ExportTab';

const TABS = [
  { key: 'history', label: 'HISTÓRICO' },
  { key: 'charts', label: 'GRÁFICOS' },
  { key: 'export', label: 'EXPORTAR' },
];

function HistoryTab() {
  return (
    <View style={styles.tabContent}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>📋</Text>
        <Text style={styles.emptyText}>Nenhum registro hoje</Text>
        <Text style={styles.emptySub}>Registre séries para ver seu histórico</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>ESTATÍSTICAS</Text>
        {[
          { label: 'Total de séries', value: '0' },
          { label: 'Total de reps', value: '0' },
          { label: 'XP total', value: '0' },
          { label: 'Streak atual', value: '0 dias' },
          { label: 'Recorde', value: '0 dias' },
        ].map((s, i) => (
          <View key={i} style={styles.statRow}>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabBtnText, activeTab === tab.key && styles.tabBtnTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.mainTitle}>HISTÓRICO</Text>
        <Text style={styles.mainSubtitle}>REGISTRO DE TREINOS</Text>

        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'charts' && <ChartsTab />}
        {activeTab === 'export' && <ExportTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  mainTitle: { fontSize: fontSize.xxl, color: colors.gold, letterSpacing: 4, textAlign: 'center', fontWeight: 'bold', marginTop: spacing.md },
  mainSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl, fontFamily: 'monospace' },
  tabBar: { flexDirection: 'row', backgroundColor: colors.bg, paddingBottom: spacing.sm, paddingHorizontal: spacing.xl, gap: spacing.xs },
  tabBtn: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnActive: { borderBottomColor: colors.gold },
  tabBtnText: { fontSize: fontSize.xs, color: colors.textMuted, letterSpacing: 2, fontFamily: 'monospace' },
  tabBtnTextActive: { color: colors.gold },
  tabContent: {},
  emptyCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.xxxl, alignItems: 'center', marginBottom: spacing.xxl },
  emptyIcon: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { fontSize: fontSize.lg, color: colors.textSecondary, fontFamily: 'monospace' },
  emptySub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.xs, fontFamily: 'monospace' },
  card: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg },
  cardTitle: { fontSize: fontSize.xs, color: colors.gold, letterSpacing: 3, fontFamily: 'monospace', marginBottom: spacing.lg },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  statLabel: { fontSize: fontSize.md, color: colors.textSecondary, fontFamily: 'monospace' },
  statValue: { fontSize: fontSize.md, color: colors.text, fontWeight: 'bold', fontFamily: 'monospace' },
});
