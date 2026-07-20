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
  }]

const SKILLTREE_TEMPO_EXERCICIOS = new Set([
  "prancha_lateral","prancha_elevacao","prancha_toque",
  "one_arm_hang","plate_pinch","farmers_walk",
  "dragon_flag","ab_wheel"
]);

function _sortExercicios() {
  var modo = document.getElementById("sortExercicios")?.value || "padrao";
  if (modo === "padrao") { setItem("gtg_ex_order", modo).catch(function(){}); return; }
  setItem("gtg_ex_order", modo).catch(function(){});
  dados.exercicios.sort(function(a, b) {
    if (modo === "az") return (a.nome || "").localeCompare(b.nome || "");
    // "recente" — usa timestamp do último registro
    var lastA = 0, lastB = 0;
    for (var i = 0; i < dados.registros.length; i++) {
      var r = dados.registros[i];
      if (r.exercicioId === a.id && r.timestamp > lastA) lastA = r.timestamp;
      if (r.exercicioId === b.id && r.timestamp > lastB) lastB = r.timestamp;
    }
    return lastB - lastA;
  });
}

function alterarOrdemExercicios() {
  _sortExercicios();
  salvarDados();
  renderExercicios();
}

function renderExercicios() {
  try {
    const e = document.getElementById("exerciseGrid");
    if (!e) return void console.error("Elemento exerciseGrid não encontrado");
    if (e.innerHTML = "", !dados.exercicios || 0 === dados.exercicios.length) return void(e.innerHTML = '<div class="text-mono" style="text-align:center; padding:30px; color:var(--gray-light);">Nenhum exercício encontrado. Adicione um exercício acima.</div>');
    _sortExercicios();
    const cardsHtml = dados.exercicios.map((a, idx) => {
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
      return `\n      <div class="exercise-card" id="excard-${a.id}" style="--i:${idx}">\n        <span class="hud-corner hud-corner-tl"></span><span class="hud-corner hud-corner-tr"></span><span class="hud-corner hud-corner-bl"></span><span class="hud-corner hud-corner-br"></span>\n        <div class="ex-noise"></div>\n        <div class="ex-corner-glow ex-corner-glow-tl"></div>\n        <div class="ex-corner-glow ex-corner-glow-br"></div>\n        <div class="exercise-card-header">\n          <div class="exercise-name">${escapeHtml(a.nome)}</div>\n          <div class="sugestao-gtg" id="sugestao-${a.id}" onclick="aplicarSugestaoGTG('${a.id}', event)">\n            <span class="bulb">💡</span>\n            <span class="gtg-val" id="gtg-val-${a.id}">GTG: --</span>\n            <span class="gtg-label">reps</span>\n            <div class="gtg-tooltip">\n              <strong style="color:var(--gold)">SÉRIE SUGERIDA — MÉTODO GTG</strong><br>\n              PR (30 dias): <span id="tooltip-pr-${a.id}">0</span> ${"tempo"===a.tipo?"seg":a.unidade||"reps"}<br>\n              Sugestão: 50% do máximo<br>\n              <em style="color:var(--gold-dim)">"Nunca vá ao fracasso" — Pavel</em>\n            </div>\n          </div>\n          <div class="exercise-card-actions">\n            <button class="btn-icon btn-meta" onclick="abrirModalMeta('${a.id}')">🎯</button>\n            <button class="btn-icon" onclick="mostrarInfoExercicio('${a.id}')" title="Informações">ℹ</button>\n            <button class="btn-icon danger" onclick="removerExercicio('${a.id}')" title="Remover">✕</button>\n            <div class="quality-badge-wrap" id="qbadge-wrap-${a.id}" style="display:inline-flex;align-items:center;gap:4px;margin-left:6px;"></div>\n          </div>\n        </div>\n        <div class="exercise-stats">\n          <div class="ex-stat">\n            <div class="ex-stat-val">${i}</div>\n            <div class="ex-stat-lbl">SÉRIES HOJE</div>\n          </div>\n          <div class="ex-stat">\n            <div class="ex-stat-val">${d}</div>\n            <div class="ex-stat-lbl">${"tempo"===a.tipo?"SEG HOJE":"REPS HOJE"}</div>\n          </div>\n          <div class="ex-stat">\n            <div class="ex-stat-val">${r}</div>\n            <div class="ex-stat-lbl">TOTAL SÉRIES</div>\n          </div>\n          <div class="ex-stat" title="Dias consecutivos treinando este exercício">\n            <div class="ex-stat-val" style="color:var(--gold);">${se}<span class="exercise-streak-fire${se>0?'':' no-streak'}">${se>0?'<span class="ex-streak-flame ex-streak-flame-1"></span><span class="ex-streak-flame ex-streak-flame-2"></span><span class="ex-streak-flame ex-streak-flame-3"></span>':'🎯'}</span></div>\n            <div class="ex-stat-lbl">STREAK DIAS</div>\n          </div>\n        </div>\n        <div class="pr-display">\n          <div>\n            <div class="pr-display-label">PR (30 DIAS)</div>\n            <div class="pr-display-val" id="pr-display-${a.id}">0 ${"tempo"===a.tipo?"seg":a.unidade||"reps"}</div>\n          </div>\n          <button class="test-max-btn" onclick="abrirTesteMaximo('${a.id}')">🎯 TESTAR MÁXIMO</button>\n        </div>\n        <div class="exercise-pr">\n          <span class="pr-label">PR ESTIMADO:</span>\n          <span class="pr-value">${n} ${"tempo"===a.tipo?"seg":a.unidade||"reps"}</span>\n          <span style="margin-left:auto; font-family:'Share Tech Mono',monospace; font-size:9px; color:var(--gray);">${s} total acum.</span>\n        </div>\n        <div class="exercise-details">\n          <div class="ex-detail-section">\n            <div class="details-header">ÚLTIMAS 3 SÉRIES (HOJE)</div>\n            <div class="recent-series-list" id="recent-series-${a.id}">\n              ${o.length > 0 ? o.slice(-3).reverse().map(r => '<span class="recent-set-item">' + r.valor + ' ' + ("tempo"===a.tipo?"seg":a.unidade||"reps") + (r.rpe ? ' · RPE ' + r.rpe : '') + (r.hora ? ' · ' + r.hora.slice(0,5) : '') + '</span>').join('') : '<span class="recent-set-empty">Nenhuma série hoje</span>'}\n            </div>\n          </div>\n          <div class="ex-detail-section">\n            <div class="details-header">PR 30 DIAS</div>\n            <div class="sparkline-container" id="sparkline-container-${a.id}">\n              ${gerarSVGSparkline(calcularSparklinePR(a.id, 30), 120, 30)}\n            </div>\n          </div>\n        </div>\n        <div class="rpe-avg-display" id="rpe-avg-${a.id}">\n          RPE MÉDIO HOJE: <span class="rpe-avg-val" id="rpe-avg-val-${a.id}">—</span>\n        </div>\n        <div class="exercise-add-form">\n          ${"peso"===a.tipo?`\n            <div class="form-group">\n              <label class="form-label">Peso (kg)</label>\n              <input type="number" class="form-input" id="peso-${a.id}" placeholder="0" min="0" step="0.5">\n            </div>`:""}\n          <div class="form-group">\n            <label class="form-label">${"tempo"===a.tipo?"Segundos":"Reps"}</label>\n            <input type="number" class="form-input" id="valor-${a.id}" placeholder="${"tempo"===a.tipo?"60":"10"}" min="1" autocomplete="off" onfocus="mostrarSugestoesValores('${a.id}')">\n            <div class="valor-suggestions" id="sug-${a.id}"></div>\n          </div>\n          <button class="btn btn-red" onclick="adicionarSerie('${a.id}')">+ REGISTRAR</button>\n          <button class="btn btn-outline btn-sm" onclick="abrirTimerDescanso('${a.id}')">⏱ DESCANSO</button>\n          ${"tempo"===a.tipo?'<button class="btn btn-outline btn-sm timer-trigger-btn" onclick="startPlankTimer(\'' + a.id + '\')">▶ TIMER</button>':''}\n          <div class="rpe-scale" id="rpe-scale-${a.id}">\n            <span class="rpe-label">RPE:</span>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',1)" aria-label="RPE 1">1</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',2)" aria-label="RPE 2">2</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',3)" aria-label="RPE 3">3</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',4)" aria-label="RPE 4">4</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',5)" aria-label="RPE 5">5</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',6)" aria-label="RPE 6">6</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',7)" aria-label="RPE 7">7</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',8)" aria-label="RPE 8">8</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',9)" aria-label="RPE 9">9</button>\n            <button class="rpe-btn" onclick="selecionarRPE('${a.id}',10)" aria-label="RPE 10">10</button>\n          </div>\n          <div class="rpe-warn" id="rpe-warn-${a.id}"></div>\n          <div class="groove-toggles" id="groove-toggles-${a.id}" style="flex-basis:100%;">
            <span class="groove-label">⚙ GROOVE</span>
            <div class="groove-slider" id="groove-amp-${a.id}" title="Amplitude completa: do topo ao fundo, sem truncar.">
              <span class="missile-switch__icon">🏋️</span>
              <input type="range" min="0" max="100" value="0" class="groove-range" oninput="setGrooveLevel('${a.id}', 0, this.value)">
              <span class="groove-lvl" id="groove-lvl-${a.id}-0">0</span>
              <span>AMP</span>
            </div>
            <div class="groove-slider" id="groove-ten-${a.id}" title="Tensão irradiante: contraia glúteos, abdômen e punhos antes de cada rep.">
              <span class="missile-switch__icon">⚡</span>
              <input type="range" min="0" max="100" value="0" class="groove-range" oninput="setGrooveLevel('${a.id}', 1, this.value)">
              <span class="groove-lvl" id="groove-lvl-${a.id}-1">0</span>
              <span>TEN</span>
            </div>
            <div class="groove-slider" id="groove-bal-${a.id}" title="Sem balanço/momentum: cada rep começa do zero, sem trapaça.">
              <span class="missile-switch__icon">✓</span>
              <input type="range" min="0" max="100" value="0" class="groove-range" oninput="setGrooveLevel('${a.id}', 2, this.value)">
              <span class="groove-lvl" id="groove-lvl-${a.id}-2">0</span>
              <span>S/B</span>
            </div>
            <div class="groove-bonus-preview" id="groove-bonus-preview-${a.id}">BÔNUS: <span class="bonus-val">+0%</span></div>
          </div>\n          </div>\n        <div class="meta-bar-wrap" id="meta-wrap-${a.id}" style="display:none; padding:10px 16px 0;">\n          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">\n            <span class="text-mono" style="font-size:10px; color:var(--gold-dim);">🎯 META: <span id="meta-label-${a.id}"></span></span>\n            <span class="text-mono" style="font-size:10px; color:var(--gold);" id="meta-pct-${a.id}">0%</span>\n          </div>\n          <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:1px; overflow:hidden;">\n            <div id="meta-fill-${a.id}" style="height:100%; background:linear-gradient(90deg,var(--red-dark),var(--red)); border-radius:1px; transition:width 0.5s ease; width:0%;"></div>\n          </div>\n        </div>\n        <div class="rest-warning" id="warn-${a.id}">\n          ⚠ Pavel recomenda 15min de descanso entre séries do mesmo exercício.\n        </div>\n      </div>`
    }).join(''); e.innerHTML = cardsHtml, preencherSelects();
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

// Atualiza somente os elementos dinâmicos de um card já existente no DOM,
// sem reconstruir o grid inteiro. Usado em adicionarSerie/desfazerRegistro

function atualizarCardExercicio(exId) {
  try {
    const ex = dados.exercicios.find(e => e.id === exId);
    if (!ex) return;
    const card = document.getElementById('excard-' + exId);
    if (!card) return renderExercicios(); // card sumiu — rebuild completo

    const hoje = (new Date).toISOString().slice(0, 10);
    const regsHoje = dados.registros.filter(r => {
      const d = r.data || (r.timestamp ? new Date(r.timestamp).toISOString().slice(0, 10) : null);
      return r.exercicioId === exId && d === hoje;
    });
    const totalSeries = dados.registros.filter(r => r.exercicioId === exId).length;
    const totalAcum   = dados.registros.filter(r => r.exercicioId === exId).reduce((s, r) => s + (r.valor || 0), 0);
    const streak = calcularStreakExercicio(exId);
    const unit = 'tempo' === ex.tipo ? 'seg' : ex.unidade || 'reps';

    // Stat: séries hoje
    const statEls = card.querySelectorAll('.ex-stat-val');
    if (statEls[0]) statEls[0].textContent = regsHoje.length;
    if (statEls[1]) statEls[1].textContent = regsHoje.reduce((s, r) => s + (r.valor || 0), 0);
    if (statEls[2]) statEls[2].textContent = totalSeries;
    if (statEls[3]) {
      statEls[3].innerHTML = `${streak}<span class="exercise-streak-fire${streak > 0 ? '' : ' no-streak'}">${streak > 0 ? '<span class="ex-streak-flame ex-streak-flame-1"></span><span class="ex-streak-flame ex-streak-flame-2"></span><span class="ex-streak-flame ex-streak-flame-3"></span>' : '🎯'}</span>`;
    }

    // PR estimado
    const pr = calcularPR(ex);
    const prEl = card.querySelector('.pr-value');
    if (prEl) prEl.textContent = `${pr} ${unit}`;
    const prDisplayEl = document.getElementById('pr-display-' + exId);
    if (prDisplayEl) prDisplayEl.textContent = `${pr} ${unit}`;

    // Total acumulado
    const totalAcumEl = card.querySelector('.exercise-pr > span:last-child');
    if (totalAcumEl) totalAcumEl.textContent = `${totalAcum} total acum.`;

    // RPE médio hoje
    const rpeVal = calcularRPEMedio(exId, hoje);
    const rpeValEl = document.getElementById('rpe-avg-val-' + exId);
    if (rpeValEl) {
      if (rpeVal) {
        rpeValEl.textContent = rpeVal;
        const v = parseFloat(rpeVal);
        rpeValEl.style.color = v >= 7 ? 'var(--red-bright)' : v >= 5 ? 'var(--accent-ffaa)' : 'var(--green-bright)';
      } else {
        rpeValEl.textContent = '—';
        rpeValEl.style.color = 'var(--gold)';
      }
    }

    // RPE warn
    const rpeWarnEl = document.getElementById('rpe-warn-' + exId);
    if (rpeWarnEl) {
      if (rpeVal && parseFloat(rpeVal) > 7) {
        rpeWarnEl.classList.add('show');
        rpeWarnEl.innerHTML = '⚠ Pavel recomenda submáximo. RPE médio hoje: ' + rpeVal + '. Considere reduzir reps.';
      } else {
        rpeWarnEl.classList.remove('show');
        rpeWarnEl.innerHTML = '';
      }
    }

    // Quality badge
    const wrap = document.getElementById('qbadge-wrap-' + exId);
    if (wrap) {
      const regs = dados.registros.filter(r => r.exercicioId === exId && Array.isArray(r.groove));
      if (regs.length === 0) {
        wrap.innerHTML = '';
      } else {
        const pct = calcularQualityMedia(exId);
        const perfeitos = regs.filter(r => Array.isArray(r.groove) && r.groove.filter(Boolean).length === 3).length;
        let tier = 'baixa';
        if (pct >= 80) tier = 'alta';
        else if (pct >= 50) tier = 'media';
        const star = pct >= 80 ? '⭐' : pct >= 50 ? '✓' : '·';
        let html = `<span class="quality-badge" data-tier="${tier}" title="${regs.length} séries avaliadas · ${perfeitos} perfeitas"><span class="q-star">${star}</span><span>Q:</span><span class="q-val">${pct}%</span></span>`;
        if (perfeitos > 0) html += `<span class="perfeito-stamp" title="${perfeitos} séries perfeitas (3/3)">★ ×${perfeitos}</span>`;
        wrap.innerHTML = html;
      }
    }

    // GTG suggestion & PR display
    const pr2 = calcularPR2(ex);
    const sug = calcularSugestaoGTG(pr2, ex.tipo);
    const gtgValEl = document.getElementById('gtg-val-' + exId);
    if (gtgValEl) {
      if (sug) { gtgValEl.textContent = 'GTG: ' + sug; gtgValEl.parentElement.style.display = 'inline-flex'; }
      else { gtgValEl.textContent = 'GTG: --'; }
    }
    const tooltipPrEl = document.getElementById('tooltip-pr-' + exId);
    if (tooltipPrEl) tooltipPrEl.textContent = pr2;
    const valorInput = document.getElementById('valor-' + exId);
    if (valorInput && sug && !valorInput.value && !valorInput.placeholder.startsWith('GTG')) {
      valorInput.placeholder = 'GTG: ' + sug;
    }

    // Recent series (últimas 3 de hoje)
    var recentEl = document.getElementById('recent-series-' + exId);
    if (recentEl) {
      var hojeRegs = dados.registros.filter(function(r) {
        var d = r.data || (r.timestamp ? new Date(r.timestamp).toISOString().slice(0, 10) : null);
        return r.exercicioId === exId && d === hoje;
      });
      if (hojeRegs.length === 0) {
        recentEl.innerHTML = '<span class="recent-set-empty">Nenhuma série hoje</span>';
      } else {
        recentEl.innerHTML = hojeRegs.slice(-3).reverse().map(function(r) {
          return '<span class="recent-set-item">' + r.valor + ' ' + unit + (r.rpe ? ' \u00b7 RPE ' + r.rpe : '') + (r.hora ? ' \u00b7 ' + r.hora.slice(0,5) : '') + '</span>';
        }).join('');
      }
    }

    // Sparkline PR 30d
    var sparkEl = document.getElementById('sparkline-container-' + exId);
    if (sparkEl) {
      sparkEl.innerHTML = gerarSVGSparkline(calcularSparklinePR(exId, 30), 120, 30);
    }

    // Meta bar
    if (dados.metas) {
      const metaWrap = document.getElementById('meta-wrap-' + exId);
      if (metaWrap) {
        const prog = calcularProgressoMeta(exId);
        if (!prog) {
          metaWrap.style.display = 'none';
        } else {
          metaWrap.style.display = 'block';
          const n = { dia: 'HOJE', semana: 'SEMANA', mes: 'MÊS' }[prog.periodo];
          const ti = 'series' === prog.tipo ? 'séries' : 'tempo' === ex.tipo ? 'seg' : 'reps';
          const lbl = document.getElementById('meta-label-' + exId);
          const fill = document.getElementById('meta-fill-' + exId);
          const pct  = document.getElementById('meta-pct-' + exId);
          if (lbl) lbl.textContent = `${prog.atual}/${prog.meta} ${ti} (${n})`;
          if (pct)  pct.textContent  = prog.pct + '%';
          if (fill) {
            fill.style.width = prog.pct + '%';
            fill.style.background = prog.pct >= 100
              ? 'linear-gradient(90deg,#2D7A2D,#44CC44)'
              : prog.pct >= 60
              ? 'linear-gradient(90deg,var(--gold-dim),var(--gold))'
              : 'linear-gradient(90deg,var(--red-dark),var(--red))';
          }
        }
      }
    }

    // Groove sliders — resetar para 0 (já foram usados na série)
    const grooveArr = grooveState[exId] || [0, 0, 0];
    const lvlEls = ['groove-lvl-' + exId + '-0', 'groove-lvl-' + exId + '-1', 'groove-lvl-' + exId + '-2'];
    lvlEls.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = grooveArr[i] || 0;
    });
    const bonusEl = card.querySelector('.bonus-val');
    if (bonusEl) bonusEl.textContent = '+0%';

  } catch (e) {
    console.error('atualizarCardExercicio:', e);
    renderExercicios(); // fallback seguro
  }
}

function mostrarSugestoesValores(exId) {
  var sugEl = document.getElementById("sug-" + exId);
  if (!sugEl || sugEl.dataset.open === "1") return;
  var ex = dados.exercicios.find(function(e) { return e.id === exId; });
  if (!ex) return;
  var freq = {};
  dados.registros.forEach(function(r) {
    if (r.exercicioId === exId) {
      var v = Number(r.valor);
      if (v > 0) freq[v] = (freq[v] || 0) + 1;
    }
  });
  var sorted = Object.keys(freq).map(Number).sort(function(a, b) { return freq[b] - freq[a]; }).slice(0, 5);
  if (sorted.length === 0) return;
  var unit = "tempo" === ex.tipo ? "seg" : ex.unidade || "reps";
  var inputId = "valor-" + exId;
  sugEl.innerHTML = sorted.map(function(v) {
    return '<div class="sug-item" data-val="' + v + '">' + v + ' ' + unit + ' <span class="sug-freq">\u00d7' + freq[v] + '</span></div>';
  }).join("");
  sugEl.dataset.open = "1";
  sugEl.style.display = "block";
  sugEl.onclick = function(e) {
    var item = e.target.closest(".sug-item");
    if (!item) return;
    document.getElementById(inputId).value = item.dataset.val;
    sugEl.innerHTML = "";
    sugEl.style.display = "none";
    sugEl.dataset.open = "0";
  };
}
document.addEventListener("focusin", function(e) {
  if (!e.target || !e.target.id || !e.target.id.startsWith("valor-")) {
    document.querySelectorAll(".valor-suggestions[data-open=\"1\"]").forEach(function(el) {
      el.innerHTML = "";
      el.style.display = "none";
      el.dataset.open = "0";
    });
  }
});


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

  const groovRaw = grooveState[exId] || [0, 0, 0];
  const groovLvls = groovRaw.map(v => Math.min(100, Math.max(0, parseInt(v) || 0)));
  const groovTotal = groovLvls[0] + groovLvls[1] + groovLvls[2];
  const groovBonusMult = 1 + groovTotal / 1000;
  const xpBase = calcularXPSerie(ex, valor, peso);
  const xpComGroove = Math.round(xpBase * groovBonusMult);
  const rankMult = calcularRankMult();
  const xpFinal = Math.max(1, Math.round(xpComGroove * rankMult));
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
    rankMult: rankMult,
    rpe: rpeVal,
    groove: groovLvls,
    perfeito: groovTotal >= 300
  };
  dados.registros.push(registro);
  try { adicionarXP(xpFinal); } catch(_e) { console.error("adicionarXP:", _e); }
  try { verificarStreak(); } catch(_e) { console.error("verificarStreak:", _e); }
  try { verificarBadges(); } catch(_e) { console.error("verificarBadges:", _e); }
  salvarDadosDebounced(), input.value = "", document.getElementById(`peso-${exId}`) && (document.getElementById(`peso-${exId}`).value = ""), delete rpeSelecionado[exId];
  const rpeScaleEl = document.getElementById("rpe-scale-" + exId);
  rpeScaleEl && rpeScaleEl.querySelectorAll(".rpe-btn").forEach(el => el.classList.remove("selected"));
  const rpeWarnEl = document.getElementById("rpe-warn-" + exId);
  rpeWarnEl && rpeWarnEl.classList.remove("show");

  const bonusPct = Math.round(groovTotal / 10);
  const bonusMsg = groovTotal > 0 ? (` · ⚙ GROOVE +${bonusPct}% XP` + (groovTotal >= 300 ? " · ★ SÉRIE PERFEITA" : "")) : "";
  const toastVal = `+${valor} ${"tempo"===ex.tipo?"seg":"reps"}`;
  const rankLabel = rankMult < 1 ? ` · ⚔ POSTO ×${(100*rankMult).toFixed(0)}%` : "";
  const xpToast = groovTotal > 0 ? `+${xpBase} → +${xpFinal} XP — ${ex.nome}${bonusMsg}${rankLabel}` : `+${xpFinal} XP — ${ex.nome}${rankLabel}`;
  mostrarToast(toastVal, xpToast, "success"), mostrarUndoBar(registro);

  atualizarGrooveStatus(groovTotal);

  grooveState[exId] = [0, 0, 0];

  atualizarCardExercicio(exId), atualizarStats(), renderHistory(), setTimeout(() => {
    renderGraficos(), renderProgresso(), renderEstatisticasMensais()
    }, 100), somRegistrar(), mostrarConfete(), iniciarTimerGTG(exId)
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
  _deletedExercicioState.timeoutId && clearTimeout(_deletedExercicioState.timeoutId);
  const ex = dados.exercicios.find(e => e.id === exId);
  if (!ex) return;
  const exName = ex.nome, backup = JSON.parse(JSON.stringify(ex));
  _deletedExercicioState.ultimoExercicio = backup;
  pararTimerGTG(exId);
  dados.exercicios = dados.exercicios.filter(e => e.id !== exId);
  salvarDados();
  renderExercicios();
  renderGuiaExercicios();
  _mostrarUndoRemoverExercicio(exName);
  _deletedExercicioState.timeoutId = setTimeout(() => {
    _deletedExercicioState.ultimoExercicio = null;
    mostrarToast("✔ Excluído", `${exName} removido permanentemente.`, "success");
    const bar = document.getElementById("undoExBar");
    bar && bar.remove()
  }, 8e3)
}

function _mostrarUndoRemoverExercicio(exName) {
  const existing = document.getElementById("undoExBar");
  existing && existing.remove();
  const bar = document.createElement("div");
  bar.className = "undo-bar", bar.id = "undoExBar", bar.innerHTML = `\n    <div class="undo-text">✕ <span>${escapeHtml(exName)}</span> removido</div>\n    <button class="btn-undo" onclick="desfazerRemocaoExercicio()">↩ DESFAZER</button>\n  `, document.body.appendChild(bar)
}

function desfazerRemocaoExercicio() {
  const backup = _deletedExercicioState.ultimoExercicio;
  if (!backup) return;
  _deletedExercicioState.timeoutId && clearTimeout(_deletedExercicioState.timeoutId);
  _deletedExercicioState.ultimoExercicio = null;
  dados.exercicios.push(backup);
  salvarDados();
  renderExercicios();
  renderGuiaExercicios();
  mostrarToast("↩ Restaurado", `${backup.nome} restaurado à lista.`, "success");
  const bar = document.getElementById("undoExBar");
  bar && bar.remove()
}

function calcularPR(ex) {
  const tresMesesAtras = Date.now() - 2592e6;
  const registros = dados.registros.filter(r => r.exercicioId === ex.id && !r.isTest && r.timestamp > tresMesesAtras);
  return registros.length === 0 ? 0 : Math.max(...registros.map(r => Number(r.valor) || 0));
}

function calcularSparklinePR(exId, dias) {
  dias = dias || 30;
  const regs = dados.registros.filter(function(r) { return r.exercicioId === exId && !r.isTest; });
  var hoje = new Date();
  var pontos = [];
  for (var i = dias - 1; i >= 0; i--) {
    var d = new Date(hoje);
    d.setDate(d.getDate() - i);
    var dataStr = d.toISOString().slice(0, 10);
    var maxDia = 0;
    for (var j = 0; j < regs.length; j++) {
      if (regs[j].data === dataStr) {
        maxDia = Math.max(maxDia, Number(regs[j].valor) || 0);
      }
    }
    pontos.push(maxDia);
  }
  return pontos;
}

function gerarSVGSparkline(vals, w, h) {
  w = w || 120;
  h = h || 30;
  var max = 1;
  var min = Infinity;
  for (var i = 0; i < vals.length; i++) {
    if (vals[i] > max) max = vals[i];
    if (vals[i] < min) min = vals[i];
  }
  if (min === Infinity) min = 0;
  var range = max - min || 1;
  if (range === 0) range = 1;
  var pontos = [];
  for (var i = 0; i < vals.length; i++) {
    var x = vals.length > 1 ? 2 + (i / (vals.length - 1)) * (w - 4) : w / 2;
    var y = h - 4 - ((vals[i] - min) / range) * (h - 8);
    pontos.push(x.toFixed(1) + ',' + y.toFixed(1));
  }
  var gradId = 'spark-grad-' + Math.random().toString(36).slice(2, 6);
  var area = '<polygon fill="url(#' + gradId + ')" points="' + pontos[0] + ' ' + pontos.join(' ') + ' ' + pontos[pontos.length-1].split(',')[0] + ',' + (h-4) + ' ' + pontos[0].split(',')[0] + ',' + (h-4) + '"/>';
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:100%;display:block">'
    + '<defs><linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--gold)" stop-opacity="0.25"/><stop offset="100%" stop-color="var(--gold)" stop-opacity="0.02"/></linearGradient></defs>'
    + area
    + '<polyline fill="none" stroke="var(--gold)" stroke-width="1.5" points="' + pontos.join(' ') + '"/>'
    + '<circle cx="' + pontos[pontos.length-1].split(',')[0] + '" cy="' + pontos[pontos.length-1].split(',')[1] + '" r="2" fill="var(--gold)"/>'
    + '</svg>';
}

function atualizarStats() {
  const hoje = (new Date).toISOString().slice(0, 10),
    inicioSemana = getInicioSemana(hoje),
    registrosHoje = dados.registros.filter(r => r.data === hoje),
    registrosSemana = dados.registros.filter(r => r.data >= inicioSemana);
  document.getElementById("statHoje").textContent = registrosHoje.length, document.getElementById("statRepsHoje").textContent = registrosHoje.reduce((acc, r) => acc + (r.valor || 0), 0) + " reps", document.getElementById("statSemana").textContent = registrosSemana.length, document.getElementById("statRepsSemanaSub").textContent = registrosSemana.reduce((acc, r) => acc + (r.valor || 0), 0) + " reps esta semana", document.getElementById("statTotal").textContent = dados.registros.length, document.getElementById("statTotalSub").textContent = dados.registros.reduce((acc, r) => acc + (r.valor || 0), 0).toLocaleString("pt-BR") + " reps acum."
  typeof _renderReadinessCorrelation === "function" && _renderReadinessCorrelation();
  atualizarResumoDiario();
}

function atualizarResumoDiario() {
  const hoje = (new Date).toISOString().slice(0, 10);
  const registrosHoje = dados.registros.filter(r => r.data === hoje);
  const totalSeries = registrosHoje.length;
  const totalReps = registrosHoje.reduce((a, r) => a + (r.valor || 0), 0);
  const totalXP = registrosHoje.reduce((a, r) => a + (r.xp || 0), 0);
  document.getElementById("dailySummaryDate").textContent = hoje;
  document.getElementById("dsSeriesHoje").textContent = totalSeries;
  document.getElementById("dsRepsHoje").textContent = totalReps;
  document.getElementById("dsXPHoje").textContent = "+" + totalXP;
  const grupos = {};
  registrosHoje.forEach(r => {
    const key = r.exercicioNome || r.exercicioId;
    if (!grupos[key]) grupos[key] = { nome: key, series: 0, reps: 0 };
    grupos[key].series++;
    grupos[key].reps += r.valor || 0;
  });
  const container = document.getElementById("dsExerciciosList");
  container.innerHTML = Object.values(grupos).sort((a, b) => b.series - a.series).map(g =>
    `<div class="ds-ex-item"><span class="ds-ex-name">${g.nome}</span><span class="ds-ex-count">${g.series}s</span><span class="ds-ex-reps">${g.reps} reps</span></div>`
  ).join("");
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

