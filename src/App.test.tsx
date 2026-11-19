import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import App from './App'
import { dictionaries } from './content/site-content'

describe('App', () => {
  it('renders the Spanish portfolio with a Spanish CV and real credentials', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sistemas web que hacen el trabajo/i,
      }),
    ).toBeInTheDocument()

    const cvLinks = screen.getAllByRole('link', { name: /cv en español/i })
    expect(cvLinks[0]).toHaveAttribute(
      'href',
      expect.stringContaining('cv-luis-eliezer-rivera-gamez.pdf'),
    )

    const certificates = screen.getAllByRole('link', { name: /ver certificado/i })
    expect(certificates).toHaveLength(2)
    expect(certificates[0]).toHaveAttribute(
      'href',
      expect.stringContaining('certificates/'),
    )
  })

  it('shows the six current projects and no removed ones', () => {
    render(<App />)

    const caseLinks = screen.getAllByRole('link', { name: /^ver caso:/i })
    expect(caseLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/projects/facsa',
      '/projects/openfy',
      '/projects/viczy',
      '/projects/turnos',
      '/projects/estacionamiento',
      '/projects/bloomwish',
    ])
    expect(screen.queryByText(/^presión$/i)).not.toBeInTheDocument()
  })

  it('labels the primary navigation in the active language', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getAllByRole('navigation', { name: 'Navegación principal' }).length).toBeGreaterThan(0)

    await user.click(screen.getAllByRole('button', { name: 'EN' })[0])

    expect(screen.getAllByRole('navigation', { name: 'Primary navigation' }).length).toBeGreaterThan(0)
  })

  it('marks the hash section as current in the header', () => {
    window.history.pushState({}, '', '/#experience')

    render(<App />)

    const nav = screen.getAllByRole('navigation', { name: 'Navegación principal' })[0]
    const current = within(nav)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('aria-current') === 'location')
    expect(current.map((link) => link.textContent)).toEqual(['Experiencia'])
  })

  it('switches to English and serves the English CV', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: 'EN' })[0])

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /web systems that do the work/i,
      }),
    ).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getAllByRole('link', { name: /english cv/i })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('cv-luis-eliezer-rivera-gamez-en.pdf'),
    )
  })

  it('renders the FACSA case study on a direct route', () => {
    window.history.pushState({}, '', '/projects/facsa')

    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'FACSA' })).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /visitar sitio/i }).length,
    ).toBeGreaterThan(0)
    expect(screen.getByText(/repositorio privado/i)).toBeInTheDocument()
    expect(screen.getAllByText('En línea').length).toBeGreaterThan(0)
    expect(
      screen.getByText(/panel administrativo \(demo\)/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Admisiones' })).toHaveAttribute(
      'src',
      expect.stringContaining('projects/facsa-admissions.webp'),
    )
    expect(screen.getByRole('navigation', { name: 'Secciones del caso' })).toBeInTheDocument()
  })

  it('renders the Openfy case study with live landing, repo, and releases links', () => {
    window.history.pushState({}, '', '/projects/openfy')

    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Openfy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visitar sitio/i })).toHaveAttribute(
      'href',
      'https://luisrivera-end.github.io/openfy/',
    )
    expect(screen.getByRole('link', { name: /ver repositorio/i })).toHaveAttribute(
      'href',
      'https://github.com/LuisRivera-end/openfy',
    )
    expect(screen.getByRole('link', { name: /ver versiones/i })).toHaveAttribute(
      'href',
      'https://github.com/LuisRivera-end/openfy/releases',
    )
  })

  it.each(['es', 'en'] as const)('renders every case study in %s', (locale) => {
    for (const project of dictionaries[locale].projects) {
      window.localStorage.setItem('portfolio-locale', locale)
      window.history.pushState({}, '', `/projects/${project.slug}`)

      const { unmount } = render(<App />)

      expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeInTheDocument()
      unmount()
    }
  })

  it('shows the 404 page for the removed project', () => {
    window.history.pushState({}, '', '/projects/presion')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: dictionaries.es.notFound.title }),
    ).toBeInTheDocument()
  })

  it('opens the gallery lightbox and navigates with the keyboard', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/projects/facsa')

    render(<App />)

    const opener = screen.getByRole('button', { name: 'Ampliar imagen: Admisiones' })
    await user.click(opener)

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: 'Admisiones' })).toBeInTheDocument()

    await user.keyboard('{ArrowRight}')
    expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'Vista móvil' })).toBeInTheDocument()

    expect(within(screen.getByRole('dialog')).getByRole('status')).toHaveTextContent('4 de 4')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('scrolls to top when navigating into a project and between adjacent projects', async () => {
    const user = userEvent.setup()
    const scrollToSpy = vi.spyOn(window, 'scrollTo')

    render(<App />)

    scrollToSpy.mockClear()

    const facsaLink = screen.getByRole('link', { name: /ver caso: facsa/i })
    await user.click(facsaLink)

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0, behavior: 'instant' }),
    )

    scrollToSpy.mockClear()

    const nextProjectLink = screen.getByRole('link', { name: /siguiente proyecto/i })
    await user.click(nextProjectLink)

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0, behavior: 'instant' }),
    )

    scrollToSpy.mockRestore()
  })
})
