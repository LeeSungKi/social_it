import { defineNuxtPlugin } from '#app'

interface RevealBinding {
  delay?: number
  once?: boolean
  rootMargin?: string
  threshold?: number | number[]
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export default defineNuxtPlugin((nuxtApp) => {
  const ioMap = new WeakMap<Element, IntersectionObserver>()

  // Track scroll direction globally (down-only reveal)
  let lastY = 0
  let dir: 'down' | 'up' = 'down'
  let startedScroll = false
  if (typeof window !== 'undefined') {
    lastY = window.scrollY || 0
    const onScroll = () => {
      const y = window.scrollY || 0
      dir = y >= lastY ? 'down' : 'up'
      if (y !== lastY) startedScroll = true
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  function mount(el: HTMLElement, binding: any) {
    // Determine direction via modifiers or value.direction
    const modifiers = binding.modifiers || {}
    const value: RevealBinding = (typeof binding.value === 'object' && binding.value) ? binding.value : {}

    let direction: RevealBinding['direction'] = value.direction
    if (!direction) {
      if (modifiers.up) direction = 'up'
      else if (modifiers.down) direction = 'down'
      else if (modifiers.left) direction = 'left'
      else if (modifiers.right) direction = 'right'
      else if (modifiers.scale) direction = 'scale'
    }

    // Default to once=true so elements won't re-animate
    const once = typeof value.once === 'boolean' ? value.once : true
    const delay = typeof value.delay === 'number' ? value.delay : 0

    // Initial classes
    el.classList.add('reveal')
    if (direction) el.classList.add(`reveal-${direction}`)
    if (delay) el.style.transitionDelay = `${delay}ms`

    const rootMargin = value.rootMargin ?? '0px 0px -10% 0px' // trigger slightly before fully visible
    const threshold = value.threshold ?? 0.15

    // If element is initially in viewport, reveal immediately (independent of scroll state)
    try {
      const rect = el.getBoundingClientRect()
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0
      const initiallyVisible = rect.top < vh && rect.bottom > 0
      if (initiallyVisible) {
        el.classList.add('is-revealed')
        if (once) return // don't need observer
      }
    } catch {}

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (dir === 'down') {
            // Animate in on downward scroll
            el.classList.add('is-revealed')
          } else {
            // Snap visible on upward scroll (no animation)
            const prev = el.style.transitionDuration
            el.style.transitionDuration = '0ms'
            el.classList.add('is-revealed')
            // restore in next frame
            requestAnimationFrame(() => { el.style.transitionDuration = prev })
          }
          if (once) {
            observer.unobserve(el)
          }
        } else if (!once) {
          // If once=false, hide when leaving viewport (allows re-entry animations when scrolling down later)
          el.classList.remove('is-revealed')
        }
      })
    }, { root: null, rootMargin, threshold })

    observer.observe(el)
    ioMap.set(el, observer)
  }

  function unmount(el: HTMLElement) {
    const io = ioMap.get(el)
    if (io) {
      try { io.unobserve(el) } catch {}
      try { io.disconnect() } catch {}
      ioMap.delete(el)
    }
  }

  // Register directive immediately so templates can resolve it
  nuxtApp.vueApp.directive('reveal', {
    mounted: mount,
    beforeUnmount: unmount,
  })
})
