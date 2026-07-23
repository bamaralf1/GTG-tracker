import { NIVEIS, getNivel, getRankMult } from '../src/model/niveis.js';

describe('NIVEIS', () => {
  test('tem 18 níveis', () => {
    expect(NIVEIS).toHaveLength(18);
    expect(NIVEIS[0].nome).toBe('RECRUTA');
    expect(NIVEIS[NIVEIS.length - 1].nome).toBe('LENDA VIVA');
  });

  test('cada nível tem propriedades obrigatórias', () => {
    NIVEIS.forEach(n => {
      expect(n).toHaveProperty('nome');
      expect(n).toHaveProperty('icone');
      expect(n).toHaveProperty('min');
      expect(n).toHaveProperty('proximo');
      expect(n).toHaveProperty('estrelas');
      expect(n).toHaveProperty('divisao');
    });
  });

  test('níveis estão em ordem crescente de XP', () => {
    for (let i = 1; i < NIVEIS.length; i++) {
      expect(NIVEIS[i].min).toBeGreaterThan(NIVEIS[i-1].min);
    }
  });
});

describe('getNivel', () => {
  test('XP 0 → RECRUTA', () => {
    expect(getNivel(0).nome).toBe('RECRUTA');
  });

  test('XP 1200 → ASPIRANTE', () => {
    expect(getNivel(1200).nome).toBe('ASPIRANTE');
  });

  test('XP no limite de um nível retorna o nível correto', () => {
    expect(getNivel(1199).nome).toBe('RECRUTA');
    expect(getNivel(1200).nome).toBe('ASPIRANTE');
  });

  test('XP muito alto → LENDA VIVA', () => {
    expect(getNivel(9999999).nome).toBe('LENDA VIVA');
  });
});

describe('getRankMult', () => {
  test('RECRUTA → 1.0', () => {
    expect(getRankMult('RECRUTA')).toBe(1.0);
  });

  test('LENDA VIVA → 0.38', () => {
    expect(getRankMult('LENDA VIVA')).toBe(0.38);
  });

  test('nível desconhecido → 1.0 (fallback)', () => {
    expect(getRankMult('INEXISTENTE')).toBe(1.0);
  });
});
