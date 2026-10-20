<script setup>
import FloatingNotes from './FloatingNotes.vue'
</script>

<template>
  <section id="carta" class="section letter-section">
    <FloatingNotes :count="6" :seed="21" :min-size="15" :max-size="30" :opacity="0.6" />

    <div class="section__inner letter-section__inner">
      <p class="eyebrow" data-reveal>Lo mejor de tu vida</p>
      <h2 class="section-title" data-reveal style="--reveal-delay: 0.1s">
        Una carta para <em>seguir brillando</em>
      </h2>

      <article class="letter glass" data-reveal style="--reveal-delay: 0.2s">
        <span class="letter__ornament" aria-hidden="true">✦</span>

        <p class="letter__verse">
          Que cada año que cumplas<br />
          sea un aplauso más alto,<br />
          que la vida te sorprenda<br />
          con todo lo que has soñado.
        </p>

        <p class="letter__verse">
          Que no te falte abrazo<br />
          ni ganas de continuar,<br />
          que cada meta alcanzada<br />
          abra un nuevo porvenir.
        </p>

        <p class="letter__verse">
          Que el amor te haga compañía,<br />
          que la risa te dé cobijo<br />
          y que nunca se te olvide<br />
          lo lejos que has venido.
        </p>

        <p class="letter__verse letter__verse--final">
          Sigue avanzando con el alma:<br />
          lo mejor de tu vida está por escribir.
        </p>

        <span class="letter__note letter__note--a" aria-hidden="true">♪</span>
        <span class="letter__note letter__note--b" aria-hidden="true">♫</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.letter-section {
  overflow: hidden;
}

.letter-section__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: clamp(0.9rem, 4vw, 2rem);
}

.letter {
  position: relative;
  width: min(720px, 100%);
  margin-top: clamp(1.6rem, 5vw, 2.6rem);
  padding: clamp(1.8rem, 6vw, 3.2rem) clamp(1.1rem, 6vw, 3.6rem);
  background:
    radial-gradient(120% 100% at 50% 0%, rgba(233, 200, 138, 0.14), transparent 62%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.028));
  transition:
    transform 0.45s var(--ease-out),
    border-color 0.45s var(--ease-out),
    box-shadow 0.45s var(--ease-out);
}

.letter:hover {
  transform: translateY(-4px);
  border-color: rgba(233, 200, 138, 0.4);
  box-shadow: var(--shadow-soft), 0 0 44px rgba(233, 200, 138, 0.18);
}

.letter__ornament {
  display: block;
  margin-bottom: 1.2rem;
  text-align: center;
  font-size: 1.05rem;
  letter-spacing: 0.5em;
  color: var(--gold);
  text-shadow: 0 0 22px rgba(233, 200, 138, 0.6);
}

.letter__verse {
  margin: 0 0 1.15rem;
  text-align: center;
  font-family: var(--font-quote);
  font-style: italic;
  font-size: clamp(1.02rem, 4.4vw, 1.3rem);
  line-height: 1.75;
  color: rgba(247, 243, 236, 0.9);
  overflow-wrap: break-word;
}

.letter__verse:last-of-type {
  margin-bottom: 0;
}

.letter__verse--final {
  padding-top: 1rem;
  border-top: 1px solid rgba(233, 200, 138, 0.28);
  color: var(--gold-strong);
}

.letter__note {
  position: absolute;
  color: var(--lilac);
  opacity: 0.5;
  text-shadow: 0 0 18px rgba(168, 85, 247, 0.6);
  animation: letterSway 9s ease-in-out infinite alternate;
  pointer-events: none;
}

.letter__note--a {
  top: 9%;
  left: clamp(0.4rem, 2.4vw, 1.2rem);
  font-size: clamp(0.9rem, 2.2vw, 1.3rem);
}

.letter__note--b {
  bottom: 11%;
  right: clamp(0.4rem, 2.4vw, 1.2rem);
  font-size: clamp(1rem, 2.6vw, 1.55rem);
  color: var(--electric);
  animation-duration: 12s;
  animation-direction: alternate-reverse;
}

@keyframes letterSway {
  from {
    transform: translate3d(0, 6px, 0) rotate(-10deg);
    opacity: 0.32;
  }
  to {
    transform: translate3d(-6px, -10px, 0) rotate(12deg);
    opacity: 0.72;
  }
}

@media (max-width: 520px) {
  .letter__note {
    opacity: 0.35;
  }

  .letter__note--a {
    top: 5%;
  }

  .letter__note--b {
    bottom: 6%;
  }

  .letter__verse {
    font-size: clamp(1rem, 4.8vw, 1.15rem);
    line-height: 1.7;
  }
}
</style>
