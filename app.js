
// Mapa de exercícios da Skill Tree que são baseados em tempo (não reps)

function skilltreeSyncExercicios() {
  if (typeof skilltree === "undefined" || typeof skilltree.calcularEstadoArvore !== "function") return;
  const estado = skilltree.calcularEstadoArvore();
  let mudou = false;
  for (const [nodeId, info] of Object.entries(estado)) {
    if (!info.desbloqueado) continue;
    const exId = info.exercicioId;
    if (dados.exercicios.some(e => e.id === exId)) continue;
    const defaultEx = EXERCICIOS_DEFAULT.find(d => d.id === exId);
    if (defaultEx) {
      dados.exercicios.push({ ...defaultEx });
    } else {
      const isTempo = SKILLTREE_TEMPO_EXERCICIOS.has(exId);
      dados.exercicios.push({
        id: exId,
        nome: info.nome,
        tipo: isTempo ? "tempo" : "reps",
        unidade: isTempo ? "seg" : "reps",
        instrucoes: info.nome + " — registre suas reps aqui."
      });
    }
    mudou = true;
  }
  if (mudou) { salvarDados(); renderExercicios(); }
}

var TODAS_BADGES = [{
    id: "submaximo_mestre",
    icone: "⚔",
    nome: "Submáximo Mestre",
    desc: "50 séries em um único dia"
  }, {
    id: "frequencia_intensidade",
    icone: "🔥",
    nome: "Frequência s/ Intensidade",
    desc: "7 dias consecutivos com ≥1 série"
  }, {
    id: "pavel_aprovaria",
    icone: "🐻",
    nome: "Pavel Aprovaria",
    desc: "1000 reps acumuladas em um exercício"
  }, {
    id: "descanso_digno",
    icone: "⏱",
    nome: "Descanso Digno",
    desc: "Respeitar 15min entre séries"
  }, {
    id: "volume_sovietico",
    icone: "💪",
    nome: "Volume Soviético",
    desc: "500 reps em um único dia"
  }, {
    id: "especialista",
    icone: "🎯",
    nome: "Especialista",
    desc: "100 séries em um único exercício"
  }, {
    id: "primeiro_sangue",
    icone: "🩸",
    nome: "Primeiro Sangue",
    desc: "Primeira série registrada"
  }, {
    id: "semana_perfeita",
    icone: "🏅",
    nome: "Semana Perfeita",
    desc: "7 dias seguidos sem falhas"
  }, {
    id: "centuriao",
    icone: "⭐",
    nome: "Centurião",
    desc: "100 séries totais históricas"
  }, {
    id: "mil_soldados",
    icone: "⭐",
    nome: "Mil Soldados",
    desc: "1000 séries totais históricas"
  }, {
    id: "grip_de_ferro",
    icone: "🤜",
    nome: "Grip de Ferro",
    desc: "50 séries de Grip/Preensão registradas"
  }, {
    id: "pendulo_humano",
    icone: "🦅",
    nome: "Pêndulo Humano",
    desc: "30 minutos totais de Dead Hang acumulados"
  }, {
    id: "biceps_de_aco",
    icone: "💪",
    nome: "Bíceps de Aço",
    desc: "200 reps de Rosca Direta acumuladas"
  }, {
    id: "madrugador",
    icone: "🌅",
    nome: "Madrugador",
    desc: "Registre uma série antes das 7h da manhã"
  }, {
    id: "noturno",
    icone: "🌙",
    nome: "Guerreiro Noturno",
    desc: "Registre uma série após as 22h"
  }, {
    id: "consistencia_30",
    icone: "📅",
    nome: "Mês Completo",
    desc: "30 dias consecutivos de treino"
  }, {
    id: "poliglota_forca",
    icone: "🧩",
    nome: "Polímata da Força",
    desc: "Treine 5 exercícios diferentes em um único dia"
  }, {
    id: "dez_mil_reps",
    icone: "🏆",
    nome: "10.000 Reps",
    desc: "10.000 repetições totais acumuladas"
  }, {
    id: "mestre_prancha",
    icone: "🧱",
    nome: "Mestre da Prancha",
    desc: "Acumule 60 minutos totais de prancha"
  }, {
    id: "cinco_mil_series",
    icone: "🌟",
    nome: "Lenda GTG",
    desc: "5.000 séries totais históricas"
  }, {
    id: "strongfirst",
    icone: "🎖",
    nome: "StrongFirst",
    desc: "Alcance o nível SARGENTO ou superior"
  }, {
    id: "streak_14",
    icone: "🔗",
    nome: "Corrente de Ferro",
    desc: "14 dias consecutivos sem quebrar a streak"
  }, {
    id: "streak_30",
    icone: "👑",
    nome: "Imperador da Streak",
    desc: "30 dias consecutivos de treino"
  }, {
    id: "rei_da_barra",
    icone: "🦁",
    nome: "Rei da Barra",
    desc: "500 reps de Barra Fixa acumuladas"
  }, {
    id: "squat_master",
    icone: "🦿",
    nome: "Squat Master",
    desc: "1000 reps de Agachamento acumuladas"
  }, {
    id: "perfeccionista_sovietico",
    icone: "🎖",
    nome: "Perfeccionista Soviético",
    desc: "50 séries executadas com 3/3 de Groove Quality — amplitude completa, tensão irradiante e zero balanço"
  }, {
    "id": "ano_inteiro",
    "icone": "🌟",
    "nome": "Ano Inteiro",
    "desc": "365 dias consecutivos de treino — um ano soviético completo"
  }, {
    "id": "bi_anual",
    "icone": "🏆",
    "nome": "Bianual",
    "desc": "2 anos consecutivos sem perder um único dia"
  }, {
    "id": "flexao_master",
    "icone": "💪",
    "nome": "Czar das Flexões",
    "desc": "2000 reps de Flexão acumuladas — o exército vermelho se orgulha"
  }, {
    "id": "barra_elite",
    "icone": "🦁",
    "nome": "Força Aérea Soviética",
    "desc": "1000 reps de Barra Fixa acumuladas — você voa"
  }, {
    "id": "pistol_500",
    "icone": "🦶",
    "nome": "Pistoleiro",
    "desc": "500 reps de Pistol Squat acumuladas — equilíbrio de aço"
  }, {
    "id": "pistol_1000",
    "icone": "🎯",
    "nome": "Atirador de Elite",
    "desc": "1000 reps de Pistol Squat acumuladas — precisão absoluta"
  }, {
    "id": "duzentas_series",
    "icone": "⚔",
    "nome": "Duzentas Batidas",
    "desc": "200 séries totais históricas — o combate esquenta"
  }, {
    "id": "quinhentas_series",
    "icone": "⭐",
    "nome": "Escudo de Ferro",
    "desc": "500 séries totais históricas — nada te penetra"
  }, {
    "id": "duas_mil_series",
    "icone": "🏃",
    "nome": "Batalhão Blindado",
    "desc": "2000 séries totais históricas — máquina de guerra"
  }, {
    "id": "xp_250k",
    "icone": "✨",
    "nome": "Força Cósmica",
    "desc": "250.000 XP acumulados — cosmonauta da força"
  }, {
    "id": "xp_500k",
    "icone": "☄",
    "nome": "Estrela Vermelha",
    "desc": "500.000 XP acumulados — lenda viva do GTG"
  }, {
    "id": "xp_1m",
    "icone": "🏅",
    "nome": "Ordem de Lenin",
    "desc": "1.000.000 XP acumulados — condecoração máxima da força"
  }, {
    "id": "cinquenta_k_reps",
    "icone": "💥",
    "nome": "Explosão de Reps",
    "desc": "50.000 reps totais acumuladas — a avalanche vermelha"
  }, {
    "id": "cem_k_reps",
    "icone": "💣",
    "nome": "Arsenal Nuclear",
    "desc": "100.000 reps totais acumuladas — poder atômico"
  }, {
    "id": "treino_trio",
    "icone": "🎶",
    "nome": "Tríade Soviética",
    "desc": "Treine Flexão, Barra e Agachamento no mesmo dia — o tridente de Pavel"
  }, {
    "id": "variedade_total",
    "icone": "🌍",
    "nome": "Generalista",
    "desc": "Treine todos os tipos de exercício (reps, tempo, peso) — versatilidade de aço"
  }, {
    "id": "sessao_25",
    "icone": "📜",
    "nome": "Relatório de Combate",
    "desc": "Complete 25 Sessões GTG — dados de guerra coletados"
  }, {
    "id": "sessao_100",
    "icone": "📊",
    "nome": "Arquivo Central",
    "desc": "Complete 100 Sessões GTG — histórico completo do front"
  }, {
    "id": "quicklog_50",
    "icone": "📡",
    "nome": "Comunicação de Guerra",
    "desc": "50 registros via Quick Log — mensagens do front"
  }, {
    "id": "quicklog_200",
    "icone": "📢",
    "nome": "Alto Comando",
    "desc": "200 registros via Quick Log — comando centralizado"
  }, {
    "id": "midnight_train",
    "icone": "🌃",
    "nome": "Trem Noturno",
    "desc": "Registre séries em 5 dias diferentes entre meia-noite e 4h — o turno da morte"
  }, {
    "id": "amanhecer",
    "icone": "🌄",
    "nome": "Alvorada Soviética",
    "desc": "Registre séries em 7 dias diferentes antes das 6h — quem madruga, treina"
  }, {
    "id": "readiness_30",
    "icone": "🧐",
    "nome": "Autoconhecimento",
    "desc": "Avalie seu Readiness por 30 dias seguidos — conheça-se"
  }, {
    "id": "readiness_90",
    "icone": "🧠",
    "nome": "Mestre da Prontidão",
    "desc": "Avalie seu Readiness por 90 dias seguidos — sabedoria do corpo"
  }, {
    "id": "folga_10",
    "icone": "🍎",
    "nome": "Pausa Estratégica",
    "desc": "Use 10 dias de folga — descanso é treino invisível"
  }, {
    "id": "folga_50",
    "icone": "🏖",
    "nome": "Férias do Front",
    "desc": "Use 50 dias de folga — o guerreiro descansa"
  }, {
    "id": "groove_1000",
    "icone": "✦",
    "nome": "Cem Por Cento Soviético",
    "desc": "1000 séries com 3/3 no Groove Quality — perfeição absoluta"
  }, {
    "id": "groove_3000",
    "icone": "⭐",
    "nome": "Excelência Stalinista",
    "desc": "3000 séries com 3/3 no Groove Quality — nível Stakhanov"
  }, {
    "id": "exercicio_15",
    "icone": "🏷",
    "nome": "Arsenal Diversificado",
    "desc": "Cadastre 15 exercícios diferentes — arsenal completo"
  }, {
    "id": "exercicio_20",
    "icone": "🏺",
    "nome": "Museu de Guerra",
    "desc": "Cadastre 20 exercícios diferentes — coleção completa"
  }, {
    "id": "cem_reps_unico_dia",
    "icone": "🌞",
    "nome": "Sol Vermelho",
    "desc": "100 reps de um único exercício em um dia — foco total"
  }, {
    "id": "duzentas_reps_unico_dia",
    "icone": "☀",
    "nome": "Forno Siderúrgico",
    "desc": "200 reps de um único exercício em um dia — forja humana"
  }, {
    "id": "treino_gelo",
    "icone": "❄",
    "nome": "Siberiano",
    "desc": "Registre treinos em 3 dias diferentes com temperatura abaixo de 10°C — o frio não te para"
  }, {
    "id": "treino_calor",
    "icone": "🔥",
    "nome": "Estepe em Chamas",
    "desc": "Registre treinos em 3 dias diferentes com temperatura acima de 35°C — o calor te forja"
  }, {
    "id": "dez_exercicios_dia",
    "icone": "🎨",
    "nome": "Obra-Prima",
    "desc": "Treine 10 exercícios diferentes em um único dia — obra de arte do movimento"
  }, {
    "id": "shield_10",
    "icone": "⭐",
    "nome": "Muralha de Escudos",
    "desc": "Compre 10 Escudos de Streak — defesa total da streak"
  }, {
    "id": "radio_10h",
    "icone": "🎵",
    "nome": "Rádio do Front",
    "desc": "Ouça a Rádio GTG por 10 horas totais — música de treino"
  }, {
    "id": "gtg_manual",
    "icone": "📖",
    "nome": "Leitor de Pavel",
    "desc": "Leia o guia do Método GTG completo na aba — conhecimento é força"
  }],
  NIVEIS = [{
    nome: "RECRUTA",
    icone: "🎖",
    min: 0,
    proximo: 1200,
    estrelas: 0,
    divisao: "Tropa",
    descricao: "Seu serviço começa agora. Obedeça, treine, fortaleça-se."
  }, {
    nome: "ASPIRANTE",
    icone: "🪖",
    min: 1200,
    proximo: 3e3,
    estrelas: 0,
    divisao: "Tropa",
    descricao: "O aspirante que prova seu valor a cada série executada."
  }, {
    nome: "SOLDADO",
    icone: "🔰",
    min: 3e3,
    proximo: 6e3,
    estrelas: 1,
    divisao: "Tropa",
    descricao: "A base do exército. Forja-se no aço da repetição."
  }, {
    nome: "CABO",
    icone: "⚡",
    min: 6e3,
    proximo: 11e3,
    estrelas: 1,
    divisao: "Tropa",
    descricao: "Lidera pelo exemplo. Cada repetição é uma ordem cumprida."
  }, {
    nome: "3º SARGENTO",
    icone: "⭐",
    min: 11e3,
    proximo: 18e3,
    estrelas: 2,
    divisao: "Graduado",
    descricao: "Graduado que impõe disciplina e precisão nos treinos."
  }, {
    nome: "2º SARGENTO",
    icone: "🌟",
    min: 18e3,
    proximo: 28e3,
    estrelas: 2,
    divisao: "Graduado",
    descricao: "Veterano das séries. Sua consistência inspira a tropa."
  }, {
    nome: "1º SARGENTO",
    icone: "🎗",
    min: 28e3,
    proximo: 42e3,
    estrelas: 3,
    divisao: "Graduado",
    descricao: "O braço direito do oficial. A execução é impecável."
  }, {
    nome: "SUBTENENTE",
    icone: "🏅",
    min: 42e3,
    proximo: 62e3,
    estrelas: 3,
    divisao: "Oficial",
    descricao: "Ponte entre a tropa e o comando. Respeitado por todos."
  }, {
    nome: "TENENTE",
    icone: "⚔",
    min: 62e3,
    proximo: 88e3,
    estrelas: 3,
    divisao: "Oficial",
    descricao: "Comanda pelotões. Sua zona de combate é o corpo."
  }, {
    nome: "CAPITÃO",
    icone: "🎯",
    min: 88e3,
    proximo: 12e4,
    estrelas: 4,
    divisao: "Oficial",
    descricao: "Lidera companhias. Estratégia e força andam juntas."
  }, {
    nome: "MAJOR",
    icone: "🦁",
    min: 12e4,
    proximo: 165e3,
    estrelas: 4,
    divisao: "Oficial Superior",
    descricao: "Estado-maior do corpo. Planeja a batalha diária."
  }, {
    nome: "TENENTE-CORONEL",
    icone: "👑",
    min: 165e3,
    proximo: 225e3,
    estrelas: 4,
    divisao: "Oficial Superior",
    descricao: "Vice-comandante. Sua resistência é lendária."
  }, {
    nome: "CORONEL",
    icone: "🔱",
    min: 225e3,
    proximo: 310e3,
    estrelas: 5,
    divisao: "Oficial Superior",
    descricao: "Comanda regimentos. A experiência forja o caráter."
  }, {
    nome: "COMANDANTE",
    icone: "★",
    min: 310e3,
    proximo: 42e4,
    estrelas: 5,
    divisao: "Alto Comando",
    descricao: "Lidera divisões. Sua palavra é lei nos campos de treino."
  }, {
    nome: "GENERAL DE BRIGADA",
    icone: "✪",
    min: 42e4,
    proximo: 56e4,
    estrelas: 5,
    divisao: "Alto Comando",
    descricao: "Estrategista máximo. Cada movimento é calculado."
  }, {
    nome: "GENERAL DE DIVISÃO",
    icone: "☭",
    min: 56e4,
    proximo: 75e4,
    estrelas: 5,
    divisao: "Alto Comando",
    descricao: "Força motriz do exército. Lenda viva da resistência."
  }, {
    nome: "GENERAL DE EXÉRCITO",
    icone: "⚡",
    min: 75e4,
    proximo: 1e6,
    estrelas: 5,
    divisao: "Alto Comando",
    descricao: "Comando supremo das forças. Poucos alcançam este posto."
  }, {
    nome: "MARECHAL",
    icone: "💀",
    min: 1e6,
    proximo: 14e5,
    estrelas: 5,
    divisao: "Lenda",
    descricao: "A personificação da força soviética. Inabalável."
  }, {
    nome: "MARECHAL DA UNIÃO",
    icone: "🗡",
    min: 14e5,
    proximo: 2e6,
    estrelas: 5,
    divisao: "Lenda",
    descricao: "Guardião da chama. O corpo é uma fortaleza viva."
  }, {
    nome: "LENDA SOVIÉTICA",
    icone: "☭",
    min: 2e6,
    proximo: 99999999,
    estrelas: 5,
    divisao: "Lenda",
    descricao: "Você transcendeu o método. Você É o método."
  }],
  FRASES_PAVEL = [{
    frase: "A força não tem um fim de semana.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Se você quer ficar melhor em chin-ups, faça chin-ups. Mas nunca até a falha — apenas muitas vezes ao longo do dia.",
    autor: "Pavel Tsatsouline — Power to the People"
  }, {
    frase: "A frequência constrói a força. A falha destrói a qualidade.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Treinar é uma prática, como tocar piano. Você não toca piano até os dedos sangrarem.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "A força submáxima repetida é mais inteligente do que a força máxima esporádica.",
    autor: "Pavel Tsatsouline — Beyond Bodybuilding"
  }, {
    frase: "Nunca treine até a falha. Pare enquanto ainda tem uma repetição boa no tanque.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "O sistema nervoso é o mestre. Os músculos são servos. Treine o mestre.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Consistência bate intensidade. Sempre. Sem exceção.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "A força não é construída nos treinos — é construída na recuperação. O treino é apenas o estímulo.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Se parece fácil, você está aprendendo. Se parece impossível, você está crescendo. Se parece automático, você dominou.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "O levantamento perfeito é lento por dentro e rápido por fora. Tensão irradiante — cada músculo do corpo participa.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "A disciplina é liberdade. Quando você não precisa decidir se vai treinar, você já venceu a batalha.",
    autor: "StrongFirst"
  }, {
    frase: "Mais volume, menos intensidade. Mais frequência, menos exaustão. Mais qualidade, menos ego.",
    autor: "Princípio GTG — Pavel Tsatsouline"
  }, {
    frase: "Um atleta soviético fazia 10 séries por dia de um movimento. Um atleta ocidental faz 3 séries até a falha uma vez por semana. Os resultados explicam tudo.",
    autor: "Pavel Tsatsouline — Naked Warrior"
  }, {
    frase: "A barra fixa é o teste definitivo de força relativa. Quem faz 20 pull-ups limpos merece respeito — independente do que está no supino.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Força é uma habilidade. Como qualquer habilidade, é desenvolvida com prática deliberada e frequente, não com sofrimento episódico.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "O kettlebell swing é anti-envelhecimento, anti-sedentarismo e anti-fraqueza — tudo em um movimento.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Sua pegada revela sua força real. Homens com aperto fraco têm força fraca — não importa o que o supino diga.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Turkish Get-up uma vez ao dia. Cada lado. Isso é tudo que você precisa para ter ombros saudáveis para o resto da vida.",
    autor: "Pavel Tsatsouline — StrongFirst"
  }, {
    frase: "O descanso não é fraqueza. É quando o sistema nervoso consolida os padrões que você treinou. Respeite o descanso.",
    autor: "StrongFirst"
  }, {
    frase: "Qualidade de movimento é velocidade de evolução. Repetições ruins não treinam — elas programam erros.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Alexander Zass não tinha pesos. Ele tinha correntes imóveis e vontade de ferro. Isso bastou para ser o homem mais forte do século.",
    autor: "Pavel Tsatsouline sobre Zass"
  }, {
    frase: "O L-sit por 30 segundos coloca você em 1% da população em força funcional. A maioria nunca chegará lá por falta de paciência, não de talento.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Você não está em uma competição contra ninguém. Você está construindo uma habilidade. Seja paciente com o processo.",
    autor: "Espírito GTG"
  }, {
    frase: "Faça menos, mas faça todos os dias. Essa é a fórmula soviética que o Ocidente sempre ignorou.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "O pistol squat não é um truque. É um teste. Se você não passa, sua perna não é tão forte quanto você pensa.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "Tensão irradiante: antes de executar qualquer levantamento, tensione todo o corpo — punhos, glúteos, abdômen. A força flui do centro.",
    autor: "Pavel Tsatsouline — Power to the People"
  }, {
    frase: "Seis semanas de GTG valem mais do que seis meses de treino até a falha. O sistema nervoso tem memória e paciência.",
    autor: "Experimento GTG"
  }, {
    frase: "O objetivo não é se destruir hoje. É ser mais forte daqui a um ano do que você é hoje.",
    autor: "Pavel Tsatsouline"
  }, {
    frase: "A força de verdade não precisa de academia. Precisa de inteligência, frequência e obstinação.",
    autor: "Pavel Tsatsouline — Naked Warrior"
  }, {
    frase: "Nós somos o que repetidamente fazemos. A excelência, portanto, não é um ato, mas um hábito.",
    autor: "Aristóteles"
  }, {
    frase: "A repetição é a mãe do aprendizado, o pai da ação e o arquiteto da realização.",
    autor: "Zig Ziglar"
  }, {
    frase: "Não são os músculos que vencem as batalhas, é a força da mente que treina os músculos.",
    autor: "Bruce Lee"
  }, {
    frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    autor: "Robert Collier"
  }, {
    frase: "Não limitem seus desafios — desafiem seus limites.",
    autor: "Jerry Dunn"
  }, {
    frase: "O corpo consegue quase tudo. É a mente que você precisa convencer.",
    autor: "Ditado Calistenia"
  }, {
    frase: "Absorva o que é útil, descarte o que é inútil, adicione o que é essencialmente seu.",
    autor: "Bruce Lee"
  }, {
    frase: "A dor que você sente hoje é a força que você sentirá amanhã.",
    autor: "Arnold Schwarzenegger"
  }, {
    frase: "Não busque a sessão perfeita. Busque a sessão consistente.",
    autor: "Dan John — Atleta e Coach"
  }, {
    frase: "Quanto mais você suar no treino, menos sangrará na batalha.",
    autor: "Ditado Militar Romano"
  }, {
    frase: "Disciplina é fazer o que precisa ser feito mesmo quando não quer fazer.",
    autor: "Dan Gable — Campeão Olímpico de Luta"
  }, {
    frase: "A habilidade é o que você é capaz de fazer. A motivação determina o que você faz. A atitude determina quão bem você faz.",
    autor: "Lou Holtz"
  }, {
    frase: "O caminho para a força não é um sprint — é uma marcha longa, paciente e implacável.",
    autor: "Mark Rippetoe — Starting Strength"
  }, {
    frase: "Todo campeão já foi um iniciante. Todo especialista já foi um amador.",
    autor: "Ditado de Coaches"
  }, {
    frase: "Você não supera o volume. Você aprende a se recuperar dele.",
    autor: "Dan John"
  }, {
    frase: "A calistenia não é sobre impressionar. É sobre dominar o próprio corpo — o equipamento mais sofisticado que existe.",
    autor: "Al Kavadlo — We're Working Out"
  }, {
    frase: "Construa a base antes da torre. Sem fundação de movimento, a força é uma ilusão.",
    autor: "Gray Cook — Functional Movement Systems"
  }, {
    frase: "O músculo que você não usa se torna o elo fraco que o trai exatamente quando você mais precisa.",
    autor: "Ross Enamait — Never Gymless"
  }, {
    frase: "Vinte flexões ao dia todos os dias superam duzentas flexões uma vez por semana. O corpo responde à frequência, não ao trauma.",
    autor: "Ross Enamait"
  }, {
    frase: "O treino mais inteligente é o que você consegue fazer hoje e repetir amanhã.",
    autor: "Dan John"
  }, {
    frase: "Não existe atalho para qualquer lugar que valha ir — especialmente na força.",
    autor: "Beverly Sills"
  }, {
    frase: "A paciência não é passividade. É força ativa direcionada ao longo do tempo.",
    autor: "Ditado Estoico adaptado"
  }, {
    frase: "Mielinização: quanto mais você pratica o movimento correto, mais rápido o sinal elétrico percorre a fibra nervosa. Você literalmente remodela o cérebro com cada repetição de qualidade.",
    autor: "Daniel Coyle — The Talent Code"
  }, {
    frase: "Não importa quão devagar você vá, desde que não pare.",
    autor: "Confúcio"
  }, {
    frase: "Os soviéticos descobriram que a força é uma habilidade neurológica. Você não a constrói destruindo músculos, você a instala com prática perfeita.",
    autor: "Mel Siff — Supertraining"
  }, {
    frase: "Um treino que você faz sempre supera o treino perfeito que você evita.",
    autor: "James Clear — Atomic Habits"
  }, {
    frase: "O sistema de 40% de Goggins: quando sua mente diz que acabou, você está usando apenas 40% do que seu corpo pode dar.",
    autor: "David Goggins — Cant Hurt Me"
  }, {
    frase: "Faça da força um hábito, não um evento. Eventos terminam. Hábitos constroem vidas.",
    autor: "Filosofia GTG"
  }, {
    frase: "Cada série que você faz hoje é um voto para o atleta que você quer se tornar.",
    autor: "James Clear — Atomic Habits (adaptado)"
  }, {
    frase: "Os gregos antigos treinavam forças todos os dias porque acreditavam que o corpo era o templo da alma. GTG é apenas a versão moderna dessa sabedoria.",
    autor: "Filosofia Calistenia Clássica"
  }, {
    frase: "A constância do amador supera o talento do preguiçoso em toda escala de tempo maior que seis meses.",
    autor: "Ditado Esportivo"
  }, {
    frase: "Você não pode comprar resistência. Você não pode atalhar a adaptação. Você só pode aparecer e trabalhar — repetidamente.",
    autor: "Chris Heria — THENX"
  }, {
    frase: "Cada vez que você sai para treinar quando não quer, você constrói o músculo mais importante: a disciplina.",
    autor: "Jocko Willink — Extreme Ownership"
  }, {
    frase: "Se você está procurando a fórmula secreta, aqui está: treine com frequência, mova-se com qualidade, descanse com intenção. Repita por anos.",
    autor: "Eric Cressey — Coach de Força"
  }, {
    frase: "A fadiga esconde a força real. Treine fresco para descobrir o que você realmente é capaz.",
    autor: "Pavel Tsatsouline — Easy Strength"
  }, {
    frase: "Você não cresce durante o treino, você cresce durante a recuperação. O treino é apenas o pedido. O sono é a entrega.",
    autor: "Matthew Walker — Why We Sleep (adaptado)"
  }, {
    frase: "Kaizen: melhora contínua, dia após dia, por menores que sejam os ganhos. É assim que campeões são forjados.",
    autor: "Filosofia Japonesa do Kaizen"
  }, {
    frase: "A barra não se importa com suas desculpas. O colchonete não aceita postergação. A única negociação possível é você aparecer.",
    autor: "Espírito GTG"
  }],
  LEMBRETES_GTG = ["⏰ Hora de uma série! Lembre: 50-60% do seu máximo. Qualidade acima de tudo.", "🔔 Pavel diz: 'Uma série perfeita agora vale mais do que dez séries ruins depois.'", "⚡ 15 minutos de descanso respeitados. Hora de trabalhar!", "🎯 Micro-dose de força. Uma série. Agora. Sem desculpa.", "💪 O sistema nervoso está pronto. Mais uma série constrói o padrão.", "🔥 Streak em andamento. Não quebre a corrente — uma série mantém tudo!", "⭐ Frequência > Intensidade. Uma série agora > Zero séries depois.", "🪖 O soldado não espera a hora perfeita. Ele treina quando pode.", "🧠 Cada repetição de qualidade mieliniza a via nervosa. Faça agora.", "⚔ GTG é sobre acúmulo. Cada série conta — mesmo a mais simples."];
let fraseAtualIndex = -1,
  lembreteInterval = null,
  lembreteContagem = 0,
  lembreteProximo = null,
  lembreteIntervaloMs = 900000,
  lembreteSWAtivo = false,
  filtroPerfeitas = false,
  dados = {
    exercicios: [],
    registros: [],
    metas: {},
    aquecimento: {}
  },
  undoState = {
    ultimoRegistro: null,
    timeoutId: null,
    countdownInterval: null,
    segundosRestantes: 5
  },
  _deletedExercicioState = {
    ultimoExercicio: null,
    timeoutId: null
  },
  streakData = {
    atual: 0,
    recorde: 0,
    ultimaData: null,
    diasFolgaUsados: 0,
    semanaInicio: null,
    streakShields: 0,
    shieldCost: 500
  },
  xpData = {
    total: 0,
    nivel: "RECRUTA",
    proximoNivelEm: 1e3,
    nivelAtualEm: 0,
    dailyXP: 0,
    dailyDate: "",
    xpHistory: []
  },
  badgesData = {
    desbloqueadas: []
  },
  plankTimer = {
    intervalo: null,
    segundos: 0,
    rodando: !1,
    preparando: !1
  },
  plankGroove = [0, 0, 0],
  restTimer = {
    intervalo: null,
    segundos: 0,
    rodando: !1,
    exercicioId: null,
    exercicioNome: ""
  },
  chartSemanal = null,
  chartStreak = null,
  chartProgresso = null,
  modoGrafico = "series",
  modoProgresso = "volume",
  audioCtx = null;

function inicializar() {
  carregarDados().then(async () => {
    skilltreeSyncExercicios(), atualizarDataHeader(), renderExercicios(), renderBadges(), renderHistory(), renderGuiaExercicios(), atualizarXP(), atualizarUIStreak(), atualizarStats(), renderWarmup(), setTimeout(() => {
      renderGraficos(), renderProgresso(), renderEstatisticasMensais()
    }, 300), verificarStreak(), verificarBadges(), preencherSelects(), exibirFraseDoDia(), iniciarLembretes();
    await Promise.all([carregarReadiness(), carregarMetas(), carregarPlanejador(), carregarModoFoco(), carregarGrooveState()]);
    if (modoFocoState.ativo) {
      const e = document.getElementById("modoFocoToggle");
      e && e.classList.add("active"), populateFocoSelect(), document.getElementById("modoFocoSelect").value = modoFocoState.exercicioId || "", aplicarModoFoco()
    }
    restaurarTimersGTG(), setTimeout(atualizarSugestoesGTG, 500), setTimeout(mostrarResumoOntem, 1500), setTimeout(function() {
      // Restaura ordenação salva
      var sel = document.getElementById("sortExercicios");
      getItem("gtg_ex_order").then(function(v) { if (sel && v) sel.value = v; }).catch(function(){});
    }, 1800), inicializarSkillTree(), renderCalendario(), verificarRelatorioSemanal();
    const ultimoGroove = dados.registros.filter(r => r.groove).pop();
    const grooveTotal = ultimoGroove ? ultimoGroove.groove.reduce((a, b) => a + b, 0) : (plankGroove ? plankGroove[0] + plankGroove[1] + plankGroove[2] : 0);
    atualizarGrooveStatus(grooveTotal);
    const pesoDataEl = document.getElementById("pesoData");
    if (pesoDataEl && !pesoDataEl.value) pesoDataEl.value = new Date().toISOString().slice(0, 10);
    const audioBtn = document.getElementById("btnToggleAudio");
    audioBtn && (audioBtn.textContent = audioMuted ? "🔇" : "🔊");
    try { atualizarBadgeApp(); } catch (_) {}
    try { atualizarCheckinBanner(); } catch (_) {}
    try { renderPlanoHojeCard(); } catch (_) {}
  })
}

async function carregarDados() {
  try {
    await window.storageReady;
    try {
      const audioRaw = await getItem("gtg_audio_muted");
      if (audioRaw !== null) audioMuted = JSON.parse(audioRaw) === true;
    } catch (e) {}
    const raw = await getItem("gtg_data");
    raw ? (dados = JSON.parse(raw), dados && dados.exercicios && Array.isArray(dados.exercicios) || (console.warn("Dados corrompidos, resetando para defaults"), await removeItem("gtg_data").catch(e => console.warn("[storage]", e)), dados = {
      exercicios: EXERCICIOS_DEFAULT.map(ex => ({ ...ex })),
      registros: []
    })) : (dados.exercicios = EXERCICIOS_DEFAULT.map(ex => ({ ...ex })), dados.registros = []), dados.exercicios && 0 !== dados.exercicios.length || (dados.exercicios = EXERCICIOS_DEFAULT.map(ex => ({ ...ex }))), dados.exercicios.forEach(ex => {
      const defaultEx = EXERCICIOS_DEFAULT.find(d => d.id === ex.id);
      defaultEx && !ex.detalhes && (ex.detalhes = defaultEx.detalhes), defaultEx && (ex.detalhes = defaultEx.detalhes)
    }), EXERCICIOS_DEFAULT.forEach(defaultEx => {
      dados.exercicios.find(ex => ex.id === defaultEx.id) || dados.exercicios.push({ ...defaultEx })
    });
    const removidos = ["lsit", "isometrico"];
    dados.exercicios = dados.exercicios.filter(ex => !removidos.includes(ex.id));
    const seen = new Set;
    dados.exercicios = dados.exercicios.filter(ex => !seen.has(ex.id) && (seen.add(ex.id), !0))
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
    try { await removeItem("gtg_data") } catch (e) {}
    dados = { exercicios: EXERCICIOS_DEFAULT.map(ex => ({ ...ex })), registros: [] }
  }
  try {
    const raw = await getItem("gtg_streaks");
    raw && (streakData = JSON.parse(raw)), void 0 === streakData.streakShields && (streakData.streakShields = 0), void 0 === streakData.shieldCost && (streakData.shieldCost = 500)
  } catch (err) {
    console.error("[carregarDados] Falha ao carregar streakData:", err)
  }
  try {
    const raw = await getItem("gtg_xp");
    raw && (xpData = JSON.parse(raw))
  } catch (err) {
    console.error("[carregarDados] Falha ao carregar xpData:", err)
  }
  try {
    const raw = await getItem("gtg_badges");
    badgesData = raw ? JSON.parse(raw) : { desbloqueadas: [] }
  } catch (err) {
    badgesData = { desbloqueadas: [] }
  }
}

function salvarDados() {
  if (_salvarDadosTimer) { clearTimeout(_salvarDadosTimer); _salvarDadosTimer = null; }
  Promise.all([
    setItem("gtg_data", JSON.stringify(dados)),
    setItem("gtg_streaks", JSON.stringify(streakData)),
    setItem("gtg_xp", JSON.stringify(xpData)),
    setItem("gtg_badges", JSON.stringify(badgesData))
  ]).catch(e => console.warn("[storage]", e))
}

// Versão com debounce de 400 ms para micro-ações frequentes (registrar série,
// badge unlock, undo). Ações estruturais (add/remove exercício, importar) usam
// salvarDados() direto para garantir flush imediato.
let _salvarDadosTimer = null;
function salvarDadosDebounced() {
  if (_salvarDadosTimer) clearTimeout(_salvarDadosTimer);
  _salvarDadosTimer = setTimeout(() => {
    _salvarDadosTimer = null;
    salvarDados();
  }, 400);
}

function atualizarDataHeader() {
  const now = new Date;
  document.getElementById("headerDate").innerHTML = `${["DOM","SEG","TER","QUA","QUI","SEX","SAB"][now.getDay()]} ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}<br>\n     <span style="font-size:16px;">${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}</span>`, setTimeout(atualizarDataHeader, 3e4)
}












// ============================================================
// GRÁFICO SEMANAL DETALHADO DE XP (substitui a antiga sparkline)
// Mostra XP ganho por dia (barras) + séries realizadas (linha)
// nos últimos 7 dias, além de mini-stats de total/média/melhor dia.
// ============================================================











const GROOVE_SLIDER_PREFIX = ['groove-amp-', 'groove-ten-', 'groove-bal-'];










// ===== END GROOVE =====



// para preservar scroll, foco e os event listeners de drag-and-drop.





















































function exibirFraseDoDia() {
  const el = document.getElementById("fraseMotivacional");
  if (!el) return;
  const idx = Math.floor(Math.random() * FRASES_PAVEL.length);
  fraseAtualIndex = idx;
  const frase = FRASES_PAVEL[idx];
  el.innerHTML = '<div class="frase-texto">"' + frase.frase + '"</div><div class="frase-autor">— ' + frase.autor + "</div>"
}

function proximaFrase() {
  if (modoFocoState.ativo && modoFocoState.exercicioId) {
    const ex = dados.exercicios.find(e => e.id === modoFocoState.exercicioId);
    if (ex) {
      const focoFrases = [`🎯 FOCO: ${escapeHtml(ex.nome)}. Uma série perfeita agora vale mais que dez ruins depois.`, `🔥 Modo Foco ativo. ${escapeHtml(ex.nome)} — qualidade máxima, volume controlado.`, `⚡ ${escapeHtml(ex.nome)}: frequência > intensidade. Uma série agora > zero depois.`, `🪖 Soldado, hora de ${escapeHtml(ex.nome)}. Tensão irradiante, controle total.`, `⭐ ${escapeHtml(ex.nome)}: cada rep de qualidade mieliniza a via nervosa.`],
        el = document.getElementById("fraseMotivacional");
      if (el) {
        const f = focoFrases[Math.floor(Math.random() * focoFrases.length)];
        return el.style.opacity = "0", void setTimeout(() => {
          el.innerHTML = '<div class="frase-texto">' + f + '</div><div class="frase-autor">— Pavel Tsatsouline</div>', el.style.opacity = "1"
        }, 300)
      }
    }
  }
  fraseAtualIndex = (fraseAtualIndex + 1) % FRASES_PAVEL.length;
  const frase = FRASES_PAVEL[fraseAtualIndex],
    el = document.getElementById("fraseMotivacional");
  el && (el.style.opacity = "0", el.style.transition = "opacity 0.3s", setTimeout(() => {
    el.innerHTML = '<div class="frase-texto">"' + frase.frase + '"</div><div class="frase-autor">— ' + frase.autor + "</div>", el.style.opacity = "1"
  }, 300))
}









function mostrarInfoExercicio(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return;
  const det = ex.detalhes || {};
  document.getElementById("infoModalTitle").textContent = ex.nome, document.getElementById("infoModalBody").innerHTML = `\n    <div class="exercise-info-section">\n      <h3>DESCRIÇÃO</h3>\n      <p>${escapeHtml(det.descricao||"Sem descrição.")}</p>\n    </div>\n    ${det.pavelQuote?`\n    <div class="pavel-quote-highlight">\n      ${escapeHtml(det.pavelQuote)}\n      <cite>PAVEL TSATSOULINE</cite>\n    </div>`:""}\n    <div class="exercise-info-section">\n      <h3>EXECUÇÃO PASSO A PASSO</h3>\n      <ul>${(det.execucao||["Execute com controle"]).map((step,i)=>`<li><strong style="color:var(--gold)">${i+1}.</strong> ${escapeHtml(step)}</li>`).join("")}</ul>\n    </div>\n    <div class="exercise-info-section">\n      <h3>⚡ DICA GTG DE PAVEL</h3>\n      <p>${escapeHtml(det.gtgDica||"Mantenha séries a 50-60% do seu máximo.")}</p>\n    </div>\n    ${det.variacoes&&det.variacoes.length>0?`\n    <div class="exercise-info-section">\n      <h3>PROGRESSÕES E VARIAÇÕES</h3>\n      <ul>${det.variacoes.map(v=>`<li>${escapeHtml(v)}</li>`).join("")}</ul>\n    </div>`:""}\n    <div class="warning-box">\n      TIPO: ${escapeHtml(ex.tipo.toUpperCase())} | UNIDADE: ${escapeHtml(ex.unidade||"reps")} | GTG: 40-60% DO MÁXIMO\n    </div>\n  `, document.getElementById("infoModal").classList.add("active")
}













function renderGuiaExercicios() {
  const section = document.getElementById("exerciseGuideSection");
  if (!section) return;
  if (!dados.exercicios || dados.exercicios.length === 0) {
    section.innerHTML = '<div class="text-mono" style="text-align:center;padding:24px;color:var(--gray-light)">Nenhum exercício cadastrado. Adicione exercícios para ver o guia.</div>';
    return
  }
  section.innerHTML = dados.exercicios.map(ex => `\n    <div class="gtg-principle" style="cursor:pointer;" onclick="mostrarInfoExercicio('${ex.id}')">\n      <div class="gtg-principle-title">${escapeHtml(ex.nome)}</div>\n      <div class="gtg-principle-text" style="font-size:12px;">${escapeHtml(ex.tipo.toUpperCase())} — ${escapeHtml(ex.unidade||"reps")}</div>\n    </div>\n  `).join("")
}
window.addEventListener("beforeinstallprompt", ev => {
  ev.preventDefault(), deferredInstallPrompt = ev, document.getElementById("btnInstalarPWA").style.display = "inline-block"
}), window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null, document.getElementById("btnInstalarPWA").style.display = "none", mostrarToast("✓ App Instalado!", "GTG Tracker instalado. Lembretes funcionarão em background.", "success")
});
let modoFocoState = { ativo: !1, exercicioId: null };

async function carregarModoFoco() {
  try {
    const raw = await getItem("gtg_modo_foco");
    raw && (modoFocoState = JSON.parse(raw))
  } catch (err) {
    console.error("[carregarModoFoco] Falha ao carregar modoFocoState:", err)
  }
}

function salvarModoFoco() {
  setItem("gtg_modo_foco", JSON.stringify(modoFocoState)).catch(e => console.warn("[storage]", e))
}

function toggleModoFoco() {
  const toggle = document.getElementById("modoFocoToggle"),
    select = document.getElementById("modoFocoSelect");
  modoFocoState.ativo = !modoFocoState.ativo, modoFocoState.ativo ? (toggle.classList.add("active"), populateFocoSelect(), !modoFocoState.exercicioId && dados.exercicios.length > 0 && (modoFocoState.exercicioId = dados.exercicios[0].id), select.value = modoFocoState.exercicioId || "", mostrarToast("🔥 MODO FOCO", "Foco total em um exercício. Elimine distrações.", "success")) : (toggle.classList.remove("active"), modoFocoState.exercicioId = null, mostrarToast("MODO NORMAL", "Todos os exercícios visíveis.", "success")), salvarModoFoco(), aplicarModoFoco()
}

function populateFocoSelect() {
  const el = document.getElementById("modoFocoSelect");
  if (!el) return;
  const prevVal = el.value;
  el.innerHTML = '<option value="">SELECIONAR...</option>', dados.exercicios.forEach(ex => {
    const opt = document.createElement("option");
    opt.value = ex.id, opt.textContent = ex.nome, el.appendChild(opt)
  }), prevVal && (el.value = prevVal)
}

function changeFocoExercise(ev) {
  if (modoFocoState.exercicioId = ev.target.value, salvarModoFoco(), aplicarModoFoco(), modoFocoState.exercicioId) {
    const ex = dados.exercicios.find(e => e.id === modoFocoState.exercicioId);
    ex && mostrarToast("🎯 FOCO REDEFINIDO", ex.nome, "success")
  }
}

function aplicarModoFoco() {
  const banner = document.getElementById("focoBanner"),
    bannerEx = document.getElementById("focoBannerEx"),
    cards = document.querySelectorAll(".exercise-card");
  if (!modoFocoState.ativo || !modoFocoState.exercicioId) return cards.forEach(card => {
    card.classList.remove("foco-hidden", "foco-highlight")
  }), void(banner && banner.classList.remove("active"));
  const ex = dados.exercicios.find(e => e.id === modoFocoState.exercicioId);
  bannerEx && ex && (bannerEx.textContent = ex.nome), banner && banner.classList.add("active"), cards.forEach(card => {
    card.id.replace("excard-", "") === modoFocoState.exercicioId ? (card.classList.remove("foco-hidden"), card.classList.add("foco-highlight")) : (card.classList.add("foco-hidden"), card.classList.remove("foco-highlight"))
  })
}














const READINESS_WEIGHTS_KEY = "gtg_readiness_weights";






















/* === Insight automático — aponta o fator que mais está puxando a nota para baixo === */


/* === Correlação — compara a nota de prontidão com o volume realmente treinado hoje === */


/* === Tendência de 30 dias com média móvel === */








document.addEventListener("keydown", e => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  const a = ["treino", "stats", "badges", "historico", "metodo", "exportar", "planejador"];
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6": {
      const t = parseInt(e.key) - 1,
        o = document.querySelector(`.nav-tab[data-tab="${a[t]}"]`);
      o && o.click();
      break
    }
    case "t":
    case "T":
      document.querySelector('.nav-tab[data-tab="treino"]')?.click();
      break;
    case "p":
    case "P":
      document.querySelector('.nav-tab[data-tab="stats"]')?.click();
      break;
    case "h":
    case "H":
      document.querySelector('.nav-tab[data-tab="historico"]')?.click();
      break;
    case " ": {
      e.preventDefault();
      const a = document.getElementById("btnStartTimer");
      a && a.click();
      break
    }
    case "Escape":
      stopPlankTimer?.();
      break;
    case "f":
    case "F":
      e.ctrlKey || e.metaKey || toggleModoFoco?.();
      break;
    case "?":
      mostrarModalAtalhos()
  }
});














function mostrarModalAtalhos() {
  let e = document.getElementById("atalhoModal");
  e || (e = document.createElement("div"), e.id = "atalhoModal", e.className = "modal-overlay", e.innerHTML = `\n      <div class="modal" style="max-width:460px;">\n        <div class="modal-header">\n          <span class="modal-title">⌨ ATALHOS DE TECLADO</span>\n          <button class="modal-close" onclick="document.getElementById('atalhoModal').classList.remove('active')">✕</button>\n        </div>\n        <div class="modal-body" style="padding:0;">\n          <table style="width:100%; border-collapse:collapse; font-family:'Rajdhani',sans-serif;">\n            ${[["NAVEGAÇÃO","",""],["1 – 6","Ir para aba (Treino, Progresso, Badges, Histórico, Método, Exportar)",""],["T","Ir para aba Treino",""],["P","Ir para Progresso",""],["H","Ir para Histórico",""],["TIMER","",""],["Espaço","Iniciar / Pausar timer",""],["Esc","Parar e salvar timer",""],["GERAL","",""],["F","Toggle Modo Foco",""],["?","Esta janela de atalhos",""]].map(([e,a,t])=>e!==e.toUpperCase()||a?`\n              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">\n                <td style="padding:8px 20px; width:90px;">\n                  <kbd style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; padding:2px 8px; font-family:'Share Tech Mono',monospace; font-size:12px; color:var(--white);">${e}</kbd>\n                </td>\n                <td style="padding:8px 20px; color:var(--white-dim); font-size:14px;">${a}</td>\n              </tr>\n            `:`\n              <tr><td colspan="2" style="padding:10px 20px 4px; font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:3px; color:var(--gold-dim); background:rgba(212,160,23,0.05); border-top:1px solid rgba(212,160,23,0.15);">${e}</td></tr>\n            `).join("")}\n          </table>\n          <div style="padding:12px 20px; border-top:1px solid rgba(255,255,255,0.06);">\n            <div class="text-mono" style="font-size:10px; color:var(--gray);">Atalhos desativados quando um campo de texto está em foco.</div>\n          </div>\n        </div>\n      </div>`, document.body.appendChild(e)), e.classList.add("active")
}document.addEventListener("keydown", e => {
  ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) || "?" === e.key && mostrarModalAtalhos()
}, !0);










function atualizarCheckinBanner() {
  const banner = document.getElementById("checkinBanner");
  if (!banner) return;
  const hoje = (new Date).toISOString().slice(0, 10);
  const precisa = typeof readinessData !== "undefined" && readinessData.data !== hoje;
  banner.style.display = precisa ? "flex" : "none";
  const hdr = document.getElementById("headerReadiness");
  if (hdr) {
    if (precisa) {
      hdr.classList.add("header-readiness-pulse");
      hdr.title = "🎯 Preencha seu check-in matinal!";
    } else {
      hdr.classList.remove("header-readiness-pulse");
      hdr.title = "";
    }
  }
}

function aplicarTema(e) {
  _limparCacheCssVar();
  document.documentElement.setAttribute("data-theme", "dark"), setItem("gtg_tema", "dark").catch(e => console.warn("[storage]", e));
  const a = document.getElementById("themeSwitchBtn");
  if (a) {
    a.textContent = "🔴";
    a.title = "EXÉRCITO VERMELHO — Red Army";
    a.style.borderColor = "rgba(255,26,26,0.3)";
    a.style.color = "inherit";
    a.style.background = "rgba(255,26,26,0.08)";
    a.style.boxShadow = "0 0 8px rgba(255,26,26,0.2)";
    a.style.borderRadius = "4px";
    a.style.backdropFilter = "none";
  }
}

function setTheme(theme) {
  aplicarTema("dark");
}

async function carregarTema() {
  await window.storageReady;
  aplicarTema("dark");
}
carregarTema();




















document.addEventListener("DOMContentLoaded", () => {
  "serviceWorker" in navigator && registrarServiceWorker().then(reg => {
    if (reg) {
      swRegistration = reg;
      const enviarBuild = () => { reg.active && reg.active.postMessage({ type: "ATUALIZAR_CACHE", version: CACHE_BUILD }) };
      reg.active ? enviarBuild() : reg.addEventListener("updatefound", () => {
        reg.installing?.addEventListener("statechange", () => { reg.active && enviarBuild() })
      })
    }
  });
  const e = cssVar("--accent-red") || "#CC0000";
  const d = document.querySelector('meta[name="theme-color"]');
  d && d.setAttribute("content", e), "serviceWorker" in navigator && navigator.serviceWorker.getRegistration().then(e => {
    e && e.active && (swRegistration = e, "granted" === Notification.permission && (lembreteSWAtivo = true, lembreteProximo = Date.now() + (lembreteIntervaloMs || 900000), e.active.postMessage("INICIAR_LEMBRETES"), e.active.postMessage({ type: "ALTERAR_INTERVALO", intervalo: lembreteIntervaloMs || 900000 }), document.getElementById("btnAtivarLembrete").style.display = "none", document.getElementById("btnDesativarLembrete").style.display = "inline-block", window._lembreteCountdownInterval || (window._lembreteCountdownInterval = setInterval(_atualizarUIAlertas, 1000)), _atualizarUIAlertas()))
  }), document.addEventListener("visibilitychange", () => { "visible" === document.visibilityState && _atualizarUIAlertas() }), inicializar();

  // Drag tracking — only on slider inputs
  const sliderIds = ["sliderSono","sliderStress","sliderDor","sliderEnergia","sliderHidratacao","sliderAlimentacao","sliderMotivacao"];
  const rc = document.getElementById("readinessCard");
  const hdr = document.getElementById("headerReadiness");
  const startDrag = () => { _isDragging = true; rc && rc.classList.add("dragging"); hdr && hdr.classList.add("drag-pulse"); };
  const endDrag = () => {
    if (!_isDragging) return;
    _isDragging = false;
    rc && rc.classList.remove("dragging");
    hdr && hdr.classList.remove("drag-pulse");
  };
  sliderIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("mousedown", startDrag);
      el.addEventListener("touchstart", startDrag, { passive: true });
    }
  });
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
});


/* === CALENDÁRIO HEATMAP === */





