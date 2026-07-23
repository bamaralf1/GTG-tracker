import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native';
import { colors, spacing, fontSize } from '../../theme/colors';
import { getHoje, formatDateBR } from '@gtg/shared';

export default function ExportTab({ navigation }) {
  const hoje = getHoje();

  const exportOptions = [
    { icon: '📋', label: 'RESUMO DO DIA', desc: 'Compartilhar resumo em texto', action: 'share' },
    { icon: '📊', label: 'DADOS COMPLETOS', desc: 'Exportar JSON completo', action: 'export' },
    { icon: '🔄', label: 'IMPORTAR DADOS', desc: 'Restaurar de backup', action: 'import' },
    { icon: '🗑', label: 'LIMPAR DADOS', desc: 'Resetar todo o progresso', action: 'clear', danger: true },
  ];

  const handleAction = async (action) => {
    switch (action) {
      case 'share': {
        const hojeFormatado = formatDateBR(hoje);
        const msg = `🏋 GTG TRACKER — ${hojeFormatado}\n\n📊 Séries: 0\n💪 Reps: 0\n⭐ XP: 0\n🔥 Streak: 0d\n\n"Frequência > Intensidade. Uma série agora > Zero séries depois."`;
        try {
          await Share.share({ message: msg, title: 'GTG Tracker - Resumo' });
        } catch (_) {}
        break;
      }
      case 'export':
        try {
          await Share.share({ message: 'Exportação completa em breve.', title: 'Exportar Dados' });
        } catch (_) {}
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>EXPORTAR / COMPARTILHAR</Text>
        <Text style={styles.subtitle}>DADOS E BACKUP</Text>

        {exportOptions.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, opt.danger && styles.cardDanger]}
            onPress={() => handleAction(opt.action)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>{opt.icon}</Text>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardLabel, opt.danger && styles.textDanger]}>{opt.label}</Text>
                <Text style={styles.cardDesc}>{opt.desc}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>GTG TRACKER v1.0.0</Text>
          <Text style={styles.footerSub}>FORÇA E RESISTÊNCIA</Text>
        </View>
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
  cardDanger: { borderColor: 'rgba(204,0,0,0.3)' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 24, marginRight: spacing.lg },
  cardInfo: { flex: 1 },
  cardLabel: { fontSize: fontSize.md, color: colors.text, letterSpacing: 2 },
  cardDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2, fontFamily: 'monospace' },
  textDanger: { color: colors.redBright },
  arrow: { fontSize: 24, color: colors.textMuted },
  footer: { alignItems: 'center', marginTop: spacing.xxxl },
  footerText: { fontSize: fontSize.sm, color: colors.textMuted, fontFamily: 'monospace', letterSpacing: 2 },
  footerSub: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.xs, fontFamily: 'monospace', letterSpacing: 3 },
});
