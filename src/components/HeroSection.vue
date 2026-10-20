<script setup>
import { ChevronDown } from 'lucide-vue-next'
import FloatingNotes from './FloatingNotes.vue'
import { scrollToSection } from '../celebration.js'

const bars = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  height: 22 + Math.abs(Math.sin(i * 0.72)) * 66 + (i % 3) * 6,
  delay: -(i * 0.11),
  dur: 1.4 + ((i * 37) % 10) / 9
}))
</script>

<template>
  <section id="inicio" class="section hero">
    <FloatingNotes :count="9" :seed="7" :min-size="15" :max-size="32" />

    <div class="hero__rings" aria-hidden="true">
      <span
        v-for="i in 4"
        :key="i"
        class="sound-ring"
        :style="{
          '--d': 260 + i * 150 + 'px',
          '--dur': 6 + i * 1.4 + 's',
          '--delay': i * 1.1 + 's'
        }"
      ></span>
    </div>

    <div class="hero__inner">
      <p class="eyebrow" data-reveal>Un regalo pensado en ti</p>

      <h1 class="hero__title" data-reveal style="--reveal-delay: 0.12s">
        ¡Feliz Cumpleaños,<br />
        <span class="hero__name">Udis!</span>
      </h1>

      <p class="hero__phrase" data-reveal style="--reveal-delay: 0.24s">
        Que la vida siga regalándote motivos para soñar, avanzar y celebrar cada cosa
        bonita que construyes.
      </p>

      <div class="hero__wave" aria-hidden="true" data-reveal style="--reveal-delay: 0.34s">
        <span
          v-for="b in bars"
          :key="b.id"
          class="hero__bar"
          :style="{
            height: b.height + '%',
            animationDelay: b.delay + 's',
            animationDuration: b.dur + 's'
          }"
        ></span>
      </div>

      <div class="hero__hint" data-reveal style="--reveal-delay: 0.5s">
        <ChevronDown
          :size="17"
          :stroke-width="1.6"
          class="hero__hint-icon"
          @click="scrollToSection('carta')"
        />
        <span>Desliza para descubrir más</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: clamp(5rem, 14vh, 9rem);
  padding-bottom: clamp(4rem, 12vh, 7rem);
  overflow: hidden;
}

.hero__rings {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 2;
  width: min(900px, 100%);
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 8.4vw, 5.6rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--warm-white);
  text-shadow: 0 18px 60px rgba(4, 6, 18, 0.7);
}

.hero__name {
  display: inline-block;
  padding-top: 0.08em;
  background: linear-gradient(
    100deg,
    var(--gold-strong) 0%,
    var(--gold) 28%,
    var(--lilac) 58%,
    var(--electric) 84%,
    var(--gold-strong) 100%
  );
  background-size: 240% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmerText 8s ease-in-out infinite;
  filter: drop-shadow(0 0 26px rgba(233, 200, 138, 0.3));
}

.hero__phrase {
  margin: clamp(1.3rem, 3vw, 1.9rem) auto 0;
  max-width: 34ch;
  font-family: var(--font-quote);
  font-size: clamp(1.15rem, 2.6vw, 1.5rem);
  font-style: italic;
  line-height: 1.55;
  color: rgba(247, 243, 236, 0.86);
}

.hero__wave {
  display: flex;
  align-items: center;
  gap: clamp(3px, 0.9vw, 6px);
  height: clamp(52px, 9vw, 78px);
  margin-top: clamp(1.6rem, 4vw, 2.4rem);
  padding: 0 0.4rem;
}

.hero__bar {
  width: clamp(3px, 0.75vw, 5px);
  min-height: 6px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--electric), var(--violet) 55%, rgba(168, 85, 247, 0.25));
  box-shadow: 0 0 12px rgba(86, 200, 255, 0.35);
  transform-origin: center;
  animation-name: barDance;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.hero__hint {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  margin-top: clamp(2.2rem, 6vw, 3.4rem);
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.hero__hint-icon {
  cursor: pointer;
  animation: hintBounce 2.2s ease-in-out infinite;
  transition: color 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.hero__hint-icon:hover {
  color: var(--gold);
  transform: translateY(3px);
}

@keyframes shimmerText {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes barDance {
  from {
    transform: scaleY(0.32);
    opacity: 0.55;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes hintBounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }
  50% {
    transform: translateY(5px);
    opacity: 1;
  }
}
</style>
