<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, default: 7 },
  glyphs: { type: Array, default: () => ['♪', '♫', '♩', '♬', '✦'] },
  seed: { type: Number, default: 1 },
  minSize: { type: Number, default: 16 },
  maxSize: { type: Number, default: 34 },
  minDur: { type: Number, default: 13 },
  maxDur: { type: Number, default: 24 },
  opacity: { type: Number, default: 0.75 },
  tint: { type: String, default: '' }
})

function rand(min, max) {
  return min + Math.random() * (max - min)
}

const notes = computed(() =>
  Array.from({ length: props.count }, (_, i) => {
    const drift = rand(-60, 60)
    return {
      id: `${props.seed}-${i}`,
      glyph: props.glyphs[i % props.glyphs.length],
      left: rand(2, 94),
      size: rand(props.minSize, props.maxSize),
      dur: rand(props.minDur, props.maxDur),
      delay: -rand(0, props.maxDur),
      drift: drift.toFixed(1),
      op: (props.opacity * rand(0.55, 1)).toFixed(2),
      tint: props.tint
    }
  })
)
</script>

<template>
  <div class="notes-layer" aria-hidden="true">
    <span
      v-for="n in notes"
      :key="n.id"
      class="fn"
      :style="{
        left: n.left + '%',
        fontSize: n.size + 'px',
        '--dur': n.dur + 's',
        '--delay': n.delay + 's',
        '--drift': n.drift + 'px',
        '--op': n.op,
        color: n.tint || undefined
      }"
      >{{ n.glyph }}</span
    >
  </div>
</template>
