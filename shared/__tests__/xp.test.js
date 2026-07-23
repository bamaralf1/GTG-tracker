import { calcularXPSerie, aplicarBonusStreak, calcularBonusStreak, calcularRankMult, adicionarXP, getXpProgress, verificarStreak } from '../src/logic/xp.js';
import { NIVEIS } from '../src/model/niveis.js';

describe('calcularXPSerie', () => {
  const exReps = { tipo: 'reps' };
  const exTempo = { tipo: 'tempo' };
  const exPeso = { tipo: 'peso' };

  test('calcula XP para exercício de repetição', () => {
    expect(calcularXPSerie(exReps, 10, 0)).toBe(10);
    expect(calcularXPSerie(exReps, 0, 0)).toBe(0);
  });

  test('calcula XP para exercício de tempo (2× valor)', () => {
    expect(calcularXPSerie(exTempo, 30, 0)).toBe(60);
    expect(calcularXPSerie(exTempo, 60, 0)).toBe(120);
  });

  test('calcula XP para exercício de peso (peso × valor)', () => {
    expect(calcularXPSerie(exPeso, 5, 20)).toBe(100);
    expect(calcularXPSerie(exPeso, 10, 0)).toBe(0);
  });

  test('arredonda o resultado', () => {
    expect(calcularXPSerie(exTempo, 7, 0)).toBe(14);
  });
});

describe('calcularBonusStreak / aplicarBonusStreak', () => {
  test('retorna 0 para streak < 7', () => {
    expect(calcularBonusStreak(0)).toBe(0);
    expect(calcularBonusStreak(3)).toBe(0);
    expect(calcularBonusStreak(6)).toBe(0);
  });

  test('retorna 10% para streak >= 7', () => {
    expect(calcularBonusStreak(7)).toBe(0.10);
    expect(calcularBonusStreak(13)).toBe(0.10);
  });

  test('retorna 15% para streak >= 14', () => {
    expect(calcularBonusStreak(14)).toBe(0.15);
    expect(calcularBonusStreak(29)).toBe(0.15);
  });

  test('retorna 25% para streak >= 30', () => {
    expect(calcularBonusStreak(30)).toBe(0.25);
    expect(calcularBonusStreak(100)).toBe(0.25);
  });

  test('aplicarBonusStreak aplica o multiplicador', () => {
    expect(aplicarBonusStreak(100, 7)).toBe(110);
    expect(aplicarBonusStreak(100, 14)).toBe(115);
    expect(aplicarBonusStreak(100, 30)).toBe(125);
    expect(aplicarBonusStreak(100, 0)).toBe(100);
  });
});

describe('calcularRankMult', () => {
  test('retorna 1.0 para os 4 primeiros níveis (RECRUTA a CABO)', () => {
    for (let i = 0; i <= 3; i++) {
      expect(calcularRankMult(NIVEIS[i].min)).toBe(1.0);
    }
  });

  test('retorna 0.90 para níveis 4-6 (Sargento)', () => {
    for (let i = 4; i <= 6; i++) {
      expect(calcularRankMult(NIVEIS[i].min)).toBe(0.90);
    }
  });

  test('retorna valores progressivamente menores para níveis mais altos', () => {
    const mults = NIVEIS.map(n => calcularRankMult(n.min));
    for (let i = 1; i < mults.length; i++) {
      expect(mults[i]).toBeLessThanOrEqual(mults[i-1]);
    }
  });

  test('retorna 0.38 para último nível', () => {
    expect(calcularRankMult(9999999)).toBe(0.38);
  });
});

describe('adicionarXP', () => {
  test('adiciona XP e retorna objeto com resultado', () => {
    const xpData = { total: 100, nivel: 'RECRUTA', nivelAtualEm: 0, proximoNivelEm: 1200, dailyXP: 0, dailyDate: '', xpHistory: [] };
    const result = adicionarXP(xpData, 50);
    expect(result.prevTotal).toBe(100);
    expect(result.newTotal).toBe(150);
    expect(result.leveledUp).toBe(false);
  });

  test('atualiza dailyXP', () => {
    const hoje = new Date().toISOString().slice(0, 10);
    const xpData = { total: 0, nivel: 'RECRUTA', nivelAtualEm: 0, proximoNivelEm: 1200, dailyXP: 0, dailyDate: '', xpHistory: [] };
    adicionarXP(xpData, 100);
    expect(xpData.dailyXP).toBe(100);
    expect(xpData.dailyDate).toBe(hoje);
  });

  test('limita histórico a 30 entradas', () => {
    const xpData = { total: 0, nivel: 'RECRUTA', nivelAtualEm: 0, proximoNivelEm: 1200, dailyXP: 0, dailyDate: '', xpHistory: [] };
    for (let i = 0; i < 35; i++) {
      adicionarXP(xpData, 10);
    }
    expect(xpData.xpHistory.length).toBe(30);
  });
});

describe('getXpProgress', () => {
  test('retorna progresso 0% no início', () => {
    const xpData = { total: 0, nivel: 'RECRUTA', nivelAtualEm: 0, proximoNivelEm: 1200, dailyXP: 0, dailyDate: '', xpHistory: [] };
    const progress = getXpProgress(xpData);
    expect(progress.pct).toBe(0);
    expect(progress.level.nome).toBe('RECRUTA');
  });

  test('retorna 100% quando atinge o próximo nível', () => {
    const xpData = { total: 1200, nivel: 'ASPIRANTE', nivelAtualEm: 1200, proximoNivelEm: 3000, dailyXP: 0, dailyDate: '', xpHistory: [] };
    const progress = getXpProgress(xpData);
    expect(progress.pct).toBe(0);
  });
});
