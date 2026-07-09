import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'vitest'

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds = [0]

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true,
})

beforeEach(() => {
  window.localStorage.clear()
  window.history.pushState({}, '', '/')
  document.documentElement.lang = 'es'
})
