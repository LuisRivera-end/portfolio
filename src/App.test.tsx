import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders a recruiter-focused portfolio hero in Spanish', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /desarrollo productos web confiables con arquitectura limpia y ui precisa/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('link', { name: /ver cv/i }).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('link', { name: /contactarme/i }),
    ).toBeInTheDocument()
  })

  it('switches the portfolio copy to English', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: 'EN' })[0])

    expect(
      screen.getByRole('heading', {
        name: /building reliable web products with clean architecture and sharp ui/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact me/i })).toBeInTheDocument()
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
