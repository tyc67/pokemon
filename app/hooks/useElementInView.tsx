import { useState, useEffect, useRef } from 'react'

export interface Option {
  root: any | null
  rootMargin: `${number}px`
  threshold: number
  attach: boolean
}

const defaultOptions: Option = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
  attach: false,
}

export const useElementInview = (options: Partial<Option> = defaultOptions) => {
  const [inView, setInView] = useState<boolean>(false)
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!options.attach) return
    const node = containerRef.current
    if (node) {
      let throttle = -1
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && Date.now() - throttle > 100) {
          throttle = Date.now()
          setInView(entry.isIntersecting)
        }
        setInView(entry.isIntersecting)
      }, options)

      observer.observe(node)
      return () => {
        observer.disconnect()
      }
    }
  }, [containerRef, options])

  return { containerRef, inView }
}
