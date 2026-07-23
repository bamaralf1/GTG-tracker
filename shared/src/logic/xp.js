import { NIVEIS, getNivel, getRankMult } from '../model/niveis.js';
import { getHoje, getOntem, getInicioSemana } from '../utils/date.js';

export { getInicioSemana };

export function calcularXPSerie(exercicio, valor, peso) {
  let base = 0;
  if (exercicio.tipo === "reps") {
    base = valor;
  } else if (exercicio.tipo === "tempo") {
    base = 2 * valor;
  } else if (exercicio.tipo === "peso") {
    base = (peso || 0) * valor;
  }
  return Math.round(base);
}

export function aplicarBonusStreak(baseXP, streakAtual) {
  const bonus = calcularBonusStreak(streakAtual);
  return Math.round(baseXP * (1 + bonus));
}

export function calcularBonusStreak(atual) {
  if (atual >= 30) return 0.25;
  if (atual >= 14) return 0.15;
  if (atual >= 7) return 0.10;
  return 0;
}

export function calcularRankMult(totalXp) {
  const level = getNivel(totalXp);
  const idx = NIVEIS.indexOf(level);
  if (idx < 0) return 1;
  if (idx <= 3)  return 1.0;
  if (idx <= 6)  return 0.90;
  if (idx <= 9)  return 0.78;
  if (idx <= 12) return 0.64;
  if (idx <= 15) return 0.50;
  if (idx <= 18) return 0.38;
  return 0.28;
}

export function adicionarXP(xpData, amount) {
  const prevTotal = xpData.total;
  xpData.total += amount;
  const hoje = getHoje();
  if (xpData.dailyDate === hoje) {
    xpData.dailyXP += amount;
  } else {
    xpData.dailyXP = amount;
    xpData.dailyDate = hoje;
  }
  xpData.xpHistory.push({ date: hoje, xp: amount, total: xpData.total });
  if (xpData.xpHistory.length > 30) {
    xpData.xpHistory = xpData.xpHistory.slice(-30);
  }
  const level = getNivel(xpData.total);
  const oldLevelName = xpData.nivel;
  const leveledUp = oldLevelName !== level.nome && oldLevelName !== "RECRUTA";
  xpData.nivel = level.nome;
  xpData.nivelAtualEm = level.min;
  xpData.proximoNivelEm = level.proximo;
  return { prevTotal, newTotal: xpData.total, level, leveledUp, oldLevelName };
}

export function getXpProgress(xpData) {
  const level = getNivel(xpData.total);
  const range = level.proximo - level.min;
  const current = xpData.total - level.min;
  const pct = range > 0 ? Math.min(100, Math.round(100 * current / range)) : 100;
  return { level, pct, current, range };
}

export function verificarStreak(streakData, registros) {
  const hoje = getHoje();
  const ontem = getOntem();
  const temHoje = registros.some(reg => reg.data === hoje);
  let changed = false;

  if (streakData.ultimaData === hoje) {
    return { changed: false, event: null };
  }

  if (temHoje) {
    if (streakData.ultimaData !== ontem && streakData.ultimaData) {
      const diff = getDiasEntre(streakData.ultimaData, hoje);
      if (diff === 2 && streakData.diasFolgaUsados < 1) {
        streakData.diasFolgaUsados += 1;
        streakData.atual += 1;
        changed = true;
      } else if (diff > 1 && diff < 999) {
        if (streakData.streakShields > 0) {
          streakData.streakShields -= 1;
          streakData.atual += 1;
          changed = true;
        } else {
          streakData.atual = 1;
          streakData.diasFolgaUsados = 0;
          changed = true;
        }
      }
    } else {
      streakData.atual += 1;
      changed = true;
    }
    streakData.ultimaData = hoje;
    if (streakData.atual > streakData.recorde) {
      streakData.recorde = streakData.atual;
    }
    const inicioSemana = getInicioSemana(hoje);
    if (streakData.semanaInicio !== inicioSemana) {
      streakData.semanaInicio = inicioSemana;
      streakData.diasFolgaUsados = 0;
    }
  }
  return { changed, event: null };
}

function getDiasEntre(d1, d2) {
  const a = new Date(d1 + "T12:00:00");
  const b = new Date(d2 + "T12:00:00");
  return Math.floor((b - a) / 86400000);
}
