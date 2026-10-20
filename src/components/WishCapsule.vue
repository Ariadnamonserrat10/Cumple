<script setup>
import { ref } from 'vue'
import { Heart, Moon, Sparkles, Star, Sun, Gift } from 'lucide-vue-next'
import FloatingNotes from './FloatingNotes.vue'
import BirthdayCake from './BirthdayCake.vue'
import { celebrate } from '../celebration.js'

const open = ref(false)

const wishes = [
  { icon: Star, text: 'Que nunca te falten sueños que te quiten el sueño.' },
  {
    icon: Sparkles,
    text: 'Que cada obstáculo que superes te recuerde lo fuerte que has sido.'
  },
  { icon: Heart, text: 'Que el amor te rodee en forma de gente que te quiere de verdad.' },
  { icon: Sun, text: 'Que la felicidad te encuentre todos los días, incluso en lo pequeño.' },
  { icon: Gift, text: 'Que cumplas cada meta y celebres cada paso del camino.' },
  {
    icon: Moon,
    text: 'Que este nuevo año de vida te regale momentos inolvidables y mil razones para sonreír.'
  }
]

function onRevealed() {
  celebrate()
}

function onBlown() {
  open.value = true
  celebrate()
}

function onRelit() {
  open.value = false
}
</script>

<template>
  <section id="mensaje" class="section wishes">
    <FloatingNotes :count="5" :seed="33" :min-size="14" :max-size="26" :opacity="0.5" />

    <div class="section__inner wishes__inner">
      <p class="eyebrow" data-reveal>Un deseo para ti</p>
      <h2 class="section-title wishes__heading" data-reveal style="--reveal-delay: 0.1s">
        Hay algo guardado <em>solo para ti</em>
      </h2>

      <div class="wishes__stage" data-reveal style="--reveal-delay: 0.18s">
        <BirthdayCake @revealed="onRevealed" @blown="onBlown" @relit="onRelit" />
      </div>

      <ul class="wishes__list" :class="{ 'is-open': open }">
        <li v-for="(w, i) in wishes" :key="i" class="wishes__item" :style="{ '--i': i }">
          <component :is="w.icon" :size="17" :stroke-width="1.8" class="wishes__icon" />
          <p class="wishes__text">{{ w.text }}</p>
        </li>
      </ul>

      <p class="wishes__closer" :class="{ 'is-open': open }">
        Sigue brillando: lo mejor de tu vida está pasando ahora mismo.
      </p>
    </div>
  </section>
</template>

<style scoped>
.wishes {
  overflow: hidden;
}

.wishes__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.wishes__heading {
  max-width: 18ch;
}

.wishes__stage {
  width: 100%;
  margin-top: clamp(2rem, 6vw, 3.2rem);
  display: flex;
  justify-content: center;
}

/* ---------- Deseos ---------- */

.wishes__list {
  list-style: none;
  width: min(720px, 100%);
  max-height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  overflow: hidden;
  text-align: left;
  transition:
    max-height 0.9s var(--ease-out),
    opacity 0.6s var(--ease-out),
    margin 0.6s var(--ease-out);
}

.wishes__list.is-open {
  max-height: 640px;
  opacity: 1;
  margin: clamp(1.6rem, 5vw, 2.4rem) 0 0;
}

.wishes__item {
  display: flex;
  align-items: flex-start;
  gap: 0.8em;
  padding: 0.8rem 0.4rem;
  border-bottom: 1px solid rgba(203, 185, 255, 0.16);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s var(--ease-out),
    transform 0.55s var(--ease-out),
    background 0.35s var(--ease-out);
}

.wishes__item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.is-open .wishes__item {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--i) * 90ms + 220ms);
}

.wishes__icon {
  flex: 0 0 auto;
  margin-top: 0.28em;
  color: var(--gold);
  filter: drop-shadow(0 0 10px rgba(233, 200, 138, 0.45));
}

.wishes__text {
  margin: 0;
  font-size: clamp(1rem, 2.3vw, 1.1rem);
  line-height: 1.6;
  color: var(--text-soft);
}

.wishes__closer {
  max-height: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  text-align: center;
  font-family: var(--font-quote);
  font-style: italic;
  font-size: clamp(1.15rem, 2.8vw, 1.45rem);
  color: var(--gold-strong);
  transition:
    opacity 0.6s var(--ease-out) 0.75s,
    max-height 0.8s var(--ease-out),
    margin 0.6s var(--ease-out);
}

.wishes__closer.is-open {
  max-height: 180px;
  opacity: 1;
  margin: clamp(1.6rem, 5vw, 2.2rem) 0 0;
}

@media (max-width: 1024px) {
  .wishes__list.is-open {
    max-height: 760px;
  }
}

@media (max-width: 520px) {
  .wishes__heading {
    max-width: 22ch;
  }

  .wishes__item {
    padding: 0.7rem 0.2rem;
    gap: 0.65em;
  }

  .wishes__text {
    font-size: 0.96rem;
    line-height: 1.55;
  }

  .wishes__list.is-open {
    max-height: 1100px;
  }
}

</style>
