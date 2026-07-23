/**
 * GTG TRACKER — SKILL TREE
 * Árvore de habilidades baseada no método Grease The Groove de Pavel Tsatsouline
 * Estrutura de dados e lógica de desbloqueio
 */

// ============================================================
// CONSTANTE PRINCIPAL: SKILL_TREE
// ============================================================

const SKILL_TREE = {

  // ----------------------------------------------------------
  // 1. EMPURRAR (Push)
  // ----------------------------------------------------------
  EMPURRAR: {
    label: "EMPURRAR",
    icone: "💪",
    cor: "#CC0000",
    nos: {
      FLEXAO: {
        id: "FLEXAO",
        exercicioId: "flexao",
        nome: "FLEXÃO",
        categoria: "EMPURRAR",
        tipo: "base",          // sempre desbloqueado
        requisito: null,
        filhos: ["FLEXAO_DIAMANTE", "FLEXAO_LENTA", "FLEXAO_PES_ELEVADOS"]
      },
      FLEXAO_DIAMANTE: {
        id: "FLEXAO_DIAMANTE",
        exercicioId: "flexao_diamante",
        nome: "FLEXÃO DIAMANTE",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "FLEXAO", exercicioId: "flexao", threshold: 15 },
        filhos: ["ARCHER_PUSHUP"]
      },
      ARCHER_PUSHUP: {
        id: "ARCHER_PUSHUP",
        exercicioId: "archer_pushup",
        nome: "ARCHER PUSH-UP",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "FLEXAO_DIAMANTE", exercicioId: "flexao_diamante", threshold: 12 },
        filhos: ["OAP"]
      },
      OAP: {
        id: "OAP",
        exercicioId: "oap",
        nome: "OAP (1 BRAÇO)",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "ARCHER_PUSHUP", exercicioId: "archer_pushup", threshold: 8 },
        filhos: []
      },
      FLEXAO_LENTA: {
        id: "FLEXAO_LENTA",
        exercicioId: "flexao_lenta",
        nome: "FLEXÃO LENTA 5-1-5",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "FLEXAO", exercicioId: "flexao", threshold: 20 },
        filhos: ["FLEXAO_DECLINED"]
      },
      FLEXAO_DECLINED: {
        id: "FLEXAO_DECLINED",
        exercicioId: "flexao_declined",
        nome: "FLEXÃO DECLINED",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "FLEXAO_LENTA", exercicioId: "flexao_lenta", threshold: 10 },
        filhos: []
      },
      FLEXAO_PES_ELEVADOS: {
        id: "FLEXAO_PES_ELEVADOS",
        exercicioId: "flexao_pes_elevados",
        nome: "FLEXÃO PÉS ELEVADOS",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "FLEXAO", exercicioId: "flexao", threshold: 25 },
        filhos: []
      },
      DIPS: {
        id: "DIPS",
        exercicioId: "dips",
        nome: "DIPS / MERGULHO",
        categoria: "EMPURRAR",
        tipo: "base",
        requisito: null,
        filhos: ["DIP_ESTREITO", "DIP_PESO"]
      },
      DIP_ESTREITO: {
        id: "DIP_ESTREITO",
        exercicioId: "dip_estreito",
        nome: "DIP ESTREITO",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "DIPS", exercicioId: "dips", threshold: 15 },
        filhos: []
      },
      DIP_PESO: {
        id: "DIP_PESO",
        exercicioId: "dip_peso",
        nome: "DIP COM PESO",
        categoria: "EMPURRAR",
        tipo: "normal",
        requisito: { paiId: "DIPS", exercicioId: "dips", threshold: 20 },
        filhos: []
      }
    }
  },

  // ----------------------------------------------------------
  // 2. PUXAR (Pull)
  // ----------------------------------------------------------
  PUXAR: {
    label: "PUXAR",
    icone: "🏋️",
    cor: "#D4A843",
    nos: {
      BARRA_FIXA: {
        id: "BARRA_FIXA",
        exercicioId: "barra_fixa",
        nome: "BARRA FIXA",
        categoria: "PUXAR",
        tipo: "base",
        requisito: null,
        filhos: ["CHIN_UP", "NEUTRAL_GRIP", "NEGATIVA_LENTA"]
      },
      CHIN_UP: {
        id: "CHIN_UP",
        exercicioId: "chin_up",
        nome: "CHIN-UP",
        categoria: "PUXAR",
        tipo: "normal",
        requisito: { paiId: "BARRA_FIXA", exercicioId: "barra_fixa", threshold: 5 },
        filhos: ["L_SIT_PULLUP"]
      },
      L_SIT_PULLUP: {
        id: "L_SIT_PULLUP",
        exercicioId: "l_sit_pullup",
        nome: "L-SIT PULL-UP",
        categoria: "PUXAR",
        tipo: "normal",
        requisito: { paiId: "CHIN_UP", exercicioId: "chin_up", threshold: 10 },
        filhos: ["ARCHER_PULLUP"]
      },
      ARCHER_PULLUP: {
        id: "ARCHER_PULLUP",
        exercicioId: "archer_pullup",
        nome: "ARCHER PULL-UP",
        categoria: "PUXAR",
        tipo: "normal",
        // O label "L-sit" no requisito refere-se ao exercicioId do L_SIT_PULLUP
        requisito: { paiId: "L_SIT_PULLUP", exercicioId: "l_sit_pullup", threshold: 8 },
        filhos: ["MUSCLE_UP"]
      },
      MUSCLE_UP: {
        id: "MUSCLE_UP",
        exercicioId: "muscle_up",
        nome: "MUSCLE-UP",
        categoria: "PUXAR",
        tipo: "normal",
        requisito: { paiId: "ARCHER_PULLUP", exercicioId: "archer_pullup", threshold: 6 },
        filhos: []
      },
      NEUTRAL_GRIP: {
        id: "NEUTRAL_GRIP",
        exercicioId: "neutral_grip",
        nome: "NEUTRAL GRIP PULL-UP",
        categoria: "PUXAR",
        tipo: "normal",
        requisito: { paiId: "BARRA_FIXA", exercicioId: "barra_fixa", threshold: 8 },
        filhos: ["WEIGHTED_PULLUP"]
      },
      WEIGHTED_PULLUP: {
        id: "WEIGHTED_PULLUP",
        exercicioId: "weighted_pullup",
        nome: "BARRA COM PESO",
        categoria: "PUXAR",
        tipo: "normal",
        requisito: { paiId: "NEUTRAL_GRIP", exercicioId: "neutral_grip", threshold: 10 },
        filhos: []
      },
      NEGATIVA_LENTA: {
        id: "NEGATIVA_LENTA",
        exercicioId: "negativa_lenta",
        nome: "NEGATIVA LENTA",
        categoria: "PUXAR",
        tipo: "disponivel",   // sempre disponível, sem requisito
        requisito: null,
        filhos: []
      },
      DEAD_HANG: {
        id: "DEAD_HANG",
        exercicioId: "dead_hang",
        nome: "DEAD HANG",
        categoria: "PUXAR",
        tipo: "base",
        requisito: null,
        filhos: ["ONE_ARM_HANG"]
      },
      ONE_ARM_HANG: {
        id: "ONE_ARM_HANG",
        exercicioId: "one_arm_hang",
        nome: "HANG 1 BRAÇO",
        categoria: "PUXAR",
        tipo: "normal",
        // Dead hang é medido em segundos (tipo: "tempo")
        requisito: { paiId: "DEAD_HANG", exercicioId: "dead_hang", threshold: 60 },
        filhos: []
      }
    }
  },

  // ----------------------------------------------------------
  // 3. PERNAS (Legs)
  // ----------------------------------------------------------
  PERNAS: {
    label: "PERNAS",
    icone: "🦵",
    cor: "#4A90D9",
    nos: {
      AGACHAMENTO: {
        id: "AGACHAMENTO",
        exercicioId: "agachamento",
        nome: "AGACHAMENTO",
        categoria: "PERNAS",
        tipo: "base",
        requisito: null,
        filhos: ["AGACHAMENTO_BULGARO", "AGACHAMENTO_GOBLET", "COSSACK_SQUAT"]
      },
      AGACHAMENTO_BULGARO: {
        id: "AGACHAMENTO_BULGARO",
        exercicioId: "agachamento_bulgaro",
        nome: "AGACH. BÚLGARO",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "AGACHAMENTO", exercicioId: "agachamento", threshold: 20 },
        filhos: ["PISTOL_SQUAT"]
      },
      PISTOL_SQUAT: {
        id: "PISTOL_SQUAT",
        exercicioId: "pistol_squat",
        nome: "PISTOL SQUAT",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "AGACHAMENTO_BULGARO", exercicioId: "agachamento_bulgaro", threshold: 12 },
        filhos: ["PISTOL_KB"]
      },
      PISTOL_KB: {
        id: "PISTOL_KB",
        exercicioId: "pistol_kb",
        nome: "PISTOL C/ KETTLEBELL",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "PISTOL_SQUAT", exercicioId: "pistol_squat", threshold: 5 },
        filhos: []
      },
      AGACHAMENTO_GOBLET: {
        id: "AGACHAMENTO_GOBLET",
        exercicioId: "agachamento_goblet",
        nome: "AGACH. GOBLET",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "AGACHAMENTO", exercicioId: "agachamento", threshold: 15 },
        filhos: []
      },
      COSSACK_SQUAT: {
        id: "COSSACK_SQUAT",
        exercicioId: "cossack_squat",
        nome: "COSSACK SQUAT",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "AGACHAMENTO", exercicioId: "agachamento", threshold: 25 },
        filhos: []
      },
      SWING_KETTLEBELL: {
        id: "SWING_KETTLEBELL",
        exercicioId: "swing_kettlebell",
        nome: "KB SWING",
        categoria: "PERNAS",
        tipo: "base",
        requisito: null,
        filhos: ["SWING_UMA_MAO", "SWING_PESADO"]
      },
      SWING_UMA_MAO: {
        id: "SWING_UMA_MAO",
        exercicioId: "swing_uma_mao",
        nome: "SWING 1 MÃO",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "SWING_KETTLEBELL", exercicioId: "swing_kettlebell", threshold: 25 },
        filhos: []
      },
      SWING_PESADO: {
        id: "SWING_PESADO",
        exercicioId: "swing_pesado",
        nome: "SWING PESADO",
        categoria: "PERNAS",
        tipo: "normal",
        requisito: { paiId: "SWING_KETTLEBELL", exercicioId: "swing_kettlebell", threshold: 30 },
        filhos: []
      }
    }
  },

  // ----------------------------------------------------------
  // 4. CORE
  // ----------------------------------------------------------
  CORE: {
    label: "CORE",
    icone: "🔥",
    cor: "#E87722",
    nos: {
      PRANCHA: {
        id: "PRANCHA",
        exercicioId: "prancha",
        nome: "PRANCHA RKC",
        categoria: "CORE",
        tipo: "base",
        requisito: null,
        filhos: ["PRANCHA_LATERAL", "PRANCHA_TOQUE", "DRAGON_FLAG"]
      },
      PRANCHA_LATERAL: {
        id: "PRANCHA_LATERAL",
        exercicioId: "prancha_lateral",
        nome: "PRANCHA LATERAL",
        categoria: "CORE",
        tipo: "disponivel",   // sempre disponível, sem requisito de PR
        requisito: null,
        filhos: ["PRANCHA_ELEVACAO"]
      },
      PRANCHA_ELEVACAO: {
        id: "PRANCHA_ELEVACAO",
        exercicioId: "prancha_elevacao",
        nome: "PRANCHA C/ ELEVAÇÃO",
        categoria: "CORE",
        tipo: "normal",
        requisito: { paiId: "PRANCHA_LATERAL", exercicioId: "prancha_lateral", threshold: 45 },
        filhos: []
      },
      PRANCHA_TOQUE: {
        id: "PRANCHA_TOQUE",
        exercicioId: "prancha_toque",
        nome: "PRANCHA TOQUE",
        categoria: "CORE",
        tipo: "normal",
        requisito: { paiId: "PRANCHA", exercicioId: "prancha", threshold: 60 },
        filhos: []
      },
      DRAGON_FLAG: {
        id: "DRAGON_FLAG",
        exercicioId: "dragon_flag",
        nome: "DRAGON FLAG",
        categoria: "CORE",
        tipo: "normal",
        requisito: { paiId: "PRANCHA", exercicioId: "prancha", threshold: 90 },
        filhos: ["AB_WHEEL"]
      },
      AB_WHEEL: {
        id: "AB_WHEEL",
        exercicioId: "ab_wheel",
        nome: "AB WHEEL ROLLOUT",
        categoria: "CORE",
        tipo: "normal",
        requisito: { paiId: "DRAGON_FLAG", exercicioId: "dragon_flag", threshold: 5 },
        filhos: []
      },
      TURKISH_GETUP: {
        id: "TURKISH_GETUP",
        exercicioId: "turkish_getup",
        nome: "TURKISH GET-UP",
        categoria: "CORE",
        tipo: "base",
        requisito: null,
        filhos: ["TGU_PESADO"]
      },
      TGU_PESADO: {
        id: "TGU_PESADO",
        exercicioId: "tgu_pesado",
        nome: "TGU PESADO",
        categoria: "CORE",
        tipo: "normal",
        requisito: { paiId: "TURKISH_GETUP", exercicioId: "turkish_getup", threshold: 5 },
        filhos: []
      }
    }
  },

  // ----------------------------------------------------------
  // 5. GRIP (Força de Pegada)
  // ----------------------------------------------------------
  GRIP: {
    label: "GRIP",
    icone: "✊",
    cor: "#7B68EE",
    nos: {
      GRIP: {
        id: "GRIP",
        exercicioId: "grip",
        nome: "TREINO DE GRIP",
        categoria: "GRIP",
        tipo: "base",
        requisito: null,
        filhos: ["TOWEL_PULLUP", "PLATE_PINCH", "FARMERS_WALK"]
      },
      TOWEL_PULLUP: {
        id: "TOWEL_PULLUP",
        exercicioId: "towel_pullup",
        nome: "TOWEL PULL-UP",
        categoria: "GRIP",
        tipo: "normal",
        // Requisito baseado em barra_fixa (PR >= 10)
        requisito: { paiId: "BARRA_FIXA", exercicioId: "barra_fixa", threshold: 10 },
        filhos: []
      },
      PLATE_PINCH: {
        id: "PLATE_PINCH",
        exercicioId: "plate_pinch",
        nome: "PLATE PINCH",
        categoria: "GRIP",
        tipo: "disponivel",   // sempre disponível
        requisito: null,
        filhos: []
      },
      FARMERS_WALK: {
        id: "FARMERS_WALK",
        exercicioId: "farmers_walk",
        nome: "FARMER'S WALK",
        categoria: "GRIP",
        tipo: "normal",
        requisito: { paiId: "GRIP", exercicioId: "grip", threshold: 20 },
        filhos: []
      }
    }
  }
};

// ============================================================
// HELPER: Calcula o PR de um exercício — delega ao app.js
// ============================================================

function _calcularPRExercicio(exercicioId) {
  if (!dados || !Array.isArray(dados.registros)) return 0;
  const ex = dados.exercicios.find(e => e.id === exercicioId);
  if (!ex) return 0;
  return typeof calcularPR === "function" ? calcularPR(ex) : 0;
}

// ============================================================
// HELPER: Retorna todos os nós de todas as categorias
// ============================================================

function _todosOsNos() {
  const nos = {};
  for (const cat of Object.values(SKILL_TREE)) {
    for (const [id, no] of Object.entries(cat.nos)) {
      nos[id] = no;
    }
  }
  return nos;
}

// ============================================================
// FUNÇÃO PRINCIPAL: verificarDesbloqueio(nodeId)
// Retorna o estado de desbloqueio de um nó específico
// ============================================================

function verificarDesbloqueio(nodeId) {
  const nos = _todosOsNos();
  const no = nos[nodeId];

  if (!no) {
    return {
      desbloqueado: false,
      mestre: false,
      prAtual: 0,
      requisito: null,
      falta: null,
      erro: `Nó "${nodeId}" não encontrado na Skill Tree.`
    };
  }

  // Nós base são sempre desbloqueados
  if (no.tipo === "base") {
    const prProprio = _calcularPRExercicio(no.exercicioId);
    return {
      desbloqueado: true,
      mestre: false,          // nós base não têm estado "mestre"
      prAtual: prProprio,
      requisito: null,
      falta: 0
    };
  }

  // Nós "sempre disponíveis" — desbloqueados sem requisito, mas sem mestria
  if (no.tipo === "disponivel") {
    const prProprio = _calcularPRExercicio(no.exercicioId);
    return {
      desbloqueado: true,
      mestre: false,
      prAtual: prProprio,
      requisito: null,
      falta: 0
    };
  }

  // Nós normais: verificar PR do exercício pai contra o threshold
  const { exercicioId: exIdPai, threshold } = no.requisito;
  const prPai = _calcularPRExercicio(exIdPai);
  const desbloqueado = prPai >= threshold;

  // Mestria: PR do próprio nó >= threshold * 1.5
  const prProprio = _calcularPRExercicio(no.exercicioId);
  const thresholdMestria = threshold * 1.5;
  const mestre = desbloqueado && prProprio >= thresholdMestria;

  return {
    desbloqueado,
    mestre,
    prAtual: prPai,           // PR do pai (determina o desbloqueio)
    prProprio,                // PR do próprio exercício
    requisito: threshold,
    falta: desbloqueado ? 0 : threshold - prPai,
    thresholdMestria,
    mestria: {
      prAtual: prProprio,
      requisito: thresholdMestria,
      falta: mestre ? 0 : Math.max(0, thresholdMestria - prProprio)
    }
  };
}

// ============================================================
// FUNÇÃO: calcularEstadoArvore()
// Retorna um objeto com o estado completo de cada nó
// ============================================================

function calcularEstadoArvore() {
  const nos = _todosOsNos();
  const estado = {};

  for (const nodeId of Object.keys(nos)) {
    const no = nos[nodeId];
    const resultado = verificarDesbloqueio(nodeId);

    // Encontra o nome da categoria do nó
    let categoriaNome = null;
    for (const [catKey, cat] of Object.entries(SKILL_TREE)) {
      if (cat.nos[nodeId]) {
        categoriaNome = catKey;
        break;
      }
    }

    estado[nodeId] = {
      ...resultado,
      id: no.id,
      nome: no.nome,
      exercicioId: no.exercicioId,
      tipo: no.tipo,
      categoria: categoriaNome,
      filhos: no.filhos,
      // Status calculado (para UI)
      status: _calcularStatus(resultado, no.tipo)
    };
  }

  return estado;
}

// ============================================================
// HELPER: Determina o status visual de um nó
// "base" | "disponivel" | "bloqueado" | "desbloqueado" | "mestre"
// ============================================================

function _calcularStatus(resultado, tipo) {
  if (tipo === "base")       return "base";
  if (tipo === "disponivel") return "disponivel";
  if (resultado.mestre)      return "mestre";
  if (resultado.desbloqueado) return "desbloqueado";
  return "bloqueado";
}

// ============================================================
// FUNÇÃO: getProximoDesbloqueio()
// Retorna o próximo nó que o usuário está mais perto de desbloquear
// ============================================================

function getProximoDesbloqueio() {
  const nos = _todosOsNos();
  let melhorCandidato = null;
  let menorFalta = Infinity;

  for (const nodeId of Object.keys(nos)) {
    const no = nos[nodeId];

    // Ignora nós que não precisam de desbloqueio
    if (no.tipo !== "normal") continue;

    const resultado = verificarDesbloqueio(nodeId);

    // Ignora os já desbloqueados
    if (resultado.desbloqueado) continue;

    const falta = resultado.falta || 0;

    if (falta < menorFalta) {
      menorFalta = falta;

      // Encontra categoria
      let categoriaNome = null;
      for (const [catKey, cat] of Object.entries(SKILL_TREE)) {
        if (cat.nos[nodeId]) { categoriaNome = catKey; break; }
      }

      // Nó pai para contexto
      const noPai = nos[no.requisito.paiId] || null;

      melhorCandidato = {
        id: nodeId,
        nome: no.nome,
        exercicioId: no.exercicioId,
        categoria: categoriaNome,
        paiId: no.requisito.paiId,
        paiNome: noPai ? noPai.nome : no.requisito.paiId,
        paiExercicioId: no.requisito.exercicioId,
        prAtual: resultado.prAtual,
        requisito: resultado.requisito,
        falta,
        percentual: Math.round((resultado.prAtual / resultado.requisito) * 100)
      };
    }
  }

  return melhorCandidato;
}

// ============================================================
// FUNÇÃO: getProximasMestrias()
// Retorna os nós desbloqueados mas ainda sem mestria, ordenados
// pelo mais próximo de atingir o threshold de mestria
// ============================================================

function getProximasMestrias() {
  const nos = _todosOsNos();
  const candidatos = [];

  for (const nodeId of Object.keys(nos)) {
    const no = nos[nodeId];
    if (no.tipo !== "normal") continue;

    const resultado = verificarDesbloqueio(nodeId);
    if (!resultado.desbloqueado || resultado.mestre) continue;

    const faltaMestria = resultado.mestria?.falta || 0;

    let categoriaNome = null;
    for (const [catKey, cat] of Object.entries(SKILL_TREE)) {
      if (cat.nos[nodeId]) { categoriaNome = catKey; break; }
    }

    candidatos.push({
      id: nodeId,
      nome: no.nome,
      exercicioId: no.exercicioId,
      categoria: categoriaNome,
      prProprio: resultado.prProprio,
      thresholdMestria: resultado.thresholdMestria,
      faltaMestria,
      percentualMestria: Math.round((resultado.prProprio / resultado.thresholdMestria) * 100)
    });
  }

  // Ordena: mais próximos de atingir mestria primeiro
  return candidatos.sort((a, b) => a.faltaMestria - b.faltaMestria);
}

// ============================================================
// FUNÇÃO: getEstatisticasArvore()
// Retorna um resumo do progresso geral na Skill Tree
// ============================================================

function getEstatisticasArvore() {
  const estado = calcularEstadoArvore();
  const valores = Object.values(estado);

  const total       = valores.length;
  const base        = valores.filter(n => n.tipo === "base").length;
  const disponiveis = valores.filter(n => n.tipo === "disponivel").length;
  const desbloqueados = valores.filter(n => n.desbloqueado && n.tipo === "normal").length;
  const mestres     = valores.filter(n => n.mestre).length;
  const bloqueados  = valores.filter(n => !n.desbloqueado && n.tipo === "normal").length;

  // Progresso por categoria
  const porCategoria = {};
  for (const [catKey, cat] of Object.entries(SKILL_TREE)) {
    const nosCategoria = Object.values(cat.nos);
    const totalCat     = nosCategoria.length;
    const desbCat      = nosCategoria.filter(n => {
      const r = verificarDesbloqueio(n.id);
      return r.desbloqueado;
    }).length;

    porCategoria[catKey] = {
      label: cat.label,
      icone: cat.icone,
      cor: cat.cor,
      total: totalCat,
      desbloqueados: desbCat,
      percentual: Math.round((desbCat / totalCat) * 100)
    };
  }

  return {
    total,
    base,
    disponiveis,
    desbloqueados: desbloqueados + base + disponiveis,   // total real acessível
    mestres,
    bloqueados,
    percentualGeral: Math.round(((desbloqueados + base + disponiveis) / total) * 100),
    porCategoria,
    proximoDesbloqueio: getProximoDesbloqueio(),
    proximasMestrias: getProximasMestrias().slice(0, 3)
  };
}

// ============================================================
// FUNÇÃO: salvarProgressoSkilltree()
// Persiste snapshot do estado no localStorage (opcional, para cache)
// ============================================================

function salvarProgressoSkilltree() {
  try {
    const snapshot = {
      timestamp: Date.now(),
      estado: calcularEstadoArvore(),
      estatisticas: getEstatisticasArvore()
    };
    localStorage.setItem("gtg_skilltree_cache", JSON.stringify(snapshot));
    return snapshot;
  } catch (e) {
    console.warn("[GTG Skill Tree] Erro ao salvar cache:", e);
    return null;
  }
}

// ============================================================
// FUNÇÃO: carregarCacheSkilltree()
// Lê o cache do localStorage (válido por 5 min para performance)
// ============================================================

function carregarCacheSkilltree(maxIdadeMs = 5 * 60 * 1000) {
  try {
    const raw = localStorage.getItem("gtg_skilltree_cache");
    if (!raw) return null;
    const cache = JSON.parse(raw);
    if (Date.now() - cache.timestamp > maxIdadeMs) return null;
    return cache;
  } catch (e) {
    return null;
  }
}

// ============================================================
// EXPORTAÇÃO DE API PÚBLICA
// Agrupa todas as funções para facilitar o acesso externo
// ============================================================

const skilltree = {
  // Dados
  SKILL_TREE,

  // Consultas
  verificarDesbloqueio,
  calcularEstadoArvore,
  getProximoDesbloqueio,
  getProximasMestrias,
  getEstatisticasArvore,

  // Persistência
  salvarProgressoSkilltree,
  carregarCacheSkilltree,

  // Helpers internos expostos (úteis para testes/debug)
  _calcularPRExercicio,
  _todosOsNos
};

// Disponibiliza globalmente no mesmo padrão do app.js
if (typeof window !== "undefined") {
  window.skilltree = skilltree;
}
