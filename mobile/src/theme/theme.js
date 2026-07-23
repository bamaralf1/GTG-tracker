import { colors, spacing, fontSize } from './colors';
import { typography } from './typography';
import { shadows } from './shadows';

export const theme = {
  colors,
  spacing,
  fontSize,
  typography,
  shadows,
  get fontFamily() {
    return typography;
  },
};

export function themed(variant, props) {
  const map = {
    card: {
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: spacing.lg,
      ...shadows.sm,
    },
    cardActive: {
      borderColor: colors.gold,
      ...shadows.gold,
    },
    title: {
      fontSize: fontSize.xxl,
      color: colors.gold,
      letterSpacing: 4,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: typography.bebas,
    },
    subtitle: {
      fontSize: fontSize.xs,
      color: colors.textMuted,
      textAlign: 'center',
      letterSpacing: 4,
      marginBottom: spacing.xxl,
      fontFamily: typography.mono,
    },
    label: {
      fontSize: fontSize.xs,
      color: colors.gold,
      letterSpacing: 3,
      fontFamily: typography.mono,
      marginBottom: spacing.sm,
    },
    value: {
      fontSize: fontSize.xxl,
      fontWeight: 'bold',
      fontFamily: typography.mono,
      letterSpacing: 2,
    },
    btnGold: {
      backgroundColor: 'rgba(212,168,67,0.12)',
      borderWidth: 1,
      borderColor: 'rgba(212,168,67,0.3)',
      borderRadius: 8,
      padding: spacing.lg,
      alignItems: 'center',
    },
    btnGoldText: {
      fontSize: fontSize.md,
      color: colors.gold,
      letterSpacing: 2,
      fontFamily: typography.mono,
    },
  };
  return map[variant] || {};
}
