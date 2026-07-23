export const READINESS_FACTOR_KEYS = ["sono", "stress", "dor", "energia", "hidratacao", "alimentacao", "motivacao"];

export const PRIORITY_LEVELS = [
  { valor: 0.7, nivel: "baixa", label: "0.7×" },
  { valor: 1.0, nivel: "normal", label: "1×" },
  { valor: 1.5, nivel: "alta", label: "1.5×" }
];

export const DEFAULT_READINESS = {
  sono: 5, stress: 5, dor: 5, energia: 5,
  hidratacao: 5, alimentacao: 5, motivacao: 5,
  score: 50, data: null
};

export const DEFAULT_WEIGHTS = {
  sono: 1, stress: 1, dor: 1, energia: 1,
  hidratacao: 1, alimentacao: 1, motivacao: 1
};

export function getReadinessStatus(score) {
  if (score >= 80) return { label: "PRONTO PARA GUERRA", cor: "green", icone: "🪖" };
  if (score >= 65) return { label: "OPERACIONAL", cor: "gold", icone: "⚔" };
  if (score >= 50) return { label: "MODERADO", cor: "yellow", icone: "🔰" };
  if (score >= 35) return { label: "FADIGA", cor: "orange", icone: "⚠" };
  return { label: "ESGOTADO", cor: "red", icone: "🔥" };
}

export function getReadinessLabel(score) {
  return getReadinessStatus(score).label;
}

export function calcularReadiness(fatores, weights) {
  const sons = Object.values(fatores);
  if (sons.length === 0) return 50;
  let soma = 0, totalPeso = 0;
  for (const [key, val] of Object.entries(fatores)) {
    const peso = (weights && weights[key]) || 1;
    soma += val * peso;
    totalPeso += peso;
  }
  const media = totalPeso > 0 ? soma / totalPeso : 0;
  return Math.round((media / 10) * 100);
}

export function getUsuarioFatorDisplay(fator) {
  const mapa = {
    sono: { nome: "Sono", icone: "😴" },
    stress: { nome: "Stress", icone: "😰" },
    dor: { nome: "Dor Muscular", icone: "🤕" },
    energia: { nome: "Energia", icone: "⚡" },
    hidratacao: { nome: "Hidratação", icone: "💧" },
    alimentacao: { nome: "Alimentação", icone: "🍗" },
    motivacao: { nome: "Motivação", icone: "🔥" }
  };
  return mapa[fator] || { nome: fator, icone: "❓" };
}
