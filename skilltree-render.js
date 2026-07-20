/**
 * GTG TRACKER — SKILL TREE RENDERER
 * Renderização, interatividade e integração com o app existente
 *
 * Depende de:  skilltree.js (SKILL_TREE, calcularEstadoArvore, etc.)
 *              app.js       (dados, mostrarToast, switchTab, mostrarInfoExercicio,
 *                            somBadge, dispararConfetti, mostrarToast)
 *
 * Inclua APÓS skilltree.js e ANTES do fechamento de </body>:
 *   <script src="skilltree-render.js"></script>
 *
 * Integração em app.js (adicionar manualmente):
 *   1. Em inicializar():           if (typeof inicializarSkillTree === 'function') inicializarSkillTree();
 *   2. Em switchTab(tab):          case 'skilltree': renderSkillTree(_catAtiva); break;
 */

;(function (global) {
  'use strict';

  // ============================================================
  // CONSTANTES DE LAYOUT
  // ============================================================

  const NO_W          = 110;   // largura do nó (px)
  const NO_H          = 110;   // altura do nó (px)
  const GAP_NIVEL     = 44;    // espaço horizontal entre níveis
  const GAP_IRMAO     = 24;    // espaço vertical entre irmãos
  const PADDING_X     = 32;    // padding interno esquerdo do container
  const PADDING_Y     = 32;    // padding interno superior do container

  const MOBILE_BP     = 900;   // breakpoint mobile (px)

  // Ícones por categoria
  const ICONES_CAT = {
    EMPURRAR: '💪', PUXAR: '🏋️', PERNAS: '🦵', CORE: '🔥', GRIP: '✊'
  };

  // Ícones por estado de nó
  const ICONES_NO = {
    base:         '★',
    disponivel:   '◆',
    desbloqueado: '▲',
    mestre:       '★',
    bloqueado:    '✕'
  };

  // Rótulos legíveis de estado
  const LABEL_ESTADO = {
    base:         'BASE',
    disponivel:   'DISPONÍVEL',
    desbloqueado: 'DESBLOQUEADO',
    mestre:       'MESTRE ★',
    bloqueado:    'BLOQUEADO'
  };

  // ============================================================
  // ESTADO INTERNO DO MÓDULO
  // ============================================================

  let _catAtiva          = 'TODOS';    // filtro de categoria ativo
  let _posCache          = {};         // cache de posições: { nodeId: {x,y,cx,cy} }
  let _estadoCache       = null;       // último calcularEstadoArvore()
  let _hoverTimer        = null;       // timer de hover do tooltip
  let _tooltipNodeAtivo  = null;       // nodeId do tooltip aberto
  let _tooltipFixo       = false;    // true = tooltip travado por click (não fecha por hover)
  let _clickLock         = false;    // true = bloqueia hover por 300ms após click
  let _resizeTimer       = null;       // debounce de resize

  // ============================================================
  // HELPERS UTILITÁRIOS
  // ============================================================

  /** Busca exercício nos dados do app (dados.exercicios) */
  function _getExercicio(exercicioId) {
    if (typeof GTG === 'undefined' || !GTG.dados || !Array.isArray(GTG.dados.exercicios)) return null;
    return GTG.dados.exercicios.find(e => e.id === exercicioId) || null;
  }

  /** Verifica se estamos em viewport mobile */
  function _isMobile() {
    return window.innerWidth < MOBILE_BP;
  }

  /** Clamp de valor entre min e max */
  function _clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  /** Formata valor de PR com unidade (reps ou seg) */
  function _formatarPR(valor, exercicioId) {
    const ex = _getExercicio(exercicioId);
    if (!ex) return valor ? `${valor}` : '—';
    return ex.tipo === 'tempo' ? `${valor}s` : `${valor} reps`;
  }

  /** Retorna os nós raiz de uma categoria (tipo === 'base') */
  function _nosRaiz(catKey) {
    const cat = SKILL_TREE[catKey];
    if (!cat) return [];
    return Object.values(cat.nos).filter(n => n.tipo === 'base');
  }

  /** Retorna objeto nó da SKILL_TREE por id */
  function _getNo(nodeId) {
    for (const cat of Object.values(SKILL_TREE)) {
      if (cat.nos[nodeId]) return cat.nos[nodeId];
    }
    return null;
  }

  /** Retorna a categoria de um nó */
  function _getCatDeNo(nodeId) {
    for (const [key, cat] of Object.entries(SKILL_TREE)) {
      if (cat.nos[nodeId]) return key;
    }
    return null;
  }

  // ============================================================
  // CÁLCULO DE LAYOUT (POSIÇÕES)
  // ============================================================

  /**
   * Calcula posições absolutas de todos os nós visíveis.
   * Retorna { nodeId: { x, y, cx, cy, nivel, linha } }
   *
   * Algoritmo:
   *   - Percorre cada categoria separadamente
   *   - Dentro de cada categoria, percorre árvore em BFS por nível
   *   - Desktop: nivel → coluna (x), posição → linha (y)
   *   - Mobile:  nivel → linha (y), posição → coluna (x)
   */
  function _calcularPosicoes(categoriaFiltro) {
    const mobile   = _isMobile();
    const posicoes = {};

    // Seleciona categorias a renderizar
    const cats = categoriaFiltro === 'TODOS'
      ? Object.keys(SKILL_TREE)
      : [categoriaFiltro];

    let offsetPrincipal = PADDING_Y; // acumula deslocamento entre categorias

    for (const catKey of cats) {
      const cat = SKILL_TREE[catKey];
      if (!cat) continue;

      // BFS para calcular nível de cada nó
      const nivelMap  = {};   // nodeId → nivel (int, começa em 0)
      const linhaMap  = {};   // nodeId → linha (int, dentro do nível)
      const contNivel = {};   // nivel → contador de nós

      // Encontra todas as raízes (tipo === 'base') da categoria
      const raizes = Object.values(cat.nos).filter(n => n.tipo === 'base');

      // Inicializa BFS
      const fila = raizes.map(r => ({ id: r.id, nivel: 0 }));
      const visitados = new Set();

      while (fila.length) {
        const { id, nivel } = fila.shift();
        if (visitados.has(id)) continue;
        visitados.add(id);

        nivelMap[id]  = nivel;
        contNivel[nivel] = (contNivel[nivel] || 0);
        linhaMap[id]  = contNivel[nivel]++;

        const no = cat.nos[id];
        if (no && no.filhos) {
          for (const filhoId of no.filhos) {
            if (!visitados.has(filhoId)) {
              fila.push({ id: filhoId, nivel: nivel + 1 });
            }
          }
        }
      }

      // Calcula tamanho total desta categoria para reservar espaço
      const maxNivel = Math.max(...Object.values(nivelMap), 0);
      const maxLinhas = Math.max(...Object.values(contNivel), 1);

      // Converte nível/linha em x,y absolutos
      for (const nodeId of Object.keys(nivelMap)) {
        const nivel = nivelMap[nodeId];
        const linha = linhaMap[nodeId];

        let x, y;
        if (!mobile) {
          // Desktop: nível → coluna (x), linha → vertical (y dentro da categoria)
          x = PADDING_X + nivel * (NO_W + GAP_NIVEL);
          y = offsetPrincipal + linha * (NO_H + GAP_IRMAO);
        } else {
          // Mobile: nível → linha (y), linha dentro do nível → coluna (x)
          x = PADDING_X + linha * (NO_W + GAP_IRMAO);
          y = offsetPrincipal + nivel * (NO_H + GAP_NIVEL);
        }

        posicoes[nodeId] = {
          x,
          y,
          cx: x + NO_W / 2,   // centro x (para linhas SVG)
          cy: y + NO_H / 2,   // centro y (para linhas SVG)
          nivel,
          linha,
          catKey
        };
      }

      // Avança offset para a próxima categoria
      if (!mobile) {
        // Desktop: categorias empilhadas verticalmente
        const alturaCat = maxLinhas * (NO_H + GAP_IRMAO) + GAP_NIVEL * 2;
        offsetPrincipal += alturaCat;
      } else {
        // Mobile: categorias empilhadas horizontalmente (scroll horizontal)
        const larguraCat = (maxNivel + 1) * (NO_H + GAP_NIVEL) + GAP_NIVEL * 2;
        offsetPrincipal += larguraCat;
      }
    }

    return posicoes;
  }

  /**
   * Calcula o tamanho total do canvas (para definir min-width/height do wrapper)
   */
  function _calcularTamanhoCanvas(posicoes) {
    let maxX = 0, maxY = 0;
    for (const p of Object.values(posicoes)) {
      maxX = Math.max(maxX, p.x + NO_W + PADDING_X);
      maxY = Math.max(maxY, p.y + NO_H + PADDING_Y);
    }
    return { w: maxX, h: maxY };
  }

  // ============================================================
  // 1. renderSkillTree(categoria)
  // ============================================================

  function renderSkillTree(categoria) {
    categoria = categoria || _catAtiva || 'TODOS';
    _catAtiva = categoria;

    const layer   = document.getElementById('stNodesLayer');
    const svgEl   = document.getElementById('stLinesSvg');
    const empty   = document.getElementById('stEmptyState');

    if (!layer || !svgEl) return;

    // Recalcula estado completo
    _estadoCache = calcularEstadoArvore();

    // Calcula posições
    _posCache = _calcularPosicoes(categoria);

    // Ajusta tamanho do canvas
    const { w, h } = _calcularTamanhoCanvas(_posCache);
    const wrapper = document.querySelector('.st-wrapper');
    if (wrapper) {
      wrapper.style.minWidth  = `${w}px`;
      wrapper.style.minHeight = `${h}px`;
    }
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svgEl.style.width  = `${w}px`;
    svgEl.style.height = `${h}px`;

    // Limpa conteúdo anterior via DocumentFragment
    layer.innerHTML = '';

    // Limpa linhas SVG (mantém <defs>)
    const defs = svgEl.querySelector('defs');
    svgEl.innerHTML = '';
    if (defs) svgEl.appendChild(defs);

    // Oculta empty state
    if (empty) empty.classList.add('st-hidden');

    // Determina nós a renderizar
    const cats = categoria === 'TODOS'
      ? Object.keys(SKILL_TREE)
      : [categoria];

    const fragNodes = document.createDocumentFragment();
    const fragLines = document.createDocumentFragment();

    let delay = 0;

    for (const catKey of cats) {
      const cat = SKILL_TREE[catKey];
      if (!cat) continue;

      // Separador de categoria (label flutuante)
      if (categoria === 'TODOS') {
        _renderSeparadorCategoria(fragNodes, catKey, cat);
      }

      for (const nodeId of Object.keys(cat.nos)) {
        const pos = _posCache[nodeId];
        if (!pos) continue;

        const estadoNo = _estadoCache[nodeId];
        if (!estadoNo) continue;

        // Renderiza nó
        const el = _criarElementoNo(nodeId, estadoNo, pos, delay);
        fragNodes.appendChild(el);

        // Renderiza linhas para filhos
        const no = cat.nos[nodeId];
        for (const filhoId of (no.filhos || [])) {
          const posFilho = _posCache[filhoId];
          const estadoFilho = _estadoCache[filhoId];
          if (!posFilho || !estadoFilho) continue;

          const linha = _criarLinhaSVG(pos, posFilho, estadoNo, estadoFilho);
          if (linha) fragLines.appendChild(linha);
        }

        delay += 40;
      }
    }

    layer.appendChild(fragNodes);
    svgEl.appendChild(fragLines);

    // Atualiza progresso geral e card próximo desbloqueio
    atualizarProgressoGeral();

    // Checa e anima desbloqueios novos
    _checarDesbloqueiosNovos();
  }

  // ============================================================
  // SEPARADOR DE CATEGORIA
  // ============================================================

  function _renderSeparadorCategoria(frag, catKey, cat) {
    // Encontra o nó raiz da categoria para pegar a posição Y
    const raizes = Object.values(cat.nos).filter(n => n.tipo === 'base');
    if (!raizes.length) return;

    const primeiraPos = _posCache[raizes[0].id];
    if (!primeiraPos) return;

    const mobile  = _isMobile();
    const div     = document.createElement('div');
    div.className = 'st-level-label';

    if (!mobile) {
      div.style.top  = `${primeiraPos.y - 22}px`;
      div.style.left = `${PADDING_X}px`;
    } else {
      div.style.top  = `${primeiraPos.y - 22}px`;
      div.style.left = `${PADDING_X}px`;
    }

    div.textContent = `${cat.icone}  ${cat.label}`;
    div.style.color = cat.cor + 'AA';
    frag.appendChild(div);
  }

  // ============================================================
  // CRIAÇÃO DE NÓS
  // ============================================================

  function _criarElementoNo(nodeId, estadoNo, pos, delay) {
    const div = document.createElement('div');
    div.className = `skill-tree-node skill-tree-node--${estadoNo.status}`;
    div.id        = `stno-${nodeId}`;
    div.setAttribute('data-node-id', nodeId);
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${estadoNo.nome} — ${LABEL_ESTADO[estadoNo.status]}`);
    div.style.cssText = `left:${pos.x}px;top:${pos.y}px;--delay:${delay}ms;`;

    // Anel de progresso SVG (para nós normais não desbloqueados)
    let anelHTML = '';
    if (estadoNo.tipo === 'normal' && !estadoNo.desbloqueado && estadoNo.requisito) {
      const pct         = _clamp((estadoNo.prAtual / estadoNo.requisito) * 100, 0, 100);
      const circunf     = Math.PI * 2 * 50;   // r=50, SVG viewBox 110x110
      const dashOffset  = circunf * (1 - pct / 100);
      anelHTML = `
        <svg class="st-node__progress-ring" viewBox="0 0 110 110" aria-hidden="true">
          <circle class="ring-bg"   cx="55" cy="55" r="50" stroke-dasharray="${circunf}" stroke-dashoffset="0"/>
          <circle class="ring-fill" cx="55" cy="55" r="50"
                  stroke-dasharray="${circunf}"
                  stroke-dashoffset="${dashOffset}"
                  style="transition:stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)"/>
        </svg>`;
    }

    // Badge de mestre
    const badgeMestre = estadoNo.mestre ? `<span class="st-node__master-badge" aria-label="Mestre">★</span>` : '';

    // Label de PR (não mostra para bloqueados)
    let prLabel = '';
    if (estadoNo.status !== 'bloqueado') {
      const prVal = estadoNo.prProprio ?? estadoNo.prAtual ?? 0;
      prLabel = prVal > 0 ? `<div class="st-node__pr">${_formatarPR(prVal, estadoNo.exercicioId)}</div>` : '';
    }

    // Label "falta X" para bloqueados com progresso
    let faltaLabel = '';
    if (estadoNo.status === 'bloqueado' && estadoNo.falta > 0) {
      faltaLabel = `<div class="st-node__falta">falta ${estadoNo.falta}</div>`;
    }

    div.innerHTML = `
      ${anelHTML}
      ${badgeMestre}
      <div class="st-node__shell">
        <div class="st-node__icon" aria-hidden="true">${ICONES_NO[estadoNo.status] || '⬡'}</div>
        <div class="st-node__name">${estadoNo.nome}</div>
        ${prLabel}
        ${faltaLabel}
      </div>`;

    // Eventos: apenas click e teclado (hover removido para evitar piscar)
    div.addEventListener('click', () => handleNodeClick(nodeId));
    div.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNodeClick(nodeId);
      }
    });

    return div;
  }

  // ============================================================
  // 2. renderLinhasSVG
  // ============================================================

  /**
   * Cria um <path> SVG em bezier cúbico entre centro do pai e centro do filho.
   * Retorna o elemento SVG ou null se posições inválidas.
   */
  function _criarLinhaSVG(posPai, posFilho, estadoPai, estadoFilho) {
    const mobile = _isMobile();

    const x1 = posPai.cx,   y1 = posPai.cy;
    const x2 = posFilho.cx, y2 = posFilho.cy;

    // Pontos de controle do bezier
    let cx1, cy1, cx2, cy2;
    if (!mobile) {
      // Desktop: fluxo horizontal → bezier horizontal
      const midX = (x1 + x2) / 2;
      cx1 = midX; cy1 = y1;
      cx2 = midX; cy2 = y2;
    } else {
      // Mobile: fluxo vertical → bezier vertical
      const midY = (y1 + y2) / 2;
      cx1 = x1; cy1 = midY;
      cx2 = x2; cy2 = midY;
    }

    const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

    // Determina classe/cor pelo estado do filho (destino)
    const status = estadoFilho.status;
    let classe = 'st-line--locked';
    if (status === 'mestre')       classe = 'st-line--master';
    else if (status === 'desbloqueado' || status === 'base') classe = 'st-line--unlocked';
    else if (status === 'disponivel')  classe = 'st-line--available';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', `st-line ${classe}`);
    path.setAttribute('data-pai',   estadoPai.id);
    path.setAttribute('data-filho', estadoFilho.id);

    // Animação de desenho para linhas desbloqueadas
    if (classe === 'st-line--unlocked' || classe === 'st-line--master') {
      const len = _approximateBezierLength(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
      path.style.setProperty('--dash-len', len);
      path.setAttribute('stroke-dasharray',  len);
      path.setAttribute('stroke-dashoffset', len);
      path.classList.add('st-line--animated');
    }

    // Ponta de seta no destino
    const arrow = _criarSetaSVG(x2, y2, x1, y1, status);
    if (arrow) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.appendChild(path);
      g.appendChild(arrow);
      return g;
    }

    return path;
  }

  /** Aproxima comprimento de bezier cúbico via subdivisão */
  function _approximateBezierLength(x1, y1, cx1, cy1, cx2, cy2, x2, y2, steps = 20) {
    let len = 0, px = x1, py = y1;
    for (let i = 1; i <= steps; i++) {
      const t  = i / steps;
      const t2 = t * t, t3 = t2 * t;
      const mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt;
      const nx = mt3*x1 + 3*mt2*t*cx1 + 3*mt*t2*cx2 + t3*x2;
      const ny = mt3*y1 + 3*mt2*t*cy1 + 3*mt*t2*cy2 + t3*y2;
      len += Math.hypot(nx - px, ny - py);
      px = nx; py = ny;
    }
    return Math.ceil(len);
  }

  /** Cria uma ponta de seta triangular no ponto destino */
  function _criarSetaSVG(x, y, fromX, fromY, status) {
    const angle  = Math.atan2(y - fromY, x - fromX) * (180 / Math.PI);
    const size   = 5;
    const fill   = status === 'mestre' ? 'var(--red-bright)'
                 : (status === 'desbloqueado' || status === 'base') ? 'var(--gold)'
                 : status === 'disponivel' ? 'rgba(212,168,67,0.5)'
                 : 'rgba(255,255,255,0.15)';

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', `0,${-size} ${size*1.6},0 0,${size}`);
    poly.setAttribute('fill', fill);
    poly.setAttribute('transform', `translate(${x},${y}) rotate(${angle})`);
    poly.setAttribute('class', `st-line-arrow st-line-arrow--${status}`);
    poly.setAttribute('opacity', status === 'bloqueado' ? '0.3' : '0.85');
    return poly;
  }

  // ============================================================
  // 3. renderTooltip(nodeId, estado)
  // ============================================================

  function renderTooltip(nodeId) {
    const estadoNo = _estadoCache && _estadoCache[nodeId];
    if (!estadoNo) return;

    const tooltip   = document.getElementById('stTooltip');
    const backdrop  = document.getElementById('stTooltipBackdrop');
    if (!tooltip) return;

    // Proteção: evita re-renderizar se já está aberto para o mesmo nó
    if (_tooltipNodeAtivo === nodeId && tooltip.classList.contains('active')) return;

    _tooltipNodeAtivo = nodeId;

    // Exercício do app (para pavelQuote)
    const ex = _getExercicio(estadoNo.exercicioId);

    // ── Preenche campos ──────────────────────────────────────

    const badgeEl = document.getElementById('stTooltipBadge');
    if (badgeEl) {
      badgeEl.textContent = LABEL_ESTADO[estadoNo.status] || estadoNo.status.toUpperCase();
      badgeEl.setAttribute('data-estado', estadoNo.status);
    }

    const iconEl = document.getElementById('stTooltipIcon');
    if (iconEl) iconEl.textContent = ICONES_NO[estadoNo.status] || '⬡';

    const nameEl = document.getElementById('stTooltipName');
    if (nameEl) nameEl.textContent = estadoNo.nome;

    const catEl = document.getElementById('stTooltipCat');
    if (catEl) {
      const catKey = _getCatDeNo(nodeId);
      const catObj = catKey ? SKILL_TREE[catKey] : null;
      catEl.textContent = catObj
        ? `${catObj.icone} ${catObj.label}`
        : (estadoNo.categoria || '');
    }

    // Stats: PR / Requisito / Falta
    const prEl   = document.getElementById('stTooltipPR');
    const reqEl  = document.getElementById('stTooltipReq');
    const faltaRow = document.getElementById('stTooltipFaltaRow');
    const faltaEl  = document.getElementById('stTooltipFalta');

    if (prEl) {
      const prVal = estadoNo.prProprio ?? estadoNo.prAtual ?? 0;
      prEl.textContent = prVal > 0 ? _formatarPR(prVal, estadoNo.exercicioId) : '—';
    }

    if (reqEl) {
      if (estadoNo.tipo === 'base' || estadoNo.tipo === 'disponivel' || !estadoNo.requisito) {
        reqEl.textContent = 'Sem requisito';
      } else if (estadoNo.desbloqueado) {
        reqEl.textContent = '✓ Atingido';
        reqEl.style.color = 'var(--green-bright)';
      } else {
        const no = _getNo(nodeId);
        const thr = estadoNo.requisito;
        reqEl.textContent = _formatarPR(thr, no?.requisito?.exercicioId || estadoNo.exercicioId);
        reqEl.style.color = '';
      }
    }

    if (faltaRow && faltaEl) {
      const mostrarFalta = estadoNo.status === 'bloqueado' && estadoNo.falta > 0;
      faltaRow.style.display = mostrarFalta ? '' : 'none';
      if (mostrarFalta) {
        const no = _getNo(nodeId);
        faltaEl.textContent = `+${_formatarPR(estadoNo.falta, no?.requisito?.exercicioId || estadoNo.exercicioId)}`;
      }
    }

    // Barra de progresso
    const barWrap = document.getElementById('stTooltipBarWrap');
    const barFill = document.getElementById('stTooltipBarFill');
    const barPct  = document.getElementById('stTooltipBarPct');

    if (barWrap) {
      const mostarBarra = estadoNo.tipo === 'normal' && !estadoNo.desbloqueado && estadoNo.requisito;
      barWrap.style.display = mostarBarra ? '' : 'none';
      if (mostarBarra && barFill && barPct) {
        const pct = _clamp(Math.round((estadoNo.prAtual / estadoNo.requisito) * 100), 0, 100);
        barFill.style.width = `${pct}%`;
        barPct.textContent  = `${pct}%`;
        const barEl = document.getElementById('stTooltipBarEl');
        if (barEl) barEl.setAttribute('aria-valuenow', pct);
      }
    }

    // Bloco de mestria
    const masteryEl    = document.getElementById('stTooltipMastery');
    const masteryPR    = document.getElementById('stTooltipMasteryPR');
    const masteryReq   = document.getElementById('stTooltipMasteryReq');
    const masteryFill  = document.getElementById('stTooltipMasteryFill');

    if (masteryEl) {
      const mostrarMestria = estadoNo.desbloqueado && !estadoNo.mestre && estadoNo.mestria;
      masteryEl.style.display = mostrarMestria ? '' : 'none';

      if (mostrarMestria && estadoNo.mestria) {
        if (masteryPR)   masteryPR.textContent  = `PR: ${_formatarPR(estadoNo.mestria.prAtual || 0, estadoNo.exercicioId)}`;
        if (masteryReq)  masteryReq.textContent = _formatarPR(estadoNo.thresholdMestria, estadoNo.exercicioId);
        if (masteryFill) {
          const pct = _clamp(Math.round(((estadoNo.mestria.prAtual || 0) / estadoNo.thresholdMestria) * 100), 0, 100);
          masteryFill.style.width = `${pct}%`;
          const barMEl = document.getElementById('stTooltipMasteryBarEl');
          if (barMEl) barMEl.setAttribute('aria-valuenow', pct);
        }
      }
    }

    // Citação de Pavel (adiciona se o elemento existir, cria se não)
    let quoteEl = document.getElementById('stTooltipQuote');
    if (!quoteEl && tooltip) {
      quoteEl = document.createElement('div');
      quoteEl.id = 'stTooltipQuote';
      quoteEl.style.cssText = `
        font-family: Rajdhani, sans-serif;
        font-size: 11px;
        font-style: italic;
        color: var(--gold-dim);
        border-left: 2px solid var(--gold-dim);
        padding-left: 8px;
        margin: 10px 0;
        line-height: 1.4;
        display: none;
      `;
      // Insere antes do CTA
      const cta = document.getElementById('stTooltipCTA');
      if (cta) tooltip.insertBefore(quoteEl, cta);
      else tooltip.appendChild(quoteEl);
    }

    if (quoteEl) {
      const quote = ex?.detalhes?.pavelQuote;
      if (quote) {
        // Trunca a 120 chars para o tooltip não ficar longo
        const trunc = quote.length > 120 ? quote.slice(0, 117) + '…' : quote;
        quoteEl.textContent = trunc;
        quoteEl.style.display = '';
      } else {
        quoteEl.style.display = 'none';
      }
    }

    // CTA
    const ctaEl = document.getElementById('stTooltipCTA');
    if (ctaEl) {
      const mostrarCTA = estadoNo.status !== 'bloqueado';
      ctaEl.style.display = mostrarCTA ? '' : 'none';
    }

    // ── Posicionamento inteligente ───────────────────────────

    tooltip.classList.add('active');
    tooltip.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('active');

    _posicionarTooltip(nodeId);
  }

  /** Posiciona o tooltip sem ultrapassar viewport */
  function _posicionarTooltip(nodeId) {
    const tooltip = document.getElementById('stTooltip');
    const arrow   = document.getElementById('stTooltipArrow');
    if (!tooltip) return;

    // Em mobile < 480px o CSS âncora ao fundo — não precisa calcular
    if (window.innerWidth < 480) return;

    const pos = _posCache[nodeId];
    if (!pos) return;

    const wrapper = document.querySelector('.st-wrapper');
    if (!wrapper) return;

    const wRect  = wrapper.getBoundingClientRect();
    const scroll = { x: wrapper.scrollLeft, y: wrapper.scrollTop };

    // Posição absoluta do nó na tela
    const nodeX = wRect.left + pos.x - scroll.x;
    const nodeY = wRect.top  + pos.y - scroll.y;

    const vw     = window.innerWidth;
    const vh     = window.innerHeight;
    const tW     = tooltip.offsetWidth  || 300;
    const tH     = tooltip.offsetHeight || 320;
    const offset = 12;

    // Tenta posicionar acima do nó
    let top  = nodeY - tH - offset;
    let left = nodeX + NO_W / 2 - tW / 2;
    let arrowPos = 'bottom'; // seta aponta para baixo (tooltip está acima)

    // Se ultrapassa topo → posiciona abaixo
    if (top < 8) {
      top = nodeY + NO_H + offset;
      arrowPos = 'top';
    }

    // Ajusta horizontal
    if (left < 8) left = 8;
    if (left + tW > vw - 8) left = vw - tW - 8;

    // Se ainda ultrapassa verticalmente → âncora ao centro da tela
    if (top + tH > vh - 8) {
      top = Math.max(8, vh / 2 - tH / 2);
      arrowPos = 'none';
    }

    tooltip.style.top    = `${top}px`;
    tooltip.style.left   = `${left}px`;
    tooltip.style.bottom = 'auto';
    tooltip.style.right  = 'auto';

    // Posição da seta
    if (arrow) {
      arrow.className = 'st-tooltip__arrow';
      if (arrowPos !== 'none') {
        arrow.classList.add(`st-tooltip__arrow--${arrowPos}`);
        // Centraliza horizontalmente
        const arrowLeft = nodeX + NO_W / 2 - left - 5;
        arrow.style.left = `${_clamp(arrowLeft, 12, tW - 22)}px`;
      }
    }
  }

  // ============================================================
  // 4. handleNodeClick(nodeId)
  // ============================================================

  function handleNodeClick(nodeId) {
    if (!_estadoCache) _estadoCache = calcularEstadoArvore();
    const estadoNo = _estadoCache[nodeId];
    if (!estadoNo) return;

    // Se tooltip está aberto para outro nó, fecha primeiro
    if (_tooltipNodeAtivo && _tooltipNodeAtivo !== nodeId) {
      fecharTooltipSkilltree();
    }

    const noEl = document.getElementById(`stno-${nodeId}`);

    if (estadoNo.status === 'bloqueado') {
      // Shake animation + toast
      if (noEl) {
        noEl.classList.remove('st-shake');
        void noEl.offsetWidth; // reflow para reiniciar animação
        noEl.classList.add('st-shake');
        noEl.addEventListener('animationend', () => noEl.classList.remove('st-shake'), { once: true });
      }

      const no = _getNo(nodeId);
      const thr = estadoNo.requisito;
      const exId = no?.requisito?.exercicioId;
      const exNome = exId
        ? (_getExercicio(exId)?.nome || exId)
        : 'exercício pai';

      if (typeof mostrarToast === 'function') {
        mostrarToast(
          '🔒 BLOQUEADO',
          `Precisa de ${thr} reps em ${exNome}. Falta: ${estadoNo.falta}`,
          'error'
        );
      }
      return;
    }

    if (estadoNo.status === 'disponivel' || estadoNo.status === 'desbloqueado' || estadoNo.status === 'base') {
      // Mostra tooltip com detalhes e botão ir para treino
      _tooltipFixo = true;
      _clickLock = true;
      renderTooltip(nodeId);
      setTimeout(() => { _clickLock = false; }, 300);
      return;
    }

    if (estadoNo.status === 'mestre') {
      // Mestre: abre modal de info do exercício se existir no app
      const ex = _getExercicio(estadoNo.exercicioId);
      if (ex && typeof mostrarInfoExercicio === 'function') {
        mostrarInfoExercicio(estadoNo.exercicioId);
      } else {
        _tooltipFixo = true;
        _clickLock = true;
        renderTooltip(nodeId);
        setTimeout(() => { _clickLock = false; }, 300);
      }
    }
  }

  // ============================================================
  // 5. handleNodeHover(nodeId, entering)
  // ============================================================

  function handleNodeHover(nodeId, entering) {
    clearTimeout(_hoverTimer);

    // Bloqueia completamente hover durante lock pós-click ou quando tooltip está fixo
    if (_clickLock || _tooltipFixo) return;

    if (entering) {
      _hoverTimer = setTimeout(() => {
        if (!_estadoCache) _estadoCache = calcularEstadoArvore();
        const estadoNo = _estadoCache[nodeId];
        // Não abre tooltip em mobile (usa click) nem se já estiver aberto
        if (!estadoNo || window.innerWidth < MOBILE_BP) return;
        if (_tooltipNodeAtivo === nodeId) return;
        renderTooltip(nodeId);
      }, 200);
    } else {
      _hoverTimer = setTimeout(() => {
        // Fecha apenas se o mouse não está sobre o tooltip
        const tooltip = document.getElementById('stTooltip');
        if (tooltip && tooltip.matches(':hover')) return;
        fecharTooltipSkilltree();
      }, 100);
    }
  }

  // ============================================================
  // 6. atualizarProgressoGeral()
  // ============================================================

  function atualizarProgressoGeral() {
    if (!_estadoCache) _estadoCache = calcularEstadoArvore();

    const stats  = getEstatisticasArvore();
    const pct    = stats.percentualGeral;

    // Barra principal
    const fillEl = document.getElementById('stProgressFill');
    const pctEl  = document.getElementById('stProgressPct');
    const barEl  = document.getElementById('stProgressBar');

    if (fillEl) fillEl.style.width = `${pct}%`;
    if (pctEl)  pctEl.textContent  = `${pct}%`;
    if (barEl)  barEl.setAttribute('aria-valuenow', pct);

    // Badges de contagem
    const statsEl = document.getElementById('stProgressStats');
    if (statsEl) {
      const vals = Object.values(_estadoCache);
      const nBase  = vals.filter(n => n.tipo === 'base').length;
      const nDisp  = vals.filter(n => n.tipo === 'disponivel').length;
      const nDesb  = vals.filter(n => n.desbloqueado && n.tipo === 'normal').length;
      const nMest  = vals.filter(n => n.mestre).length;
      const nBloq  = vals.filter(n => !n.desbloqueado && n.tipo === 'normal').length;

      statsEl.innerHTML = `
        <span class="st-badge st-badge--base">
          BASE <span class="st-badge__count">${nBase}</span>
        </span>
        <span class="st-badge st-badge--unlocked">
          DESBLOQUEADO <span class="st-badge__count">${nDesb + nDisp}</span>
        </span>
        <span class="st-badge st-badge--master">
          MESTRE <span class="st-badge__count">${nMest}</span>
        </span>
        <span class="st-badge st-badge--locked">
          BLOQUEADO <span class="st-badge__count">${nBloq}</span>
        </span>`;
    }

    // Card "Próximo Desbloqueio"
    const prox     = stats.proximoDesbloqueio;
    const cardProx = document.getElementById('stNextUnlockCard');

    if (cardProx) {
      if (prox) {
        cardProx.style.display = '';

        const nameEl = document.getElementById('stNextUnlockName');
        const reqEl  = document.getElementById('stNextUnlockReq');
        const pctEl2 = document.getElementById('stNextUnlockPct');
        const ringEl = document.getElementById('stNextUnlockRing');

        if (nameEl) nameEl.textContent = prox.nome;
        if (reqEl)  reqEl.textContent  = `${prox.paiNome}: ${prox.prAtual} / ${prox.requisito} (+${prox.falta} para desbloquear)`;

        const proxPct = _clamp(prox.percentual, 0, 100);
        if (pctEl2)  pctEl2.textContent = `${proxPct}%`;

        if (ringEl) {
          const circunf    = 2 * Math.PI * 20; // r=20
          const dashOffset = circunf * (1 - proxPct / 100);
          ringEl.setAttribute('stroke-dasharray',  circunf.toFixed(1));
          ringEl.setAttribute('stroke-dashoffset', dashOffset.toFixed(1));
        }
      } else {
        // Tudo desbloqueado!
        cardProx.style.display = '';
        const nameEl = document.getElementById('stNextUnlockName');
        const reqEl  = document.getElementById('stNextUnlockReq');
        if (nameEl) nameEl.textContent = '★ ÁRVORE COMPLETA!';
        if (reqEl)  reqEl.textContent  = 'Todos os exercícios desbloqueados. Agora foque nas mestrias!';
      }
    }
  }

  // ============================================================
  // 7. animarDesbloqueio(nodeId)
  // ============================================================

  function animarDesbloqueio(nodeId) {
    const noEl = document.getElementById(`stno-${nodeId}`);
    if (!noEl) return;

    // Animação no nó
    noEl.classList.add('st-just-unlocked');
    noEl.addEventListener('animationend', () => {
      noEl.classList.remove('st-just-unlocked');
    }, { once: true });

    // Anima linha do pai
    const estadoNo = _estadoCache && _estadoCache[nodeId];
    if (estadoNo) {
      const no = _getNo(nodeId);
      if (no && no.requisito) {
        const paiId = no.requisito.paiId;
        const linhaSvg = document.querySelector(
          `.st-line[data-pai="${paiId}"][data-filho="${nodeId}"]`
        );
        if (linhaSvg) {
          const len = linhaSvg.getAttribute('stroke-dasharray') || 300;
          linhaSvg.style.strokeDashoffset = len;
          void linhaSvg.offsetWidth;
          linhaSvg.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)';
          linhaSvg.style.strokeDashoffset = '0';
        }
      }
    }

    // Som de conquista
    if (typeof somBadge === 'function') somBadge();

    // Confetti
    if (typeof dispararConfetti === 'function') dispararConfetti();
  }

  /**
   * Verifica quais nós foram recém-desbloqueados comparando com snapshot
   * salvo em localStorage, e anima cada um deles.
   */
  function _checarDesbloqueiosNovos() {
    if (!_estadoCache) return;

    let vistos;
    try {
      vistos = JSON.parse(localStorage.getItem('gtg_skilltree_vistos') || '{}');
    } catch (e) {
      vistos = {};
    }

    const novoVistos = { ...vistos };
    let houveNovo = false;

    for (const [nodeId, est] of Object.entries(_estadoCache)) {
      if (!est.desbloqueado) continue;

      const jaVisto = vistos[nodeId];
      if (!jaVisto) {
        // Nó recém-desbloqueado!
        novoVistos[nodeId] = Date.now();
        if (houveNovo) {
          // Escala delay para múltiplos desbloqueios
          setTimeout(() => animarDesbloqueio(nodeId), Object.keys(novoVistos).length * 400);
        } else {
          setTimeout(() => animarDesbloqueio(nodeId), 600);
        }
        houveNovo = true;
      }
    }

    if (houveNovo) {
      try {
        localStorage.setItem('gtg_skilltree_vistos', JSON.stringify(novoVistos));
      } catch (e) { /* ignora quota */ }
    }
  }

  // ============================================================
  // 8. filtrarCategoria(categoria, btnEl)
  // ============================================================

  function filtrarCategoria(categoria, btnEl) {
    _catAtiva = categoria;

    // Atualiza estado das tabs
    document.querySelectorAll('.st-cat-tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    const btn = btnEl || document.querySelector(`.st-cat-tab[data-cat="${categoria}"]`);
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }

    // Re-renderiza
    renderSkillTree(categoria);
  }

  // ============================================================
  // FECHAR TOOLTIP
  // ============================================================

  function fecharTooltipSkilltree() {
    const tooltip  = document.getElementById('stTooltip');
    const backdrop = document.getElementById('stTooltipBackdrop');
    if (tooltip)  {
      tooltip.classList.remove('active');
      tooltip.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.classList.remove('active');
    _tooltipNodeAtivo = null;
    _tooltipFixo = false;
  }

  // ============================================================
  // IR PARA EXERCÍCIO (botão no tooltip)
  // ============================================================

  function irParaExercicioSkilltree() {
    if (!_tooltipNodeAtivo) return;

    const estadoNo = _estadoCache && _estadoCache[_tooltipNodeAtivo];
    if (!estadoNo) return;

    fecharTooltipSkilltree();

    // Verifica se o exercício existe no app
    const ex = _getExercicio(estadoNo.exercicioId);
    if (!ex && typeof skilltreeSyncExercicios === 'function') {
      skilltreeSyncExercicios();
    }

    if (typeof switchTab === 'function') switchTab('treino');

    // Aguarda a aba renderizar, depois faz scroll + highlight
    setTimeout(() => {
      const exEl = document.getElementById(`exercicio-${estadoNo.exercicioId}`)
               || document.querySelector(`[data-exercicio-id="${estadoNo.exercicioId}"]`);

      if (exEl) {
        exEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight temporário
        exEl.classList.add('st-highlight-pulse');
        setTimeout(() => exEl.classList.remove('st-highlight-pulse'), 2000);
      } else if (typeof mostrarToast === 'function') {
        mostrarToast('⚡ TREINO', `Exercício: ${ex.nome}`, 'info');
      }
    }, 350);
  }

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================

  function inicializarSkillTree() {
    // Injeta dados de teste apenas em ambiente de dev (sem registros reais)
    _injetarDadosTeste();

    // Primeiro render
    renderSkillTree('TODOS');

    // Debounce no resize
    window.addEventListener('resize', () => {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(() => {
        _posCache = {};  // invalida cache de posições
        renderSkillTree(_catAtiva);
      }, 250);
    });

    // Tooltip: fecha ao pressionar Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && _tooltipNodeAtivo) fecharTooltipSkilltree();
    });

    // Scroll da árvore: converte wheel vertical em scroll horizontal
    const wrapper = document.querySelector('.st-wrapper');
    if (wrapper) {
      wrapper.addEventListener('wheel', e => {
        // Shift+wheel: scroll horizontal nativo, não intercepta
        if (e.shiftKey) return;

        // Se há scroll horizontal disponível, converte wheel Y em scroll X
        const canScrollH = wrapper.scrollWidth > wrapper.clientWidth;
        const canScrollV = wrapper.scrollHeight > wrapper.clientHeight;

        if (canScrollH) {
          e.preventDefault();
          // Scroll horizontal com wheel Y (inverte direção para parecer natural)
          wrapper.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
        // Se não há scroll horizontal, deixa o scroll vertical nativo funcionar
      }, { passive: false });
    }

    // Tooltip: repassa scroll do wheel para a wrapper (mesma lógica)
    const tooltip = document.getElementById('stTooltip');
    if (tooltip) {
      tooltip.addEventListener('wheel', e => {
        const wr = document.querySelector('.st-wrapper');
        if (wr && wr.scrollWidth > wr.clientWidth) {
          e.preventDefault();
          wr.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
      }, { passive: false });
    }


  }

  // ============================================================
  // DADOS DE TESTE (injetados se não há registros)
  // ============================================================

  function _injetarDadosTeste() {
    if (typeof GTG === 'undefined' || !GTG.dados) return;
    if (!Array.isArray(GTG.dados.registros)) GTG.dados.registros = [];

    // Só injeta se não há registros reais
    if (GTG.dados.registros.filter(r => !r.isTest).length > 0) return;

    const hoje = new Date().toISOString().slice(0, 10);
    const ts   = Date.now();

    const mock = [
      { exercicioId: 'flexao',      valor: 22, unidade: 'reps' },
      { exercicioId: 'barra_fixa',  valor: 8,  unidade: 'reps' },
      { exercicioId: 'agachamento', valor: 30, unidade: 'reps' },
      { exercicioId: 'prancha',     valor: 75, unidade: 'seg'  },
      { exercicioId: 'grip',        valor: 25, unidade: 'reps' }
    ];

    mock.forEach((m, i) => {
      GTG.dados.registros.push({
        id:          `test_st_${i}`,
        exercicioId: m.exercicioId,
        valor:       m.valor,
        data:        hoje,
        timestamp:   ts - i * 1000,
        xp:          0,
        isTest:      true   // flag para não poluir stats reais
      });
    });


  }

  // ============================================================
  // ANIMAÇÃO SHAKE (CSS via classe — adiciona estilo inline único)
  // ============================================================

  (function _injetarAnimacaoShake() {
    if (document.getElementById('st-shake-style')) return;
    const style = document.createElement('style');
    style.id = 'st-shake-style';
    style.textContent = `
      @keyframes stShake {
        0%,100% { transform: translateX(0); }
        15%      { transform: translateX(-6px) rotate(-2deg); }
        30%      { transform: translateX(6px)  rotate(2deg);  }
        45%      { transform: translateX(-4px) rotate(-1deg); }
        60%      { transform: translateX(4px)  rotate(1deg);  }
        75%      { transform: translateX(-2px); }
      }
      .st-shake { animation: stShake 0.45s ease both !important; }

      @keyframes stHighlightPulse {
        0%   { box-shadow: 0 0 0 0 rgba(212,168,67,0); outline: 2px solid rgba(212,168,67,0); }
        30%  { box-shadow: 0 0 20px 6px rgba(212,168,67,0.4); outline: 2px solid var(--gold); }
        100% { box-shadow: 0 0 0 0 rgba(212,168,67,0); outline: 2px solid rgba(212,168,67,0); }
      }
      .st-highlight-pulse {
        animation: stHighlightPulse 2s ease forwards !important;
        border-radius: var(--card-radius);
      }
    `;
    document.head.appendChild(style);
  })();

  // ============================================================
  // EXPOSIÇÃO GLOBAL
  // ============================================================

  Object.assign(global, {
    renderSkillTree,
    filtrarCategoria,
    fecharTooltipSkilltree,
    irParaExercicioSkilltree,
    atualizarProgressoGeral,
    animarDesbloqueio,
    inicializarSkillTree,

    // Expostas para integração com switchTab do app.js
    _stRenderizar: renderSkillTree
  });

  // ============================================================
  // AUTO-BOOT: executa após DOM pronto (se inicializar() do app
  // não chamar inicializarSkillTree() explicitamente)
  // ============================================================

  // DESATIVADO: integração via app.js inicializar() + switchTab()
  // if (document.readyState === 'loading') {
  //   document.addEventListener('DOMContentLoaded', () => {
  //     setTimeout(inicializarSkillTree, 200);
  //   });
  // } else {
  //   setTimeout(inicializarSkillTree, 200);
  // }

})(window);
