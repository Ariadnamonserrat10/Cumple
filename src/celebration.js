import { reactive } from 'vue'

export const celebration = reactive({
  trigger: 0
})

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function celebrate() {
  celebration.trigger += 1
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  el.scrollIntoView({ behavior, block: 'start' })
}
