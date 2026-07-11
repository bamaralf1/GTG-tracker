function cssVar(name) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name
  } catch (_) {
    return name
  }
}
const EXERCICIOS_DEFAULT = [{
    id: "flexao",
    nome: "FLEXÃO",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Mãos na largura dos ombros, corpo reto como prancha. Desça até o peito quase tocar o chão. Suba explosivamente. Nunca deixe o quadril afundar.",
    detalhes: {
      descricao: "A flexão é o exercício de empurrar mais funcional e completo recomendado por Pavel. Trabalha peito, tríceps, ombros anteriores e estabilizadores do core. Pavel a usa como base do sistema GTG por ser realizável em qualquer lugar e a qualquer momento.",
      execucao: ["Posicione as mãos na largura dos ombros", "Mantenha o corpo rígido — cabeça, coluna e calcanhares alinhados", "Desça controladamente até o peito quase tocar o chão", "Pressione o chão para subir explosivamente", "Bloqueie levemente os cotovelos no topo — nunca hiperestenda", "Contraia glúteos e abdômen o tempo todo — não é só braço"],
      gtgDica: 'Para GTG: se seu máximo é 20, faça séries de 8-10. Descanse 15-30 min entre séries. Pavel diz: "A flexão perfeita é tão difícil quanto uma série pesada de supino — se não estiver assim, você está fazendo errado."',
      pavelQuote: '"Trate a flexão como um levantamento terra. Tensione tudo. Ela não é um exercício de aquecimento — é um exercício de força."',
      variacoes: ["Flexão com mãos juntas (diamante) — foco em tríceps", "Flexão lenta 5-1-5 (5s descida, pausa, 5s subida) — controle máximo", "Archer push-up — pré-progressão para flexão com um braço", "Flexão com um braço (OAP) — meta elite de Pavel", "Flexão declined (pés elevados) — ombros e porção superior do peito"]
    }
  }, {
    id: "barra_fixa",
    nome: "BARRA FIXA",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Pegada pronada (palmas para fora). Puxe o peito até a barra. Desça completamente em controle. Escápulas ativadas antes de puxar.",
    detalhes: {
      descricao: 'Pavel considera a barra fixa (pull-up pronado) o exercício de puxar mais honesto que existe. "Não há como trapacear." Trabalha dorsais, romboides, bíceps braquial, bíceps braquiorradial e rotadores externos do ombro. Para Pavel, quem consegue 15 pull-ups de qualidade tem força de tronco superior que a maioria jamais atingirá.',
      execucao: ["Agarre a barra com pegada pronada, ombros ligeiramente mais afastados", "DEPRESSÃO ESCAPULAR PRIMEIRO — empurre os ombros para baixo e para dentro antes de puxar", "Puxe o peito em direção à barra — não o queixo", "Cotovelos apontam para baixo e para dentro no topo", "Desça em controle total — negativa lenta é treinamento, não descanso", "Braços completamente estendidos na posição baixa — sem trapacear a amplitude"],
      gtgDica: 'GTG perfeito para barra fixa. Se máximo = 10, faça séries de 4-5 ao longo do dia. Pavel: "O caminho mais rápido para 20 pull-ups é fazer 5 séries de 5 por dia durante meses, não treinar até o fracasso duas vezes por semana."',
      pavelQuote: '"Dez pull-ups perfeitos valem mais do que trinta com balanço e meio ROM. Qualidade é velocidade em câmera lenta."',
      variacoes: ["Chin-up (supinado) — pico de bíceps, mais força para iniciantes", "Neutral grip (paralelo) — mais confortável para ombros lesionados", "L-sit pull-up — combinação de força de core e braços, modo elite", "Archer pull-up — progressão unilateral", "Negativa lenta (6-10s) — construtora de força para quem não faz ainda"]
    }
  }, {
    id: "agachamento",
    nome: "AGACHAMENTO",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Pés na largura dos ombros, dedos levemente apontados para fora. Desça com o quadril para baixo e para trás. Joelhos seguem os pés. Suba forte.",
    detalhes: {
      descricao: 'Pavel promove o agachamento profundo como padrão de movimento natural do ser humano. "Toda criança pequena agacha perfeitamente. Você perdeu esse padrão — recupere." Trabalha quádriceps, posteriores, glúteos, adutores e estabilizadores do tornozelo.',
      execucao: ["Pés na largura dos ombros, dedos 15-30° para fora", "Inspire fundo, crie pressão intra-abdominal (técnica Valsalva)", "Empurre os joelhos para fora — no alinhamento dos dedos dos pés", "Desça até abaixo do paralelo — agachamento parcial não conta para Pavel", 'Suba com quadril e ombros no mesmo ritmo — sem "good morning" no final', "Expire na fase mais difícil da subida"],
      gtgDica: 'Excelente para GTG com peso corporal. Progrida para agachamento búlgaro e depois pistol squat. Pavel: "O pistol squat é o termômetro da sua mobilidade e força unilateral de perna."',
      pavelQuote: '"Se você não agacha profundo, não tem força de perna — tem força de academia."',
      variacoes: ["Agachamento búlgaro (pé traseiro elevado) — força unilateral", "Agachamento goblet (kettlebell ao peito) — aprende a postura", "Pistol squat (com um pé) — progressão elite de Pavel", "Agachamento com pausa 3s em baixo — elimina o bounce", "Cossack squat — mobilidade de quadril avançada"]
    }
  }, {
    id: "prancha",
    nome: "PRANCHA",
    tipo: "tempo",
    unidade: "seg",
    instrucoes: "Antebraços no chão, cotovelos sob os ombros. Corpo rígido. Glúteos e abdômen contraídos ao máximo. RKC Plank: tensione como se fosse levantar peso.",
    detalhes: {
      descricao: 'Pavel desenvolveu a variação RKC Plank, muito mais difícil que a prancha comum. Em vez de "aguentar" passivamente, você cria tensão irradiante máxima em todo o corpo. Trabalha transverso abdominal, reto abdominal, oblíquos, glúteos, quadríceps e estabilizadores escapulares.',
      execucao: ["Antebraços paralelos, cotovelos diretamente abaixo dos ombros", "CONTRAIA OS GLÚTEOS ao máximo — como se estivesse quebrando uma noz", "Contraia o abdômen como se fosse levar um soco", "Empurre os cotovelos para frente e os pés para trás simultaneamente", "Pressione os antebraços para baixo contra o chão — dorsais ativados", "Respire normalmente — RKC Plank de 10s equivale a prancha comum de 60s"],
      gtgDica: 'Use o timer deste app! Para GTG de prancha RKC, acumule tempo total. Ex: 5 séries de 20-30s. Pavel: "A prancha correta deixa você exausto em 20 segundos. Se você aguenta 3 minutos facilmente, está fazendo errado."',
      pavelQuote: '"A RKC Plank é uma prancha com 100% de tensão. Não é resistência — é força isométrica máxima."',
      variacoes: ["Prancha lateral com rotação — oblíquos e antirotação", "Prancha com elevação alterna de braço — estabilidade escapular", "Prancha com toque no ombro — antirotação dinâmica", "Dragon flag (negativa) — core de atleta olímpico", "Ab wheel rollout — o favorito de Pavel para core avançado"]
    }
  }, {
    id: "dips",
    nome: "DIPS / MERGULHO",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Paralelas, braços estendidos. Incline levemente o tronco para frente. Desça até cotovelos a 90° ou além. Suba com força explosiva. Ombros para baixo e trás.",
    detalhes: {
      descricao: 'Os dips são o "squat do tronco superior" segundo Pavel — um exercício de empurrar que trabalha o peito, tríceps e deltoides anteriores em amplitude completa. Pavel os inclui em protocolos de força para construir o push strength necessário antes do muscle-up e do handstand push-up.',
      execucao: ["Posicione-se nas paralelas com braços completamente estendidos", "Incline o tronco levemente para frente (±15°) para ativar mais o peito", "Ombros em depressão — nunca deixe subirem até as orelhas", "Desça controladamente até cotovelos a 90° (ou mais fundo para peito)", "Suba explosivamente — bloqueie os cotovelos suavemente no topo", "Controle a descida — a negativa é metade do treinamento"],
      gtgDica: 'Para GTG: se máximo são 15 dips, faça séries de 6-8 várias vezes ao dia. Progrida adicionando peso (colete, corrente) quando dominar 20 reps com peso corporal. Pavel: "Dips com peso corporal perfeito valem mais que dips descuidados com 50kg."',
      pavelQuote: '"O dip profundo é o supino vertical. Não trunce a amplitude — você está roubando de si mesmo."',
      variacoes: ["Dip em cadeira (bench dip) — iniciante, menos eficaz", "Dip estreito — mais tríceps", "Dip amplo com inclinação — mais peito", "Weighted dip (colete ou corrente) — progressão de força", "Ring dip — instabilidade, força de estabilização extra"]
    }
  }, {
    id: "swing_kettlebell",
    nome: "KETTLEBELL SWING",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Quadril atrás, joelhos levemente fletidos. Impulsione o kettlebell com o quadril, não os braços. No topo: corpo rígido como prancha vertical. Absorva na descida.",
    detalhes: {
      descricao: 'Pavel Tsatsouline introduziu o kettlebell swing no mundo do fitness ocidental e o considera "o exercício mais eficiente do planeta." Um swing pesado e limpo trabalha glúteos, isquiotibiais, lombar, core e condicionamento cardiovascular em um único movimento. Pavel usa duas variações: swing americano (acima da cabeça) e hardstyle swing (à altura do peito), preferindo o hardstyle.',
      execucao: ["Kettlebell entre os pés, ligeiramente à frente", "Hike pass: puxe o KB entre as pernas agressivamente como um hiking back", "EXPLOSÃO DE QUADRIL — não é agachamento, não é levantamento com as costas", "No topo: glúteos totalmente contraídos, abdômen tenso, corpo em prancha vertical", "Deixe o KB cair e ABSORVA com o quadril recuando — não resista passivamente", "Respire: expire na explosão, inspire na descida (técnica hardstyle)"],
      gtgDica: 'Para GTG: séries de 10-20 swings pesados várias vezes ao dia. Pavel: "100 swings com um kettlebell pesado fazem mais pelo seu condicionamento e glúteos do que 45 minutos de cardio em máquina. É a diferença entre treinar e se movimentar."',
      pavelQuote: '"O swing perfeito é uma explosão balística de quadril. O arms são apenas uma extensão do KB — o poder vem do centro."',
      variacoes: ["Swing com duas mãos — base, aprenda aqui", "Swing com uma mão — instabilidade e anti-rotação", "Swing alternado — coordenação e ritmo", "Swing em pirâmide (5-10-15-10-5) — protocolo de condicionamento", "Dead stop swing — elimina o bounce, força cada rep do zero"]
    }
  }, {
    id: "turkish_getup",
    nome: "TURKISH GET-UP",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Deite com KB em uma mão acima da cabeça. Siga os 7 passos: rolar → apoio no cotovelo → apoio na mão → ponte → joelho → estocada → em pé. Reverta.",
    detalhes: {
      descricao: 'Pavel chama o Turkish Get-up (TGU) de "o melhor exercício de ombro do mundo" e de "a academia completa em um único movimento." O TGU desenvolve estabilidade de ombro, mobilidade de quadril, força de core rotacional e coordenação de corpo inteiro. É obrigatório no protocolo SFG (StrongFirst Girya) de Pavel.',
      execucao: ["Passo 1: Role para lado, segure KB com braço estendido", "Passo 2: Apoio no cotovelo — olhe para o KB o tempo todo", "Passo 3: Apoio na mão — empurre o chão, não o KB", "Passo 4: Ponte de quadril — levante o quadril alto", "Passo 5: Coloque o joelho livre em baixo do corpo", "Passo 6: Posição de estocada — joelho no chão", "Passo 7: Suba em pé completamente — REVERTA cada passo"],
      gtgDica: 'Para GTG: 1-3 reps por lado, várias vezes ao dia. Pavel: "Faça o TGU. Se não consegue fazer com um KB leve e perfeito, não merece carregar peso pesado acima da cabeça. Ele revela tudo."',
      pavelQuote: '"Se eu tivesse que recomendar um único exercício para todo o corpo, seria o Turkish Get-up. Ele não perdoa fraquezas — ele as expõe."',
      variacoes: ["TGU sem peso (mão fechada com punho) — aprenda o padrão", "TGU com kettlebell leve (4-8kg) — iniciante", "TGU pesado — força de verdade", "Half get-up (apenas até posição de ponte) — reabilitação de ombro", "TGU com barra (avançado) — controle máximo"]
    }
  }, {
    id: "pistol_squat",
    nome: "PISTOL SQUAT",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Em pé em uma perna. Estenda a outra à frente. Desça com controle total até a coxa tocar a panturrilha. Suba sem apoio. Pé de apoio plano no chão.",
    detalhes: {
      descricao: 'O pistol squat é o exercício de perna favorito de Pavel para atletas que precisam de força funcional sem equipamento. "Uma perna que não consegue sustentar e mover seu próprio peso não é uma perna forte — é uma perna dependente de máquinas." Desenvolve força unilateral, mobilidade de tornozelo/quadril e propriocepção.',
      execucao: ["Fique em pé em uma perna, braços à frente para equilíbrio", "Estenda a perna livre horizontalmente — não a balance", "Desça DEVAGAR — controle excêntrico é treinamento", "Joelho de apoio acompanha o dedo do pé — não colapse para dentro", "Desça até a profundidade máxima sem compensações", 'Suba com força explosiva — sem "bounce" na posição baixa'],
      gtgDica: 'Progressões: agachamento búlgaro → pistol assistido (TRX ou barra) → pistol completo. Para GTG: 2-3 reps por lado, várias vezes ao dia. Pavel: "O pistol squat com um kettlebell pesado é o nível de força de perna que todo ser humano deveria aspirar."',
      pavelQuote: '"Uma pessoa que faz pistol squat com 32kg não precisa de leg press. Uma pessoa que usa leg press provavelmente não consegue fazer pistol squat."',
      variacoes: ["Pistol com TRX (assistido) — aprenda o padrão", "Box pistol (para um banco baixo) — amplitude reduzida", "Pistol com kettlebell à frente — contrapeso ajuda na técnica", "Cossack squat — mobilidade de quadril pré-pistol", "Pistol com mochila carregada — progressão de carga"]
    }
  }, {
    id: "dead_hang",
    nome: "DEAD HANG",
    tipo: "tempo",
    unidade: "seg",
    instrucoes: "Segure a barra com pegada pronada ou supinada. Braços completamente estendidos. Ombros ativos (depressão escapular leve). Respire ritmicamente. Segure o máximo possível.",
    detalhes: {
      descricao: 'O Dead Hang é o exercício de suspensão passiva onde você simplesmente se pendura na barra com os braços estendidos. Pavel e a escola StrongFirst o usam como ferramenta de descompressão da coluna, construção de resistência de grip e avaliação de força de preensão. "Se você não consegue se pendurar por 60 segundos, você não tem a força de grip para escalar a força que a barra fixa exige."',
      execucao: ["Suba na barra e segure com pegada pronada, um pouco mais larga que os ombros", "Solte os pés e deixe o peso do corpo descansar completamente", "ATIVE os ombros levemente — escápulas em depressão, não deixe o pescoço sumir", "Mantenha o core ligeiramente engajado — não balance o corpo", "Respire normalmente — inspire pelo nariz, expire pela boca", "Aguente até não conseguir mais sustentar a pegada"],
      gtgDica: 'Para GTG: séries de 30–60s ao longo do dia. Excelente combinado com treino de barra fixa — melhora o grip que limita o pull-up. Pavel: "Sua barra fixa só será tão boa quanto seu Dead Hang. Construa a fundação antes da casa."',
      pavelQuote: '"O grip fraco é o elo fraco de toda cadeia de força. O Dead Hang é o medicamento mais simples e mais negligenciado para esse problema."',
      variacoes: ["Dead Hang com pegada supinada — bíceps e forearms", "Dead Hang com uma mão (assistido) — progressão unilateral", "Dead Hang em anéis — instabilidade ativa os estabilizadores", "Dead Hang com peso adicionado (colete) — progressão de carga", "Scapular hang — ative as escápulas a cada 5 segundos"]
    }
  }, {
    id: "grip",
    nome: "GRIP / PREENSÃO",
    tipo: "reps",
    unidade: "reps",
    instrucoes: "Use gripper, toalha na barra ou barra espessa. Feche completamente a mão com força máxima. Segure 1-2 segundos. Abra completamente. Repita. Cada fechamento = 1 rep.",
    detalhes: {
      descricao: 'Pavel dedica um capítulo inteiro ao treino de grip em "Power to the People". "Sua pegada é sua conexão com o peso. Grip fraco = força fraca. Não há como contornar isso." O treino de preensão desenvolve força de flexores dos dedos, palmares, flexores do punho e antebraço. Correlaciona diretamente com performance em barra fixa, deadlift e kettlebell.',
      execucao: ["Use um gripper calibrado (recomendado: Captain of Crush) ou toalha enrolada na barra", "Posicione os dedos corretamente — não apenas as pontas, mas toda a falange", "Feche com intenção máxima — não é para ser fácil", "Segure na posição fechada por 1-2 segundos (isometria)", "Abra completamente — extensão dos dedos também é treino", "Descanse 30-60s entre séries — grip recupera rápido"],
      gtgDica: 'Perfeito para GTG: um gripper na mesa, no sofá, no carro. Pavel recomenda treino de grip diário. "Os russos treinavam grip todo dia porque sabiam que ele é o denominador comum de toda força."',
      pavelQuote: '"Aperto de mão firme. Pegada de barra firme. Kettlebell com controle. Tudo começa no grip. Treine-o como treina qualquer habilidade — todos os dias."',
      variacoes: ["Gripper de mola (Captain of Crush) — progressão graduada", "Towel pull-up — barra com toalha, máxima dificuldade de grip", "Plate pinch — segure anilha pela borda com dois dedos", "Farmers walk — caminhe com kettlebells pesados", "Bar hang com chalk vs sem — compare a diferença"]
    }
  }, {
    id: "rosca_direta",
    nome: "ROSCA DIRETA",
    tipo: "peso",
    unidade: "kg × reps",
    instrucoes: "Em pé, cotovelos fixos ao lado do tronco. Segure halteres ou barra com pegada supinada. Suba controlando o bíceps. Desça em 3-4 segundos. Punhos neutros, sem quebrar.",
    detalhes: {
      descricao: 'Pavel inclui a rosca direta não como exercício de "academia de espelho", mas como construtor de força de cotovelo e bíceps com função direta no pull-up e deadlift. "A maioria das pessoas faz rosca errada — elas balançam, trapaceiam, e desenvolvem apenas ego, não força." A versão Pavel foca em tensão irradiante e controle total.',
      execucao: ["Fique em pé, postura militar — coluna neutra, glúteos e abdômen levemente ativados", "Segure os halteres com pegada supinada, cotovelos colados ao tronco", "ANTES de subir: contraia o punho ao máximo (tensão irradiante de Pavel)", "Suba o peso contraindo o bíceps — não o ombro", "No topo: contraia o bíceps ao máximo por 1 segundo", "Desça em 3-4 segundos — a negativa é metade do treino"],
      gtgDica: 'Para GTG com peso: 3-5 reps com carga moderada, várias vezes ao dia. Pavel: "A negativa da rosca, feita em 4 segundos, constrói mais músculo e força do que a positiva. A maioria ignora a parte mais importante do exercício."',
      pavelQuote: '"Rosca direta sem controle não é força — é momentum. Controle o peso em cada milímetro do movimento. Aí sim você está treinando o bíceps."',
      variacoes: ["Rosca com haltere alternado — permite supinação completa no topo", "Rosca concentrada (sentado, cotovelo na coxa) — isolamento total", "Rosca com barra EZ — reduz estresse no punho", "Rosca Zottman (sobe supinado, desce pronado) — antebraço e bíceps", "Rosca com banda elástica — resistência variável, ótimo para GTG em casa"]
    }
  }],
  TODAS_BADGES = [{
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
    icone: "🛡",
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
    "icone": "🛡",
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
    "icone": "🛡",
    "nome": "Muralha de Escudos",
    "desc": "Compre 10 Streak Shields — defesa total da streak"
  }, {
    "id": "radio_10h",
    "icone": "🎵",
    "nome": "Rádio do Front",
    "desc": "Ouça a Rádio Soviética por 10 horas totais — música de guerra"
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
    proximo: 500
  }, {
    nome: "ASPIRANTE",
    icone: "🪖",
    min: 500,
    proximo: 1500
  }, {
    nome: "SOLDADO",
    icone: "🔰",
    min: 1500,
    proximo: 3500
  }, {
    nome: "CABO",
    icone: "⚡",
    min: 3500,
    proximo: 7e3
  }, {
    nome: "SARGENTO",
    icone: "⭐",
    min: 7e3,
    proximo: 12e3
  }, {
    nome: "1 SARGENTO",
    icone: "🌟",
    min: 12e3,
    proximo: 2e4
  }, {
    nome: "SUBTENENTE",
    icone: "🎗",
    min: 2e4,
    proximo: 32e3
  }, {
    nome: "TENENTE",
    icone: "🏅",
    min: 32e3,
    proximo: 5e4
  }, {
    nome: "CAPITAO",
    icone: "🛡",
    min: 5e4,
    proximo: 75e3
  }, {
    nome: "MAJOR",
    icone: "⚔",
    min: 75e3,
    proximo: 11e4
  }, {
    nome: "COMANDANTE",
    icone: "🎯",
    min: 11e4,
    proximo: 16e4
  }, {
    nome: "CORONEL",
    icone: "🦁",
    min: 16e4,
    proximo: 23e4
  }, {
    nome: "GENERAL",
    icone: "👑",
    min: 23e4,
    proximo: 33e4
  }, {
    nome: "MARECHAL",
    icone: "🔱",
    min: 33e4,
    proximo: 5e5
  }, {
    nome: "LENDA SOVIETICA",
    icone: "★",
    min: 5e5,
    proximo: 9999999
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
    autor: "Filosofia StrongFirst"
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
    autor: "Ciência StrongFirst"
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
    autor: "Filosofia GTG"
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
    autor: "Experimento GTG — StrongFirst"
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
    frase: "Os soviéticos descobriram que a força é uma habilidade neurológica. Você não a constrói destruindo músculos — você a instala com prática perfeita.",
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
    frase: "Você não cresce durante o treino — você cresce durante a recuperação. O treino é apenas o pedido. O sono é a entrega.",
    autor: "Matthew Walker — Why We Sleep (adaptado)"
  }, {
    frase: "Kaizen: melhora contínua, dia após dia, por menores que sejam os ganhos. É assim que campeões são forjados.",
    autor: "Filosofia Japonesa — Kaizen"
  }, {
    frase: "A barra não se importa com suas desculpas. O colchonete não aceita postergação. A única negociação possível é você aparecer.",
    autor: "Ditado GTG"
  }],
  LEMBRETES_GTG = ["⏰ Hora de uma série! Lembre: 50-60% do seu máximo. Qualidade acima de tudo.", "🔔 Pavel diz: 'Uma série perfeita agora vale mais do que dez séries ruins depois.'", "⚡ 15 minutos de descanso respeitados. Hora de trabalhar!", "🎯 Micro-dose de força. Uma série. Agora. Sem desculpa.", "💪 O sistema nervoso está pronto. Mais uma série constrói o padrão.", "🔥 Streak em andamento. Não quebre a corrente — uma série mantém tudo!", "⭐ Frequência > Intensidade. Uma série agora > Zero séries depois.", "🪖 O soldado não espera a hora perfeita. Ele treina quando pode.", "🧠 Cada repetição de qualidade mieliniza a via nervosa. Faça agora.", "⚔ GTG é sobre acúmulo. Cada série conta — mesmo a mais simples."];
let fraseAtualIndex = -1,
  lembreteInterval = null,
  filtroPerfeitas = false,
  dados = {
    exercicios: [],
    registros: [],
    metas: {}
  },
  undoState = {
    ultimoRegistro: null,
    timeoutId: null,
    countdownInterval: null,
    segundosRestantes: 5
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
    nivelAtualEm: 0
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
    atualizarDataHeader(), renderExercicios(), renderBadges(), renderHistory(), renderGuiaExercicios(), atualizarXP(), atualizarUIStreak(), atualizarStats(), setTimeout(() => {
      renderGraficos(), renderProgresso(), renderEstatisticasMensais()
    }, 300), verificarStreak(), verificarBadges(), preencherSelects(), exibirFraseDoDia(), iniciarLembretes();
    await Promise.all([carregarReadiness(), carregarMetas(), carregarPlanejador(), carregarModoFoco()]);
    if (modoFocoState.ativo) {
      const e = document.getElementById("modoFocoToggle");
      e && e.classList.add("active"), populateFocoSelect(), document.getElementById("modoFocoSelect").value = modoFocoState.exercicioId || "", aplicarModoFoco()
    }
    setTimeout(atualizarSugestoesGTG, 500), setTimeout(mostrarResumoOntem, 1500), inicializarSkillTree(), renderCalendario(), verificarRelatorioSemanal();
    const pesoDataEl = document.getElementById("pesoData");
    if (pesoDataEl && !pesoDataEl.value) pesoDataEl.value = new Date().toISOString().slice(0, 10)
  })
}

async function carregarDados() {
  try {
    await window.storageReady;
    const raw = await getItem("gtg_data") || localStorage.getItem("gtg_data");
    raw ? (dados = JSON.parse(raw), dados && dados.exercicios && Array.isArray(dados.exercicios) || (console.warn("Dados corrompidos, resetando para defaults"), await removeItem("gtg_data").catch(() => {}), localStorage.removeItem("gtg_data"), dados = {
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
    localStorage.removeItem("gtg_data"), dados = { exercicios: EXERCICIOS_DEFAULT.map(ex => ({ ...ex })), registros: [] }
  }
  try {
    const raw = await getItem("gtg_streaks") || localStorage.getItem("gtg_streaks");
    raw && (streakData = JSON.parse(raw)), void 0 === streakData.streakShields && (streakData.streakShields = 0), void 0 === streakData.shieldCost && (streakData.shieldCost = 500)
  } catch (err) {
    console.error("[carregarDados] Falha ao carregar streakData:", err)
  }
  try {
    const raw = await getItem("gtg_xp") || localStorage.getItem("gtg_xp");
    raw && (xpData = JSON.parse(raw))
  } catch (err) {
    console.error("[carregarDados] Falha ao carregar xpData:", err)
  }
  try {
    const raw = await getItem("gtg_badges") || localStorage.getItem("gtg_badges");
    badgesData = raw ? JSON.parse(raw) : { desbloqueadas: [] }
  } catch (err) {
    badgesData = { desbloqueadas: [] }
  }
}

function salvarDados() {
  Promise.all([
    setItem("gtg_data", JSON.stringify(dados)),
    setItem("gtg_streaks", JSON.stringify(streakData)),
    setItem("gtg_xp", JSON.stringify(xpData)),
    setItem("gtg_badges", JSON.stringify(badgesData))
  ]).catch(() => {})
}

function atualizarDataHeader() {
  const now = new Date;
  document.getElementById("headerDate").innerHTML = `${["DOM","SEG","TER","QUA","QUI","SEX","SAB"][now.getDay()]} ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}<br>\n     <span style="font-size:16px;">${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}</span>`, setTimeout(atualizarDataHeader, 3e4)
}

function verificarStreak() {
  const hoje = (new Date).toISOString().slice(0, 10),
    ontem = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
    temHoje = dados.registros.some(reg => (reg.data || (reg.timestamp ? new Date(reg.timestamp).toISOString().slice(0, 10) : null)) === hoje);
  dados.registros.some(reg => (reg.data || (reg.timestamp ? new Date(reg.timestamp).toISOString().slice(0, 10) : null)) === ontem);
  if (streakData.ultimaData === hoje);
  else if (temHoje) {
    if (streakData.ultimaData !== ontem && streakData.ultimaData) {
      const diff = streakData.ultimaData ? Math.floor((new Date(hoje) - new Date(streakData.ultimaData)) / 864e5) : 999;
      2 === diff && streakData.diasFolgaUsados < 1 ? (streakData.diasFolgaUsados += 1, streakData.atual += 2, mostrarToast("Dia de Folga Usado", "Sua streak foi preservada! (1 folga/semana)", "warning")) : diff > 1 && diff < 999 && (usarShield() ? streakData.atual += diff : (streakData.atual = 1, streakData.diasFolgaUsados = 0, mostrarToast("💔 Streak Quebrada", "Sua streak foi resetada. Compre shields para proteção!", "error")))
    } else streakData.atual += 1;
    streakData.ultimaData = hoje, streakData.atual > streakData.recorde && (streakData.recorde = streakData.atual);
    const inicioSemana = getInicioSemana(hoje);
    streakData.semanaInicio !== inicioSemana && (streakData.semanaInicio = inicioSemana, streakData.diasFolgaUsados = 0), salvarDados()
  }
  atualizarUIStreak(), atualizarDisplayShields()
}

function getInicioSemana(data) {
  const parsed = new Date(data + "T00:00:00"),
    diaSemana = parsed.getDay(),
    diff = parsed.getDate() - diaSemana + (0 === diaSemana ? -6 : 1);
  return new Date(parsed.setDate(diff)).toISOString().slice(0, 10)
}

function atualizarUIStreak() {
  document.getElementById("streakCountHeader").textContent = streakData.atual, document.getElementById("statStreak").textContent = streakData.atual, document.getElementById("statStreakRecord").textContent = `Recorde: ${streakData.recorde} dias`, document.getElementById("streakCurrentLarge").textContent = streakData.atual, document.getElementById("streakRecordLabel").textContent = `RECORDE: ${streakData.recorde} DIAS`, document.getElementById("restDaysInfo").textContent = 1 - streakData.diasFolgaUsados + " folga(s) disponíve(is) esta semana";
  const e = calcularBonusStreak();
  document.getElementById("streakBonus").textContent = `+${Math.round(100*e)}%`, document.getElementById("bonusXpLabel").textContent = e > 0 ? `+${Math.round(100*e)}% XP (streak > ${streakData.atual>=30?"30":"7"} dias)` : "Sem bônus — mantenha a streak!", atualizarDisplayShields()
}

function calcularBonusStreak() {
  return streakData.atual >= 30 ? .25 : streakData.atual >= 14 ? .15 : streakData.atual >= 7 ? .1 : 0
}

function calcularXPSerie(exercicio, valor, peso) {
  let base = 0;
  return "reps" === exercicio.tipo ? base = valor : "tempo" === exercicio.tipo ? base = 2 * valor : "peso" === exercicio.tipo && (base = (peso || 0) * valor), base *= 1 + calcularBonusStreak(), Math.round(base)
}

function adicionarXP(amount) {
  xpData.total += amount;
  const level = getNivel(xpData.total),
    oldLevelName = xpData.nivel;
  if (xpData.nivel = level.nome, xpData.nivelAtualEm = level.min, xpData.proximoNivelEm = level.proximo, oldLevelName !== level.nome && "RECRUTA" !== oldLevelName || xpData.total > level.min) {
    const old = NIVEIS.find(n => n.nome === oldLevelName);
    old && old.min < level.min && (mostrarToast("★ PROMOÇÃO!", `Você avançou para ${level.nome} ${level.icone}`, "success"), dispararConfetti())
  }
  atualizarXP(), salvarDados()
}

function getNivel(xp) {
  for (let i = NIVEIS.length - 1; i >= 0; i--)
    if (xp >= NIVEIS[i].min) return NIVEIS[i];
  return NIVEIS[0]
}

function atualizarXP() {
  const level = getNivel(xpData.total),
    ratio = (xpData.total - level.min) / (level.proximo - level.min),
    pct = Math.min(100, Math.round(100 * ratio));
  document.getElementById("levelIcon").textContent = level.icone, document.getElementById("levelName").textContent = level.nome, document.getElementById("xpBarFill").style.width = pct + "%", document.getElementById("xpNumbers").textContent = `${xpData.total.toLocaleString("pt-BR")} / ${level.proximo.toLocaleString("pt-BR")} XP`, document.getElementById("xpTotalLabel").textContent = `XP TOTAL: ${xpData.total.toLocaleString("pt-BR")}`;
  const nextLevel = NIVEIS[NIVEIS.indexOf(level) + 1];
  document.getElementById("xpNextLabel").textContent = nextLevel ? `PRÓXIMO: ${nextLevel.nome}` : "NÍVEL MÁXIMO", document.getElementById("headerRank").textContent = level.nome, document.getElementById("headerXpBar").style.width = pct + "%"
}

function verificarBadges() {
  const hoje = (new Date).toISOString().slice(0, 10);
  dados.registros.length > 0 && desbloquearBadge("primeiro_sangue");
  dados.registros.filter(reg => Array.isArray(reg.groove) && reg.groove.filter(Boolean).length === 3).length >= 50 && desbloquearBadge("perfeccionista_sovietico");
  dados.registros.filter(reg => reg.data === hoje).length >= 50 && desbloquearBadge("submaximo_mestre"), streakData.atual >= 7 && desbloquearBadge("frequencia_intensidade"), dados.exercicios.forEach(ex => {
    dados.registros.filter(reg => reg.exercicioId === ex.id && "reps" === ex.tipo).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e3 && desbloquearBadge("pavel_aprovaria")
  });
  dados.registros.filter(reg => reg.data === hoje).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 500 && desbloquearBadge("volume_sovietico"), dados.exercicios.forEach(ex => {
    dados.registros.filter(reg => reg.exercicioId === ex.id).length >= 100 && desbloquearBadge("especialista")
  }), dados.registros.length >= 100 && desbloquearBadge("centuriao"), dados.registros.length >= 1e3 && desbloquearBadge("mil_soldados"), streakData.atual >= 7 && desbloquearBadge("semana_perfeita");
  dados.registros.filter(reg => "grip" === reg.exercicioId).length >= 50 && desbloquearBadge("grip_de_ferro");
  dados.registros.filter(reg => "dead_hang" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1800 && desbloquearBadge("pendulo_humano");
  dados.registros.filter(reg => "rosca_direta" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 200 && desbloquearBadge("biceps_de_aco");
  dados.registros.some(reg => parseInt((reg.hora || "00:00").split(":")[0]) < 7) && desbloquearBadge("madrugador");
  dados.registros.some(reg => parseInt((reg.hora || "00:00").split(":")[0]) >= 22) && desbloquearBadge("noturno"), streakData.atual >= 30 && desbloquearBadge("consistencia_30");
  new Set(dados.registros.filter(reg => reg.data === hoje).map(reg => reg.exercicioId)).size >= 5 && desbloquearBadge("poliglota_forca");
  dados.registros.reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e4 && desbloquearBadge("dez_mil_reps");
  dados.registros.filter(reg => "prancha" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 3600 && desbloquearBadge("mestre_prancha"), dados.registros.length >= 5e3 && desbloquearBadge("cinco_mil_series"), xpData.total >= 3e3 && desbloquearBadge("strongfirst"), streakData.atual >= 14 && desbloquearBadge("streak_14"), streakData.atual >= 30 && desbloquearBadge("streak_30");
  dados.registros.filter(reg => "barra_fixa" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 500 && desbloquearBadge("rei_da_barra");
  dados.registros.filter(reg => "agachamento" === reg.exercicioId).reduce((acc, reg) => acc + (reg.valor || 0), 0) >= 1e3 && desbloquearBadge("squat_master"), atualizarUIBadges()
}

function desbloquearBadge(badgeId) {
  if (!badgesData.desbloqueadas.includes(badgeId)) {
    badgesData.desbloqueadas.push(badgeId), salvarDados(), vibrar([150, 80, 150, 80, 200]);
    const badge = TODAS_BADGES.find(b => b.id === badgeId);
    badge && (somBadge(), setTimeout(() => mostrarUnlockBadge(badge), 500))
  }
}

function mostrarUnlockBadge(badge) {
  document.getElementById("unlockIcon").textContent = badge.icone, document.getElementById("unlockName").textContent = badge.nome, document.getElementById("unlockDesc").textContent = badge.desc, document.getElementById("badgeUnlockOverlay").classList.add("active"), dispararConfetti()
}

function closeBadgeUnlock() {
  document.getElementById("badgeUnlockOverlay").classList.remove("active")
}

function renderBadges() {
  const container = document.getElementById("badgesGrid");
  container.innerHTML = "", TODAS_BADGES.forEach((badge, idx) => {
    const unlocked = badgesData.desbloqueadas.includes(badge.id);
    container.insertAdjacentHTML("beforeend", `\n      <div class="badge-item ${unlocked?"unlocked":""}" data-id="${badge.id}">\n        <div class="badge-icon-wrap" aria-hidden="true">${badge.icone}</div>\n        <div class="badge-name">${badge.nome}</div>\n        <div class="badge-desc">${badge.desc}</div>\n        ${unlocked?'<div class="badge-check" title="Desbloqueada">✓</div>':'<div class="badge-locked-overlay">BLOQUEADA</div>'}\n      </div>\n    `)
  });
  const unlocked = badgesData.desbloqueadas.length;
  document.getElementById("badgeCount").textContent = `${unlocked} / ${TODAS_BADGES.length} desbloqueadas`, setTimeout(() => {
    document.querySelectorAll(".badge-item").forEach((el, i) => {
      el.style.transitionDelay = 30 * i + "ms", el.classList.add("rendered")
    })
  }, 40)
}

function atualizarUIBadges() {
  renderBadges()
} // ===== GROOVE QUALITY SCORE =====
const grooveState = {}; // {exercicioId: [amp:bool, ten:bool, bal:bool]}

function toggleGroove(exId, idx, el) {
  if (!grooveState[exId]) grooveState[exId] = [false, false, false];
  grooveState[exId][idx] = !grooveState[exId][idx];
  el.classList.toggle('active', grooveState[exId][idx]);
  // play a tiny click tone if available
  try {
    if (typeof tocarTom === 'function') tocarTom(220 + 80 * grooveState[exId].filter(Boolean).length, .04, 'square', .06)
  } catch (e) {
    console.warn("[toggleGroove] Falha ao tocar tom de clique:", e)
  }
  atualizarPreviewGroove(exId);
}

function atualizarPreviewGroove(exId) {
  const st = grooveState[exId] || [false, false, false];
  const n = st.filter(Boolean).length;
  const pct = n * 10;
  const bonusEl = document.getElementById('groove-bonus-preview-' + exId);
  if (bonusEl) {
    const valEl = bonusEl.querySelector('.bonus-val');
    if (valEl) valEl.textContent = (n === 3 ? '+30% ★' : ('+' + pct + '%'));
    bonusEl.classList.toggle('perfeito', n === 3);
  }
}

function renderQualityIcons(groove) {
  if (!Array.isArray(groove)) return '<span class="log-quality empty" title="Série sem dados de Groove">—</span>';
  const cls = groove.filter(Boolean).length;
  const icons = ['⭐', '⚡', '✓']; // amplitude, tensão, sem balanço
  let html = '<span class="log-quality' + (cls === 3 ? ' perfeito' : '') + '">';
  for (let i = 0; i < 3; i++) html += '<span class="qi ' + (groove[i] ? 'on' : '') + '">' + icons[i] + '</span>';
  html += '</span>';
  return html;
}

function renderQualityClass(groove) {
  if (!Array.isArray(groove)) return 'empty';
  return groove.filter(Boolean).length === 3 ? 'perfeito' : '';
}

function calcularQualityMedia(exId) {
  const regs = dados.registros.filter(e => e.exercicioId === exId && Array.isArray(e.groove));
  if (regs.length === 0) return 0;
  const sum = regs.reduce((acc, r) => acc + (r.groove.filter(Boolean).length / 3), 0);
  return Math.round((sum / regs.length) * 100);
}

function atualizarQualityBadges() {
  dados.exercicios.forEach(ex => {
    const wrap = document.getElementById('qbadge-wrap-' + ex.id);
    if (!wrap) return;
    const regs = dados.registros.filter(r => r.exercicioId === ex.id && Array.isArray(r.groove));
    if (regs.length === 0) {
      wrap.innerHTML = '';
      return
    }
    const pct = calcularQualityMedia(ex.id);
    const perfeitos = regs.filter(r => r.groove.filter(Boolean).length === 3).length;
    let tier = 'baixa';
    if (pct >= 80) tier = 'alta';
    else if (pct >= 50) tier = 'media';
    const star = pct >= 80 ? '⭐' : pct >= 50 ? '✓' : '·';
    let html = '<span class="quality-badge" data-tier="' + tier + '" title="' + regs.length + ' séries avaliadas · ' + perfeitos + ' perfeitas"><span class="q-star">' + star + '</span><span>Q:</span><span class="q-val">' + pct + '%</span></span>';
    if (perfeitos > 0) html += '<span class="perfeito-stamp" title="' + perfeitos + ' séries perfeitas (3/3)">★ ×' + perfeitos + '</span>';
    wrap.innerHTML = html;
  });
}

function toggleFiltroPerfeitas(el) {
  filtroPerfeitas = !filtroPerfeitas;
  el.classList.toggle('active', filtroPerfeitas);
  renderGraficos();
  mostrarToast(
    filtroPerfeitas ? '★ Filtro Ativado' : 'Filtro Desativado',
    filtroPerfeitas ? 'Mostrando apenas séries perfeitas (3/3)' : 'Mostrando todas as séries',
    filtroPerfeitas ? 'success' : 'info'
  );
}
// ===== END GROOVE =====

function renderExercicios() {
  try {
    const e = document.getElementById("exerciseGrid");
    if (!e) return void console.error("Elemento exerciseGrid não encontrado");
    if (e.innerHTML = "", !dados.exercicios || 0 === dados.exercicios.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center; padding:30px; color:var(--gray-light);">Nenhum exercício encontrado. Adicione um exercício acima.</div>');
    dados.exercicios.forEach((a, idx) => {
      const t = (new Date).toISOString().slice(0, 10),
        o = dados.registros.filter(e => {
          const o = e.data || (e.timestamp ? new Date(e.timestamp).toISOString().slice(0, 10) : null);
          return e.exercicioId === a.id && o === t
        }),
        r = dados.registros.filter(e => e.exercicioId === a.id).length,
        s = dados.registros.filter(e => e.exercicioId === a.id).reduce((e, a) => e + (a.valor || 0), 0),
        n = calcularPR(a),
        i = o.length,
        d = o.reduce((e, a) => e + (a.valor || 0), 0),
        se = calcularStreakExercicio(a.id);
      e.innerHTML += `\n      <div class="exercise-card" id="excard-${a.id}" style="--i:${idx}">\n        <div class="exercise-card-header">\n          <div class="exercise-name">${a.nome}</div>\n          <div class="sugestao-gtg" id="sugestao-${a.id}" onclick="aplicarSugestaoGTG('${a.id}', event)">\n            <span class="bulb">💡</span>\n            <span class="gtg-val" id="gtg-val-${a.id}">GTG: --</span>\n            <span class="gtg-label">reps</span>\n            <div class="gtg-tooltip">\n              <strong style="color:var(--gold)">SÉRIE SUGERIDA — MÉTODO GTG</strong><br>\n              PR (30 dias): <span id="tooltip-pr-${a.id}">0</span> ${"tempo"===a.tipo?"seg":a.unidade||"reps"}<br>\n              Sugestão: 50% do máximo<br>\n              <em style="color:var(--gold-dim)">"Nunca vá ao fracasso" — Pavel</em>\n            </div>\n          </div>\n          <div class="exercise-card-actions">\n            <button class="btn-icon btn-meta" onclick="abrirModalMeta('${a.id}')">🎯</button>\n            <button class="btn-icon" onclick="mostrarInfoExercicio('${a.id}')" title="Informações">ℹ</button>\n            <button class="btn-icon" onclick="editarExercicio('${a.id}')" title="Editar">✏️</button><button class="btn-icon danger" onclick="removerExercicio('${a.id}')" title="Remover">✕</button>\n            <div class="quality-badge-wrap" id="qbadge-wrap-${a.id}" style="display:inline-flex;align-items:center;gap:4px;margin-left:6px;"></div>\n          </div>\n        </div>\n        <div class="exercise-stats">\n          <div class="ex-stat">\n            <div class="ex-stat-val">${i}</div>\n            <div class="ex-stat-lbl">SÉRIES HOJE</div>\n          </div>\n          <div class="ex-stat">\n            <div class="ex-stat-val">${d}</div>\n            <div class="ex-stat-lbl">${"tempo"===a.tipo?"SEG HOJE":"REPS HOJE"}</div>\n          </div>\n          <div class="ex-stat">\n            <div class="ex-stat-val">${r}</div>\n            <div class="ex-stat-lbl">TOTAL SÉRIES</div>\n          </div>\n          <div class="ex-stat" title="Dias consecutivos treinando este exercício">\n            <div class="ex-stat-val" style="color:var(--gold);">${se}<span class="exercise-streak-fire${se>0?'':' no-streak'}">${se>0?'🔥':'🙅'}</span></div>\n            <div class="ex-stat-lbl">STREAK DIAS</div>\n          </div>\n        </div>\n        <div class="pr-display">\n          <div>\n            <div class="pr-display-label">PR (30 DIAS)</div>\n            <div class="pr-display-val" id="pr-display-${a.id}">0 ${"tempo"===a.tipo?"seg":a.unidade||"reps"}</div>\n          </div>\n          <button class="test-max-btn" onclick="abrirTesteMaximo('${a.id}')">🎯 TESTAR MÁXIMO</button>\n        </div>\n        <div class="exercise-pr">\n          <span class="pr-label">PR ESTIMADO:</span>\n          <span class="pr-value">${n} ${"tempo"===a.tipo?"seg":a.unidade||"reps"}</span>\n          <span style="margin-left:auto; font-family:'Share Tech Mono',monospace; font-size:9px; color:var(--gray);">${s} total acum.</span>\n        </div>\n        <div class="rpe-avg-display" id="rpe-avg-${a.id}">\n          RPE MÉDIO HOJE: <span class="rpe-avg-val" id="rpe-avg-val-${a.id}">—</span>\n        </div>\n        <div class="exercise-add-form">\n          ${"peso"===a.tipo?`\n            <div class="form-group">\n              <label class="form-label">Peso (kg)</label>\n              <input type="number" class="form-input" id="peso-${a.id}" placeholder="0" min="0" step="0.5">\n            </div>`:""}\n          <div class="form-group">\n            <label class="form-label">${"tempo"===a.tipo?"Segundos":"Reps"}</label>\n            <input type="number" class="form-input" id="valor-${a.id}" placeholder="${"tempo"===a.tipo?"60":"10"}" min="1">\n          </div>\n          <button class="btn btn-red" onclick="adicionarSerie('${a.id}')">+ REGISTRAR</button>\n          <button class="btn btn-outline btn-sm" onclick="abrirTimerDescanso('${a.id}')">⏱ DESCANSO</button>\n          <div class="groove-toggles" id="groove-toggles-${a.id}" style="flex-basis:100%;">\n            <span class="groove-label">⚙ GROOVE</span>\n            <div class="missile-switch" id="groove-amp-${a.id}" data-tip="Amplitude completa: do topo ao fundo, sem truncar." data-key="amp" onclick="toggleGroove('${a.id}', 0, this)">\n              <span class="missile-switch__icon">📏</span>\n              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>\n              <span>AMPLITUDE</span>\n            </div>\n            <div class="missile-switch" id="groove-ten-${a.id}" data-tip="Tensão irradiante: contraia glúteos, abdômen e punhos antes de cada rep." data-key="ten" onclick="toggleGroove('${a.id}', 1, this)">\n              <span class="missile-switch__icon">⚡</span>\n              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>\n              <span>TENSÃO</span>\n            </div>\n            <div class="missile-switch" id="groove-bal-${a.id}" data-tip="Sem balanço/momentum: cada rep começa do zero, sem trapaça." data-key="bal" onclick="toggleGroove('${a.id}', 2, this)">\n              <span class="missile-switch__icon">⚖</span>\n              <span class="missile-switch__track"><span class="missile-switch__knob"></span></span>\n              <span>SEM BALANÇO</span>\n            </div>\n            <div class="groove-bonus-preview" id="groove-bonus-preview-${a.id}">BÔNUS: <span class="bonus-val">+0%</span></div>\n          </div>\n        </div>\n        <div class="meta-bar-wrap" id="meta-wrap-${a.id}" style="display:none; padding:10px 16px 0;">\n          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">\n            <span class="text-mono" style="font-size:10px; color:var(--gold-dim);">🎯 META: <span id="meta-label-${a.id}"></span></span>\n            <span class="text-mono" style="font-size:10px; color:var(--gold);" id="meta-pct-${a.id}">0%</span>\n          </div>\n          <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:1px; overflow:hidden;">\n            <div id="meta-fill-${a.id}" style="height:100%; background:linear-gradient(90deg,var(--red-dark),var(--red)); border-radius:1px; transition:width 0.5s ease; width:0%;"></div>\n          </div>\n        </div>\n        <div class="rest-warning" id="warn-${a.id}">\n          ⚠ Pavel recomenda 15min de descanso entre séries do mesmo exercício.\n        </div>\n      </div>`
    }), preencherSelects();
    const a = (new Date).toISOString().slice(0, 10);
    atualizarQualityBadges();
    dados.exercicios.forEach(e => {
      const t = calcularRPEMedio(e.id, a),
        o = document.getElementById("rpe-avg-val-" + e.id);
      if (o)
        if (t) {
          o.textContent = t;
          const e = parseFloat(t);
          o.style.color = e >= 7 ? "var(--red-bright)" : e >= 5 ? "var(--accent-ffaa)" : "var(--green-bright)"
        } else o.textContent = "—", o.style.color = "var(--gold)";
      const r = document.getElementById("rpe-warn-" + e.id);
      r && t && parseFloat(t) > 7 && (r.classList.add("show"), r.innerHTML = "⚠ Pavel recomenda submáximo. RPE médio hoje: " + t + ". Considere reduzir reps.")
    }), _initDragDrop(), setTimeout(atualizarSugestoesGTG, 100), carregarMetas(), atualizarBarrasMeta(), setTimeout(aplicarModoFoco, 50), dados.exercicios.forEach(e => {
      const a = document.querySelector(`#excard-${e.id} .exercise-card-header`);
      if (a && !document.getElementById("gtg-timer-" + e.id)) {
        const t = document.createElement("div");
        t.id = "gtg-timer-" + e.id, t.style.cssText = "display:none;align-items:center;font-family:Share Tech Mono,monospace;font-size:10px;padding:2px 8px;background:rgba(0,0,0,0.3);border-radius:2px;margin-left:auto;margin-right:4px;", a.appendChild(t)
      }
      _gtgTimers[e.id] && iniciarTimerGTG(e.id)
    })
  } catch (e) {
    console.error("Erro ao renderizar exercícios:", e)
  }
}

function adicionarSerie(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return;
  const input = document.getElementById(`valor-${exId}`),
    valor = parseInt(input.value);
  if (!valor || valor < 1) return void mostrarToast("Erro", "Insira um valor válido", "error");
  const peso = "peso" === ex.tipo && parseFloat(document.getElementById(`peso-${exId}`)?.value) || 0;
  const now = new Date,
    dataStr = now.toISOString().slice(0, 10),
    horaStr = now.toTimeString().slice(0, 5),
    timestamp = now.getTime();
  const lastReg = dados.registros.filter(reg => reg.exercicioId === exId).sort((a, b) => b.timestamp - a.timestamp)[0];
  if (lastReg) {
    if ((timestamp - lastReg.timestamp) / 6e4 < 15) {
      const warnEl = document.getElementById(`warn-${exId}`);
      warnEl && (warnEl.style.display = "block", setTimeout(() => warnEl.style.display = "none", 5e3))
    } else desbloquearBadge("descanso_digno")
  }

  const groovRaw = grooveState[exId] || [false, false, false];
  const groovAmp = !!groovRaw[0],
    groovTen = !!groovRaw[1],
    groovBal = !!groovRaw[2];
  const groovChecks = [groovAmp, groovTen, groovBal];
  const groovCount = groovChecks.filter(Boolean).length;
  const groovBonusMult = 1 + groovCount * 0.1;
  const xpBase = calcularXPSerie(ex, valor, peso);
  const xpFinal = Math.round(xpBase * groovBonusMult);
  const rpeVal = rpeSelecionado[exId] || null;
  const registro = {
    id: Date.now() + Math.random().toString(36).slice(2),
    exercicioId: exId,
    exercicioNome: ex.nome,
    valor: valor,
    peso: peso,
    data: dataStr,
    hora: horaStr,
    timestamp: timestamp,
    xp: xpFinal,
    xpBase: xpBase,
    rpe: rpeVal,
    groove: groovChecks,
    perfeito: groovCount === 3
  };
  dados.registros.push(registro), adicionarXP(xpFinal), verificarStreak(), verificarBadges(), salvarDados(), input.value = "", document.getElementById(`peso-${exId}`) && (document.getElementById(`peso-${exId}`).value = ""), delete rpeSelecionado[exId];
  const rpeScaleEl = document.getElementById("rpe-scale-" + exId);
  rpeScaleEl && rpeScaleEl.querySelectorAll(".rpe-btn").forEach(el => el.classList.remove("selected"));
  const rpeWarnEl = document.getElementById("rpe-warn-" + exId);
  rpeWarnEl && rpeWarnEl.classList.remove("show");

  const bonusPct = groovCount * 10;
  const bonusMsg = groovCount > 0 ? (` · ⚙ GROOVE +${bonusPct}% XP` + (groovCount === 3 ? " · ★ SÉRIE PERFEITA" : "")) : "";
  const toastVal = `+${valor} ${"tempo"===ex.tipo?"seg":"reps"}`;
  const xpToast = groovCount > 0 ? `+${xpBase} → +${xpFinal} XP — ${ex.nome}${bonusMsg}` : `+${xpFinal} XP — ${ex.nome}`;
  mostrarToast(toastVal, xpToast, "success"), mostrarUndoBar(registro);

  grooveState[exId] = [false, false, false];

  renderExercicios(), atualizarStats(), renderHistory(), setTimeout(() => {
    renderGraficos(), renderProgresso(), renderEstatisticasMensais()
  }, 100), somRegistrar(), iniciarTimerGTG(exId)
}

let exercicioEditandoId = null;

function editarExercicio(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return void mostrarToast("Erro", "Exercício não encontrado", "error");
  document.getElementById("newExName").value = ex.nome, document.getElementById("newExType").value = ex.tipo, document.getElementById("newExUnit").value = ex.unidade || "", document.getElementById("newExInstructions").value = ex.instrucoes || "", exercicioEditandoId = exId, document.getElementById("newExName").focus(), document.getElementById("newExName").scrollIntoView({
    behavior: "smooth",
    block: "center"
  }), document.querySelector(".add-exercise-form .btn-red").textContent = "★ SALVAR", document.querySelector(".add-exercise-form .btn-red").style.background = "var(--gold)", "none" !== document.getElementById("tab-treino").style.display || void 0 === document.getElementById("tab-treino").style.display || switchTab("treino"), mostrarToast("Editando", `Editando ${ex.nome} — altere os campos e clique em SALVAR`, "info")
}

function addExercise() {
  if (exercicioEditandoId) {
    const nome = document.getElementById("newExName").value.trim();
    if (!nome) return void mostrarToast("Erro", "Insira o nome do exercício", "error");
    const tipo = document.getElementById("newExType").value,
      unidade = document.getElementById("newExUnit").value.trim() || ("tempo" === tipo ? "seg" : "reps"),
      instrucoes = document.getElementById("newExInstructions").value.trim();
    const existingEx = dados.exercicios.find(e => e.id === exercicioEditandoId);
    if (existingEx) existingEx.nome = nome.toUpperCase(), existingEx.tipo = tipo, existingEx.unidade = unidade, existingEx.instrucoes = instrucoes, existingEx.detalhes && (existingEx.detalhes.descricao = instrucoes || "Exercício personalizado.", existingEx.detalhes.execucao = instrucoes ? [instrucoes] : ["Execute com controle e qualidade"]);
    salvarDados(), renderExercicios(), renderGuiaExercicios(), exercicioEditandoId = null, document.getElementById("newExName").value = "", document.getElementById("newExUnit").value = "", document.getElementById("newExInstructions").value = "", document.querySelector(".add-exercise-form .btn-red").textContent = "★ ADICIONAR", document.querySelector(".add-exercise-form .btn-red").style.background = "", mostrarToast("Exercício Atualizado", nome, "success");
    return
  }
  const nome = document.getElementById("newExName").value.trim();
  if (!nome) return void mostrarToast("Erro", "Insira o nome do exercício", "error");
  const tipo = document.getElementById("newExType").value,
    unidade = document.getElementById("newExUnit").value.trim() || ("tempo" === tipo ? "seg" : "reps"),
    instrucoes = document.getElementById("newExInstructions").value.trim(),
    newId = nome.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now();
  dados.exercicios.push({
    id: newId,
    nome: nome.toUpperCase(),
    tipo: tipo,
    unidade: unidade,
    instrucoes: instrucoes,
    detalhes: {
      descricao: instrucoes || "Exercício personalizado.",
      execucao: instrucoes ? [instrucoes] : ["Execute com controle e qualidade"],
      gtgDica: "Mantenha séries a 50-60% do seu máximo.",
      variacoes: []
    }
  }), salvarDados(), renderExercicios(), renderGuiaExercicios(), document.getElementById("newExName").value = "", document.getElementById("newExUnit").value = "", document.getElementById("newExInstructions").value = "", mostrarToast("Exercício Adicionado", nome, "success")
}

function removerExercicio(exId) {
  const ex = dados.exercicios.find(e => e.id === exId),
    exName = ex ? ex.nome : exId;
  confirmarAcao(`REMOVER ${exName}?`, "Os registros históricos serão mantidos. O exercício sairá da lista de treino.", () => {
    dados.exercicios = dados.exercicios.filter(e => e.id !== exId), salvarDados(), renderExercicios(), renderGuiaExercicios(), mostrarToast("Removido", `${exName} removido da lista.`, "success")
  })
}

function calcularPR(ex) {
  const tresMesesAtras = Date.now() - 2592e6,
    registrosRecentes = dados.registros.filter(r => r.exercicioId === ex.id && r.timestamp > tresMesesAtras).sort((a, b) => a.timestamp - b.timestamp);
  if (0 === registrosRecentes.length) return 0;
  const maxValor = Math.max(...dados.registros.filter(r => r.exercicioId === ex.id).map(r => r.valor || 0)),
    semanaMap = {};
  registrosRecentes.forEach(r => {
    const inicioSemana = getInicioSemana(r.data);
    semanaMap[inicioSemana] = (semanaMap[inicioSemana] || 0) + (r.valor || 0)
  });
  const avgSemanal = Object.values(semanaMap).length > 0 ? Object.values(semanaMap).reduce((acc, v) => acc + v, 0) / Object.values(semanaMap).length : 0;
  return Math.round(maxValor + avgSemanal / 100)
}

function atualizarStats() {
  const hoje = (new Date).toISOString().slice(0, 10),
    inicioSemana = getInicioSemana(hoje),
    registrosHoje = dados.registros.filter(r => r.data === hoje),
    registrosSemana = dados.registros.filter(r => r.data >= inicioSemana);
  document.getElementById("statHoje").textContent = registrosHoje.length, document.getElementById("statRepsHoje").textContent = registrosHoje.reduce((acc, r) => acc + (r.valor || 0), 0) + " reps", document.getElementById("statSemana").textContent = registrosSemana.length, document.getElementById("statRepsSemanaSub").textContent = registrosSemana.reduce((acc, r) => acc + (r.valor || 0), 0) + " reps esta semana", document.getElementById("statTotal").textContent = dados.registros.length, document.getElementById("statTotalSub").textContent = dados.registros.reduce((acc, r) => acc + (r.valor || 0), 0).toLocaleString("pt-BR") + " reps acum."
}

function getDadosUltimasSemanas(numSemanas = 8, registrosSource) {
  const src = registrosSource || dados.registros;
  const semanas = [];
  for (let i = numSemanas - 1; i >= 0; i--) {
    const now = new Date;
    now.setDate(now.getDate() - 7 * i);
    const inicioSemana = getInicioSemana(now.toISOString().slice(0, 10)),
      fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 6);
    const fimStr = fimSemana.toISOString().slice(0, 10),
      filtrados = src.filter(r => r.data >= inicioSemana && r.data <= fimStr);
    semanas.push({
      label: "S" + (numSemanas - i),
      inicio: inicioSemana,
      fim: fimStr,
      series: filtrados.length,
      reps: filtrados.reduce((acc, r) => acc + (r.valor || 0), 0),
      volume: filtrados.reduce((acc, r) => acc + (r.valor || 0), 0)
    })
  }
  return semanas
}

function renderGraficos() {
  if (!dados.registros || dados.registros.length === 0) {
    chartSemanal && chartSemanal.destroy();
    document.getElementById("weeklyChart").getContext("2d").clearRect(0, 0, 1, 1);
    renderStreakChart(), renderHeatmap(), renderAnalise(), renderRanking(), renderVolumeChart(), renderCompararSemanas(), injetarCardPR();
    return
  }
  let registrosBase = dados.registros;
  if (filtroPerfeitas) {
    registrosBase = dados.registros.filter(e => Array.isArray(e.groove) && e.groove.filter(Boolean).length === 3)
  }
  const e = getDadosUltimasSemanas(8, registrosBase),
    a = e.map(e => e.label),
    t = e.map(e => e["series" === modoGrafico ? "series" : "reps" === modoGrafico ? "reps" : "volume"]),
    o = document.getElementById("weeklyChart").getContext("2d");
  chartSemanal && chartSemanal.destroy(), chartSemanal = new Chart(o, {
    type: "bar",
    data: {
      labels: a,
      datasets: [{
        label: "series" === modoGrafico ? "Séries" : "reps" === modoGrafico ? "Reps" : "Volume",
        data: t,
        backgroundColor: "rgba(204,0,0,0.6)",
        borderColor: cssVar("--accent-red"),
        borderWidth: 1,
        borderRadius: 2
      }, {
        label: "Média Móvel",
        data: calcularMediaMovel(t, 3),
        type: "line",
        borderColor: cssVar("--gold"),
        backgroundColor: "rgba(212,160,23,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: cssVar("--gold"),
        tension: .4,
        fill: !1
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          },
          beginAtZero: !0
        }
      }
    }
  }), renderStreakChart(), renderHeatmap(), renderAnalise(), renderRanking(), renderVolumeChart(), renderCompararSemanas(), injetarCardPR()
}

function renderStreakChart() {
  const canvas = document.getElementById("streakChart");
  if (!dados.registros || dados.registros.length === 0) {
    chartStreak && chartStreak.destroy();
    if (canvas) {
      canvas.style.display = "none";
      let msg = canvas.parentNode?.querySelector(".empty-state-msg");
      msg || (msg = document.createElement("div"), msg.className = "empty-state-msg text-mono", msg.style.cssText = "text-align:center;padding:24px;color:var(--gray-light);font-size:12px", msg.textContent = "Sem histórico ainda. Comece a treinar!", canvas.parentNode?.appendChild(msg))
    }
    return
  }
  canvas.style.display = "";
  const msgEl = canvas.parentNode?.querySelector(".empty-state-msg");
  msgEl && msgEl.remove();
  const ctx = canvas.getContext("2d");
  const e = [];
  for (let a = 29; a >= 0; a--) {
    const t = new Date;
    t.setDate(t.getDate() - a);
    const o = t.toISOString().slice(0, 10),
      r = dados.registros.some(e => e.data === o) ? 1 : 0;
    e.push({
      label: o.slice(5),
      treinou: r
    })
  }
  chartStreak && chartStreak.destroy(), chartStreak = new Chart(ctx, {
    type: "bar",
    data: {
      labels: e.map(e => e.label),
      datasets: [{
        data: e.map(e => e.treinou),
        backgroundColor: e.map(e => e.treinou ? "rgba(204,0,0,0.8)" : "rgba(68,68,68,0.3)"),
        borderColor: e.map(e => e.treinou ? cssVar("--accent-red") : cssVar("--muted-dark")),
        borderWidth: 1,
        borderRadius: 2
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#555",
            font: {
              family: "Share Tech Mono",
              size: 8
            },
            maxRotation: 45
          },
          grid: {
            display: !1
          }
        },
        y: {
          display: !1,
          min: 0,
          max: 1
        }
      }
    }
  })
}

function renderProgresso() {
  if (!dados.registros || dados.registros.length === 0) {
    chartProgresso && chartProgresso.destroy();
    document.getElementById("progressChart").getContext("2d").clearRect(0, 0, 1, 1);
    document.getElementById("progressInsights") && (document.getElementById("progressInsights").innerHTML = '<div class="text-mono" style="text-align:center;padding:24px;color:var(--gray-light)">Sem dados de treino ainda. Comece a treinar para ver seu progresso!</div>');
    return
  }
  const e = getDadosUltimasSemanas(8),
    a = e.map(e => e.label);
  let t = [];
  if ("volume" === modoProgresso) {
    const a = e.map(e => e.reps),
      o = calcularMediaMovel(a, 3);
    t = [{
      label: "Volume Total (reps)",
      data: a,
      borderColor: cssVar("--accent-red"),
      backgroundColor: "rgba(204,0,0,0.1)",
      fill: !0,
      tension: .4,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: cssVar("--accent-red")
    }, {
      label: "Média 3 semanas",
      data: o,
      borderColor: cssVar("--gold"),
      backgroundColor: "transparent",
      borderDash: [5, 5],
      tension: .4,
      borderWidth: 2,
      pointRadius: 0
    }]
  } else if ("media" === modoProgresso) t = [{
    label: "Média de reps/dia",
    data: e.map(e => Math.round(e.reps / 7)),
    borderColor: cssVar("--gold"),
    backgroundColor: "rgba(212,160,23,0.1)",
    fill: !0,
    tension: .4,
    borderWidth: 2,
    pointRadius: 4,
    pointBackgroundColor: cssVar("--gold")
  }];
  else {
    const a = [cssVar("--accent-red"), cssVar("--gold"), cssVar("--green-bright"), cssVar("--accent-blue"), cssVar("--accent-pink"), cssVar("--accent-orange")];
    t = dados.exercicios.slice(0, 6).map((t, o) => ({
      label: t.nome,
      data: e.map(e => dados.registros.filter(a => a.exercicioId === t.id && a.data >= e.inicio && a.data <= e.fim).reduce((e, a) => e + (a.valor || 0), 0)),
      borderColor: a[o],
      backgroundColor: a[o] + "22",
      fill: !1,
      tension: .4,
      borderWidth: 2,
      pointRadius: 3
    }))
  }
  const o = document.getElementById("progressChart").getContext("2d");
  chartProgresso && chartProgresso.destroy(), chartProgresso = new Chart(o, {
    type: "line",
    data: {
      labels: a,
      datasets: t
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          }
        },
        y: {
          ticks: {
            color: "#888",
            font: {
              family: "Share Tech Mono",
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          },
          beginAtZero: !0
        }
      }
    }
  }), renderInsights(e)
}

function renderInsights(e) {
  const a = document.getElementById("progressInsights");
  if (!a) return;
  const t = e[e.length - 1],
    o = e[e.length - 2],
    r = o.reps > 0 ? (t.reps - o.reps) / o.reps * 100 : 0,
    s = r > 0 ? "↑" : r < 0 ? "↓" : "→",
    n = r > 0 ? "trend-up" : r < 0 ? "trend-down" : "trend-flat";
  a.innerHTML = `\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">SEMANA ATUAL</div>\n      <div class="progress-compare">\n        <span style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">${t.reps}</span>\n        <span class="text-mono">reps</span>\n        <span class="${n}" style="font-family:'Bebas Neue',sans-serif; font-size:20px;">${s}${Math.abs(Math.round(r))}%</span>\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">MELHOR SEMANA</div>\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">\n        ${Math.max(...e.map(e=>e.reps))} <span class="text-mono" style="font-size:11px;">reps</span>\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">TENDÊNCIA 8 SEMANAS</div>\n      <div class="progress-compare">\n        ${calcularTendencia(e.map(e=>e.reps))}\n      </div>\n    </div>\n    <div class="gtg-principle" style="padding:10px 14px;">\n      <div class="gtg-principle-title" style="font-size:12px;">XP ACUMULADO</div>\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--gold);">\n        ${xpData.total.toLocaleString("pt-BR")} <span class="text-mono" style="font-size:10px;">XP</span>\n      </div>\n    </div>`
}

function calcularTendencia(e) {
  if (e.length < 2) return '<span class="trend-flat">→ Sem dados</span>';
  const a = e.length,
    t = (a - 1) / 2,
    o = e.reduce((e, a) => e + a, 0) / a;
  let r = 0,
    s = 0;
  e.forEach((e, a) => {
    r += (a - t) * (e - o), s += (a - t) ** 2
  });
  const n = 0 !== s ? r / s : 0;
  return n > 5 ? '<span class="trend-up">↑ CRESCENDO</span>' : n < -5 ? '<span class="trend-down">↓ DECLINANDO</span>' : '<span class="trend-flat">→ ESTÁVEL</span>'
}

function calcularMediaMovel(e, a) {
  return e.map((t, o) => {
    if (o < a - 1) return null;
    const r = e.slice(o - a + 1, o + 1);
    return Math.round(r.reduce((e, a) => e + a, 0) / a)
  })
}

function renderEstatisticasMensais() {
  const e = document.getElementById("monthlyStats");
  if (!e) return;
  const a = {};
  dados.registros.forEach(e => {
    const t = e.data.slice(0, 7);
    a[t] || (a[t] = {
      series: 0,
      reps: 0,
      diasAtivos: new Set
    }), a[t].series++, a[t].reps += e.valor || 0, a[t].diasAtivos.add(e.data)
  });
  const t = Object.keys(a).sort().reverse().slice(0, 6);
  0 !== t.length ? e.innerHTML = t.map((e, o) => {
    const r = a[e],
      s = t[o + 1],
      n = s ? a[s] : null,
      i = n && n.reps > 0 ? (r.reps - n.reps) / n.reps * 100 : null,
      [d, c] = e.split("-"),
      l = Math.max(...t.map(e => a[e].reps));
    return `\n      <div class="timeline-week">\n        <div class="timeline-week-title">${["","JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][parseInt(c)]} ${d}</div>\n        <div style="display:grid; grid-template-columns: repeat(3,1fr); gap:12px; margin-bottom:10px;">\n          <div><div class="text-mono">SÉRIES</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.series}</div></div>\n          <div><div class="text-mono">REPS</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.reps.toLocaleString("pt-BR")}</div></div>\n          <div><div class="text-mono">DIAS ATIVOS</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);">${r.diasAtivos.size}</div></div>\n        </div>\n        <div style="background:rgba(0,0,0,0.3);height:8px;border-radius:1px;overflow:hidden;margin-bottom:6px;">\n          <div style="width:${Math.round(r.reps/l*100)}%;height:100%;background:linear-gradient(90deg,var(--red-dark),var(--red));transition:width 1s;"></div>\n        </div>\n        ${null!==i?`<div class="progress-compare"><span class="${i>=0?"trend-up":"trend-down"}" style="font-family:'Bebas Neue',sans-serif;font-size:14px;">${i>=0?"↑":"↓"} ${Math.abs(Math.round(i))}% vs mês anterior</span></div>`:""}\n      </div>`
  }).join("") : e.innerHTML = '<div class="text-mono" style="text-align:center; padding:20px;">Sem dados históricos ainda. Comece a treinar!</div>'
}

function setChartMode(e, a) {
  modoGrafico = e, document.querySelectorAll(".chart-toggles .toggle-btn").forEach(e => e.classList.remove("active")), a.classList.add("active"), renderGraficos()
}

function setProgressMode(e, a) {
  modoProgresso = e, a.closest(".card").querySelectorAll(".toggle-btn").forEach(e => e.classList.remove("active")), a.classList.add("active"), renderProgresso()
}

function renderHistory() {
  const container = document.getElementById("historyLog"),
    filterDate = document.getElementById("filterDate")?.value,
    filterEx = document.getElementById("filterExercise")?.value,
    filterOrdem = document.getElementById("filterOrdem")?.value || "recente";
  let filtered = [...dados.registros];
  filterDate && (filtered = filtered.filter(r => r.data === filterDate)), filterEx && (filtered = filtered.filter(r => r.exercicioId === filterEx)), "recente" === filterOrdem ? filtered.sort((a, b) => b.timestamp - a.timestamp) : "antigo" === filterOrdem ? filtered.sort((a, b) => a.timestamp - b.timestamp) : "exercicio" === filterOrdem ? filtered.sort((a, b) => (a.exercicioNome || "").localeCompare(b.exercicioNome || "")) : "xp" === filterOrdem && filtered.sort((a, b) => (b.xp || 0) - (a.xp || 0)), 0 !== filtered.length ? container.innerHTML = filtered.slice(0, 200).map((reg, idx) => {
    const ex = dados.exercicios.find(e => e.id === reg.exercicioId),
      unit = "tempo" === ex?.tipo ? "seg" : ex?.unidade || "reps",
      rpeCls = getRPEColorClass(reg.rpe),
      rpeHtml = reg.rpe ? `<span class="log-rpe ${rpeCls}">RPE ${reg.rpe}</span>` : "";
    return `\n      <div class="log-entry" style="--i:${idx}">\n        <div class="log-dot"></div>\n        <div class="log-time">${reg.data?.slice(5)} ${reg.hora}</div>\n        ${rpeHtml}\n        <div class="log-quality ${renderQualityClass(reg.groove)}">${renderQualityIcons(reg.groove)}</div>\n        <div class="log-exercise">${reg.exercicioNome||reg.exercicioId}</div>\n        <div class="log-detail">${reg.valor} ${unit}${reg.peso?` @ ${reg.peso}kg`:""}</div>\n        <div class="log-xp">+${reg.xp||0} XP</div>\n        <button class="btn-icon danger" onclick="removerRegistroComConfirm('${reg.id}')" style="flex-shrink:0;">✕</button>\n      </div>`
  }).join("") : container.innerHTML = '<div class="text-mono" style="text-align:center;padding:30px;">Nenhum registro encontrado. Comece a treinar!</div>'
}

function removerRegistroComConfirm(regId) {
  const reg = dados.registros.find(r => r.id === regId);
  reg && confirmarAcao("REMOVER ESTE REGISTRO?", `${reg.exercicioNome} — ${reg.valor} — ${reg.data} ${reg.hora}`, () => {
    dados.registros = dados.registros.filter(r => r.id !== regId), salvarDados(), renderHistory(), renderExercicios(), atualizarStats(), mostrarToast("Registro removido", "", "success")
  })
}

function clearFilters() {
  document.getElementById("filterDate").value = "", document.getElementById("filterExercise").value = "", renderHistory()
}

function preencherSelects() {
  ["filterExercise", "timerExerciseSelect", "sessionExSelect"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const prevVal = el.value;
    el.innerHTML = "filterExercise" === id ? '<option value="">TODOS OS EXERCÍCIOS</option>' : '<option value="">SELECIONAR EXERCÍCIO</option>', dados.exercicios.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = ex.id, opt.textContent = ex.nome, el.appendChild(opt)
    }), prevVal && (el.value = prevVal)
  })
}

function tocarSomPreparo(countdown) {
  if (countdown > 1) tocarRuido(.025, .06, 0, 3000, 8000);
  else tocarRuido(.03, .08, 0, 1000, 5000), tocarNota(1047, { vol: .18, dur: .12, wave: "sine" }), tocarNota(1319, { vol: .14, dur: .15, wave: "sine", delay: .08 })
}

function tocarSomInicioExercicio() {
  tocarRuido(.15, .06, 0, 500, 5000, .3);
  [523, 659, 784, 1047].forEach((f, i) => tocarNota(f, { vol: .16 - i * .02, dur: .2 + i * .05, rev: .2 + i * .05, delay: i * .12 }))
}

function startPlankTimer() {
  if (plankTimer.rodando || plankTimer.preparando) return;
  if (plankTimer.pausado) {
    plankTimer.pausado = !1, plankTimer.rodando = !0, document.getElementById("timerDisplay").classList.add("running"), document.getElementById("btnStartTimer").textContent = "▶ RODANDO...";
    plankTimer.intervalo = setInterval(() => {
      plankTimer.segundos++;
      const mins = String(Math.floor(plankTimer.segundos / 60)).padStart(2, "0"),
        secs = String(plankTimer.segundos % 60).padStart(2, "0");
      document.getElementById("timerDisplay").textContent = `${mins}:${secs}`, plankTimer.segundos % 30 == 0 && tocarBeepCronometro()
    }, 1e3);
    return
  }
  let countdown = 7;
  plankTimer.preparando = !0, document.getElementById("btnStartTimer").textContent = "⏳ PREPARANDO...", document.getElementById("btnStartTimer").disabled = !0, document.getElementById("timerDisplay").style.opacity = "0.3";
  const prepOverlay = document.getElementById("prepCountdown"),
    prepNum = document.getElementById("prepNumber");
  prepOverlay.style.display = "block", prepNum.style.display = "block", prepNum.textContent = countdown, tocarSomPreparo(countdown);
  const prepInterval = setInterval(() => {
    countdown--, countdown <= 0 ? (clearInterval(prepInterval), prepOverlay.style.display = "none", prepNum.style.display = "none", document.getElementById("timerDisplay").style.opacity = "1", document.getElementById("btnStartTimer").textContent = "▶ RODANDO...", document.getElementById("btnStartTimer").disabled = !1, plankTimer.preparando = !1, tocarSomInicioExercicio(), plankTimer.rodando = !0, document.getElementById("timerDisplay").classList.add("running"), plankTimer.intervalo = setInterval(() => {
      plankTimer.segundos++;
      const mins = String(Math.floor(plankTimer.segundos / 60)).padStart(2, "0"),
        secs = String(plankTimer.segundos % 60).padStart(2, "0");
      document.getElementById("timerDisplay").textContent = `${mins}:${secs}`, plankTimer.segundos % 30 == 0 && tocarBeepCronometro()
    }, 1e3)) : (prepNum.textContent = countdown, tocarSomPreparo(countdown))
  }, 1e3)
}

function stopPlankTimer() {
  if (!plankTimer.rodando) return;
  clearInterval(plankTimer.intervalo), plankTimer.rodando = !1, plankTimer.pausado = !1, document.getElementById("timerDisplay").classList.remove("running"), document.getElementById("btnStartTimer").textContent = "▶ INICIAR", somTimer();
  const selectedExId = document.getElementById("timerExerciseSelect").value;
  selectedExId && plankTimer.segundos > 0 && (document.getElementById(`valor-${selectedExId}`).value = plankTimer.segundos, adicionarSerie(selectedExId), mostrarToast("Timer Salvo", `${plankTimer.segundos}s registrados`, "success")), resetPlankTimer()
}

function resetPlankTimer() {
  clearInterval(plankTimer.intervalo), plankTimer = {
    intervalo: null,
    segundos: 0,
    rodando: !1,
    preparando: !1,
    pausado: !1
  }, document.getElementById("timerDisplay").textContent = "00:00", document.getElementById("timerDisplay").classList.remove("running"), document.getElementById("timerDisplay").style.opacity = "1", document.getElementById("btnStartTimer").textContent = "▶ INICIAR", document.getElementById("btnStartTimer").disabled = !1, document.getElementById("prepCountdown").style.display = "none", document.getElementById("prepNumber").style.display = "none"
}

function pausePlankTimer() {
  if (!plankTimer.rodando) return;
  clearInterval(plankTimer.intervalo), plankTimer.rodando = !1, plankTimer.pausado = !0, document.getElementById("timerDisplay").classList.remove("running"), document.getElementById("btnStartTimer").textContent = "▶ RETOMAR"
}
let restTimerExIdPendente = null;

function abrirTimerDescanso(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  restTimerExIdPendente = exId, document.getElementById("restModalExercise").textContent = ex?.nome || exId, document.getElementById("restTimerModal").classList.add("active")
}

function confirmRestTimer() {
  const duration = parseInt(document.getElementById("restDuration").value),
    exId = restTimerExIdPendente,
    ex = dados.exercicios.find(e => e.id === exId);
  closeModal("restTimerModal"), iniciarRestTimer(duration, exId, ex?.nome || exId)
}

function iniciarRestTimer(duration, exId, exName) {
  restTimer.intervalo && clearInterval(restTimer.intervalo), restTimer = {
    intervalo: null,
    segundos: duration,
    rodando: !0,
    exercicioId: exId,
    exercicioNome: exName
  }, document.getElementById("restTimerWidget").classList.add("active"), document.getElementById("restTimerExercise").textContent = exName, atualizarDisplayRestTimer(), restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), mostrarToast("✓ DESCANSO COMPLETO!", `Hora de mais uma série de ${exName}!`, "success"), setTimeout(() => document.getElementById("restTimerWidget").classList.remove("active"), 5e3))
  }, 1e3)
}

function atualizarDisplayRestTimer() {
  const mins = String(Math.floor(restTimer.segundos / 60)).padStart(2, "0"),
    secs = String(restTimer.segundos % 60).padStart(2, "0");
  document.getElementById("restTimerDisplay").textContent = `${mins}:${secs}`
}

function toggleRestTimer() {
  restTimer.rodando ? (clearInterval(restTimer.intervalo), restTimer.rodando = !1, document.getElementById("btnPauseRestTimer").textContent = "▶ RETOMAR") : (restTimer.rodando = !0, document.getElementById("btnPauseRestTimer").textContent = "⏸ PAUSAR", restTimer.intervalo = setInterval(() => {
    restTimer.segundos--, atualizarDisplayRestTimer(), restTimer.segundos <= 0 && (clearInterval(restTimer.intervalo), restTimer.rodando = !1, tocarSomDescanso(), mostrarToast("✓ DESCANSO COMPLETO!", `Hora de mais uma série de ${restTimer.exercicioNome}!`, "success"), setTimeout(() => document.getElementById("restTimerWidget").classList.remove("active"), 5e3))
  }, 1e3))
}

function resetRestTimer() {
  clearInterval(restTimer.intervalo), document.getElementById("restTimerWidget").classList.remove("active"), restTimer = {
    intervalo: null,
    segundos: 0,
    rodando: !1,
    exercicioId: null,
    exercicioNome: ""
  }
}

let audioMuted = !1;
try { audioMuted = JSON.parse(localStorage.getItem("gtg_audio_muted")) || !1 } catch (e) {}

function toggleAudio() {
  audioMuted = !audioMuted;
  setItem("gtg_audio_muted", JSON.stringify(audioMuted)).catch(() => {});
  const btn = document.getElementById("btnToggleAudio");
  btn && (btn.textContent = audioMuted ? "🔇" : "🔊")
}

function getAudioCtx() {
  return audioCtx || (audioCtx = new(window.AudioContext || window.webkitAudioContext)), audioCtx
}

// Shared convolution reverb with synthetic impulse response
let _rev = null;
function getRev(ctx) {
  if (_rev) return _rev;
  _rev = ctx.createConvolver();
  const sr = ctx.sampleRate, len = sr * 2.5, buf = ctx.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.5) * (1 + Math.sin(i / len * 13) * .4)
  }
  return _rev.buffer = buf, _rev.connect(ctx.destination), _rev
}

// Filtered noise for percussion, whoosh, rumble
function tocarRuido(dur = .08, vol = .08, delay = 0, hp = 200, lp = 4000, rev = 0) {
  if (audioMuted) return;
  try {
    const ctx = getAudioCtx(), sr = ctx.sampleRate, len = sr * dur, buf = ctx.createBuffer(1, len, sr);
    for (let i = 0; i < len; i++) buf.getChannelData(0)[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(), g = ctx.createGain(), h = ctx.createBiquadFilter(), l = ctx.createBiquadFilter();
    src.buffer = buf, h.type = "highpass", h.frequency.value = hp, l.type = "lowpass", l.frequency.value = lp;
    src.connect(h), h.connect(l), l.connect(g), g.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    g.gain.setValueAtTime(vol, t), g.gain.exponentialRampToValueAtTime(.001, t + dur);
    if (rev > 0) { const w = ctx.createGain(); w.gain.value = Math.min(rev, .4), g.connect(w), w.connect(getRev(ctx)) }
    src.start(t), src.stop(t + dur + .05)
  } catch (err) { console.warn("[Ruido]", err) }
}

// Tonal note with ADSR envelope, optional filter, detune, reverb
function tocarNota(freq, opts = {}) {
  if (audioMuted) return;
  try {
    const ctx = getAudioCtx(), osc = ctx.createOscillator(), g = ctx.createGain();
    const { vol = .12, delay = 0, dur = .3, wave = "triangle", atk = .004, dec = .06, sus = .01, rel = .12, rev = 0, det = 0, filtro = 0 } = opts;
    osc.type = wave, osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    if (det) osc.detune.setValueAtTime(det, ctx.currentTime);
    osc.connect(g);
    if (filtro > 0) { const f = ctx.createBiquadFilter(); f.type = "lowpass", f.frequency.value = filtro, g.connect(f), f.connect(ctx.destination) }
    else g.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    g.gain.setValueAtTime(0, t), g.gain.linearRampToValueAtTime(vol, t + atk), g.gain.exponentialRampToValueAtTime(Math.max(sus, .001), t + atk + dec), g.gain.setValueAtTime(Math.max(sus, .001), t + dur - rel), g.gain.exponentialRampToValueAtTime(.001, t + dur);
    if (rev > 0) { const w = ctx.createGain(); w.gain.value = Math.min(rev, .5), g.connect(w), w.connect(getRev(ctx)) }
    osc.start(t), osc.stop(t + dur + .05)
  } catch (err) { console.warn("[Nota]", err) }
}

function tocarSomRegistro() {
  tocarRuido(.03, .1, 0, 2000, 6000), tocarNota(523, { vol: .12, dur: .15, rev: .2 }), tocarNota(659, { vol: .1, delay: .08, dur: .2, rev: .25 })
}

function tocarBeepCronometro() {
  tocarNota(880, { vol: .06, dur: .04, wave: "sine" }), vibrar([80]);
  const el = document.getElementById("timerDisplay");
  el && (el.style.transform = "scale(1.04)", setTimeout(() => el.style.transform = "", 200))
}

function tocarSomDescanso() {
  tocarRuido(.05, .04, 0, 1000, 3000), tocarNota(784, { vol: .1, dur: .35, atk: .01, dec: .15, rev: .4 }), tocarNota(659, { vol: .08, dur: .35, atk: .01, dec: .15, rev: .4, delay: .12 }), tocarNota(523, { vol: .06, dur: .4, atk: .01, dec: .12, rev: .45, delay: .24 })
}

function somRegistrar() {
  tocarSomRegistro()
}

function somBadge() {
  tocarRuido(.35, .08, 0, 200, 8000), [523, 659, 784, 1047, 1319].forEach((f, i) => tocarNota(f, { vol: .14, dur: .28, atk: .008, dec: .12, rev: .45, det: i % 2 ? -3 : 3, delay: i * .14 }))
}

function somErro() {
  const ctx = getAudioCtx();
  if (audioMuted) return;
  const osc = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lfoG = ctx.createGain();
  osc.type = "sawtooth", osc.frequency.setValueAtTime(110, ctx.currentTime);
  lfo.frequency.value = 4, lfoG.gain.value = 25, lfo.connect(lfoG), lfoG.connect(osc.frequency);
  osc.connect(g), g.connect(ctx.destination);
  const t = ctx.currentTime;
  g.gain.setValueAtTime(.12, t), g.gain.exponentialRampToValueAtTime(.001, t + .35), tocarRuido(.25, .06, 0, 50, 250);
  osc.start(t), osc.stop(t + .4), lfo.start(t), lfo.stop(t + .35)
}

function vibrar(pattern = [200, 100, 200]) {
  navigator.vibrate && navigator.vibrate(pattern)
}

function somTimer() {
  vibrar([300, 100, 300]);
  [880, 1047, 1319, 1760].forEach((f, i) => tocarNota(f, { vol: .12, dur: .15, wave: "sine", atk: .003, rev: .2, delay: i * .12 }))
}

let shareCardTemaClaro = !1;

function toggleTemaCard(light) {
  shareCardTemaClaro = light;
  const canvas = document.getElementById("shareCardCanvas");
  canvas && canvas.classList.toggle("sc-light", light);
  const btnDark = document.getElementById("btnCardTemaEscuro"),
    btnLight = document.getElementById("btnCardTemaClaro");
  btnDark && btnLight && (light ? (btnLight.style.background = "rgba(0,0,0,0.5)", btnLight.style.color = "var(--white)", btnLight.style.borderColor = "var(--gold)", btnDark.style.background = "transparent", btnDark.style.color = "var(--gray-light)", btnDark.style.borderColor = "var(--gray)") : (btnDark.style.background = "rgba(0,0,0,0.5)", btnDark.style.color = "var(--white)", btnDark.style.borderColor = "var(--gold)", btnLight.style.background = "transparent", btnLight.style.color = "var(--gray-light)", btnLight.style.borderColor = "var(--gray)")), abrirShareCard(!0)
}
let shareCardBlob = null;

function abrirShareCard(skipToast) {
  preencherShareCard(), skipToast || mostrarToast("Gerando...", "Preparando cartão do dia", "success"), setTimeout(() => {
    const canvas = document.getElementById("shareCardCanvas");
    html2canvas(canvas, {
      width: 1080,
      height: 1920,
      scale: 1,
      useCORS: !0,
      allowTaint: !0,
      backgroundColor: shareCardTemaClaro ? "#FAF8F4" : cssVar("--bg-dark"),
      logging: !1,
      onclone: function(doc) {
        const cloned = doc.getElementById("shareCardCanvas");
        cloned && (cloned.style.position = "relative", cloned.style.left = "0", cloned.style.top = "0")
      }
    }).then(canvas => {
      canvas.toBlob(blob => {
        shareCardBlob = blob;
        const url = URL.createObjectURL(blob);
        document.getElementById("shareCardPreview").src = url, document.getElementById("shareCardModal").classList.add("active")
      }, "image/png", 1)
    }).catch(err => {
      console.error("Erro ao gerar cartão:", err), mostrarToast("Erro", "Não foi possível gerar a imagem. Tente novamente.", "error")
    })
  }, 200)
}

function preencherShareCard() {
  const hoje = (new Date).toISOString().slice(0, 10),
    now = new Date;
  document.getElementById("sc-date").textContent = `${["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"][now.getDay()]} · ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}`;
  const regsHoje = dados.registros.filter(r => r.data === hoje),
    totalReps = regsHoje.reduce((acc, r) => acc + (r.valor || 0), 0),
    totalXP = regsHoje.reduce((acc, r) => acc + (r.xp || 0), 0);
  document.getElementById("sc-series").textContent = regsHoje.length, document.getElementById("sc-reps").textContent = totalReps, document.getElementById("sc-xp").textContent = totalXP, document.getElementById("sc-streak").textContent = streakData.atual;
  const level = getNivel(xpData.total),
    xpNoNivel = xpData.total - level.min,
    xpParaProximo = level.proximo - level.min || 1,
    xpPct = Math.min(100, Math.round(xpNoNivel / xpParaProximo * 100));
  document.getElementById("sc-level-icon").textContent = level.icone, document.getElementById("sc-level-name").textContent = level.nome, document.getElementById("sc-level-xp").textContent = `${xpData.total} XP TOTAL`, document.getElementById("sc-xp-bar").style.width = xpPct + "%";
  const listEl = document.getElementById("sc-exercises-list");
  listEl.innerHTML = "";
  const grupos = {};
  regsHoje.forEach(r => {
    grupos[r.exercicioId] || (grupos[r.exercicioId] = { nome: r.exercicioNome, series: 0, reps: 0 }), grupos[r.exercicioId].series++, grupos[r.exercicioId].reps += r.valor || 0
  });
  const entries = Object.values(grupos);
  0 === entries.length ? listEl.innerHTML = '<div style="width:100%; padding:30px; background:var(--bg-111); border-left:5px solid var(--accent-red); font-family:\'Share Tech Mono\',monospace; font-size:20px; color:var(--gray); letter-spacing:3px; text-align:center;">SEM REGISTROS HOJE</div>' : entries.slice(0, 7).forEach(g => {
    const ex = dados.exercicios.find(e => e.id === Object.keys(grupos).find(k => grupos[k].nome === g.nome)),
      unit = ex ? "tempo" === ex.tipo ? "seg" : ex.unidade || "reps" : "reps";
    listEl.innerHTML += `\n        <div class="sc-exercise-row">\n          <div class="sc-ex-name">${g.nome}</div>\n          <div class="sc-ex-chips">\n            <div class="sc-ex-chip">\n              <div class="sc-ex-chip-val">${g.series}</div>\n              <div class="sc-ex-chip-lbl">SÉRIES</div>\n            </div>\n            <div class="sc-ex-chip">\n              <div class="sc-ex-chip-val">${g.reps}</div>\n              <div class="sc-ex-chip-lbl">${unit.toUpperCase()}</div>\n            </div>\n          </div>\n        </div>`
  })
}

function baixarShareCard() {
  if (!shareCardBlob) return void mostrarToast("Erro", "Gere o cartão primeiro", "error");
  const hoje = (new Date).toISOString().slice(0, 10),
    url = URL.createObjectURL(shareCardBlob),
    link = document.createElement("a");
  link.href = url, link.download = `gtg_cartao_${hoje}.png`, link.click(), URL.revokeObjectURL(url), mostrarToast("✓ Baixado!", "Imagem salva. Pronto para Stories e Status!", "success")
}
async function copiarShareCard() {
  if (shareCardBlob) try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": shareCardBlob })]), mostrarToast("✓ Copiado!", "Imagem copiada — cole direto no WhatsApp ou Instagram", "success")
  } catch (err) {
    baixarShareCard(), mostrarToast("Info", "Seu navegador não suporta copiar imagem. Arquivo baixado!", "warning")
  } else mostrarToast("Erro", "Gere o cartão primeiro", "error")
}

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
      const focoFrases = [`🎯 FOCO: ${ex.nome}. Uma série perfeita agora vale mais que dez ruins depois.`, `🔥 Modo Foco ativo. ${ex.nome} — qualidade máxima, volume controlado.`, `⚡ ${ex.nome}: frequência > intensidade. Uma série agora > zero depois.`, `🪖 Soldado, hora de ${ex.nome}. Tensão irradiante, controle total.`, `⭐ ${ex.nome}: cada rep de qualidade mieliniza a via nervosa.`],
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

function iniciarLembretes() {
  lembreteInterval && clearInterval(lembreteInterval), lembreteInterval = setInterval(() => {
    const msg = LEMBRETES_GTG[Math.floor(Math.random() * LEMBRETES_GTG.length)];
    mostrarToast("LEMBRETE GTG", msg, "success"), tocarSomLembrete(), enviarNotificacaoSW(msg)
  }, 12e5)
}

function tocarSomLembrete() {
  tocarNota(784, { vol: .1, dur: .15, rev: .3 }), tocarNota(1047, { vol: .14, dur: .2, rev: .35, delay: .15 })
}
let swRegistration = null,
  deferredInstallPrompt = null,
  CACHE_BUILD = "20260711b"; // altere quando fizer deploy de novas versoes

async function instalarPWA() {
  if (!deferredInstallPrompt) return void mostrarToast("Info", "Use o menu do navegador para instalar (Adicionar à tela inicial).", "warning");
  deferredInstallPrompt.prompt();
  const {
    outcome: e
  } = await deferredInstallPrompt.userChoice;
  "accepted" === e && mostrarToast("✓ Instalando!", "GTG Tracker sendo instalado...", "success"), deferredInstallPrompt = null
}
async function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    swRegistration = await navigator.serviceWorker.register("./sw.js", {
      scope: "./"
    });
    return await navigator.serviceWorker.ready, swRegistration = await navigator.serviceWorker.getRegistration(), swRegistration
  } catch (e) {
    console.warn("[registrarServiceWorker] Falha ao registrar sw.js:", e.message);
    try {
      const e = await navigator.serviceWorker.getRegistration();
      if (e) return swRegistration = e, e
    } catch (e) {
      console.error("[registrarServiceWorker] Falha no fallback de registro:", e)
    }
    return null
  }
}
async function enviarNotificacaoSW(e) {
  if (swRegistration && swRegistration.active) try {
    return void await swRegistration.showNotification("GTG TRACKER — FORÇA E RESISTÊNCIA", {
      body: e,
      tag: "gtg-lembrete",
      renotify: !0,
      silent: !1,
      requireInteraction: !0,
      vibrate: [200, 100, 200],
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230A0A0A"/><text y=".9em" font-size="80">⭐</text></svg>'
    })
  } catch (e) {
    console.warn("[enviarNotificacaoSW] Falha na notificação via SW:", e)
  }
  if ("Notification" in window && "granted" === Notification.permission) try {
    new Notification("GTG TRACKER", {
      body: e,
      tag: "gtg-lembrete",
      renotify: !0
    })
  } catch (e) {
    console.warn("[enviarNotificacaoSW] Falha na notificação fallback:", e)
  }
}
async function solicitarPermissaoNotificacao() {
  if (!("Notification" in window)) return void mostrarToast("Info", "Navegador não suporta notificações.", "warning");
  let e = Notification.permission;
  if ("default" === e && (e = await Notification.requestPermission()), "granted" === e) {
    const e = await registrarServiceWorker();
    e ? (e.active ? e.active.postMessage("INICIAR_LEMBRETES") : e.addEventListener("updatefound", () => {
      e.installing?.addEventListener("statechange", () => {
        e.active && e.active.postMessage("INICIAR_LEMBRETES")
      })
    }), document.getElementById("lembreteDesc").textContent = "✓ ATIVO — A CADA 20 MIN (BACKGROUND)", document.getElementById("btnAtivarLembrete").textContent = "✓ ATIVO", document.getElementById("btnAtivarLembrete").style.background = "rgba(45,122,45,0.3)", document.getElementById("btnAtivarLembrete").style.borderColor = "var(--green-bright)", document.getElementById("btnAtivarLembrete").style.color = "var(--green-bright)", mostrarToast("✓ Ativado!", "Lembretes a cada 20 min — funcionam mesmo com a tela bloqueada!", "success")) : (document.getElementById("lembreteDesc").textContent = "✓ ATIVO — A CADA 20 MIN (PÁGINA ABERTA)", document.getElementById("btnAtivarLembrete").textContent = "✓ ATIVO", mostrarToast("Ativado", "Lembretes a cada 20 min (instale o app para funcionar em background).", "success")), iniciarLembretes(), deferredInstallPrompt && (document.getElementById("btnInstalarPWA").style.display = "inline-block")
  } else mostrarToast("Bloqueado", "Permissão negada. Habilite notificações nas configurações do navegador.", "error")
}

function mostrarToast(title, msg, type = "success") {
  const container = document.getElementById("toastContainer"),
    el = document.createElement("div"),
    timeout = "success" === type ? 3e3 : "warning" === type || "info" === type ? 5e3 : 8e3;
  el.className = `toast ${type}`, el.innerHTML = `<div class="toast-title">${title}</div><div class="toast-msg">${msg}</div>`, container.appendChild(el), setTimeout(() => {
    el.style.animation = "toastOut 0.4s ease forwards", setTimeout(() => el.remove(), 400)
  }, timeout)
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active")
}

function mostrarInfoExercicio(exId) {
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return;
  const det = ex.detalhes || {};
  document.getElementById("infoModalTitle").textContent = ex.nome, document.getElementById("infoModalBody").innerHTML = `\n    <div class="exercise-info-section">\n      <h3>DESCRIÇÃO</h3>\n      <p>${det.descricao||"Sem descrição."}</p>\n    </div>\n    ${det.pavelQuote?`\n    <div class="pavel-quote-highlight">\n      ${det.pavelQuote}\n      <cite>PAVEL TSATSOULINE</cite>\n    </div>`:""}\n    <div class="exercise-info-section">\n      <h3>EXECUÇÃO PASSO A PASSO</h3>\n      <ul>${(det.execucao||["Execute com controle"]).map((step,i)=>`<li><strong style="color:var(--gold)">${i+1}.</strong> ${step}</li>`).join("")}</ul>\n    </div>\n    <div class="exercise-info-section">\n      <h3>⚡ DICA GTG DE PAVEL</h3>\n      <p>${det.gtgDica||"Mantenha séries a 50-60% do seu máximo."}</p>\n    </div>\n    ${det.variacoes&&det.variacoes.length>0?`\n    <div class="exercise-info-section">\n      <h3>PROGRESSÕES E VARIAÇÕES</h3>\n      <ul>${det.variacoes.map(v=>`<li>${v}</li>`).join("")}</ul>\n    </div>`:""}\n    <div class="warning-box">\n      TIPO: ${ex.tipo.toUpperCase()} | UNIDADE: ${ex.unidade||"reps"} | GTG: 40-60% DO MÁXIMO\n    </div>\n  `, document.getElementById("infoModal").classList.add("active")
}

function dispararConfetti() {
  const colors = [cssVar("--accent-red"), cssVar("--gold"), cssVar("--gold-light"), cssVar("--red-bright"), cssVar("--green-bright")];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece", piece.style.left = 100 * Math.random() + "vw", piece.style.background = colors[Math.floor(Math.random() * colors.length)], piece.style.animationDelay = .5 * Math.random() + "s", document.body.appendChild(piece), setTimeout(() => piece.remove(), 3500)
  }
}

function exportTXTHoje() {
  const hoje = (new Date).toISOString().slice(0, 10),
    regs = dados.registros.filter(r => r.data === hoje);
  if (0 === regs.length) return void mostrarToast("Info", "Sem registros hoje para exportar.", "warning");
  downloadFile(gerarTXTHoje(regs, hoje), `gtg_treino_${hoje}.txt`, "text/plain"), mostrarToast("Exportado", "TXT do dia de hoje baixado!", "success")
}

function gerarTXTHoje(regs, data) {
  const now = new Date,
    dataExt = `${["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"][now.getDay()]} ${String(now.getDate()).padStart(2,"0")} ${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][now.getMonth()]} ${now.getFullYear()}`;
  let out = "══════════════════════════════════════════════════════════════\n";
  out += "GTG TRACKER — FORÇA E RESISTÊNCIA — TREINO DO DIA\n", out += "══════════════════════════════════════════════════════════════\n\n", out += `DATA: ${dataExt}\n`, out += `XP TOTAL: ${xpData.total} | NÍVEL: ${xpData.nivel} | STREAK: ${streakData.atual} dias\n`, out += `GERADO EM: ${now.toLocaleString("pt-BR")}\n\n`, out += "────────────────────────────────────────────────────────────────\n", out += "EXERCÍCIOS DE HOJE:\n", out += "────────────────────────────────────────────────────────────────\n\n";
  const grupos = {};
  regs.forEach(r => {
    grupos[r.exercicioId] || (grupos[r.exercicioId] = { nome: r.exercicioNome, series: [], xpTotal: 0 }), grupos[r.exercicioId].series.push(r), grupos[r.exercicioId].xpTotal += r.xp || 0
  }), Object.values(grupos).forEach(g => {
    const total = g.series.reduce((acc, s) => acc + (s.valor || 0), 0);
    out += `▶ ${g.nome}\n`, out += `   Séries: ${g.series.length} | Total: ${total} | XP: +${g.xpTotal}\n`, g.series.forEach((s, i) => {
      out += `   [${i+1}] ${s.hora} — ${s.valor} ${s.peso?"@ "+s.peso+"kg":""}\n`
    }), out += "\n"
  });
  const totalReps = regs.reduce((acc, r) => acc + (r.valor || 0), 0),
    totalXP = regs.reduce((acc, r) => acc + (r.xp || 0), 0);
  return out += "────────────────────────────────────────────────────────────────\n", out += `TOTAL DO DIA: ${regs.length} séries | ${totalReps} reps | +${totalXP} XP\n`, out += "══════════════════════════════════════════════════════════════\n", out
}

function exportTXT() {
  downloadFile(gerarTXT(dados.registros), "gtg_historico.txt", "text/plain"), mostrarToast("Exportado", "Arquivo TXT baixado com sucesso!", "success")
}

function exportTXTRange() {
  const start = document.getElementById("exportStart").value,
    end = document.getElementById("exportEnd").value;
  if (!start || !end) return void mostrarToast("Erro", "Selecione as datas", "error");
  downloadFile(gerarTXT(dados.registros.filter(r => r.data >= start && r.data <= end)), `gtg_historico_${start}_${end}.txt`, "text/plain"), mostrarToast("Exportado", "Arquivo TXT do intervalo baixado!", "success")
}

function gerarTXT(registros) {
  let out = "══════════════════════════════════════════════════════════════\n";
  out += "GTG TRACKER — FORÇA E RESISTÊNCIA — RELATÓRIO DE TREINO\n", out += "══════════════════════════════════════════════════════════════\n\n", out += `XP TOTAL: ${xpData.total} | NÍVEL: ${xpData.nivel} | STREAK: ${streakData.atual} dias\n`, out += `GERADO EM: ${(new Date).toLocaleString("pt-BR")}\n\n`, out += "────────────────────────────────────────────────────────────────\n", out += "HISTÓRICO DE SÉRIES:\n", out += "────────────────────────────────────────────────────────────────\n\n";
  const sorted = [...registros].sort((a, b) => b.timestamp - a.timestamp);
  return sorted.forEach(r => {
    out += `[${r.data} ${r.hora}] ${r.exercicioNome}: ${r.valor} ${r.peso?"@ "+r.peso+"kg ":""}(+${r.xp} XP)\n`
  }), out += "\n────────────────────────────────────────────────────────────────\n", out += `TOTAL: ${sorted.length} séries | ${sorted.reduce((acc,r)=>acc+(r.valor||0),0)} reps acumulados\n`, out += "══════════════════════════════════════════════════════════════\n", out
}
async function exportPDF() {
  await gerarRelatorioPDF(dados.registros, "HISTÓRICO COMPLETO", "gtg_relatorio_completo.pdf")
}
async function exportPDFRange() {
  const start = document.getElementById("exportStart").value,
    end = document.getElementById("exportEnd").value;
  if (!start || !end) return void mostrarToast("Erro", "Selecione o intervalo de datas inicial e final.", "error");
  const regs = dados.registros.filter(r => r.data >= start && r.data <= end),
    titulo = `DE ${formatarDataPtBR(start)} ATÉ ${formatarDataPtBR(end)}`;
  await gerarRelatorioPDF(regs, titulo, `gtg_relatorio_${start}_${end}.pdf`)
}

function formatarDataPtBR(data) {
  if (!data) return "—";
  const parts = data.split("-");
  return 3 !== parts.length ? data : `${parts[2]}/${parts[1]}/${parts[0]}`
}
async function gerarRelatorioPDF(registros, titulo, fileName) {
  if (registros && 0 !== registros.length) {
    mostrarToast("Iniciando...", "Preparando o Relatório de Combate em PDF...", "success");
    try {
      const { jsPDF: PDFLib } = window.jspdf, doc = new PDFLib("p", "pt", "a4");
      doc.text("Relatório GTG — " + titulo, 40, 40), doc.text("Total de séries: " + registros.length, 40, 60), doc.text("XP total: " + registros.reduce((acc, r) => acc + (r.xp || 0), 0), 40, 80), doc.save(fileName), mostrarToast("Sucesso!", "PDF gerado com sucesso!", "success")
    } catch (err) {
      mostrarToast("Erro", "Falha ao gerar PDF. Tente exportar TXT.", "error")
    }
  } else mostrarToast("Aviso", "Nenhum registro encontrado para exportar.", "warning")
}

function exportJSON() {
  const payload = { dados, streakData, xpData, badgesData };
  downloadFile(JSON.stringify(payload, null, 2), "gtg_backup.json", "application/json"), mostrarToast("Backup", "Arquivo JSON baixado!", "success")
}

function importJSON() {
  document.getElementById("importFile").click()
}

function handleImport(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader;
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      parsed.dados && (dados = parsed.dados), parsed.streakData && (streakData = parsed.streakData), parsed.xpData && (xpData = parsed.xpData), parsed.badgesData && (badgesData = parsed.badgesData), salvarDados(), inicializar(), mostrarToast("Importado", "Dados restaurados com sucesso!", "success")
    } catch (err) {
      mostrarToast("Erro", "Arquivo inválido", "error")
    }
  }, reader.readAsText(file)
}

function clearAllData() {
  if (!window.confirm("APAGAR TODOS OS DADOS? Isso não pode ser desfeito!")) return;
  clearAll().catch(() => {}), localStorage.clear(), location.reload()
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType }),
    url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url, link.download = fileName, link.click(), URL.revokeObjectURL(url)
}

function renderGuiaExercicios() {
  const section = document.getElementById("exerciseGuideSection");
  if (!section) return;
  if (!dados.exercicios || dados.exercicios.length === 0) {
    section.innerHTML = '<div class="text-mono" style="text-align:center;padding:24px;color:var(--gray-light)">Nenhum exercício cadastrado. Adicione exercícios para ver o guia.</div>';
    return
  }
  section.innerHTML = dados.exercicios.map(ex => `\n    <div class="gtg-principle" style="cursor:pointer;" onclick="mostrarInfoExercicio('${ex.id}')">\n      <div class="gtg-principle-title">${ex.nome}</div>\n      <div class="gtg-principle-text" style="font-size:12px;">${ex.tipo.toUpperCase()} — ${ex.unidade||"reps"}</div>\n    </div>\n  `).join("")
}
window.addEventListener("beforeinstallprompt", ev => {
  ev.preventDefault(), deferredInstallPrompt = ev, document.getElementById("btnInstalarPWA").style.display = "inline-block"
}), window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null, document.getElementById("btnInstalarPWA").style.display = "none", mostrarToast("✓ App Instalado!", "GTG Tracker instalado. Lembretes funcionarão em background.", "success")
});
let modoFocoState = { ativo: !1, exercicioId: null };

async function carregarModoFoco() {
  try {
    const raw = await getItem("gtg_modo_foco") || localStorage.getItem("gtg_modo_foco");
    raw && (modoFocoState = JSON.parse(raw))
  } catch (err) {
    console.error("[carregarModoFoco] Falha ao carregar modoFocoState:", err)
  }
}

function salvarModoFoco() {
  setItem("gtg_modo_foco", JSON.stringify(modoFocoState)).catch(() => {})
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

function atualizarDisplayShields() {
  for (let i = 1; i <= 3; i++) {
    const icon = document.getElementById("shieldIcon" + i);
    icon && icon.classList.toggle("active", i <= streakData.streakShields)
  }
  const countDisplay = document.getElementById("shieldCountDisplay");
  countDisplay && (countDisplay.textContent = streakData.streakShields + " / 3");
  const buyBtn = document.getElementById("btnBuyShield");
  if (buyBtn) {
    const canBuy = xpData.total >= streakData.shieldCost && streakData.streakShields < 3;
    buyBtn.disabled = !canBuy, streakData.streakShields >= 3 ? buyBtn.textContent = "MÁXIMO ATINGIDO" : buyBtn.textContent = "COMPRAR (" + streakData.shieldCost + " XP)"
  }
}

function comprarShield() {
  streakData.streakShields >= 3 ? mostrarToast("Máximo Atingido", "Você já tem 3 shields.", "warning") : xpData.total < streakData.shieldCost ? mostrarToast("XP Insuficiente", "Você precisa de " + streakData.shieldCost + " XP.", "error") : (xpData.total -= streakData.shieldCost, streakData.streakShields += 1, salvarDados(), atualizarXP(), atualizarDisplayShields(), mostrarToast("🛡 Shield Adquirido!", "Streak Shield comprado. Proteção ativa.", "success"), tocarSomRegistro())
}

function usarShield() {
  return streakData.streakShields > 0 && (streakData.streakShields -= 1, salvarDados(), atualizarDisplayShields(), mostrarToast("🔒 Shield Ativado!", "Sua streak foi preservada pelo Streak Shield!", "warning"), dispararConfetti(), !0)
}

function mostrarUndoBar(e) {
  const a = document.getElementById("undoBar");
  a && a.remove(), undoState.timeoutId && clearTimeout(undoState.timeoutId), undoState.countdownInterval && clearInterval(undoState.countdownInterval), undoState.ultimoRegistro = e, undoState.segundosRestantes = 5;
  const t = document.createElement("div");
  t.className = "undo-bar", t.id = "undoBar", t.innerHTML = `\n    <div class="undo-text">✓ <span>${e.exercicioNome}</span> +${e.valor} ${e.peso?"@ "+e.peso+"kg":""}</div>\n    <div class="undo-timer" id="undoTimer">5s</div>\n    <button class="btn-undo" onclick="desfazerRegistro()">↩ DESFAZER</button>\n  `, document.body.appendChild(t), undoState.countdownInterval = setInterval(() => {
    undoState.segundosRestantes--;
    const e = document.getElementById("undoTimer");
    e && (e.textContent = undoState.segundosRestantes + "s"), undoState.segundosRestantes <= 0 && (clearInterval(undoState.countdownInterval), esconderUndoBar())
  }, 1e3), undoState.timeoutId = setTimeout(() => {
    esconderUndoBar()
  }, 5e3)
}

function esconderUndoBar() {
  const e = document.getElementById("undoBar");
  e && (e.classList.add("hide"), setTimeout(() => e.remove(), 300)), undoState.ultimoRegistro = null, undoState.countdownInterval && clearInterval(undoState.countdownInterval)
}

function desfazerRegistro() {
  if (!undoState.ultimoRegistro) return;
  const e = undoState.ultimoRegistro;
  dados.registros = dados.registros.filter(a => a.id !== e.id), xpData.total -= e.xp, xpData.total < 0 && (xpData.total = 0);
  const a = (new Date).toISOString().slice(0, 10);
  dados.registros.some(e => e.data === a) || streakData.ultimaData !== a || (streakData.ultimaData = null, streakData.atual = Math.max(0, streakData.atual - 1)), salvarDados(), renderExercicios(), atualizarStats(), renderHistory(), atualizarXP(), atualizarUIStreak(), esconderUndoBar(), mostrarToast("↩ Desfeito", e.exercicioNome + " removido. XP revertido.", "success")
}
let rpeSelecionado = {};

function selectRPE(e, a) {
  rpeSelecionado[e] === a ? delete rpeSelecionado[e] : rpeSelecionado[e] = a;
  const t = document.getElementById("rpe-scale-" + e);
  if (t) {
    t.querySelectorAll(".rpe-btn").forEach((a, t) => {
      a.classList.toggle("selected", t + 1 === rpeSelecionado[e])
    })
  }
  const o = document.getElementById("rpe-warn-" + e);
  o && o.classList.toggle("show", (rpeSelecionado[e] || 0) >= 7)
}

function getRPEColorClass(e) {
  return e ? e <= 4 ? "rpe-low" : e <= 6 ? "rpe-mid" : e <= 8 ? "rpe-high" : "rpe-max" : ""
}

function getRPELabel(e) {
  return e ? e <= 2 ? "Muito fácil" : e <= 4 ? "Fácil" : e <= 6 ? "Moderado" : e <= 8 ? "Difícil" : "Máximo esforço" : ""
}

function calcularRPEMedio(e, a) {
  const t = dados.registros.filter(t => t.exercicioId === e && t.data === a && t.rpe);
  return 0 === t.length ? null : (t.reduce((e, a) => e + a.rpe, 0) / t.length).toFixed(1)
}

function calcularPR2(e) {
  const a = Date.now() - 2592e6,
    t = dados.registros.filter(t => t.exercicioId === e.id && t.timestamp > a).sort((e, a) => e.timestamp - a.timestamp);
  return 0 === t.length ? 0 : Math.max(...t.map(e => e.valor || 0))
}

function calcularSugestaoGTG(e, a) {
  if (!e || e <= 0) return null;
  return Math.max(1, Math.round(.5 * e))
}

function atualizarSugestoesGTG() {
  dados.exercicios.forEach(e => {
    const a = calcularPR2(e),
      t = calcularSugestaoGTG(a, e.tipo),
      o = document.getElementById("gtg-val-" + e.id);
    o && (t ? (o.textContent = "GTG: " + t, o.parentElement.style.display = "inline-flex") : o.textContent = "GTG: --");
    const r = document.getElementById("tooltip-pr-" + e.id);
    r && (r.textContent = a);
    const s = document.getElementById("pr-display-" + e.id);
    if (s) {
      const t = "tempo" === e.tipo ? "seg" : e.unidade || "reps";
      s.textContent = a + " " + t
    }
    const n = document.getElementById("valor-" + e.id);
    n && t && !n.value && !n.placeholder.startsWith("GTG") && (n.placeholder = "GTG: " + t)
  })
}

function aplicarSugestaoGTG(e, a) {
  a.stopPropagation();
  const t = dados.exercicios.find(a => a.id === e);
  if (!t) return;
  const o = calcularSugestaoGTG(calcularPR2(t), t.tipo);
  if (!o) return void mostrarToast("Sem dados", 'Faça séries primeiro ou use "Testar Máximo"', "warning");
  const r = document.getElementById("valor-" + e);
  r && (r.value = o, r.focus(), mostrarToast("💡 Sugestão aplicada", t.nome + ": " + o + " " + ("tempo" === t.tipo ? "seg" : "reps"), "success"))
}
let testMaxExercicioId = null;

function abrirTesteMaximo(e) {
  const a = dados.exercicios.find(a => a.id === e);
  a && (testMaxExercicioId = e, document.getElementById("testMaxTitle").textContent = "🎯 TESTAR MÁXIMO — " + a.nome, document.getElementById("testMaxExercise").textContent = a.nome, document.getElementById("testMaxInput").value = "", document.getElementById("testMaxModal").classList.add("active"))
}

function confirmarTesteMaximo() {
  if (!testMaxExercicioId) return;
  const e = document.getElementById("testMaxInput"),
    a = parseInt(e.value);
  if (!a || a < 1) return void mostrarToast("Erro", "Insira um valor válido", "error");
  const t = dados.exercicios.find(e => e.id === testMaxExercicioId);
  if (!t) return;
  const o = new Date,
    r = {
      id: "test_" + Date.now(),
      exercicioId: testMaxExercicioId,
      exercicioNome: t.nome,
      valor: a,
      peso: 0,
      data: o.toISOString().slice(0, 10),
      hora: o.toTimeString().slice(0, 5),
      timestamp: o.getTime(),
      xp: 0,
      rpe: null,
      isTest: !0
    };
  dados.registros.push(r), salvarDados(), atualizarSugestoesGTG(), closeModal("testMaxModal"), mostrarToast("✓ Máximo registrado", t.nome + ": " + a + " " + ("tempo" === t.tipo ? "seg" : "reps") + ". Sugestão GTG atualizada!", "success"), testMaxExercicioId = null
}
let readinessData = {
  sono: 5,
  stress: 5,
  dor: 5,
  score: 50,
  data: null
};
const READINESS_KEY = "gtg_readiness";

async function carregarReadiness() {
  try {
    const e = await getItem(READINESS_KEY) || localStorage.getItem(READINESS_KEY);
    if (e) {
      const a = JSON.parse(e),
        t = (new Date).toISOString().slice(0, 10);
      a.data === t ? (readinessData = a, document.getElementById("sliderSono").value = readinessData.sono, document.getElementById("sliderStress").value = readinessData.stress, document.getElementById("sliderDor").value = readinessData.dor) : resetReadinessData()
    }
  } catch (e) {
    console.error("Erro ao carregar readiness:", e)
  }
  updateReadinessUI()
}

function salvarReadiness() {
  try {
    readinessData.data = (new Date).toISOString().slice(0, 10), setItem(READINESS_KEY, JSON.stringify(readinessData)).catch(() => {})
  } catch (e) {
    console.error("Erro ao salvar readiness:", e)
  }
}

function resetReadinessData() {
  readinessData = {
    sono: 5,
    stress: 5,
    dor: 5,
    score: 50,
    data: null
  }, document.getElementById("sliderSono").value = 5, document.getElementById("sliderStress").value = 5, document.getElementById("sliderDor").value = 5, salvarReadiness()
}

function resetReadiness() {
  resetReadinessData(), updateReadinessUI(), mostrarToast("🔄 Resetado", "Estado de Prontidão resetado para padrão.", "success")
}

function calcularReadiness(e, a, t) {
  const o = Math.round((10 * e + 10 * (10 - a) + 10 * (10 - t)) / 3);
  return Math.max(0, Math.min(100, o))
}

function getReadinessConfig(e) {
  return e >= 80 ? {
    classe: "readiness-green",
    classeHeader: "",
    label: "PRONTO",
    sugestao: "<strong>Dia de guerra.</strong> Aproveite o pico.",
    corScore: "var(--green-bright)"
  } : e >= 60 ? {
    classe: "readiness-yellow",
    classeHeader: "readiness-yellow-h",
    label: "MODERADO",
    sugestao: "<strong>Volume normal.</strong> Foque na técnica.",
    corScore: "var(--accent-yellow)"
  } : e >= 40 ? {
    classe: "readiness-orange",
    classeHeader: "readiness-orange-h",
    label: "CUIDADO",
    sugestao: "<strong>Reduza séries em 25%.</strong> Mantenha qualidade.",
    corScore: "var(--accent-orange)"
  } : {
    classe: "readiness-red",
    classeHeader: "readiness-red-h",
    label: "DESCANSAR",
    sugestao: "<strong>Pavel diz:</strong> hoje é dia de descanso ativo.",
    corScore: "var(--accent-red-bright)"
  }
}

function updateReadiness() {
  const e = parseInt(document.getElementById("sliderSono").value),
    a = parseInt(document.getElementById("sliderStress").value),
    t = parseInt(document.getElementById("sliderDor").value);
  readinessData.sono = e, readinessData.stress = a, readinessData.dor = t, readinessData.score = calcularReadiness(e, a, t), salvarReadiness(), updateReadinessUI()
}

function updateReadinessUI() {
  const e = readinessData.sono,
    a = readinessData.stress,
    t = readinessData.dor,
    o = readinessData.score;
  document.getElementById("valSono").textContent = e, document.getElementById("valStress").textContent = a, document.getElementById("valDor").textContent = t, document.getElementById("fillSono").style.width = 10 * e + "%", document.getElementById("fillStress").style.width = 10 * a + "%", document.getElementById("fillDor").style.width = 10 * t + "%";
  const r = getReadinessConfig(o),
    s = document.getElementById("readinessCircle"),
    n = document.getElementById("readinessScore"),
    i = document.getElementById("readinessLabel"),
    d = document.getElementById("readinessSuggestion");
  s.classList.remove("readiness-green", "readiness-yellow", "readiness-orange", "readiness-red"), s.classList.add(r.classe), n.textContent = o, n.style.color = r.corScore, i.textContent = r.label, i.style.color = r.corScore, document.getElementById("readinessSub").style.color = r.corScore, d.innerHTML = r.sugestao, d.style.borderLeftColor = r.corScore;
  const c = document.getElementById("headerReadiness"),
    l = document.getElementById("headerReadinessScore");
  c && l && (c.classList.remove("readiness-yellow-h", "readiness-orange-h", "readiness-red-h"), r.classeHeader && c.classList.add(r.classeHeader), l.textContent = o, l.style.color = r.corScore)
}

function scrollToReadiness(e) {
  e.preventDefault();
  const a = document.getElementById("readinessCard");
  a && (a.scrollIntoView({
    behavior: "smooth",
    block: "center"
  }), a.style.transition = "box-shadow 0.3s", a.style.boxShadow = "0 0 40px rgba(212,160,23,0.4)", setTimeout(() => {
    a.style.boxShadow = ""
  }, 800));
  const t = document.querySelector('.nav-tab[data-tab="treino"]'),
    o = document.getElementById("tab-treino");
  t && !t.classList.contains("active") && (document.querySelectorAll(".nav-tab").forEach(e => e.classList.remove("active")), document.querySelectorAll(".tab-content").forEach(e => e.classList.remove("active")), t.classList.add("active"), o.classList.add("active"))
}
let _dragSrcId = null;

function _initDragDrop() {
  const e = document.getElementById("exerciseGrid");
  e && e.querySelectorAll(".exercise-card").forEach(a => {
    const t = a.id.replace("excard-", ""),
      o = a.querySelector(".exercise-card-header");
    o && (o.style.cursor = "grab", o.title = "Arraste para reordenar"), a.setAttribute("draggable", "true"), a.addEventListener("dragstart", e => {
      _dragSrcId = t, e.dataTransfer.effectAllowed = "move", setTimeout(() => a.style.opacity = "0.4", 0)
    }), a.addEventListener("dragend", () => {
      a.style.opacity = "", e.querySelectorAll(".exercise-card").forEach(e => {
        e.style.outline = ""
      })
    }), a.addEventListener("dragover", e => {
      e.preventDefault(), e.dataTransfer.dropEffect = "move", t !== _dragSrcId && (a.style.outline = "2px solid var(--gold)")
    }), a.addEventListener("dragleave", () => {
      a.style.outline = ""
    }), a.addEventListener("drop", e => {
      if (e.preventDefault(), a.style.outline = "", !_dragSrcId || _dragSrcId === t) return;
      const o = dados.exercicios.findIndex(e => e.id === _dragSrcId),
        r = dados.exercicios.findIndex(e => e.id === t);
      if (-1 === o || -1 === r) return;
      const [s] = dados.exercicios.splice(o, 1);
      dados.exercicios.splice(r, 0, s), salvarDados(), renderExercicios(), _dragSrcId = null
    })
  })
}

function processarQuickLog() {
  const e = document.getElementById("quickLogInput"),
    a = document.getElementById("quickLogFeedback"),
    t = (e.value || "").trim().toLowerCase();
  if (!t) return;
  if ("?" === t || "help" === t || "ajuda" === t) return a.style.display = "block", a.style.color = "var(--gold)", void(a.textContent = 'SINTAXE: <nome> <valor>  |  Exemplos: "flex 12", "barra 5", "prancha 45", "swing 20"');
  const o = t.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);
  if (!o) return a.style.display = "block", a.style.color = "var(--red-bright)", void(a.textContent = '✕ Formato inválido. Use: <exercício> <valor>  |  Ex: "flex 12"  |  ? para ajuda');
  const r = o[1].trim(),
    s = parseFloat(o[2]),
    n = dados.exercicios.find(e => {
      const a = e.nome.toLowerCase(),
        t = e.id.toLowerCase();
      return a.includes(r) || t.includes(r) || r.split("").every(e => a.includes(e))
    }) || dados.exercicios.find(e => e.nome.toLowerCase().split(" ").some(e => e.startsWith(r)));
  if (!n) {
    a.style.display = "block", a.style.color = "var(--red-bright)";
    const e = dados.exercicios.map(e => e.nome.split(" ")[0].toLowerCase()).join(", ");
    return void(a.textContent = `✕ Exercício "${r}" não encontrado. Disponíveis: ${e}`)
  }
  const i = document.getElementById(`valor-${n.id}`);
  if (i) i.value = Math.round(s), adicionarSerie(n.id);
  else {
    const e = new Date,
      a = {
        id: Date.now() + Math.random().toString(36).slice(2),
        exercicioId: n.id,
        exercicioNome: n.nome,
        valor: Math.round(s),
        peso: 0,
        data: e.toISOString().slice(0, 10),
        hora: e.toTimeString().slice(0, 5),
        timestamp: e.getTime(),
        xp: calcularXPSerie(n, Math.round(s), 0),
        rpe: null
      };
    dados.registros.push(a), adicionarXP(a.xp), verificarStreak(), verificarBadges(), salvarDados(), renderExercicios(), atualizarStats(), renderHistory(), somRegistrar(), mostrarToast(`+${Math.round(s)} ${"tempo"===n.tipo?"seg":"reps"}`, `+${a.xp} XP — ${n.nome}`, "success")
  }
  a.style.display = "block", a.style.color = "var(--green-bright)", a.textContent = `✓ ${n.nome}: ${Math.round(s)} ${"tempo"===n.tipo?"seg":"reps"} registrado`, e.value = "", setTimeout(() => {
    a.style.display = "none"
  }, 3e3)
}

function renderHeatmap() {
  const e = document.getElementById("heatmapContainer"),
    a = document.getElementById("heatmapLegend");
  if (!e) return;
  const t = new Date,
    o = new Date(t);
  o.setFullYear(o.getFullYear() - 1), o.setDate(o.getDate() + 1);
  const r = {};
  dados.registros.forEach(e => {
    r[e.data] = (r[e.data] || 0) + 1
  });
  const s = Math.max(1, ...Object.values(r)),
    n = [],
    i = new Date(o);
  for (; i <= t;) n.push(i.toISOString().slice(0, 10)), i.setDate(i.getDate() + 1);
  const d = n.filter(e => r[e]).length;
  a && (a.textContent = `${d} dias treinados no último ano`);
  const c = [];
  let l = [];
  const m = new Date(n[0] + "T00:00:00");
  for (let e = 0; e < m.getDay(); e++) l.push(null);
  n.forEach(e => {
    l.push(e), 7 === l.length && (c.push(l), l = [])
  }), l.length && c.push(l);
  const u = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  function p(e) {
    if (!e) return "rgba(255,255,255,0.05)";
    const a = e / s;
    return a < .25 ? "rgba(139,0,0,0.5)" : a < .5 ? "rgba(204,0,0,0.7)" : a < .75 ? "var(--accent-red)" : "var(--accent-red-bright)"
  }
  let g = '<div style="display:flex; gap:3px; margin-bottom:4px; padding-left:16px;">',
    v = -1;
  c.forEach((e, a) => {
    const t = e.find(e => null !== e);
    if (t) {
      const e = new Date(t + "T00:00:00").getMonth();
      e !== v ? (g += `<span style="font-family:Share Tech Mono,monospace; font-size:9px; color:var(--gray-light); width:13px; min-width:13px;">${u[e]}</span>`, v = e) : g += '<span style="width:13px; min-width:13px;"></span>'
    } else g += '<span style="width:13px; min-width:13px;"></span>'
  }), g += "</div>";
  let f = '<div style="display:flex; gap:3px;">';
  f += '<div style="display:flex; flex-direction:column; gap:3px; margin-right:2px;">', ["D", "S", "T", "Q", "Q", "S", "S"].forEach(e => {
    f += `<div style="width:13px; height:13px; font-family:Share Tech Mono,monospace; font-size:8px; color:var(--gray); display:flex; align-items:center; justify-content:center;">${e}</div>`
  }), f += "</div>", c.forEach(e => {
    f += '<div style="display:flex; flex-direction:column; gap:3px;">';
    for (let a = 0; a < 7; a++) {
      const t = e[a],
        o = t && r[t] || 0,
        s = t ? p(o) : "transparent";
      f += `<div title="${t?`${t}: ${o} série(s)`:""}" style="width:13px; height:13px; border-radius:2px; background:${s}${t&&!o?"; border:1px solid rgba(255,255,255,0.08)":""}; cursor:${t?"pointer":"default"};"></div>`
    }
    f += "</div>"
  }), f += "</div>", e.innerHTML = g + f
}

function renderAnalise() {
  const e = document.getElementById("insightsContainer");
  if (!e) return;
  const a = [],
    t = (new Date).toISOString().slice(0, 10),
    o = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
    r = new Date(Date.now() - 6048e5).toISOString().slice(0, 10);
  dados.exercicios.forEach(e => {
    const o = dados.registros.filter(a => a.exercicioId === e.id).sort((e, a) => a.data.localeCompare(e.data));
    if (0 === o.length) a.push({
      icon: "😴",
      cor: "rgba(204,0,0,0.15)",
      borda: "rgba(204,0,0,0.4)",
      titulo: "NUNCA TREINADO",
      texto: `<strong>${e.nome}</strong> ainda não tem nenhum registro. Comece hoje.`
    });
    else {
      const r = o[0].data,
        s = Math.floor((new Date(t) - new Date(r)) / 864e5);
      s >= 3 && a.push({
        icon: "⚠️",
        cor: "rgba(255,170,0,0.1)",
        borda: "rgba(255,170,0,0.4)",
        titulo: "EXERCÍCIO PARADO",
        texto: `<strong>${e.nome}</strong> não é treinado há <strong>${s} dias</strong>. Pavel diria que você está perdendo o groove.`
      })
    }
  });
  const s = getInicioSemana(t),
    n = getInicioSemana(r),
    i = new Date(s);
  i.setDate(i.getDate() - 1);
  const d = i.toISOString().slice(0, 10),
    c = dados.registros.filter(e => e.data >= s).length,
    l = dados.registros.filter(e => e.data >= n && e.data <= d).length;
  if (l > 0) {
    const e = c - l,
      t = Math.round(Math.abs(e) / l * 100);
    e < -3 ? a.push({
      icon: "📉",
      cor: "rgba(204,0,0,0.1)",
      borda: "rgba(204,0,0,0.3)",
      titulo: "VOLUME EM QUEDA",
      texto: `Esta semana: <strong>${c} séries</strong> vs ${l} na semana passada (−${t}%). Mantenha o ritmo.`
    }) : e > 3 && a.push({
      icon: "📈",
      cor: "rgba(45,122,45,0.1)",
      borda: "rgba(68,204,68,0.3)",
      titulo: "VOLUME CRESCENDO",
      texto: `Esta semana: <strong>${c} séries</strong> vs ${l} na semana passada (+${t}%). Excelente consistência.`
    })
  }
  const m = dados.exercicios.map(e => ({
    ex: e,
    total: dados.registros.filter(a => a.exercicioId === e.id).length
  })).sort((e, a) => a.total - e.total);
  m.length && m[0].total > 0 && a.push({
    icon: "👑",
    cor: "rgba(212,160,23,0.1)",
    borda: "rgba(212,160,23,0.4)",
    titulo: "EXERCÍCIO DOMINANTE",
    texto: `<strong>${m[0].ex.nome}</strong> é seu exercício mais praticado com <strong>${m[0].total} séries</strong> no histórico total.`
  });
  const u = [0, 0, 0, 0, 0, 0, 0],
    p = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  dados.registros.forEach(e => {
    const a = new Date(e.data + "T00:00:00").getDay();
    u[a]++
  });
  const g = u.indexOf(Math.max(...u));
  u[g] > 0 && a.push({
    icon: "📅",
    cor: "rgba(212,160,23,0.08)",
    borda: "rgba(212,160,23,0.3)",
    titulo: "DIA MAIS PRODUTIVO",
    texto: `<strong>${p[g]}</strong> é o dia em que você mais treina (<strong>${u[g]} séries</strong> históricas). Seu ritmo natural.`
  });
  const v = {};
  dados.registros.forEach(e => {
    if (e.hora) {
      const a = e.hora.slice(0, 2);
      v[a] = (v[a] || 0) + 1
    }
  });
  const f = Object.entries(v).sort((e, a) => a[1] - e[1]);
  if (f.length) {
    const [e, t] = f[0], o = parseInt(e) < 12 ? "manhã" : parseInt(e) < 18 ? "tarde" : "noite";
    a.push({
      icon: "🕐",
      cor: "rgba(83,74,183,0.1)",
      borda: "rgba(83,74,183,0.3)",
      titulo: "HORÁRIO DE PICO",
      texto: `Você treina mais às <strong>${e}h</strong> (${o}). <strong>${t} séries</strong> registradas nesse horário.`
    })
  }
  const x = dados.registros.some(e => e.data === t);
  dados.registros.some(e => e.data === o);
  !x && streakData.atual > 0 && a.push({
    icon: "🔥",
    cor: "rgba(204,0,0,0.15)",
    borda: "rgba(255,26,26,0.5)",
    titulo: "STREAK EM RISCO",
    texto: `Você ainda não treinou hoje. Sua streak de <strong>${streakData.atual} dias</strong> está em risco. Faça pelo menos uma série.`
  }), 0 === a.length && a.push({
    icon: "📊",
    cor: "rgba(255,255,255,0.03)",
    borda: "rgba(255,255,255,0.1)",
    titulo: "SEM DADOS SUFICIENTES",
    texto: "Continue treinando! Os insights aparecem conforme você acumula histórico no app."
  }), e.innerHTML = a.map(e => `\n    <div style="background:${e.cor}; border:1px solid ${e.borda}; border-radius:4px; padding:14px 16px;">\n      <div style="font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:2px; color:var(--gold-dim); margin-bottom:6px;">${e.icon} ${e.titulo}</div>\n      <div style="font-family:'Rajdhani',sans-serif; font-size:14px; color:var(--white-dim); line-height:1.5;">${e.texto}</div>\n    </div>\n  `).join("")
}
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
}), setTimeout(() => {
  sessionStorage.getItem("gtg_atalhos_dica") || (sessionStorage.setItem("gtg_atalhos_dica", "1"), mostrarToast("⌨ Atalhos ativos", "Pressione ? para ver todos os atalhos de teclado.", "success"))
}, 2500), document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("quickLogInput");
  e && e.addEventListener("keydown", e => {
    "Enter" === e.key && processarQuickLog()
  })
});
let chartPR = null;

function renderGraficoPR(e) {
  const a = document.getElementById("prChart");
  if (!a) return;
  const t = dados.exercicios.find(a => a.id === e);
  if (!t) return;
  const o = dados.registros.filter(a => a.exercicioId === e && a.valor > 0).sort((e, a) => e.data.localeCompare(a.data));
  if (0 === o.length) return void(a.parentElement.innerHTML = '<div class="text-mono" style="text-align:center;padding:30px;color:var(--gray-light);">Sem dados para este exercício ainda.</div>');
  const r = {};
  o.forEach(e => {
    const a = getInicioSemana(e.data);
    r[a] = Math.max(r[a] || 0, e.valor)
  });
  const s = Object.keys(r).sort(),
    n = s.map(e => r[e]),
    i = s.map(e => {
      const a = new Date(e + "T00:00:00");
      return `${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`
    }),
    d = [];
  let c = 0;
  n.forEach(e => {
    c = Math.max(c, e), d.push(c)
  }), chartPR && chartPR.destroy(), chartPR = new Chart(a, {
    type: "line",
    data: {
      labels: i,
      datasets: [{
        label: "Máx. Semanal",
        data: n,
        borderColor: "rgba(204,0,0,0.7)",
        backgroundColor: "rgba(204,0,0,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        fill: !0,
        tension: .3
      }, {
        label: "PR Histórico",
        data: d,
        borderColor: cssVar("--gold"),
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: [6, 3],
        pointRadius: 0,
        fill: !1,
        tension: 0
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          labels: {
            color: "#888",
            font: {
              family: "Rajdhani",
              size: 12
            }
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#666",
            maxTicksLimit: 8
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          ticks: {
            color: "#666"
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          },
          title: {
            display: !0,
            text: "tempo" === t.tipo ? "segundos" : t.unidade || "reps",
            color: "#666"
          }
        }
      }
    }
  })
}

function injetarCardPR() {
  if (document.getElementById("prChartCard")) return;
  const e = document.createElement("div");
  e.className = "card", e.id = "prChartCard", e.style.marginTop = "20px", e.innerHTML = '\n    <div class="card-header">\n      <span class="card-title">🏆 EVOLUÇÃO DO PR — POR EXERCÍCIO</span>\n      <select class="form-select" id="prChartSelect" onchange="renderGraficoPR(this.value)" style="font-size:12px; padding:4px 8px;">\n      </select>\n    </div>\n    <div class="card-body">\n      <div class="chart-canvas-wrap" style="height:260px;">\n        <canvas id="prChart"></canvas>\n      </div>\n    </div>\n  ';
  const a = document.getElementById("tab-stats");
  if (a) {
    const t = a.querySelectorAll(".card");
    t.length >= 2 ? t[1].insertAdjacentElement("afterend", e) : a.appendChild(e)
  }
  preencherSelectPR()
}

function preencherSelectPR() {
  const e = document.getElementById("prChartSelect");
  e && (e.innerHTML = dados.exercicios.map(e => `<option value="${e.id}">${e.nome}</option>`).join(""), dados.exercicios.length && renderGraficoPR(dados.exercicios[0].id))
}

async function carregarMetas() {
  try {
    const e = await getItem("gtg_metas") || localStorage.getItem("gtg_metas");
    e && (dados.metas = JSON.parse(e))
  } catch (e) {
    dados.metas = {}
  }
}

function salvarMetas() {
  setItem("gtg_metas", JSON.stringify(dados.metas || {})).catch(() => {})
}

function calcularProgressoMeta(e) {
  if (!dados.metas) return null;
  const a = dados.metas[e];
  if (!a || !a.valor) return null;
  const t = (new Date).toISOString().slice(0, 10),
    o = getInicioSemana(t),
    r = t.slice(0, 7) + "-01";
  let s;
  s = "dia" === a.periodo ? t : "semana" === a.periodo ? o : r;
  const n = dados.registros.filter(a => a.exercicioId === e && a.data >= s && !a.isTest);
  let i;
  return i = "series" === a.tipo ? n.length : n.reduce((e, a) => e + (a.valor || 0), 0), {
    atual: i,
    meta: a.valor,
    pct: Math.min(100, Math.round(i / a.valor * 100)),
    periodo: a.periodo,
    tipo: a.tipo
  }
}

function atualizarBarrasMeta() {
  dados.metas && dados.exercicios.forEach(e => {
    const a = document.getElementById("meta-wrap-" + e.id);
    if (!a) return;
    const t = calcularProgressoMeta(e.id);
    if (!t) return void(a.style.display = "none");
    a.style.display = "block";
    const o = document.getElementById("meta-label-" + e.id),
      r = document.getElementById("meta-fill-" + e.id),
      s = document.getElementById("meta-pct-" + e.id),
      n = {
        dia: "HOJE",
        semana: "SEMANA",
        mes: "MÊS"
      } [t.periodo],
      i = "series" === t.tipo ? "séries" : "tempo" === e.tipo ? "seg" : "reps";
    o && (o.textContent = `${t.atual}/${t.meta} ${i} (${n})`), s && (s.textContent = t.pct + "%"), r && (r.style.width = t.pct + "%", r.style.background = t.pct >= 100 ? "linear-gradient(90deg,#2D7A2D,#44CC44)" : t.pct >= 60 ? "linear-gradient(90deg,var(--gold-dim),var(--gold))" : "linear-gradient(90deg,var(--red-dark),var(--red))")
  })
}

function abrirModalMeta(e) {
  const a = dados.exercicios.find(a => a.id === e);
  if (!a) return;
  const t = (dados.metas || {})[e] || {
      tipo: "series",
      valor: "",
      periodo: "dia"
    },
    o = "tempo" === a.tipo ? `<option value="series" ${"series"===t.tipo?"selected":""}>Séries</option><option value="reps" ${"reps"===t.tipo?"selected":""}>Segundos</option>` : `<option value="series" ${"series"===t.tipo?"selected":""}>Séries</option><option value="reps" ${"reps"===t.tipo?"selected":""}>Reps</option>`;
  let r = document.getElementById("metaModal");
  r || (r = document.createElement("div"), r.id = "metaModal", r.className = "modal-overlay", r.innerHTML = '\n      <div class="modal" style="max-width:340px;">\n        <div class="modal-header">\n          <span class="modal-title" id="metaModalTitle">🎯 DEFINIR META</span>\n          <button class="modal-close" onclick="document.getElementById(\'metaModal\').classList.remove(\'active\')">✕</button>\n        </div>\n        <div class="modal-body" id="metaModalBody"></div>\n      </div>', document.body.appendChild(r)), document.getElementById("metaModalTitle").textContent = "🎯 META — " + a.nome, document.getElementById("metaModalBody").innerHTML = `\n    <div class="form-group" style="margin-bottom:12px;">\n      <label class="form-label">Tipo de meta</label>\n      <select class="form-select" id="metaTipo" style="width:100%;">${o}</select>\n    </div>\n    <div class="form-group" style="margin-bottom:12px;">\n      <label class="form-label">Quantidade</label>\n      <input type="number" class="form-input" id="metaValor" style="width:100%;" value="${t.valor}" placeholder="Ex: 10" min="1">\n    </div>\n    <div class="form-group" style="margin-bottom:16px;">\n      <label class="form-label">Período</label>\n      <select class="form-select" id="metaPeriodo" style="width:100%;">\n        <option value="dia" ${"dia"===t.periodo?"selected":""}>Por dia</option>\n        <option value="semana" ${"semana"===t.periodo?"selected":""}>Por semana</option>\n        <option value="mes" ${"mes"===t.periodo?"selected":""}>Por mês</option>\n      </select>\n    </div>\n    <div style="display:flex;gap:8px;">\n      <button class="btn btn-red" style="flex:1;" onclick="salvarMeta('${e}')">✓ SALVAR META</button>\n      <button class="btn btn-outline" onclick="removerMeta('${e}')">✕ REMOVER</button>\n    </div>\n  `, r.classList.add("active")
}

function salvarMeta(e) {
  const a = document.getElementById("metaTipo").value,
    t = parseInt(document.getElementById("metaValor").value),
    o = document.getElementById("metaPeriodo").value;
  !t || t < 1 ? mostrarToast("Erro", "Insira um valor válido", "error") : (dados.metas || (dados.metas = {}), dados.metas[e] = {
    tipo: a,
    valor: t,
    periodo: o
  }, salvarMetas(), document.getElementById("metaModal").classList.remove("active"), atualizarBarrasMeta(), mostrarToast("🎯 Meta definida", "Acompanhe o progresso no card do exercício.", "success"))
}

function removerMeta(e) {
  dados.metas && delete dados.metas[e], salvarMetas(), document.getElementById("metaModal").classList.remove("active"), atualizarBarrasMeta(), mostrarToast("Meta removida", "", "success")
}

function confirmarAcao(e, a, t) {
  let o = document.getElementById("confirmModal");
  o || (o = document.createElement("div"), o.id = "confirmModal", o.className = "modal-overlay", o.innerHTML = '\n      <div class="modal" style="max-width:320px;">\n        <div class="modal-header" style="border-bottom:1px solid rgba(204,0,0,0.3);">\n          <span class="modal-title" id="confirmMsg" style="color:var(--red-bright);"></span>\n        </div>\n        <div class="modal-body">\n          <div id="confirmSub" class="text-mono" style="font-size:12px; color:var(--gray-light); margin-bottom:16px;"></div>\n          <div style="display:flex; gap:10px;">\n            <button class="btn btn-red" style="flex:1;" id="confirmSimBtn">✓ CONFIRMAR</button>\n            <button class="btn btn-outline" style="flex:1;" onclick="document.getElementById(\'confirmModal\').classList.remove(\'active\')">✕ CANCELAR</button>\n          </div>\n        </div>\n      </div>', document.body.appendChild(o)), document.getElementById("confirmMsg").textContent = e, document.getElementById("confirmSub").textContent = a || "";
  document.getElementById("confirmSimBtn").onclick = () => {
    o.classList.remove("active"), t()
  }, o.classList.add("active")
}

function copiarTreinoDia() {
  const e = (new Date).toISOString().slice(0, 10),
    a = dados.registros.filter(a => a.data === e && !a.isTest).sort((e, a) => e.timestamp - a.timestamp);
  if (0 === a.length) return void mostrarToast("Sem treino hoje", "Nenhuma série registrada hoje ainda.", "error");
  const t = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][(new Date).getDay()],
    o = new Date(e + "T12:00:00").toLocaleDateString("pt-BR");
  let r = `🏋️ GTG TRACKER — ${t.toUpperCase()}, ${o}\n`;
  r += `${"─".repeat(36)}\n`;
  const s = {};
  a.forEach(e => {
    s[e.exercicioId] || (s[e.exercicioId] = {
      nome: e.exercicioNome,
      series: []
    }), s[e.exercicioId].series.push(e)
  }), Object.values(s).forEach(({
    nome: e,
    series: a
  }) => {
    const t = dados.exercicios.find(a => a.nome === e),
      o = "tempo" === t?.tipo ? "seg" : "reps",
      s = a.reduce((e, a) => e + (a.valor || 0), 0);
    r += `\n★ ${e}\n`, a.forEach((e, a) => {
      r += `  Série ${a+1}: ${e.valor} ${o}${e.peso?` @ ${e.peso}kg`:""}${e.rpe?` (RPE ${e.rpe})`:""}\n`
    }), r += `  Total: ${a.length} séries · ${s} ${o}\n`
  });
  const n = a.reduce((e, a) => e + (a.xp || 0), 0);
  r += `\n${"─".repeat(36)}\n`, r += `${a.length} séries · +${n} XP · Streak ${streakData.atual} dias 🔥\n`, r += "\n#GTG #GreaTheGroove #Pavel", navigator.clipboard.writeText(r).then(() => {
    mostrarToast("📋 Copiado!", "Treino do dia copiado. Cole no WhatsApp, Telegram ou onde quiser.", "success")
  }).catch(() => {
    const e = document.createElement("textarea");
    e.value = r, e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), mostrarToast("📋 Copiado!", "Treino do dia copiado para a área de transferência.", "success")
  })
}

function exportCSV() {
  const e = [...dados.registros].sort((e, a) => e.timestamp - a.timestamp).map(e => {
    const a = dados.exercicios.find(a => a.id === e.exercicioId),
      t = "tempo" === a?.tipo ? "seg" : a?.unidade || "reps";
    return [e.data || "", e.hora || "", `"${(e.exercicioNome||"").replace(/"/g,'""')}"`, e.exercicioId || "", a?.tipo || "", e.valor || 0, t, e.peso || 0, e.xp || 0, e.rpe || "", e.isTest ? "sim" : "nao"].join(",")
  });
  downloadFile("\ufeff" + [
    ["Data", "Hora", "Exercício", "ID", "Tipo", "Valor", "Unidade", "Peso (kg)", "XP", "RPE", "Teste"].join(","), ...e
  ].join("\n"), "gtg_historico.csv", "text/csv;charset=utf-8"), mostrarToast("CSV exportado", `${e.length} registros exportados. Abra no Excel ou Google Sheets.`, "success")
}

function mostrarModalAtalhos() {
  let e = document.getElementById("atalhoModal");
  e || (e = document.createElement("div"), e.id = "atalhoModal", e.className = "modal-overlay", e.innerHTML = `\n      <div class="modal" style="max-width:460px;">\n        <div class="modal-header">\n          <span class="modal-title">⌨ ATALHOS DE TECLADO</span>\n          <button class="modal-close" onclick="document.getElementById('atalhoModal').classList.remove('active')">✕</button>\n        </div>\n        <div class="modal-body" style="padding:0;">\n          <table style="width:100%; border-collapse:collapse; font-family:'Rajdhani',sans-serif;">\n            ${[["NAVEGAÇÃO","",""],["1 – 6","Ir para aba (Treino, Progresso, Badges, Histórico, Método, Exportar)",""],["T","Ir para aba Treino",""],["P","Ir para Progresso",""],["H","Ir para Histórico",""],["TIMER","",""],["Espaço","Iniciar / Pausar timer",""],["Esc","Parar e salvar timer",""],["GERAL","",""],["F","Toggle Modo Foco",""],["?","Esta janela de atalhos",""]].map(([e,a,t])=>e!==e.toUpperCase()||a?`\n              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">\n                <td style="padding:8px 20px; width:90px;">\n                  <kbd style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; padding:2px 8px; font-family:'Share Tech Mono',monospace; font-size:12px; color:var(--white);">${e}</kbd>\n                </td>\n                <td style="padding:8px 20px; color:var(--white-dim); font-size:14px;">${a}</td>\n              </tr>\n            `:`\n              <tr><td colspan="2" style="padding:10px 20px 4px; font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:3px; color:var(--gold-dim); background:rgba(212,160,23,0.05); border-top:1px solid rgba(212,160,23,0.15);">${e}</td></tr>\n            `).join("")}\n          </table>\n          <div style="padding:12px 20px; border-top:1px solid rgba(255,255,255,0.06);">\n            <div class="text-mono" style="font-size:10px; color:var(--gray);">Atalhos desativados quando um campo de texto está em foco.</div>\n          </div>\n        </div>\n      </div>`, document.body.appendChild(e)), e.classList.add("active")
}document.addEventListener("keydown", e => {
  ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) || "?" === e.key && mostrarModalAtalhos()
}, !0);
const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"],
  DIAS_COMPLETOS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
let planejador = {};

async function carregarPlanejador() {
  try {
    const e = await getItem("gtg_planejador") || localStorage.getItem("gtg_planejador");
    planejador = e ? JSON.parse(e) : {}
  } catch (e) {
    planejador = {}
  }
}

function salvarPlanejador() {
  setItem("gtg_planejador", JSON.stringify(planejador)).catch(() => {})
}

function renderPlanejador() {
  carregarPlanejador();
  const e = document.getElementById("planejadorGrid");
  if (!e) return;
  const a = (new Date).getDay();
  e.innerHTML = DIAS_SEMANA.map((e, t) => {
    const o = planejador[t] || [],
      r = t === a,
      s = r ? "border:1.5px solid var(--gold); background:rgba(212,160,23,0.06);" : "border:1px solid rgba(255,255,255,0.08);",
      n = o.map(e => {
        const a = dados.exercicios.find(a => a.id === e);
        return a ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n        <span style="font-family:Rajdhani,sans-serif;font-size:13px;color:var(--white-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:105px;">${a.nome}</span>\n        <button onclick="removerDoPlanejador(${t},'${e}')" style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:10px;padding:0 2px;flex-shrink:0;">x</button>\n      </div>` : ""
      }).join(""),
      i = 0 === o.length ? '<div style="color:var(--gray);font-family:Share Tech Mono,monospace;font-size:10px;text-align:center;padding:8px 0;">DESCANSO</div>' : "";
    return `<div style="${s}border-radius:4px;padding:12px;position:relative;">\n      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">\n        <span style="font-family:Bebas Neue,sans-serif;font-size:15px;letter-spacing:2px;color:${r?"var(--gold)":"var(--white)"};">${e}${r?" ★":""}</span>\n        <button onclick="abrirSeletorExercicio(${t})" style="background:rgba(255,255,255,0.08);border:none;color:var(--white);border-radius:2px;width:20px;height:20px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;padding:0;">+</button>\n      </div>\n      <div id="plano-dia-${t}">${n}${i}</div>\n    </div>`
  }).join(""), renderPlanoHoje()
}

function renderPlanoHoje() {
  const e = (new Date).getDay(),
    a = document.getElementById("planejadorHojeCard"),
    t = document.getElementById("planejadorHojeBody"),
    o = document.getElementById("planejadorHojeTitle");
  if (!a || !t) return;
  const r = planejador[e] || [];
  if (0 === r.length) return void(a.style.display = "none");
  a.style.display = "", o && (o.textContent = "🎯 PLANO DE " + DIAS_SEMANA[e] + " — " + DIAS_COMPLETOS[e].toUpperCase());
  const s = (new Date).toISOString().slice(0, 10);
  t.innerHTML = r.map(e => {
    const a = dados.exercicios.find(a => a.id === e);
    if (!a) return "";
    const t = dados.registros.filter(a => a.exercicioId === e && a.data === s).length,
      o = (dados.metas || {})[e],
      r = o ? " · Meta: " + o.valor + " " + ("series" === o.tipo ? "series" : "reps") : "";
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:${t>0?"rgba(45,122,45,0.15)":"rgba(255,255,255,0.03)"};border:1px solid ${t>0?"rgba(68,204,68,0.3)":"rgba(255,255,255,0.08)"};border-radius:4px;margin-bottom:8px;">\n      <div>\n        <div style="font-family:Bebas Neue,sans-serif;font-size:16px;letter-spacing:1px;">${a.nome}</div>\n        <div class="text-mono" style="font-size:10px;color:var(--gray-light);">${t} serie(s) hoje${r}</div>\n      </div>\n      <div style="display:flex;gap:8px;align-items:center;">\n        ${t>0?'<span style="color:var(--green-bright);font-size:18px;">✓</span>':""}\n        <button class="btn btn-outline btn-sm" onclick="document.querySelector('.nav-tab[data-tab=treino]').click();setTimeout(()=>document.getElementById('excard-${e}')?.scrollIntoView({behavior:'smooth',block:'center'}),300);">IR →</button>\n      </div>\n    </div>`
  }).join("")
}

function abrirSeletorExercicio(e) {
  let a = document.getElementById("seletorExModal");
  a || (a = document.createElement("div"), a.id = "seletorExModal", a.className = "modal-overlay", a.innerHTML = '<div class="modal" style="max-width:380px;"><div class="modal-header"><span class="modal-title" id="seletorExTitle">ADICIONAR</span><button class="modal-close" onclick="document.getElementById(\'seletorExModal\').classList.remove(\'active\')">x</button></div><div class="modal-body" style="padding:0;max-height:400px;overflow-y:auto;" id="seletorExBody"></div></div>', document.body.appendChild(a)), document.getElementById("seletorExTitle").textContent = "+ " + DIAS_COMPLETOS[e].toUpperCase();
  const t = planejador[e] || [];
  document.getElementById("seletorExBody").innerHTML = dados.exercicios.map(a => {
    const o = t.includes(a.id);
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.05);${o?"opacity:0.4;":""}">\n      <span style="font-family:Rajdhani,sans-serif;font-size:15px;">${a.nome}</span>\n      <button class="btn btn-sm ${o?"btn-outline":"btn-red"}" ${o?"disabled":'onclick="adicionarAoPlanejador('+e+",'"+a.id+"')\""}>\n        ${o?"✓ JA ADD":"+ ADD"}\n      </button>\n    </div>`
  }).join(""), a.classList.add("active")
}

function adicionarAoPlanejador(e, a) {
  planejador[e] || (planejador[e] = []), planejador[e].includes(a) || planejador[e].push(a), salvarPlanejador(), document.getElementById("seletorExModal").classList.remove("active"), renderPlanejador();
  const t = dados.exercicios.find(e => e.id === a);
  mostrarToast("📅 Adicionado", (t ? t.nome : a) + " adicionado ao " + DIAS_COMPLETOS[e] + ".", "success")
}

function removerDoPlanejador(e, a) {
  planejador[e] && (planejador[e] = planejador[e].filter(e => e !== a), salvarPlanejador(), renderPlanejador())
}

function limparPlanejador() {
  confirmarAcao("LIMPAR SEMANA?", "Remove todos os exercicios do planejador semanal.", () => {
    planejador = {}, salvarPlanejador(), renderPlanejador(), mostrarToast("Planejador limpo", "", "success")
  })
}

function irParaTreinoHoje() {
  document.querySelector('.nav-tab[data-tab="treino"]')?.click()
}

function aplicarTema(e) {
  document.documentElement.setAttribute("data-theme", e), setItem("gtg_tema", e).catch(() => {});
  const a = document.getElementById("themeSwitchBtn");
  a && (a.textContent = "light" === e ? "☀" : "🌙", a.style.borderColor = "light" === e ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.15)", a.style.color = "light" === e ? "#1A1208" : "inherit")
}

function toggleTheme() {
  aplicarTema("light" === (document.documentElement.getAttribute("data-theme") || "dark") ? "dark" : "light")
}

function carregarTema() {
  const saved = localStorage.getItem("gtg_tema") || "dark";
  aplicarTema(saved);
  getItem("gtg_tema").then(v => { if (v !== null) aplicarTema(v) }).catch(() => {})
}
carregarTema();
let _notaData = (new Date).toISOString().slice(0, 10),
  _notaTimer = null;

async function carregarNotas() {
  try {
    const raw = await getItem("gtg_notas") || localStorage.getItem("gtg_notas");
    return JSON.parse(raw || "{}")
  } catch (e) {
    return {}
  }
}

async function salvarNotaDia() {
  const e = await carregarNotas(),
    a = document.getElementById("notaDiaria")?.value || "";
  a.trim() ? e[_notaData] = a : delete e[_notaData], setItem("gtg_notas", JSON.stringify(e)).catch(() => {});
  const t = document.getElementById("notaSalvoLabel");
  t && (t.textContent = "Salvo automaticamente", setTimeout(() => {
    t.textContent = ""
  }, 2e3))
}

function renderNotaDia() {
  const e = carregarNotas(),
    a = document.getElementById("notaDiaria"),
    t = document.getElementById("notaDataLabel"),
    o = document.getElementById("notaProxBtn"),
    r = (new Date).toISOString().slice(0, 10);
  if (a && (a.value = e[_notaData] || ""), t) {
    const e = new Date(_notaData + "T12:00:00"),
      a = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    t.textContent = a[e.getDay()] + ", " + e.toLocaleDateString("pt-BR")
  }
  o && (o.disabled = _notaData >= r)
}

function navegarNota(e) {
  const a = new Date(_notaData + "T12:00:00");
  a.setDate(a.getDate() + e);
  const t = (new Date).toISOString().slice(0, 10),
    o = a.toISOString().slice(0, 10);
  o > t || (_notaData = o, renderNotaDia())
}

function renderRanking() {
  const e = document.getElementById("rankingContainer");
  if (!e) return;
  const a = document.getElementById("rankingMetrica")?.value || "volume",
    t = dados.exercicios.map(e => {
      const t = dados.registros.filter(a => a.exercicioId === e.id && !a.isTest);
      let o = 0;
      if ("volume" === a) o = t.reduce((e, a) => e + (a.valor || 0), 0);
      else if ("series" === a) o = t.length;
      else if ("consistencia" === a) o = new Set(t.map(e => e.data)).size;
      else if ("pr" === a) {
        const e = t.filter(e => e.timestamp > Date.now() - 2592e6);
        o = e.length ? Math.max(...e.map(e => e.valor || 0)) : 0
      }
      return {
        ex: e,
        score: o,
        regs: t
      }
    }).filter(e => e.score > 0).sort((e, a) => a.score - e.score);
  if (!t.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center;padding:20px;color:var(--gray-light);">Sem dados suficientes. Continue treinando!</div>');
  const o = t[0].score,
    r = ["🥇", "🥈", "🥉"],
    s = {
      volume: "total",
      series: "séries",
      consistencia: "dias",
      pr: "PR recente"
    };
  e.innerHTML = t.slice(0, 8).map((e, t) => {
    const n = Math.round(e.score / o * 100);
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n      <div style="width:28px;text-align:center;font-size:16px;flex-shrink:0;">${r[t]||`<span style="font-family:Bebas Neue,sans-serif;font-size:13px;color:var(--gray-light);">#${t+1}</span>`}</div>\n      <div style="flex:1;min-width:0;">\n        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">\n          <span style="font-family:Rajdhani,sans-serif;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.ex.nome}</span>\n          <span class="text-mono" style="font-size:11px;color:var(--gold);flex-shrink:0;margin-left:8px;">${e.score} ${s[a]}</span>\n        </div>\n        <div style="height:5px;background:rgba(255,255,255,0.07);border-radius:1px;overflow:hidden;">\n          <div style="height:100%;width:${n}%;background:${0===t?"linear-gradient(90deg,var(--gold-dim),var(--gold))":1===t?"linear-gradient(90deg,var(--gray),var(--gray-light))":"linear-gradient(90deg,var(--red-dark),var(--red))"};border-radius:1px;transition:width 0.6s ease;"></div>\n        </div>\n      </div>\n    </div>`
  }).join("")
}
let _volumeChart = null;

function renderVolumeChart() {
  if (!dados.registros || dados.registros.length === 0) {
    _volumeChart && _volumeChart.destroy();
    return
  }
  const e = document.getElementById("volumeWeekChart");
  if (!e) return;
  const a = document.getElementById("volumeMetrica")?.value || "series",
    t = [],
    o = new Date;
  for (let e = 11; e >= 0; e--) {
    const a = new Date(o);
    a.setDate(a.getDate() - 7 * e), t.push(getInicioSemana(a.toISOString().slice(0, 10)))
  }
  const r = t.map(e => {
      const a = new Date(e + "T12:00:00");
      return `${String(a.getDate()).padStart(2,"0")}/${String(a.getMonth()+1).padStart(2,"0")}`
    }),
    s = t.map((e, r) => {
      const s = r < t.length - 1 ? t[r + 1] : new Date(o.getTime() + 864e5).toISOString().slice(0, 10),
        n = dados.registros.filter(a => a.data >= e && a.data < s && !a.isTest);
      return "series" === a ? n.length : "reps" === a ? n.reduce((e, a) => e + (a.valor || 0), 0) : "xp" === a ? n.reduce((e, a) => e + (a.xp || 0), 0) : 0
    }),
    n = {
      series: "séries",
      reps: "reps/seg",
      xp: "XP"
    };
  _volumeChart && _volumeChart.destroy(), _volumeChart = new Chart(e, {
    type: "bar",
    data: {
      labels: r,
      datasets: [{
        label: n[a] + " por semana",
        data: s,
        backgroundColor: s.map((e, a) => a === s.length - 1 ? "rgba(212,160,23,0.7)" : "rgba(204,0,0,0.6)"),
        borderColor: s.map((e, a) => a === s.length - 1 ? cssVar("--gold") : cssVar("--accent-red")),
        borderWidth: 1,
        borderRadius: 2
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          callbacks: {
            label: e => ` ${e.parsed.y} ${n[a]}`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#666",
            font: {
              size: 10
            }
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          }
        },
        y: {
          ticks: {
            color: "#666"
          },
          grid: {
            color: "rgba(255,255,255,0.04)"
          },
          beginAtZero: !0
        }
      }
    }
  })
}

const PESO_KEY = "gtg_peso";
let _pesoChart = null;

async function getPesoData() {
  try {
    const raw = await getItem(PESO_KEY) || localStorage.getItem(PESO_KEY);
    return JSON.parse(raw || "{}")
  } catch (e) { return {} }
}

async function salvarPeso() {
  const dataEl = document.getElementById("pesoData"),
    valEl = document.getElementById("pesoValor");
  if (!dataEl || !valEl) return;
  const data = dataEl.value || new Date().toISOString().slice(0, 10),
    valor = parseFloat(valEl.value);
  if (!valor || valor < 20 || valor > 300) return void mostrarToast("Erro", "Insira um peso válido (20-300 kg)", "error");
  const pesos = await getPesoData();
  pesos[data] = valor;
  setItem(PESO_KEY, JSON.stringify(pesos)).catch(() => {});
  valEl.value = "";
  await renderPesoChart();
  mostrarToast("Peso registrado", `${data}: ${valor} kg`, "success")
}

async function renderPesoChart() {
  const e = document.getElementById("pesoChart");
  if (!e) return;
  const pesos = await getPesoData(),
    sorted = Object.keys(pesos).sort(),
    recentes = sorted.slice(-60);
  if (recentes.length < 1) {
    document.getElementById("pesoStats").textContent = "Nenhum registro de peso ainda. Adicione seu peso acima.";
    return
  }
  const labels = recentes.map(d => { const dt = new Date(d + "T12:00:00"); return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}` }),
    values = recentes.map(d => pesos[d]),
    min = Math.min(...values),
    max = Math.max(...values);
  _pesoChart && _pesoChart.destroy();
  _pesoChart = new Chart(e, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Peso (kg)",
        data: values,
        borderColor: cssVar("--gold"),
        backgroundColor: "rgba(212,160,23,0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: cssVar("--gold"),
        pointBorderColor: cssVar("--bg-dark"),
        pointBorderWidth: 1,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: e => ` ${e.parsed.y} kg`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#666", font: { size: 9 }, maxTicksLimit: 10 },
          grid: { color: "rgba(255,255,255,0.04)" }
        },
        y: {
          ticks: { color: "#666" },
          grid: { color: "rgba(255,255,255,0.04)" },
          min: Math.floor(min - 2),
          max: Math.ceil(max + 2)
        }
      }
    }
  });
  const atual = values[values.length - 1],
    primeiro = values[0],
    diff = (atual - primeiro).toFixed(1),
    seta = diff > 0 ? "↑" : diff < 0 ? "↓" : "—",
    cor = diff > 0 ? "var(--green-bright)" : diff < 0 ? "var(--red-bright)" : "var(--gray-light)";
  document.getElementById("pesoStats").innerHTML =
    `Último: <strong>${atual} kg</strong> &nbsp;|&nbsp; Média: <strong>${(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1)} kg</strong> &nbsp;|&nbsp; Variação: <span style="color:${cor}">${seta} ${Math.abs(diff)} kg</span> &nbsp;|&nbsp; ${recentes.length} registro(s)`
}

function calcularStreakExercicio(e) {
  const a = new Set(dados.registros.filter(a => a.exercicioId === e).map(e => e.data || (e.timestamp ? new Date(e.timestamp).toISOString().slice(0, 10) : null)).filter(Boolean));
  if (0 === a.size) return 0;
  let t = 0;
  const o = new Date,
    r = o.toISOString().slice(0, 10);
  for (a.has(r) || o.setDate(o.getDate() - 1);;) {
    const e = o.toISOString().slice(0, 10);
    if (!a.has(e)) break;
    t++, o.setDate(o.getDate() - 1)
  }
  return t
}

function renderCompararSemanas() {
  const e = document.getElementById("compararSemanasContainer");
  if (!e) return;
  const a = getInicioSemana((new Date).toISOString().slice(0, 10)),
    t = getInicioSemana(new Date(new Date(a + "T12:00:00").getTime() - 864e5).toISOString().slice(0, 10)),
    o = dados.registros.filter(e => e.data >= a && !e.isTest),
    r = dados.registros.filter(e => e.data >= t && e.data < a && !e.isTest),
    s = [...new Set([...o, ...r].map(e => e.exercicioId))];
  if (0 === s.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center;padding:20px;color:var(--gray-light);">Sem dados suficientes ainda.</div>');
  const n = s.map(e => {
      const a = dados.exercicios.find(a => a.id === e),
        t = a ? a.nome : e,
        s = o.filter(a => a.exercicioId === e).length,
        n = r.filter(a => a.exercicioId === e).length,
        i = o.filter(a => a.exercicioId === e).reduce((e, a) => e + (a.valor || 0), 0),
        d = r.filter(a => a.exercicioId === e).reduce((e, a) => e + (a.valor || 0), 0),
        c = s - n,
        l = i - d,
        m = l > 0 ? "var(--green-bright)" : l < 0 ? "var(--red-bright)" : "var(--gray-light)",
        u = e => e > 0 ? "▲" : e < 0 ? "▼" : "—";
      return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:8px 12px;font-family:Rajdhani,sans-serif;font-size:13px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${n}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${s}</td>\n      <td style="padding:8px 12px;text-align:center;color:${c>0?"var(--green-bright)":c<0?"var(--red-bright)":"var(--gray-light)"};" class="text-mono">${u(c)}${Math.abs(c)||"—"}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${d}</td>\n      <td style="padding:8px 12px;text-align:center;" class="text-mono">${i}</td>\n      <td style="padding:8px 12px;text-align:center;color:${m};" class="text-mono">${u(l)}${Math.abs(l)||"—"}</td>\n    </tr>`
    }).join(""),
    i = "padding:6px 12px;text-align:center;font-family:Bebas Neue,sans-serif;font-size:11px;letter-spacing:2px;color:var(--gold-dim);background:rgba(212,160,23,0.06);";
  e.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:12px;">\n    <thead>\n      <tr>\n        <th style="${i}text-align:left;">EXERCÍCIO</th>\n        <th style="${i}" colspan="2">SÉRIES</th>\n        <th style="${i}">±</th>\n        <th style="${i}" colspan="2">VOLUME</th>\n        <th style="${i}">±</th>\n      </tr>\n      <tr style="background:rgba(255,255,255,0.02);">\n        <td style="padding:4px 12px;"></td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gray-light);" class="text-mono">ANT.</td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gold);" class="text-mono">ESTA</td>\n        <td></td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gray-light);" class="text-mono">ANT.</td>\n        <td style="padding:4px 12px;text-align:center;font-size:10px;color:var(--gold);" class="text-mono">ESTA</td>\n        <td></td>\n      </tr>\n    </thead>\n    <tbody>${n}</tbody>\n  </table>`
}

function mostrarResumoOntem() {
  const e = (new Date).toISOString().slice(0, 10);
  getItem("gtg_resumo_visto").then(visto => {
    if (visto === e) return;
    const a = new Date(Date.now() - 864e5).toISOString().slice(0, 10),
      t = dados.registros.filter(e => e.data === a && !e.isTest);
    if (0 === t.length) return;
    setItem("gtg_resumo_visto", e).catch(() => {});
    const o = t.reduce((e, a) => e + (a.xp || 0), 0),
      r = t.reduce((e, a) => e + (a.valor || 0), 0),
      s = {};
    t.forEach(e => {
      s[e.exercicioId] || (s[e.exercicioId] = {
        nome: e.exercicioNome,
        series: 0,
        reps: 0
      }), s[e.exercicioId].series++, s[e.exercicioId].reps += e.valor || 0
    });
    carregarNotas().then(notas => {
      const n = notas[a] || "",
        i = new Date(a + "T12:00:00"),
        d = document.getElementById("resumoOntemModal"),
        c = document.getElementById("resumoOntemTitle"),
        l = document.getElementById("resumoOntemBody");
      if (!d || !l) return;
      c.textContent = `📊 RESUMO — ${["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][i.getDay()].toUpperCase()}, ${i.toLocaleDateString("pt-BR")}`;
      const m = Object.values(s).map(e => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">\n      <span style="font-family:Rajdhani,sans-serif;font-size:14px;">${e.nome}</span>\n      <span class="text-mono" style="font-size:12px;color:var(--gold);">${e.series} séries · ${e.reps} vol</span>\n    </div>`).join("");
      l.innerHTML = `\n    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">\n      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--gold);">${t.length}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>\n      </div>\n      <div style="text-align:center;background:rgba(204,0,0,0.08);border:1px solid rgba(204,0,0,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--red-bright);">${r}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">VOLUME</div>\n      </div>\n      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">\n        <div style="font-family:Bebas Neue,sans-serif;font-size:24px;color:var(--green-bright);">+${o}</div>\n        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>\n      </div>\n    </div>\n    <div style="margin-bottom:12px;">${m}</div>\n    ${n?`<div style="background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;margin-bottom:12px;">\n      <div class="text-mono" style="font-size:10px;color:var(--gold-dim);margin-bottom:4px;">📝 SUA NOTA</div>\n      <div style="font-family:Rajdhani,sans-serif;font-size:14px;color:var(--white-dim);">${n}</div>\n    </div>`:""}\n    <button class="btn btn-red" style="width:100%;" onclick="document.getElementById('resumoOntemModal').classList.remove('active')">▶ TREINAR HOJE</button>\n  `, setTimeout(() => d.classList.add("active"), 1200)
    }).catch(() => {})
  }).catch(() => {})
}

function getFimSemana(dataStr) {
  const inicio = new Date(getInicioSemana(dataStr) + "T12:00:00");
  return new Date(inicio.getTime() + 6 * 864e5).toISOString().slice(0, 10)
}

function gerarRelatorioSemanal() {
  const hoje = (new Date).toISOString().slice(0, 10),
    segInicio = getInicioSemana(hoje),
    segFim = getFimSemana(hoje);
  const regs = dados.registros.filter(r => r.data >= segInicio && r.data <= segFim && !r.isTest),
    diasComTreino = new Set(regs.map(r => r.data)).size,
    totalSeries = regs.length,
    totalReps = regs.reduce((a, r) => a + (r.valor || 0), 0),
    totalXP = regs.reduce((a, r) => a + (r.xp || 0), 0);
  const agrupado = {};
  regs.forEach(r => {
    const key = r.exercicioNome || r.exercicioId || "?";
    agrupado[key] || (agrupado[key] = { series: 0, reps: 0 });
    agrupado[key].series++, agrupado[key].reps += r.valor || 0
  });
  const items = Object.entries(agrupado).sort((a, b) => b[1].series - a[1].series).slice(0, 8).map(([nome, st]) =>
    `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;">
      <span style="font-family:Rajdhani,sans-serif;">${nome}</span>
      <span class="text-mono" style="font-size:11px;color:var(--gold);">${st.series}s · ${st.reps} reps</span>
    </div>`
  ).join("");
  const badgesSemana = TODAS_BADGES.filter(b => badgesData.desbloqueadas.includes(b.id));
  const badgesHTML = badgesSemana.length
    ? badgesSemana.map(b => `<span style="display:inline-block;margin:3px 4px;padding:3px 8px;background:rgba(212,160,23,0.1);border:1px solid rgba(212,160,23,0.25);border-radius:4px;font-size:11px;">${b.icone} ${b.nome}</span>`).join("")
    : '<span class="text-mono" style="font-size:10px;color:var(--gray-light);">Nenhuma conquista nova esta semana</span>';
  const inicio = new Date(segInicio + "T12:00:00"),
    fim = new Date(segFim + "T12:00:00");
  const dataLabel = `${String(inicio.getDate()).padStart(2,"0")} ${["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][inicio.getMonth()]} — ${String(fim.getDate()).padStart(2,"0")} ${["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][fim.getMonth()]} ${fim.getFullYear()}`;
  return {
    dataLabel,
    totalSeries,
    totalReps: totalReps.toLocaleString("pt-BR"),
    totalXP: totalXP.toLocaleString("pt-BR"),
    diasComTreino,
    totalDias: 7,
    streak: streakData.atual,
    streakRec: streakData.recorde,
    itemsHTML: items || '<div class="text-mono" style="text-align:center;padding:16px;font-size:11px;color:var(--gray-light);">Nenhum registro nesta semana.</div>',
    badgesHTML
  }
}

function mostrarRelatorioSemanal() {
  const rel = gerarRelatorioSemanal(),
    d = document.getElementById("relSemanalModal"),
    t = document.getElementById("relSemanalTitle"),
    b = document.getElementById("relSemanalBody");
  if (!d || !b) return;
  t.textContent = `📊 RELATÓRIO SEMANAL`;
  b.innerHTML = `
    <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:2px;text-align:center;margin-bottom:12px;">${rel.dataLabel}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;">
      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--gold);">${rel.totalSeries}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>
      </div>
      <div style="text-align:center;background:rgba(204,0,0,0.08);border:1px solid rgba(204,0,0,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--red-bright);">${rel.totalReps}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">VOLUME</div>
      </div>
      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--green-bright);">+${rel.totalXP}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
      <div style="text-align:center;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:20px;color:var(--white-dim);">🔥 ${rel.streak}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">STREAK ATUAL</div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:20px;color:var(--white-dim);">📅 ${rel.diasComTreino}/7</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">DIAS TREINADOS</div>
      </div>
    </div>
    <div style="margin-bottom:12px;">${rel.itemsHTML}</div>
    <div style="margin-bottom:12px;">
      <div class="text-mono" style="font-size:10px;color:var(--gold-dim);margin-bottom:6px;letter-spacing:2px;">🏆 CONQUISTAS</div>
      <div style="text-align:center;">${rel.badgesHTML}</div>
    </div>
    <div style="margin-top:4px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--gray-light);text-align:center;letter-spacing:1px;">RECORDE STREAK: ${rel.streakRec} DIAS</div>
    <button class="btn btn-red" style="width:100%;margin-top:10px;" onclick="document.getElementById('relSemanalModal').classList.remove('active')">▶ FECHAR</button>
  `, setTimeout(() => d.classList.add("active"), 300)
}

function verificarRelatorioSemanal() {
  const hoje = (new Date).toISOString().slice(0, 10);
  getItem("gtg_semana_visto").then(visto => {
    if (visto === hoje) return;
    const segInicio = getInicioSemana(hoje);
    if (segInicio === visto) return;
    const regs = dados.registros.filter(r => r.data >= segInicio && r.data <= hoje && !r.isTest);
    if (regs.length < 1) return;
    setItem("gtg_semana_visto", hoje).catch(() => {});
    setTimeout(mostrarRelatorioSemanal, 2000)
  }).catch(() => {})
}

let _gtgTimers = {};

function iniciarTimerGTG(e) {
  pararTimerGTG(e);
  const a = Date.now() + 12e5,
    t = document.getElementById("gtg-timer-" + e),
    o = () => {
      const o = a - Date.now();
      if (o <= 0) return pararTimerGTG(e), somTimer(), void mostrarToast("⚡ GTG PRONTO!", `${dados.exercicios.find(a=>a.id===e)?.nome||e} — hora da próxima série!`, "success");
      const r = Math.floor(o / 6e4),
        s = Math.floor(o % 6e4 / 1e3);
      t && (t.style.display = "flex", t.textContent = `⏱ ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`, t.style.color = o < 6e4 ? "var(--green-bright)" : o < 3e5 ? "var(--gold)" : "var(--gray-light)")
    };
  o(), _gtgTimers[e] = {
    end: a,
    intervalId: setInterval(o, 1e3)
  }
}

function pararTimerGTG(e) {
  _gtgTimers[e] && (clearInterval(_gtgTimers[e].intervalId), delete _gtgTimers[e]);
  const a = document.getElementById("gtg-timer-" + e);
  a && (a.style.display = "none")
}
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
    e && e.active && (swRegistration = e, "granted" === Notification.permission && (e.active.postMessage("INICIAR_LEMBRETES"), document.getElementById("lembreteDesc").textContent = "✓ ATIVO — A CADA 20 MIN (BACKGROUND)", document.getElementById("btnAtivarLembrete").textContent = "✓ ATIVO", document.getElementById("btnAtivarLembrete").style.background = "rgba(45,122,45,0.3)", document.getElementById("btnAtivarLembrete").style.borderColor = "var(--green-bright)", document.getElementById("btnAtivarLembrete").style.color = "var(--green-bright)"))
  }), setupNavTabs(), inicializar();
  const audioBtn = document.getElementById("btnToggleAudio");
  audioBtn && (audioBtn.textContent = audioMuted ? "🔇" : "🔊")
});


/* === SESSÃO GTG — MODO COMPRIMIDO === */
let sessaoGTGState = null;

function atualizarSugestaoSessao() {
  const e = document.getElementById("sessionExSelect"),
    a = document.getElementById("sessionSugestao"),
    t = document.getElementById("sessionSerieValor");
  if (!e || !a) return;
  const o = dados.exercicios.find(a => a.id === e.value);
  if (!o) return void(a.textContent = "—");
  const r = calcularSugestaoGTG(calcularPR2(o), o.tipo),
    s = "tempo" === o.tipo ? "seg" : o.unidade || "reps";
  r ? (a.textContent = `${r} ${s} por série`, t && !t.value && (t.value = r, t.placeholder = String(r))) : a.textContent = "Sem histórico — defina manualmente"
}

function iniciarSessaoGTG() {
  const e = document.getElementById("sessionExSelect").value;
  if (!e) return void mostrarToast("Erro", "Selecione um exercício para a sessão.", "error");
  const a = dados.exercicios.find(a => a.id === e);
  if (!a) return;
  const t = parseInt(document.getElementById("sessionNumSeries").value) || 5,
    o = parseInt(document.getElementById("sessionSerieValor").value) || calcularSugestaoGTG(calcularPR2(a), a.tipo) || 1,
    r = parseInt(document.getElementById("sessionDescanso").value) || 900;
  if (t < 1) return void mostrarToast("Erro", "Número de séries inválido.", "error");
  sessaoGTGState = {
    exercicioId: e,
    exercicioNome: a.nome,
    tipo: a.tipo,
    unidade: "tempo" === a.tipo ? "seg" : a.unidade || "reps",
    totalSeries: t,
    valorPorSerie: o,
    descansoSeg: r,
    seriesFeitas: 0,
    fase: "pronta",
    intervalo: null,
    segundosRestantes: 0
  }, document.getElementById("sessionSetup").style.display = "none", document.getElementById("sessionProgress").style.display = "block", renderSessaoDots(), atualizarSessaoUI(), mostrarToast("🔗 SESSÃO INICIADA", `${a.nome} — ${t} séries de ${o} ${sessaoGTGState.unidade}`, "success")
}

function renderSessaoDots() {
  const e = document.getElementById("sessionSeriesDots");
  if (!e || !sessaoGTGState) return;
  e.innerHTML = "";
  for (let a = 0; a < sessaoGTGState.totalSeries; a++) {
    const t = document.createElement("div");
    t.style.cssText = "width:14px;height:14px;border-radius:50%;border:1px solid var(--gold-dim);" + (a < sessaoGTGState.seriesFeitas ? "background:var(--gold);box-shadow:0 0 8px rgba(212,160,23,.6);" : "background:transparent;"), e.appendChild(t)
  }
}

function atualizarSessaoUI() {
  if (!sessaoGTGState) return;
  const e = document.getElementById("sessionProgressTitle"),
    a = document.getElementById("sessionStateLabel"),
    t = document.getElementById("sessionTimerDisplay"),
    o = document.getElementById("sessionActionBtn");
  e && (e.textContent = `SÉRIE ${Math.min(sessaoGTGState.seriesFeitas+1,sessaoGTGState.totalSeries)} DE ${sessaoGTGState.totalSeries}`), "pronta" === sessaoGTGState.fase ? (a && (a.textContent = "PRONTO PARA REGISTRAR"), t && (t.textContent = "▶", t.style.color = "var(--gold)"), o && (o.disabled = !1, o.textContent = "✓ REGISTRAR SÉRIE AGORA")) : "descansando" === sessaoGTGState.fase && (a && (a.textContent = "DESCANSO — PRÓXIMA SÉRIE EM"), o && (o.disabled = !0, o.textContent = "⏳ AGUARDE O DESCANSO"))
}

function executarSerieSessao() {
  if (!sessaoGTGState || "pronta" !== sessaoGTGState.fase) return;
  const e = dados.exercicios.find(e => e.id === sessaoGTGState.exercicioId);
  if (!e) return void pararSessaoGTG();
  const a = document.getElementById(`valor-${e.id}`);
  a ? (a.value = sessaoGTGState.valorPorSerie, adicionarSerie(e.id)) : (() => {
    const a = new Date,
      t = {
        id: Date.now() + Math.random().toString(36).slice(2),
        exercicioId: e.id,
        exercicioNome: e.nome,
        valor: sessaoGTGState.valorPorSerie,
        peso: 0,
        data: a.toISOString().slice(0, 10),
        hora: a.toTimeString().slice(0, 5),
        timestamp: a.getTime(),
        xp: calcularXPSerie(e, sessaoGTGState.valorPorSerie, 0),
        rpe: null
      };
    dados.registros.push(t), adicionarXP(t.xp), verificarStreak(), verificarBadges(), salvarDados(), renderExercicios(), atualizarStats(), renderHistory(), somRegistrar()
  })(), sessaoGTGState.seriesFeitas++, renderSessaoDots(), mostrarToast(`✓ Série ${sessaoGTGState.seriesFeitas}/${sessaoGTGState.totalSeries}`, `${sessaoGTGState.valorPorSerie} ${sessaoGTGState.unidade} registrados`, "success"), sessaoGTGState.seriesFeitas >= sessaoGTGState.totalSeries ? concluirSessaoGTG() : iniciarDescansoSessao()
}

function iniciarDescansoSessao() {
  sessaoGTGState.fase = "descansando", sessaoGTGState.segundosRestantes = sessaoGTGState.descansoSeg, atualizarSessaoUI();
  const e = document.getElementById("sessionTimerDisplay");
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo), sessaoGTGState.intervalo = setInterval(() => {
    sessaoGTGState.segundosRestantes--;
    const a = Math.floor(sessaoGTGState.segundosRestantes / 60),
      t = sessaoGTGState.segundosRestantes % 60;
    e && (e.textContent = `${String(a).padStart(2,"0")}:${String(t).padStart(2,"0")}`, e.style.color = sessaoGTGState.segundosRestantes < 30 ? "var(--green-bright)" : "var(--gold)"), sessaoGTGState.segundosRestantes <= 0 && (clearInterval(sessaoGTGState.intervalo), sessaoGTGState.intervalo = null, sessaoGTGState.fase = "pronta", atualizarSessaoUI(), somTimer(), mostrarToast("⚡ DESCANSO CONCLUÍDO", "Hora da próxima série!", "success"))
  }, 1e3)
}

function concluirSessaoGTG() {
  sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo);
  const e = sessaoGTGState.exercicioNome,
    a = sessaoGTGState.totalSeries;
  mostrarToast("🏆 SESSÃO CONCLUÍDA", `${a} séries de ${e} completadas. Excelente trabalho!`, "success"), dispararConfetti(), sessaoGTGState = null, resetarPainelSessao()
}

function pararSessaoGTG() {
  sessaoGTGState && sessaoGTGState.intervalo && clearInterval(sessaoGTGState.intervalo), sessaoGTGState && sessaoGTGState.seriesFeitas > 0 && mostrarToast("Sessão encerrada", `${sessaoGTGState.seriesFeitas} série(s) registrada(s) antes de encerrar.`, "warning"), sessaoGTGState = null, resetarPainelSessao()
}

function resetarPainelSessao() {
  const e = document.getElementById("sessionSetup"),
    a = document.getElementById("sessionProgress");
  e && (e.style.display = "block"), a && (a.style.display = "none")
}

/* === CALENDÁRIO HEATMAP === */
const CAL_MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const CAL_DIAS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

let calState = { mes: new Date().getMonth(), ano: new Date().getFullYear() };

function renderCalendario() {
  const grid = document.getElementById("calGrid"), title = document.getElementById("calNavTitle");
  if (!grid) return;
  const { mes, ano } = calState;
  title.textContent = `${CAL_MESES[mes]} ${ano}`;
  const primeiro = new Date(ano, mes, 1).getDay(),
    diasNoMes = new Date(ano, mes + 1, 0).getDate(),
    hoje = new Date(),
    hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const dias = {};
  dados.registros.forEach(r => {
    if (r.data) {
      const [y, m, d] = r.data.split("-").map(Number);
      if (y === ano && m === mes + 1) dias[d] = (dias[d] || 0) + ((r.valor || 0) + (r.xp || 0))
    }
  });
  const maxVal = Math.max(...Object.values(dias), 1);
  let html = CAL_DIAS.map(d => `<div class="cal-day-header">${d}</div>`).join("");
  for (let i = 0; i < primeiro; i++) html += '<div class="cal-day cal-day-empty"></div>';
  for (let d = 1; d <= diasNoMes; d++) {
    const val = dias[d] || 0,
      nivel = val === 0 ? 0 : Math.min(5, Math.ceil(val / maxVal * 5)),
      hojeClass = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` === hojeStr ? " cal-day-today" : "";
    html += `<div class="cal-day cal-day-nivel-${nivel}${hojeClass}" onclick="mostrarDetalheDia(${ano},${mes},${d})">${d}</div>`
  }
  grid.innerHTML = html
}

function navegarCalendario(delta) {
  calState.mes += delta;
  if (calState.mes > 11) { calState.mes = 0; calState.ano++ }
  if (calState.mes < 0) { calState.mes = 11; calState.ano-- }
  renderCalendario()
}

function mostrarDetalheDia(ano, mes, dia) {
  const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
    regs = dados.registros.filter(r => r.data === data),
    modal = document.getElementById("calDetalheModal");
  if (!modal || !regs.length) return;
  document.getElementById("calDetalheTitle").textContent = `📆 ${dia} ${CAL_MESES[mes]} ${ano}`;
  const totalReps = regs.reduce((a, r) => a + (r.valor || 0), 0),
    totalXP = regs.reduce((a, r) => a + (r.xp || 0), 0),
    agrupado = {};
  regs.forEach(r => {
    const key = r.exercicioNome || r.exercicioId || "?";
    agrupado[key] || (agrupado[key] = { series: 0, reps: 0 });
    agrupado[key].series++, agrupado[key].reps += r.valor || 0
  });
  const items = Object.entries(agrupado).map(([nome, st]) =>
    `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="font-family:Rajdhani,sans-serif;font-size:14px;">${nome}</span>
      <span class="text-mono" style="font-size:12px;color:var(--gold);">${st.series}s &middot; ${st.reps} reps</span>
    </div>`
  ).join("");
  document.getElementById("calDetalheBody").innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
      <div style="text-align:center;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--gold);">${regs.length}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">SÉRIES</div>
      </div>
      <div style="text-align:center;background:rgba(45,122,45,0.08);border:1px solid rgba(45,122,45,0.2);border-radius:4px;padding:10px;">
        <div style="font-family:Bebas Neue,sans-serif;font-size:26px;color:var(--green-bright);">+${totalXP}</div>
        <div class="text-mono" style="font-size:9px;color:var(--gray-light);">XP</div>
      </div>
    </div>
    ${items}
    <div style="margin-top:12px;font-family:Share Tech Mono,monospace;font-size:10px;color:var(--gray-light);letter-spacing:1px;text-align:center;">VOLUME TOTAL: ${totalReps} reps</div>
  `, modal.classList.add("active")
}

