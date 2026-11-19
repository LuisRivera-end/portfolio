import { describe, expect, it } from 'vitest'

import { projectIconMap } from '@/components/site/project-icons'
import { dictionaries } from '@/content/site-content'

const es = dictionaries.es
const en = dictionaries.en
const expectedSlugs = ['facsa', 'openfy', 'viczy', 'turnos', 'estacionamiento', 'bloomwish']

type Shape = string | Shape[] | { [key: string]: Shape }

function shapeOf(value: unknown): Shape {
  if (Array.isArray(value)) return value.map(shapeOf)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shapeOf((value as Record<string, unknown>)[key])]),
    )
  }
  return typeof value
}

describe('site content', () => {
  it('lists the same six projects in the same order in both locales', () => {
    expect(es.projects.map((project) => project.slug)).toEqual(expectedSlugs)
    expect(en.projects.map((project) => project.slug)).toEqual(expectedSlugs)
  })

  it('keeps both locales structurally identical (no missing translations)', () => {
    expect(shapeOf(en)).toEqual(shapeOf(es))
  })

  it('shares links, media and status between locales', () => {
    es.projects.forEach((project, index) => {
      const other = en.projects[index]
      expect(other.icon).toBe(project.icon)
      expect(other.status).toEqual(project.status)
      expect(other.repositoryUrl).toBe(project.repositoryUrl)
      expect(other.liveUrl).toBe(project.liveUrl)
      expect(other.releaseUrl).toBe(project.releaseUrl)
      expect(other.cover).toEqual(project.cover)
      expect(other.gallery.map(({ image, width, height }) => ({ image, width, height }))).toEqual(
        project.gallery.map(({ image, width, height }) => ({ image, width, height })),
      )
    })
  })

  it('references only files that exist in public/', () => {
    const files = new Set<string>()
    for (const dictionary of [es, en]) {
      dictionary.certifications.entries.forEach((entry) => files.add(entry.fileName))
      dictionary.projects.forEach((project) => {
        files.add(project.cover.image)
        if (project.cover.phone) files.add(project.cover.phone.image)
        project.gallery.forEach((item) => files.add(item.image))
      })
    }
    const available = new Set(
      Object.keys(import.meta.glob('/public/**/*.{webp,pdf}')).map((path) =>
        path.replace(/^\/public\//, ''),
      ),
    )
    const missing = [...files].filter((file) => !available.has(file))
    expect(available.size).toBeGreaterThan(0)
    expect(missing).toEqual([])
  })

  it('has an icon for every project', () => {
    es.projects.forEach((project) => {
      expect(projectIconMap[project.icon]).toBeDefined()
    })
  })

  it('never mentions the removed project or the Bloomwish POS', () => {
    const serialized = JSON.stringify(dictionaries).toLowerCase()
    expect(serialized).not.toContain('/pos')
    // Whole word only: "impresión" (printing) is legitimate copy.
    expect(serialized).not.toMatch(/(^|[^a-záéíóúñ])presi[oó]n/)
  })

  it('does not claim GitHub Actions for FACSA', () => {
    for (const dictionary of [es, en]) {
      const facsa = dictionary.projects.find((project) => project.slug === 'facsa')
      expect(JSON.stringify(facsa)).not.toMatch(/github actions/i)
    }
  })

  it('keeps English UI strings out of the Spanish dictionary', () => {
    const values = JSON.stringify(es)
    for (const phrase of ['"Live"', 'Open navigation', 'Primary navigation', 'LR / Portfolio"']) {
      expect(values).not.toContain(phrase)
    }
  })

  it('puts the current role first in experience', () => {
    expect(es.experience.entries[0].current).toBe(true)
    expect(en.experience.entries[0].current).toBe(true)
  })
})
