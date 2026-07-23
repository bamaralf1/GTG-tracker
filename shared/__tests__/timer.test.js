import { REST_TIMER_PHASES, getRestPhase, getRestPhaseLabel, getRestPhaseColor, getGlowIntensity } from '../src/logic/timer.js';

describe('REST_TIMER_PHASES', () => {
  test('tem 4 fases', () => {
    expect(Object.keys(REST_TIMER_PHASES)).toHaveLength(4);
    expect(REST_TIMER_PHASES.NORMAL).toBeDefined();
    expect(REST_TIMER_PHASES.CRITICAL).toBeDefined();
  });
});

describe('getRestPhase', () => {
  test('pct <= 0.15 → critical', () => {
    expect(getRestPhase(0)).toBe('critical');
    expect(getRestPhase(0.15)).toBe('critical');
  });

  test('pct 0.16 a 0.30 → urgent', () => {
    expect(getRestPhase(0.16)).toBe('urgent');
    expect(getRestPhase(0.30)).toBe('urgent');
  });

  test('pct 0.31 a 0.50 → warning', () => {
    expect(getRestPhase(0.31)).toBe('warning');
    expect(getRestPhase(0.50)).toBe('warning');
  });

  test('pct > 0.50 → normal', () => {
    expect(getRestPhase(0.51)).toBe('normal');
    expect(getRestPhase(1.0)).toBe('normal');
  });
});

describe('getRestPhaseLabel', () => {
  test('retorna label para cada fase', () => {
    expect(getRestPhaseLabel('critical')).toMatch(/CRÍTICA/);
    expect(getRestPhaseLabel('urgent')).toMatch(/URGENTE/);
    expect(getRestPhaseLabel('warning')).toMatch(/ATENÇÃO/);
    expect(getRestPhaseLabel('normal')).toMatch(/RECUPERANDO/);
  });

  test('retorna fallback para fase desconhecida', () => {
    expect(getRestPhaseLabel('unknown')).toBe('DESCANSO');
  });
});

describe('getRestPhaseColor', () => {
  test('retorna cores para cada fase', () => {
    const critical = getRestPhaseColor('critical');
    expect(critical.primary).toBeDefined();
    expect(critical.secondary).toBeDefined();
  });

  test('retorna cor normal para fase desconhecida', () => {
    expect(getRestPhaseColor('unknown')).toEqual(getRestPhaseColor('normal'));
  });
});

describe('getGlowIntensity', () => {
  test('maior intensidade quando pct é baixo', () => {
    expect(getGlowIntensity(0)).toBeGreaterThan(getGlowIntensity(0.5));
  });

  test('intensidade nunca ultrapassa 0.55', () => {
    expect(getGlowIntensity(0)).toBeLessThanOrEqual(0.55);
    expect(getGlowIntensity(1)).toBeLessThanOrEqual(0.55);
  });

  test('valor mínimo para pct=1', () => {
    expect(getGlowIntensity(1)).toBeCloseTo(0.06);
  });
});
