import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../theme/colors';

const WARMUP_EXERCISES = [
  { id: 'mobilidade_pesco', nome: 'Mobilidade de Pescoço', duracao: '30s', desc: 'Rotações lentas em ambos os sentidos' },
  { id: 'rotacao_ombro', nome: 'Rotação de Ombros', duracao: '30s', desc: 'Círculos para frente e para trás' },
  { id: 'cat_cow', nome: 'Gato-Vaca (Cat-Cow)', duracao: '45s', desc: 'Mobilidade de coluna em 4 apoios' },
  { id: 'abertura_quadril', nome: 'Abertura de Quadril', duracao: '45s', desc: 'Pomba (pigeon pose) de cada lado' },
  { id: 'agachamento_profundo', nome: 'Agachamento Profundo', duracao: '30s', desc: 'Mantenha na posição baixa, cotovelos empurrando joelhos' },
  { id: 'halo_kettlebell', nome: 'Halo com KB', duracao: '30s', desc: 'Gire o kettlebell ao redor da cabeça' },
  { id: 'glute_bridge', nome: 'Ponte de Glúteo', duracao: '30s', desc: 'Ativação de glúteo com pausa no topo' },
  { id: 'band_pull_apart', nome: 'Band Pull-apart', duracao: '30s', desc: 'Ativação escapular com elástico' },
  { id: 'thoracic_rotation', nome: 'Rotação Torácica', duracao: '45s', desc: 'Em 4 apoios, gire o tronco abrindo o braço' },
  { id: 'leg_swing', nome: 'Leg Swing', duracao: '45s', desc: 'Balanço de perna frontal e lateral' },
];

export default function WarmupScreen() {
  const [completed, setCompleted] = useState(new Set());
  const [active, setActive] = useState(null);

  const toggleComplete = (id) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const progress = WARMUP_EXERCISES.length > 0 ? Math.round((completed.size / WARMUP_EXERCISES.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>ATIVAÇÃO PRÉ-COMBATE</Text>
        <Text style={styles.subtitle}>WARMUP / MOBILIDADE</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{completed.size}/{WARMUP_EXERCISES.length} · {progress}%</Text>
        </View>

        {WARMUP_EXERCISES.map(ex => (
          <TouchableOpacity
            key={ex.id}
            style={[styles.card, completed.has(ex.id) && styles.cardDone, active === ex.id && styles.cardActive]}
            onPress={() => toggleComplete(ex.id)}
            onLongPress={() => setActive(active === ex.id ? null : ex.id)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.checkBox}>{completed.has(ex.id) ? '✅' : '⬜'}</Text>
              <View style={styles.cardInfo}>
                <Text style={[styles.exName, completed.has(ex.id) && styles.textDone]}>{ex.nome}</Text>
                <Text style={styles.exDur}>{ex.duracao}</Text>
              </View>
            </View>
            {active === ex.id && <Text style={styles.exDesc}>{ex.desc}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.xl, paddingBottom: 40 },
  title: { fontSize: fontSize.xxl, color: colors.redBright, letterSpacing: 4, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', letterSpacing: 4, marginBottom: spacing.xxl, fontFamily: 'monospace' },
  progressCard: { marginBottom: spacing.xxl },
  progressBg: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden', marginBottom: spacing.sm },
  progressFill: { height: '100%', backgroundColor: colors.redBright, borderRadius: 3 },
  progressText: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', fontFamily: 'monospace' },
  card: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.lg, marginBottom: spacing.sm },
  cardDone: { opacity: 0.6 },
  cardActive: { borderColor: colors.redBright },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  checkBox: { fontSize: 18, marginRight: spacing.md },
  cardInfo: { flex: 1 },
  exName: { fontSize: fontSize.md, color: colors.text, letterSpacing: 1 },
  textDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  exDur: { fontSize: fontSize.xs, color: colors.textMuted, fontFamily: 'monospace', marginTop: 2 },
  exDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, fontFamily: 'monospace' },
});
