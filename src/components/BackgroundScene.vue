<script setup>
import { computed } from 'vue'

const stars = computed(() =>
  Array.from({ length: 58 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.6,
    dur: 3.5 + Math.random() * 6,
    delay: -Math.random() * 8,
    op: 0.4 + Math.random() * 0.6
  }))
)
</script>

<template>
  <div class="scene" aria-hidden="true">
    <div class="scene__base"></div>
    <div class="scene__orb scene__orb--a"></div>
    <div class="scene__orb scene__orb--b"></div>
    <div class="scene__orb scene__orb--c"></div>
    <div class="scene__beams">
      <span class="beam beam--1"></span>
      <span class="beam beam--2"></span>
      <span class="beam beam--3"></span>
    </div>
    <span
      v-for="s in stars"
      :key="s.id"
      class="spark"
      :style="{
        top: s.top + '%',
        left: s.left + '%',
        '--size': s.size + 'px',
        '--dur': s.dur + 's',
        '--delay': s.delay + 's',
        '--op': s.op
      }"
    ></span>
    <div class="scene__vignette"></div>
  </div>
</template>

<style scoped>
.scene {
  position: fixed;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
}

.scene__base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 50% -10%, #1a1246 0%, transparent 60%),
    radial-gradient(90% 70% at 12% 20%, rgba(109, 53, 201, 0.35) 0%, transparent 55%),
    radial-gradient(85% 65% at 88% 30%, rgba(38, 70, 160, 0.32) 0%, transparent 58%),
    linear-gradient(180deg, var(--bg-night) 0%, var(--bg-deep) 55%, #06081a 100%);
}

.scene__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.55;
  will-change: transform;
}

.scene__orb--a {
  top: -14vh;
  left: -12vw;
  width: 52vw;
  height: 52vw;
  max-width: 720px;
  max-height: 720px;
  background: radial-gradient(circle at 35% 35%, rgba(168, 85, 247, 0.55), transparent 65%);
  animation: driftA 26s ease-in-out infinite alternate;
}

.scene__orb--b {
  top: 28vh;
  right: -18vw;
  width: 46vw;
  height: 46vw;
  max-width: 640px;
  max-height: 640px;
  background: radial-gradient(circle at 60% 40%, rgba(86, 200, 255, 0.4), transparent 65%);
  animation: driftB 32s ease-in-out infinite alternate;
}

.scene__orb--c {
  bottom: -20vh;
  left: 30vw;
  width: 55vw;
  height: 55vw;
  max-width: 760px;
  max-height: 760px;
  background: radial-gradient(circle at 50% 50%, rgba(233, 200, 138, 0.24), transparent 62%);
  animation: driftA 38s ease-in-out infinite alternate-reverse;
}

.scene__beams {
  position: absolute;
  inset: 0;
}

.beam {
  position: absolute;
  top: -20%;
  width: 26vw;
  height: 110vh;
  background: linear-gradient(
    180deg,
    rgba(203, 185, 255, 0.16) 0%,
    rgba(86, 200, 255, 0.07) 40%,
    transparent 78%
  );
  clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);
  transform-origin: top center;
  opacity: 0.5;
}

.beam--1 {
  left: 4vw;
  transform: rotate(11deg);
  animation: beamSway 14s ease-in-out infinite alternate;
}

.beam--2 {
  right: 6vw;
  transform: rotate(-13deg);
  animation: beamSway 17s ease-in-out infinite alternate-reverse;
}

.beam--3 {
  left: 42vw;
  width: 18vw;
  opacity: 0.35;
  animation: beamSway 21s ease-in-out infinite alternate;
}

.scene__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    115% 85% at 50% 45%,
    transparent 40%,
    rgba(3, 4, 12, 0.72) 100%
  );
}

@keyframes driftA {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(6vw, 5vh, 0) scale(1.12);
  }
}

@keyframes driftB {
  from {
    transform: translate3d(0, 0, 0) scale(1.05);
  }
  to {
    transform: translate3d(-5vw, -6vh, 0) scale(1);
  }
}

@keyframes beamSway {
  from {
    transform: rotate(-6deg) scaleX(0.9);
    opacity: 0.28;
  }
  to {
    transform: rotate(7deg) scaleX(1.08);
    opacity: 0.6;
  }
}
</style>
