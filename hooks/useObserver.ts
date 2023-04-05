import { useEffect } from 'react'

interface IUseObserverProps {
  autoInit?: boolean
  root?: HTMLBodyElement,
  rootMargin?: string,
  threshold?: number,
  onView: () => void,
}

let observer: IntersectionObserver | null = null
let observed: Element | null = null

export function useObserver({
  root,
  rootMargin = '0px',
  threshold = 1.0,
  onView,
}: IUseObserverProps) {

  useEffect(() => {
    return () => {
      if (observer && observed) {
        observer.unobserve(observed)
      }
    }
  }, [])

  const createObserver = (target: Element): IntersectionObserver => {
    const options: Partial<IntersectionObserverInit> = {
      rootMargin,
      threshold,
    };

    if (root) options.root = root;

    observer = new IntersectionObserver(callback, options);
    observer.observe(target)

    observed = target;

    return observer
  }

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onView()
        console.log('view');
        
      }
    })
  }

  return {
    createObserver
  }
}