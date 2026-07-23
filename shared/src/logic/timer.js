export const REST_TIMER_PHASES = {
  NORMAL: { maxPct: 1.0, label: "RECUPERANDO" },
  WARNING: { maxPct: 0.5, label: "ATENÇÃO" },
  URGENT: { maxPct: 0.3, label: "URGENTE" },
  CRITICAL: { maxPct: 0.15, label: "CRÍTICO" }
};

export function getRestPhase(pct) {
  if (pct <= 0.15) return "critical";
  if (pct <= 0.3) return "urgent";
  if (pct <= 0.5) return "warning";
  return "normal";
}

export function getRestPhaseLabel(phase) {
  const labels = {
    critical: "FASE CRÍTICA",
    urgent: "FASE URGENTE",
    warning: "ATENÇÃO",
    normal: "RECUPERANDO"
  };
  return labels[phase] || "DESCANSO";
}

export function getRestPhaseColor(phase) {
  const colors = {
    critical: { primary: "#cc0000", secondary: "#ff3333" },
    urgent: { primary: "#e66600", secondary: "#ffaa00" },
    warning: { primary: "#d9a000", secondary: "#ffcc00" },
    normal: { primary: "#d4a843", secondary: "#ebd194" }
  };
  return colors[phase] || colors.normal;
}

export function getGlowIntensity(pct) {
  return Math.min(0.55, 0.06 + 0.5 * (1 - pct));
}
