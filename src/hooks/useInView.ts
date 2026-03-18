import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) setInView(true)
    }, options ?? { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}







