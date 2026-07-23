export function getHoje() {
  return new Date().toISOString().slice(0, 10);
}

export function getOntem() {
  return new Date(Date.now() - 86400000).toISOString().slice(0, 10);
}

export function getInicioSemana(data) {
  const parsed = new Date(data + "T12:00:00");
  const diaSemana = parsed.getDay();
  const diff = parsed.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
  return new Date(parsed.setDate(diff)).toISOString().slice(0, 10);
}

export function getDiasEntre(d1, d2) {
  const a = new Date(d1 + "T12:00:00");
  const b = new Date(d2 + "T12:00:00");
  return Math.floor((b - a) / 86400000);
}

export function formatDateBR(data) {
  if (!data) return "—";
  const parts = data.split("-");
  return parts.length !== 3 ? data : `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function getDiaSemanaLabel(dia) {
  return ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"][dia] || "";
}

export function getMesLabel(mes) {
  return ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"][mes] || "";
}
