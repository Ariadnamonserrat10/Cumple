<script setup>
const notes = [
  { glyph: '♪', cls: 'note--left-1' },
  { glyph: '♫', cls: 'note--left-2' },
  { glyph: '♩', cls: 'note--right-1' },
  { glyph: '♬', cls: 'note--right-2' }
]
</script>

<template>
  <footer class="section dedication">
    <div class="section__inner dedication__inner">
      <span
        v-for="n in notes"
        :key="n.cls"
        class="dedication__note"
        :class="n.cls"
        aria-hidden="true"
        >{{ n.glyph }}</span
      >

      <p class="dedication__phrase" data-reveal>
        Que sepas que nunca estás solo.<br />
        Siempre estaré para ti: hoy, mañana y en cada paso del camino.
      </p>

      <span class="dedication__rule" data-reveal style="--reveal-delay: 0.12s" aria-hidden="true"></span>

      <p class="dedication__signature" data-reveal style="--reveal-delay: 0.2s">
        Con cariño para ti de Ari
      </p>
    </div>
  </footer>
</template>

<style scoped>
.dedication {
  padding-top: clamp(3rem, 8vh, 5rem);
  padding-bottom: clamp(5rem, 14vh, 9rem);
  overflow: hidden;
}

.dedication__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(2.4rem, 6vw, 3.6rem) clamp(1.4rem, 7vw, 5rem);
  border-top: 1px solid rgba(203, 185, 255, 0.16);
}

.dedication__inner::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: min(340px, 70%);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-gold), transparent);
}

.dedication__phrase {
  margin: 0;
  max-width: 46ch;
  font-family: var(--font-quote);
  font-size: clamp(1.15rem, 2.7vw, 1.55rem);
  font-style: italic;
  line-height: 1.6;
  color: rgba(247, 243, 236, 0.88);
}

.dedication__rule {
  display: block;
  width: clamp(70px, 22vw, 130px);
  height: 1px;
  margin: clamp(1.6rem, 4vw, 2.4rem) 0;
  background: linear-gradient(90deg, transparent, rgba(233, 200, 138, 0.75), transparent);
}

.dedication__signature {
  margin: 0;
  font-family: var(--font-script);
  font-size: clamp(1.9rem, 6vw, 3rem);
  line-height: 1.3;
  color: var(--lilac);
  opacity: 0.72;
  text-shadow: 0 0 34px rgba(168, 85, 247, 0.42);
}

.dedication__note {
  position: absolute;
  color: var(--lilac);
  opacity: 0.5;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.55);
  animation: delicateFloat 9s ease-in-out infinite alternate;
  pointer-events: none;
}

.note--left-1 {
  left: clamp(0.4rem, 5vw, 3rem);
  top: 26%;
  font-size: clamp(1.1rem, 2.6vw, 1.5rem);
}

.note--left-2 {
  left: clamp(1.4rem, 9vw, 5rem);
  bottom: 18%;
  font-size: clamp(0.9rem, 2.2vw, 1.2rem);
  animation-duration: 12s;
  animation-direction: alternate-reverse;
  color: var(--electric);
}

.note--right-1 {
  right: clamp(0.4rem, 5vw, 3rem);
  top: 30%;
  font-size: clamp(1.2rem, 2.8vw, 1.65rem);
  animation-duration: 11s;
  animation-direction: alternate-reverse;
}

.note--right-2 {
  right: clamp(1.4rem, 9vw, 5rem);
  bottom: 16%;
  font-size: clamp(0.9rem, 2.2vw, 1.2rem);
  animation-duration: 13s;
  color: var(--gold);
}

@keyframes delicateFloat {
  from {
    transform: translate3d(0, 8px, 0) rotate(-10deg);
    opacity: 0.3;
  }
  to {
    transform: translate3d(-6px, -12px, 0) rotate(12deg);
    opacity: 0.7;
  }
}
</style>
