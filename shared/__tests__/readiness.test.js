import { calcularReadiness, getReadinessStatus, getReadinessLabel, getUsuarioFatorDisplay, READINESS_FACTOR_KEYS, PRIORITY_LEVELS, DEFAULT_READINESS, DEFAULT_WEIGHTS } from '../src/logic/readiness.js';

describe('READINESS_FACTOR_KEYS', () => {
  test('contém 7 fatores', () => {
    expect(READINESS_FACTOR_KEYS).toHaveLength(7);
    expect(READINESS_FACTOR_KEYS).toContain('sono');
    expect(READINESS_FACTOR_KEYS).toContain('stress');
    expect(READINESS_FACTOR_KEYS).toContain('motivacao');
  });
});

describe('PRIORITY_LEVELS', () => {
  test('tem 3 níveis', () => {
    expect(PRIORITY_LEVELS).toHaveLength(3);
    expect(PRIORITY_LEVELS[0].nivel).toBe('baixa');
    expect(PRIORITY_LEVELS[1].nivel).toBe('normal');
    expect(PRIORITY_LEVELS[2].nivel).toBe('alta');
  });
});

describe('DEFAULT_READINESS', () => {
  test('todos fatores começam em 5 com score 50', () => {
    expect(DEFAULT_READINESS.score).toBe(50);
    expect(DEFAULT_READINESS.sono).toBe(5);
    expect(DEFAULT_READINESS.stress).toBe(5);
  });
});

describe('calcularReadiness', () => {
  test('retorna 50 para todos valores 5', () => {
    const todos5 = { sono: 5, stress: 5, dor: 5, energia: 5, hidratacao: 5, alimentacao: 5, motivacao: 5 };
    expect(calcularReadiness(todos5, DEFAULT_WEIGHTS)).toBe(50);
  });

  test('retorna 100 para valores máximos', () => {
    const max = { sono: 10, stress: 10, dor: 10, energia: 10, hidratacao: 10, alimentacao: 10, motivacao: 10 };
    expect(calcularReadiness(max, DEFAULT_WEIGHTS)).toBe(100);
  });

  test('retorna 0 para valores mínimos', () => {
    const min = { sono: 0, stress: 0, dor: 0, energia: 0, hidratacao: 0, alimentacao: 0, motivacao: 0 };
    expect(calcularReadiness(min, DEFAULT_WEIGHTS)).toBe(0);
  });

  test('retorna 50 para fatores vazios (fallback)', () => {
    expect(calcularReadiness({}, {})).toBe(50);
  });

  test('usa weights personalizados', () => {
    const fatores = { sono: 10, stress: 0 };
    const weights = { sono: 3, stress: 1 };
    const result = calcularReadiness(fatores, weights);
    // (10*3 + 0*1) / (3+1) = 30/4 = 7.5 -> (7.5/10)*100 = 75
    expect(result).toBe(75);
  });
});

describe('getReadinessStatus', () => {
  test('score >= 80 → PRONTO PARA GUERRA', () => {
    const status = getReadinessStatus(85);
    expect(status.label).toMatch(/PRONTO/);
    expect(status.cor).toBe('green');
  });

  test('score 65-79 → OPERACIONAL', () => {
    expect(getReadinessStatus(70).label).toMatch(/OPERACIONAL/);
  });

  test('score 50-64 → MODERADO', () => {
    expect(getReadinessStatus(55).label).toMatch(/MODERADO/);
  });

  test('score 35-49 → FADIGA', () => {
    expect(getReadinessStatus(40).label).toMatch(/FADIGA/);
  });

  test('score < 35 → ESGOTADO', () => {
    expect(getReadinessStatus(20).label).toMatch(/ESGOTADO/);
  });

  test('getReadinessLabel retorna apenas o label', () => {
    expect(getReadinessLabel(85)).toMatch(/PRONTO/);
  });
});

describe('getUsuarioFatorDisplay', () => {
  test('retorna nome e ícone para cada fator', () => {
    const result = getUsuarioFatorDisplay('sono');
    expect(result.nome).toBe('Sono');
    expect(typeof result.icone).toBe('string');
  });

  test('retorna fallback para fator desconhecido', () => {
    const result = getUsuarioFatorDisplay('desconhecido');
    expect(result.nome).toBe('desconhecido');
  });
});
