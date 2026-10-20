<script setup>
import { ref } from 'vue'
import { Flame } from 'lucide-vue-next'

const emit = defineEmits(['revealed', 'blown', 'relit'])

const revealed = ref(false)
const out = ref(false)

const candles = [0, 1, 2, 3, 4]
const puffs = [0, 1, 2]

function reveal() {
  if (revealed.value) return
  revealed.value = true
  emit('revealed')
}

function toggle() {
  if (!revealed.value) return
  out.value = !out.value
  emit(out.value ? 'blown' : 'relit')
}
</script>

<template>
  <div class="scene">
    <div class="cake-stage" :class="{ 'is-mystery': !revealed, 'is-out': out }">
      <button
        v-if="!revealed"
        class="mystery"
        type="button"
        aria-label="Descubrir la sorpresa"
        @click="reveal"
      >
        <span class="mystery__q" aria-hidden="true">?</span>
        <span class="mystery__hint">toca para descubrir</span>
        <span class="mystery__sparkle mystery__sparkle--a" aria-hidden="true">✦</span>
        <span class="mystery__sparkle mystery__sparkle--b" aria-hidden="true">✧</span>
        <span class="mystery__sparkle mystery__sparkle--c" aria-hidden="true">✦</span>
      </button>

      <button
        class="cake"
        type="button"
        :disabled="!revealed"
        :aria-pressed="out"
        :aria-label="out ? 'Encender las velas de nuevo' : 'Apagar las velas'"
        @click="toggle"
      >
        <span class="cake__candles" aria-hidden="true">
          <span
            v-for="c in candles"
            :key="c"
            class="candle"
            :class="{ 'candle--tall': c === 2 }"
            :style="{ '--i': c }"
          >
            <span class="candle__flame"></span>
            <span
              v-for="p in puffs"
              :key="p"
              class="candle__smoke"
              :style="{ '--p': p }"
            ></span>
            <span class="candle__wick"></span>
            <span class="candle__body"></span>
          </span>
        </span>

        <span class="cake__tier cake__tier--top" aria-hidden="true">
          <span class="cake__drips"></span>
          <span class="cake__sprinkles"></span>
        </span>

        <span class="cake__tier cake__tier--bottom" aria-hidden="true">
          <span class="cake__drips"></span>
          <span class="cake__sprinkles"></span>
        </span>

        <span class="cake__plate" aria-hidden="true"></span>
        <span class="cake__glow" aria-hidden="true"></span>
      </button>
    </div>

    <Transition name="pop">
      <p v-if="revealed" class="cake__banner" :class="{ 'is-glowing': out }">
        Felices 22 años
      </p>
    </Transition>

    <Transition name="pop">
      <button
        v-if="revealed"
        class="btn cake__btn"
        :class="{ 'btn--ghost': out }"
        type="button"
        :aria-pressed="out"
        @click="toggle"
      >
        <Flame :size="17" :stroke-width="1.9" />
        {{ out ? 'Encender las velas de nuevo' : 'Apagar las velas' }}
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cake-stage {
  position: relative;
  width: min(420px, 88vw);
  display: flex;
  justify-content: center;
  transition: transform 0.9s var(--ease-out);
}

.cake-stage.is-mystery {
  transform: scale(0.92);
}

/* ---------- Velo misterioso ---------- */

.mystery {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 6;
  width: min(320px, 78%);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: 1px solid rgba(203, 185, 255, 0.35);
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 42%,
    rgba(168, 85, 247, 0.42) 0%,
    rgba(10, 15, 38, 0.82) 62%,
    rgba(10, 15, 38, 0.55) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    0 0 60px rgba(168, 85, 247, 0.4),
    inset 0 0 40px rgba(203, 185, 255, 0.18);
  cursor: pointer;
  transition:
    transform 0.4s var(--ease-out),
    box-shadow 0.4s var(--ease-out),
    opacity 0.55s var(--ease-out);
  animation: veilBreath 4s ease-in-out infinite alternate;
}

.mystery:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow:
    0 0 80px rgba(233, 200, 138, 0.45),
    inset 0 0 44px rgba(203, 185, 255, 0.24);
}

.mystery__q {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 8vw, 3.6rem);
  line-height: 1;
  color: var(--gold-strong);
  text-shadow: 0 0 30px rgba(233, 200, 138, 0.65);
}

.mystery__hint {
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(247, 243, 236, 0.78);
}

.mystery__sparkle {
  position: absolute;
  color: var(--lilac);
  text-shadow: 0 0 16px rgba(203, 185, 255, 0.9);
  animation: sparkleFloat 3.6s ease-in-out infinite alternate;
}

.mystery__sparkle--a {
  top: 14%;
  right: 18%;
  font-size: 1rem;
}

.mystery__sparkle--b {
  bottom: 20%;
  left: 14%;
  font-size: 1.25rem;
  color: var(--gold);
  animation-delay: 1.1s;
}

.mystery__sparkle--c {
  top: 22%;
  left: 22%;
  font-size: 0.85rem;
  animation-delay: 2.2s;
}

/* ---------- Pastel ---------- */

.cake {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transition:
    transform 0.5s var(--ease-out),
    filter 0.7s var(--ease-out);
  animation: cakeIn 0.9s var(--ease-out);
}

.cake:disabled {
  cursor: default;
}

.cake:not(:disabled):hover {
  transform: translateY(-4px);
}

.cake:not(:disabled):active {
  transform: translateY(-1px) scale(0.99);
}

.cake__candles {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(14px, 4.6vw, 26px);
  height: clamp(74px, 16vw, 96px);
  margin-bottom: 4px;
}

.candle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.candle--tall .candle__body {
  height: clamp(42px, 9vw, 52px);
}

.candle__flame {
  position: relative;
  z-index: 3;
  width: clamp(12px, 2.8vw, 15px);
  height: clamp(22px, 5vw, 28px);
  margin-bottom: 4px;
  border-radius: 50% 50% 50% 50% / 62% 62% 38% 38%;
  background: radial-gradient(
    circle at 50% 74%,
    #fff9e8 0%,
    #ffe08a 34%,
    #ffb24d 62%,
    rgba(255, 130, 60, 0.55) 84%,
    rgba(255, 120, 60, 0) 100%
  );
  box-shadow:
    0 0 18px rgba(255, 198, 100, 0.9),
    0 0 46px rgba(255, 165, 70, 0.55);
  transform-origin: bottom center;
  animation:
    ignite 0.45s ease-out both,
    flicker 1.4s ease-in-out 0.45s infinite alternate;
}

.is-out .candle__flame {
  opacity: 0;
  transition: opacity 0.18s linear;
  transition-delay: calc(var(--i, 0) * 70ms + 620ms);
  animation: blowOut 0.7s cubic-bezier(0.3, 0.9, 0.4, 1) forwards;
  animation-delay: calc(var(--i, 0) * 70ms);
}

.candle__smoke {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: rgba(247, 243, 236, 0.6);
  filter: blur(1.6px);
  opacity: 0;
  pointer-events: none;
}

.is-out .candle__smoke {
  animation: smokeRise 2.4s ease-out 5;
  animation-delay: calc(var(--p) * 750ms + var(--i) * 140ms + 450ms);
}

.candle__wick {
  width: 2px;
  height: 5px;
  border-radius: 1px;
  background: #3a2c1a;
}

.candle__body {
  width: clamp(9px, 2.2vw, 12px);
  height: clamp(30px, 7vw, 38px);
  border-radius: 4px;
  background: repeating-linear-gradient(
    48deg,
    var(--warm-white) 0 5px,
    var(--gold) 5px 10px
  );
  box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.2);
}

/* Capas */

.cake__tier {
  position: relative;
  border-radius: 16px 16px 12px 12px;
  box-shadow:
    inset 0 -14px 24px rgba(0, 0, 0, 0.24),
    0 18px 38px rgba(2, 4, 14, 0.5);
}

.cake__tier--top {
  width: 56%;
  height: clamp(60px, 13vw, 76px);
  background: linear-gradient(160deg, #8a5cd6 0%, #6d35c9 55%, #4d2392 100%);
}

.cake__tier--bottom {
  width: 90%;
  height: clamp(74px, 16vw, 96px);
  margin-top: 5px;
  background: linear-gradient(160deg, #b48ae8 0%, #7c4ddb 52%, #54279e 100%);
}

.cake__drips {
  position: absolute;
  top: -9px;
  left: 0;
  right: 0;
  height: 19px;
  background-image: radial-gradient(circle at 10px 0, #f7f3ec 8px, transparent 9px);
  background-size: 20px 20px;
  background-repeat: repeat-x;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.22));
}

.cake__sprinkles {
  position: absolute;
  inset: 18px 10px 10px;
  background-image:
    radial-gradient(circle at 18% 28%, var(--gold) 1.7px, transparent 2.3px),
    radial-gradient(circle at 58% 62%, #f7f3ec 1.7px, transparent 2.3px),
    radial-gradient(circle at 82% 22%, var(--lilac) 1.7px, transparent 2.3px),
    radial-gradient(circle at 38% 78%, var(--electric) 1.7px, transparent 2.3px),
    radial-gradient(circle at 72% 48%, var(--gold) 1.5px, transparent 2.1px);
  opacity: 0.9;
}

.cake__plate {
  width: 106%;
  height: clamp(12px, 2.6vw, 16px);
  margin-top: 6px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(247, 243, 236, 0.92), rgba(203, 185, 255, 0.35));
  box-shadow: 0 12px 30px rgba(2, 4, 14, 0.6);
}

.cake__glow {
  position: absolute;
  bottom: -4%;
  left: 50%;
  width: 120%;
  height: 42%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 186, 88, 0.45), transparent 68%);
  opacity: 0.95;
  transition: opacity 0.8s var(--ease-out);
  pointer-events: none;
}

.is-out .cake__glow {
  opacity: 0.1;
}

/* ---------- Felicitación ---------- */

.cake__banner {
  margin: clamp(1.2rem, 4vw, 1.8rem) 0 0;
  font-family: var(--font-script);
  font-size: clamp(2.4rem, 8vw, 3.6rem);
  line-height: 1.2;
  color: var(--gold-strong);
  text-shadow: 0 0 30px rgba(233, 200, 138, 0.35);
  transition:
    text-shadow 0.7s var(--ease-out),
    color 0.7s var(--ease-out);
}

.cake__banner.is-glowing {
  color: #fff4dc;
  text-shadow:
    0 0 26px rgba(233, 200, 138, 0.9),
    0 0 70px rgba(168, 85, 247, 0.6);
}

.cake__btn {
  margin-top: clamp(1.3rem, 4vw, 1.8rem);
}

/* ---------- Transiciones ---------- */

.pop-enter-active {
  transition:
    opacity 0.6s var(--ease-out),
    transform 0.6s var(--ease-out);
}

.pop-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.94);
}

/* ---------- Animaciones ---------- */

@keyframes ignite {
  0% {
    opacity: 0;
    transform: scale(0.1) translateY(4px);
  }
  60% {
    opacity: 1;
    transform: scale(1.14) translateY(-1px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes flicker {
  0% {
    transform: translateX(-1.2px) scaleY(1) rotate(-2.5deg);
    opacity: 0.92;
  }
  35% {
    transform: translateX(1.4px) scaleY(1.07) rotate(2deg);
    opacity: 1;
  }
  70% {
    transform: translateX(-0.6px) scaleY(0.97) rotate(-1deg);
    opacity: 0.95;
  }
  100% {
    transform: translateX(1px) scaleY(1.04) rotate(1.5deg);
    opacity: 1;
  }
}

@keyframes blowOut {
  0% {
    transform: rotate(0deg) scaleY(1);
    opacity: 1;
  }
  16% {
    transform: rotate(-16deg) scaleY(1.14) translateX(-1px);
    opacity: 1;
  }
  42% {
    transform: rotate(12deg) scaleY(0.72) translateY(1px);
    opacity: 0.95;
  }
  72% {
    transform: rotate(-5deg) scaleY(0.3) translateY(-4px);
    opacity: 0.45;
  }
  100% {
    transform: rotate(0deg) scaleY(0.06) translateY(-10px);
    opacity: 0;
  }
}

@keyframes smokeRise {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.7);
  }
  18% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translate(6px, -48px) scale(2.6);
  }
}

@keyframes veilBreath {
  from {
    box-shadow:
      0 0 46px rgba(168, 85, 247, 0.34),
      inset 0 0 34px rgba(203, 185, 255, 0.16);
  }
  to {
    box-shadow:
      0 0 78px rgba(233, 200, 138, 0.4),
      inset 0 0 44px rgba(203, 185, 255, 0.24);
  }
}

@keyframes sparkleFloat {
  from {
    transform: translateY(4px) scale(0.85);
    opacity: 0.45;
  }
  to {
    transform: translateY(-8px) scale(1.2);
    opacity: 1;
  }
}
</style>
