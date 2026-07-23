export const defaultDados = () => ({
  exercicios: [],
  registros: [],
  metas: {},
  aquecimento: {}
});

export const defaultStreakData = () => ({
  atual: 0,
  recorde: 0,
  ultimaData: null,
  diasFolgaUsados: 0,
  semanaInicio: null,
  streakShields: 0,
  shieldCost: 500
});

export const defaultXpData = () => ({
  total: 0,
  nivel: "RECRUTA",
  proximoNivelEm: 1000,
  nivelAtualEm: 0,
  dailyXP: 0,
  dailyDate: "",
  xpHistory: []
});

export const defaultRestTimer = () => ({
  intervalo: null,
  segundos: 0,
  rodando: false,
  exercicioId: null,
  exercicioNome: ""
});

export const defaultPlankTimer = () => ({
  intervalo: null,
  segundos: 0,
  rodando: false,
  preparando: false,
  pausado: false,
  exercicioId: null
});
