<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Volume2, VolumeX } from 'lucide-vue-next'

const SOURCE = '/musica/cumple.mp3'

const muted = ref(false)
const blocked = ref(false)
const started = ref(false)

let el = null
let disposed = false

const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel']

function cleanupListeners() {
  EVENTS.forEach((ev) => window.removeEventListener(ev, onGesture, true))
}

async function attempt() {
  if (!el || disposed || started.value) return
  try {
    el.muted = false
    await el.play()
    started.value = true
    blocked.value = false
    cleanupListeners()
  } catch (e) {
    blocked.value = true
  }
}

function onGesture() {
  attempt()
}

function toggle() {
  if (!el) return
  muted.value = !muted.value
  el.muted = muted.value
  if (muted.value || started.value) return
  attempt()
}

onMounted(async () => {
  el = new Audio(SOURCE)
  el.loop = true
  el.preload = 'auto'
  el.volume = 0.6

  await attempt()

  if (!started.value) {
    EVENTS.forEach((ev) => window.addEventListener(ev, onGesture, { capture: true, passive: true }))
  }
})

onBeforeUnmount(() => {
  disposed = true
  cleanupListeners()
  if (el) {
    el.pause()
    el.src = ''
    el = null
  }
})
</script>

<template>
  <button
    class="sound-toggle"
    type="button"
    :aria-pressed="muted"
    :aria-label="muted ? 'Activar sonido' : 'Silenciar música'"
    @click="toggle"
  >
    <VolumeX v-if="muted" :size="18" :stroke-width="1.9" />
    <Volume2 v-else :size="18" :stroke-width="1.9" />
    <span class="sound-toggle__label">{{ muted ? 'Sin sonido' : 'Música sonando' }}</span>
  </button>
</template>

<style scoped>
.sound-toggle {
  position: fixed;
  top: max(1rem, env(safe-area-inset-top));
  right: clamp(0.9rem, 3vw, 1.6rem);
  z-index: 80;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.55rem 0.95rem;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: rgba(10, 15, 38, 0.62);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  color: var(--text);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  box-shadow: 0 12px 30px rgba(2, 4, 14, 0.5);
  transition:
    color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out),
    background 0.3s var(--ease-out),
    transform 0.3s var(--ease-out);
}

.sound-toggle:hover {
  transform: translateY(-2px);
  color: #fff;
  border-color: rgba(233, 200, 138, 0.55);
  background: rgba(168, 85, 247, 0.22);
}

.sound-toggle__label {
  white-space: nowrap;
}

@media (max-width: 520px) {
  .sound-toggle__label {
    display: none;
  }
}
</style>
