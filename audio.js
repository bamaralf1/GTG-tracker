function tocarSomPreparo(countdown) {
  if (countdown > 1) tocarRuido(.025, .06, 0, 3000, 8000);
  else tocarRuido(.03, .08, 0, 1000, 5000), tocarNota(1047, { vol: .18, dur: .12, wave: "sine" }), tocarNota(1319, { vol: .14, dur: .15, wave: "sine", delay: .08 })
}

function tocarSomInicioExercicio() {
  tocarRuido(.15, .06, 0, 500, 5000, .3);
  [523, 659, 784, 1047].forEach((f, i) => tocarNota(f, { vol: .16 - i * .02, dur: .2 + i * .05, rev: .2 + i * .05, delay: i * .12 }))
}

let audioMuted = !1;

function toggleAudio() {
  audioMuted = !audioMuted;
  setItem("gtg_audio_muted", JSON.stringify(audioMuted)).catch(e => console.warn("[storage]", e));
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

function vibrar(pattern = [200, 100, 200]) {
  navigator.vibrate && navigator.vibrate(pattern)
}

function somTimer() {
  vibrar([300, 100, 300]);
  [880, 1047, 1319, 1760].forEach((f, i) => tocarNota(f, { vol: .12, dur: .15, wave: "sine", atk: .003, rev: .2, delay: i * .12 }))
}

function tocarSomLembrete() {
  tocarNota(784, { vol: .1, dur: .15, rev: .3 }), tocarNota(1047, { vol: .14, dur: .2, rev: .35, delay: .15 })
}

