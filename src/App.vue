<script setup>
import { onMounted } from 'vue'
import BackgroundScene from './components/BackgroundScene.vue'
import HeroSection from './components/HeroSection.vue'
import LetterSection from './components/LetterSection.vue'
import BirthdayCake from './components/BirthdayCake.vue'
import WishCapsule from './components/WishCapsule.vue'
import FinalDedication from './components/FinalDedication.vue'
import ConfettiLayer from './components/ConfettiLayer.vue'
import BackgroundMusic from './components/BackgroundMusic.vue'

onMounted(() => {
  const targets = Array.from(document.querySelectorAll('[data-reveal]'))

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  )

  targets.forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="page">
    <BackgroundScene />
    <main>
      <HeroSection />
      <LetterSection />
      <WishCapsule />
      <FinalDedication />
    </main>
    <ConfettiLayer />
    <BackgroundMusic />
  </div>
</template>
