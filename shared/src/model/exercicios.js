export const EXERCICIOS_DEFAULT = [
  {
    id: "flexao", nome: "FLEXÃO", tipo: "reps", unidade: "reps",
    instrucoes: "Mãos na largura dos ombros, corpo reto como prancha. Desça até o peito quase tocar o chão. Suba explosivamente.",
    detalhes: {
      descricao: "Trabalha peito, tríceps, ombros anteriores e estabilizadores do core.",
      execucao: ["Posicione as mãos na largura dos ombros", "Mantenha o corpo rígido", "Desça controladamente até o peito quase tocar o chão", "Pressione o chão para subir explosivamente", "Bloqueie levemente os cotovelos no topo", "Contraia glúteos e abdômen o tempo todo"],
      gtgDica: 'Para GTG: séries de 50-60% do seu máximo. Descanse 15-30 min entre séries.',
      pavelQuote: '"Trate a flexão como um levantamento terra. Tensione tudo."',
      variacoes: ["Flexão diamante", "Flexão lenta 5-1-5", "Archer push-up", "Flexão com um braço", "Flexão declined"]
    }
  },
  {
    id: "barra_fixa", nome: "BARRA FIXA", tipo: "reps", unidade: "reps",
    instrucoes: "Pegada pronada. Puxe o peito até a barra. Desça completamente em controle. Escápulas ativadas antes de puxar.",
    detalhes: {
      descricao: "O exercício de puxar mais honesto. Trabalha dorsais, romboides, bíceps e ombros.",
      execucao: ["Agarre a barra com pegada pronada", "Depressão escapular primeiro", "Puxe o peito em direção à barra", "Cotovelos apontam para baixo no topo", "Desça em controle total", "Braços completamente estendidos na posição baixa"],
      gtgDica: 'Se máximo = 10, faça séries de 4-5 ao longo do dia.',
      pavelQuote: '"Dez pull-ups perfeitos valem mais que trinta com balanço."',
      variacoes: ["Chin-up", "Neutral grip", "L-sit pull-up", "Archer pull-up", "Negativa lenta"]
    }
  },
  {
    id: "agachamento", nome: "AGACHAMENTO", tipo: "reps", unidade: "reps",
    instrucoes: "Pés na largura dos ombros. Desça com o quadril para baixo e para trás. Joelhos seguem os pés. Suba forte.",
    detalhes: {
      descricao: "Padrão de movimento natural. Trabalha quádriceps, posteriores, glúteos e core.",
      execucao: ["Pés na largura dos ombros, dedos 15-30° para fora", "Inspire fundo, crie pressão intra-abdominal", "Empurre os joelhos para fora", "Desça até abaixo do paralelo", "Suba com quadril e ombros no mesmo ritmo"],
      gtgDica: 'Progrida para agachamento búlgaro e depois pistol squat.',
      pavelQuote: '"Se você não agacha profundo, não tem força de perna."',
      variacoes: ["Agachamento búlgaro", "Agachamento goblet", "Pistol squat", "Agachamento com pausa", "Cossack squat"]
    }
  },
  {
    id: "prancha", nome: "PRANCHA", tipo: "tempo", unidade: "seg",
    instrucoes: "Antebraços no chão, cotovelos sob os ombros. Corpo rígido. Glúteos e abdômen contraídos ao máximo.",
    detalhes: {
      descricao: "Variação RKC Plank: tensão irradiante máxima em todo o corpo.",
      execucao: ["Antebraços paralelos, cotovelos abaixo dos ombros", "CONTRAIA OS GLÚTEOS ao máximo", "Contraia o abdômen", "Empurre cotovelos para frente e pés para trás", "Pressione antebraços para baixo", "Respire normalmente"],
      gtgDica: 'Acumule tempo total: 5 séries de 20-30s.',
      pavelQuote: '"A RKC Plank é força isométrica máxima, não resistência."',
      variacoes: ["Prancha lateral", "Prancha com elevação de braço", "Prancha com toque no ombro", "Dragon flag", "Ab wheel rollout"]
    }
  },
  {
    id: "dips", nome: "DIPS / MERGULHO", tipo: "reps", unidade: "reps",
    instrucoes: "Paralelas, braços estendidos. Desça até cotovelos a 90°. Suba explosivamente.",
    detalhes: {
      descricao: "O 'squat do tronco superior'. Trabalha peito, tríceps e deltoides anteriores.",
      execucao: ["Posicione-se nas paralelas", "Incline o tronco levemente para frente", "Ombros em depressão", "Desça controladamente até 90°", "Suba explosivamente"],
      gtgDica: 'Se máximo são 15, faça séries de 6-8.',
      pavelQuote: '"O dip profundo é o supino vertical. Não trunce a amplitude."',
      variacoes: ["Dip em cadeira", "Dip estreito", "Dip amplo", "Weighted dip", "Ring dip"]
    }
  },
  {
    id: "swing_kettlebell", nome: "KETTLEBELL SWING", tipo: "reps", unidade: "reps",
    instrucoes: "Quadril atrás, joelhos levemente fletidos. Impulsione o kettlebell com o quadril, não os braços.",
    detalhes: {
      descricao: "O exercício mais eficiente do planeta segundo Pavel.",
      execucao: ["Kettlebell entre os pés", "Hike pass agressivo", "EXPLOSÃO DE QUADRIL", "Glúteos contraídos no topo", "Absorva na descida com o quadril"],
      gtgDica: 'Séries de 10-20 swings pesados ao longo do dia.',
      pavelQuote: '"O swing perfeito é uma explosão balística de quadril."',
      variacoes: ["Swing com duas mãos", "Swing com uma mão", "Swing alternado", "Swing em pirâmide", "Dead stop swing"]
    }
  },
  {
    id: "turkish_getup", nome: "TURKISH GET-UP", tipo: "reps", unidade: "reps",
    instrucoes: "Deite com KB em uma mão acima da cabeça. Siga os 7 passos: rolar → cotovelo → mão → ponte → joelho → estocada → em pé.",
    detalhes: {
      descricao: "A academia completa em um único movimento.",
      execucao: ["Passo 1: Role para lado, segure KB", "Passo 2: Apoio no cotovelo", "Passo 3: Apoio na mão", "Passo 4: Ponte de quadril", "Passo 5: Joelho no chão", "Passo 6: Estocada", "Passo 7: Em pé — reverta cada passo"],
      gtgDica: '1-3 reps por lado, várias vezes ao dia.',
      pavelQuote: '"Se eu tivesse que recomendar um único exercício, seria o TGU."',
      variacoes: ["TGU sem peso", "TGU leve", "TGU pesado", "Half get-up", "TGU com barra"]
    }
  },
  {
    id: "pistol_squat", nome: "PISTOL SQUAT", tipo: "reps", unidade: "reps",
    instrucoes: "Em pé em uma perna. Estenda a outra à frente. Desça até a coxa tocar a panturrilha. Suba sem apoio.",
    detalhes: {
      descricao: "Força unilateral de perna sem equipamento.",
      execucao: ["Fique em pé em uma perna", "Estenda a perna livre", "Desça DEVAGAR", "Joelho acompanha o dedo do pé", "Profundidade máxima", "Suba com força explosiva"],
      gtgDica: 'Use apoio leve no início. Progrida para sem apoio.',
      pavelQuote: '"O pistol squat é o termômetro da sua mobilidade e força unilateral."',
      variacoes: ["Pistol com apoio", "Pistol negativo", "Pistol com elevação", "Pistol com salto", "Pistol com peso"]
    }
  }
];

export function getExercicioById(exercicios, id) {
  return exercicios.find(ex => ex.id === id) || null;
}

export function createExercicio(id, nome, tipo, instrucoes) {
  return {
    id, nome, tipo: tipo || "reps",
    unidade: tipo === "tempo" ? "seg" : "reps",
    instrucoes: instrucoes || "",
    detalhes: {
      descricao: "", execucao: [], gtgDica: "", pavelQuote: "", variacoes: []
    }
  };
}

export function syncExerciciosFromDefault(exercicios) {
  exercicios.forEach(ex => {
    const defaultEx = EXERCICIOS_DEFAULT.find(d => d.id === ex.id);
    if (defaultEx) {
      if (!ex.detalhes) ex.detalhes = defaultEx.detalhes;
      if (!ex.instrucoes) ex.instrucoes = defaultEx.instrucoes;
      if (!ex.unidade) ex.unidade = defaultEx.unidade;
    }
  });
  EXERCICIOS_DEFAULT.forEach(defaultEx => {
    if (!exercicios.find(ex => ex.id === defaultEx.id)) {
      exercicios.push({ ...defaultEx, detalhes: { ...defaultEx.detalhes } });
    }
  });
  return exercicios;
}
