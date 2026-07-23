import { getHoje, getOntem, getInicioSemana, getDiasEntre, formatDateBR, getDiaSemanaLabel, getMesLabel } from '../src/utils/date.js';

describe('getHoje', () => {
  test('retorna data no formato YYYY-MM-DD', () => {
    const hoje = getHoje();
    expect(hoje).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('retorna a data atual', () => {
    const hoje = new Date().toISOString().slice(0, 10);
    expect(getHoje()).toBe(hoje);
  });
});

describe('getOntem', () => {
  test('retorna ontem no formato YYYY-MM-DD', () => {
    expect(getOntem()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('diferença entre hoje e ontem é 1 dia', () => {
    const diff = getDiasEntre(getOntem(), getHoje());
    expect(diff).toBe(1);
  });
});

describe('getInicioSemana', () => {
  test('retorna segunda-feira da mesma semana', () => {
    // Se data for quarta-feira, início da semana deve ser segunda
    const result = getInicioSemana('2026-07-22'); // quarta
    expect(result).toBe('2026-07-20'); // segunda
  });

  test('retorna a própria data se for segunda', () => {
    expect(getInicioSemana('2026-07-20')).toBe('2026-07-20');
  });

  test('domingo retorna segunda anterior', () => {
    // 2026-07-19 é domingo
    expect(getInicioSemana('2026-07-19')).toBe('2026-07-13');
  });
});

describe('getDiasEntre', () => {
  test('retorna 0 para mesma data', () => {
    expect(getDiasEntre('2026-07-22', '2026-07-22')).toBe(0);
  });

  test('retorna 1 para dias consecutivos', () => {
    expect(getDiasEntre('2026-07-21', '2026-07-22')).toBe(1);
  });

  test('retorna valor negativo se d1 > d2', () => {
    expect(getDiasEntre('2026-07-22', '2026-07-21')).toBe(-1);
  });
});

describe('formatDateBR', () => {
  test('converte YYYY-MM-DD para DD/MM/YYYY', () => {
    expect(formatDateBR('2026-07-22')).toBe('22/07/2026');
  });

  test('retorna fallback para data vazia', () => {
    expect(formatDateBR(null)).toBe('—');
    expect(formatDateBR('')).toBe('—');
  });

  test('retorna a string original se não tiver 3 partes', () => {
    expect(formatDateBR('invalida')).toBe('invalida');
  });
});

describe('getDiaSemanaLabel', () => {
  test('retorna label em português', () => {
    expect(getDiaSemanaLabel(0)).toBe('DOM');
    expect(getDiaSemanaLabel(1)).toBe('SEG');
    expect(getDiaSemanaLabel(6)).toBe('SAB');
  });

  test('retorna vazio para dia inválido', () => {
    expect(getDiaSemanaLabel(7)).toBe('');
  });
});

describe('getMesLabel', () => {
  test('retorna label em português', () => {
    expect(getMesLabel(0)).toBe('JAN');
    expect(getMesLabel(5)).toBe('JUN');
    expect(getMesLabel(11)).toBe('DEZ');
  });

  test('retorna vazio para mês inválido', () => {
    expect(getMesLabel(12)).toBe('');
  });
});
