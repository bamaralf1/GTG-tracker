export const NIVEIS = [
  { nome: "RECRUTA",       icone: "🎖", min: 0,       proximo: 1200,  estrelas: 0, divisao: "Tropa",          descricao: "Seu serviço começa agora. Obedeça, treine, fortaleça-se." },
  { nome: "ASPIRANTE",     icone: "🪖", min: 1200,    proximo: 3000,  estrelas: 0, divisao: "Tropa",          descricao: "O aspirante que prova seu valor a cada série executada." },
  { nome: "SOLDADO",       icone: "🔰", min: 3000,    proximo: 6000,  estrelas: 1, divisao: "Tropa",          descricao: "A base do exército. Forja-se no aço da repetição." },
  { nome: "CABO",          icone: "⚡",  min: 6000,    proximo: 11000, estrelas: 1, divisao: "Tropa",          descricao: "Lidera pelo exemplo. Cada repetição é uma ordem cumprida." },
  { nome: "3º SARGENTO",   icone: "⭐",  min: 11000,   proximo: 18000, estrelas: 2, divisao: "Graduado",       descricao: "Graduado que impõe disciplina e precisão nos treinos." },
  { nome: "2º SARGENTO",   icone: "🌟", min: 18000,   proximo: 28000, estrelas: 2, divisao: "Graduado",       descricao: "Veterano das séries. Sua consistência inspira a tropa." },
  { nome: "1º SARGENTO",   icone: "🎗", min: 28000,   proximo: 42000, estrelas: 3, divisao: "Graduado",       descricao: "O braço direito do oficial. A execução é impecável." },
  { nome: "SUBTENENTE",    icone: "🏅", min: 42000,   proximo: 62000, estrelas: 3, divisao: "Oficial",        descricao: "Ponte entre a tropa e o comando. Respeitado por todos." },
  { nome: "TENENTE",       icone: "⚔",  min: 62000,   proximo: 88000, estrelas: 3, divisao: "Oficial",        descricao: "Comanda pelotões. Sua zona de combate é o corpo." },
  { nome: "CAPITÃO",       icone: "🎯", min: 88000,   proximo: 120000,estrelas: 4, divisao: "Oficial",        descricao: "Lidera companhias. Estratégia e força andam juntas." },
  { nome: "MAJOR",         icone: "🦁", min: 120000,  proximo: 165000,estrelas: 4, divisao: "Oficial Superior",descricao: "Estado-maior do corpo. Planeja a batalha diária." },
  { nome: "TENENTE-CORONEL",icone: "👑",min: 165000,  proximo: 225000,estrelas: 4, divisao: "Oficial Superior",descricao: "Vice-comandante. Sua resistência é lendária." },
  { nome: "CORONEL",       icone: "🔱", min: 225000,  proximo: 310000,estrelas: 5, divisao: "Oficial Superior",descricao: "Comanda regimentos. A experiência forja o caráter." },
  { nome: "COMANDANTE",    icone: "★",  min: 310000,  proximo: 420000,estrelas: 5, divisao: "Alto Comando",   descricao: "Lidera divisões. Sua palavra é lei nos campos de treino." },
  { nome: "GENERAL DE BRIGADA",icone: "✪",min: 420000,proximo: 560000,estrelas: 5, divisao: "Alto Comando",   descricao: "Comanda brigadas. A tropa segue seu exemplo." },
  { nome: "GENERAL DE DIVISÃO",icone: "💀",min: 560000,proximo: 750000,estrelas: 6, divisao: "Alto Comando",   descricao: "Lidera divisões completas. Lenda viva do treinamento." },
  { nome: "GENERAL DE EXÉRCITO",icone: "⚜",min: 750000,proximo: 1000000,estrelas: 6,divisao:"Lenda",         descricao: "O mais alto escalão. Seu nome é sinônimo de disciplina." },
  { nome: "LENDA VIVA",    icone: "🏆", min: 1000000, proximo: 9999999,estrelas: 7,divisao:"Lenda",           descricao: "Você transcendeu. Pavel cumprimenta você." },
];

export function getNivel(xp) {
  for (let i = NIVEIS.length - 1; i >= 0; i--) {
    if (xp >= NIVEIS[i].min) return NIVEIS[i];
  }
  return NIVEIS[0];
}

export function getRankMult(nivelNome) {
  const level = NIVEIS.find(n => n.nome === nivelNome) || NIVEIS[0];
  const idx = NIVEIS.indexOf(level);
  if (idx < 0) return 1;
  if (idx <= 3)  return 1.0;
  if (idx <= 6)  return 0.90;
  if (idx <= 9)  return 0.78;
  if (idx <= 12) return 0.64;
  if (idx <= 15) return 0.50;
  if (idx <= 18) return 0.38;
  return 0.28;
}
