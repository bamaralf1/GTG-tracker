import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';

const SKILL_BRANCHES = [
  { nome: 'FORÇA', icone: '💪', skills: [
    { nome: 'Flexão', nivel: 1, max: 5, desc: 'Complete 100 flexões no total' },
    { nome: 'Barra Fixa', nivel: 0, max: 5, desc: 'Complete 50 barras fixas' },
    { nome: 'Agachamento', nivel: 0, max: 5, desc: 'Complete 100 agachamentos' },
  ]},
  { nome: 'RESISTÊNCIA', icone: '🏃', skills: [
    { nome: 'Prancha', nivel: 2, max: 5, desc: 'Acumule 30min de prancha' },
    { nome: 'Dips', nivel: 0, max: 5, desc: 'Complete 50 mergulhos' },
  ]},
  { nome: 'MOBILIDADE', icone: '🧘', skills: [
    { nome: 'TGU', nivel: 0, max: 5, desc: 'Complete 30 Turkish Get-ups' },
    { nome: 'Pistol', nivel: 0, max: 5, desc: 'Complete 30 pistols' },
  ]},
  { nome: 'CONDICIONAMENTO', icone: '🔥', skills: [
    { nome: 'KB Swing', nivel: 0, max: 5, desc: 'Complete 500 swings' },
    { nome: 'Circuito', nivel: 0, max: 5, desc: 'Complete 10 circuitos' },
  ]},
];

export default function SkillTreeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>ÁRVORE DE HABILIDADES</Text>
        <Text style={styles.subtitle}>SKILL TREE</Text>

        {SKILL_BRANCHES.map(branch => (
          <View key={branch.nome} style={styles.branch}>
            <View style={styles.branchHeader}>
              <Text style={styles.branchIcon}>{branch.icone}</Text>
              <Text style={styles.branchName}>{branch.nome}</Text>
            </View>
            {branch.skills.map(skill => (
              <View key={skill.nome} style={styles.skillRow}>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.nome}</Text>
                  <Text style={styles.skillDesc}>{skill.desc}</Text>
                </View>
                <View style={styles.skillLevels}>
                  {Array.from({ length: skill.max }, (_, i) => (
                    <View key={i} style={[styles.levelDot, i < skill.nivel && styles.levelDotActive]} />
                  ))}
                </View>
              </View>
            ))}
          </View>
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
  branch: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, marginBottom: spacing.lg },
  branchHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  branchIcon: { fontSize: 24, marginRight: spacing.md },
  branchName: { fontSize: fontSize.lg, color: colors.gold, letterSpacing: 3, fontWeight: 'bold' },
  skillRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  skillInfo: { flex: 1 },
  skillName: { fontSize: fontSize.sm, color: colors.text, letterSpacing: 1 },
  skillDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2, fontFamily: 'monospace' },
  skillLevels: { flexDirection: 'row', gap: 4, marginLeft: spacing.md },
  levelDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.borderAlt || '#2a2a2a', borderWidth: 1, borderColor: '#333' },
  levelDotActive: { backgroundColor: colors.gold, borderColor: colors.goldLight },
});
