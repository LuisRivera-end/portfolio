import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the Spanish portfolio with a Spanish CV and real credentials', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
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

  it('switches to English and serves the English CV', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: 'EN' })[0])

    expect(
      screen.getByRole('heading', {
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

    expect(screen.getByRole('heading', { name: 'FACSA' })).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /visitar sitio/i }).length,
    ).toBeGreaterThan(0)
    expect(screen.getByText(/repositorio privado/i)).toBeInTheDocument()

    window.history.pushState({}, '', '/')
  })
})
