<script setup>
import { computed } from 'vue'
import { celebration } from '../celebration.js'

const PALETTE = [
  '#f6e0b4',
  '#e9c88a',
  '#cbb9ff',
  '#a855f7',
  '#56c8ff',
  '#f7f3ec'
]
const GLYPHS = ['♪', '♫', '✦', '♩', '♬']

const pieces = computed(() => {
  if (!celebration.trigger) return []
  const amount = 64
  const t = celebration.trigger
  return Array.from({ length: amount }, (_, i) => {
    const isNote = i % 9 === 0
    const isDot = !isNote && i % 3 === 0
    return {
      id: `${t}-${i}`,
      x: 2 + Math.random() * 96,
      size: 5 + Math.random() * 9,
      ratio: 0.9 + Math.random() * 1.4,
      color: PALETTE[i % PALETTE.length],
      delay: Math.random() * 0.75,
      dur: 2.6 + Math.random() * 2.2,
      drift: (Math.random() * 220 - 110).toFixed(0) + 'px',
      rot: (Math.random() * 900 - 450).toFixed(0) + 'deg',
      radius: Math.random() > 0.5 ? '2px' : '50%',
      isNote,
      isDot,
      glyph: GLYPHS[i % GLYPHS.length]
    }
  })
})
</script>

<template>
  <div class="confetti-layer" aria-hidden="true">
    <span
      v-for="p in pieces"
      :key="p.id"
      class="confetti-piece"
      :class="{ 'is-note': p.isNote, 'is-dot': p.isDot }"
      :style="{
        '--x': p.x + '%',
        '--size': p.size + 'px',
        '--ratio': p.ratio,
        '--color': p.color,
        '--delay': p.delay + 's',
        '--dur': p.dur + 's',
        '--drift': p.drift,
        '--rot': p.rot,
        '--radius': p.radius
      }"
      >{{ p.isNote ? p.glyph : '' }}</span
    >
  </div>
</template>
