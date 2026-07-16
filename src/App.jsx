import { Component, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar        from './components/Navbar'
import CookieBanner  from './components/CookieBanner'
import Hero          from './components/Hero'
import About         from './components/About'
import Menu          from './components/Menu'
import Cocktails     from './components/Cocktails'
import Gallery       from './components/Gallery'
import Reservation   from './components/Reservation'
import Footer        from './components/Footer'
import './App.scss'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) {
      const isDev = import.meta.env.DEV
      return (
        <div style={{ color: '#c9a84c', background: '#0f0f0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
          <p style={{ fontSize: '2.5rem', opacity: 0.35, marginBottom: '1rem' }}>✦</p>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#f5f0eb', marginBottom: '0.75rem' }}>Une erreur est survenue</h1>
          <p style={{ color: '#a8a09a', fontSize: '0.85rem', marginBottom: '2rem' }}>Veuillez recharger la page ou revenir plus tard.</p>
          <button onClick={() => window.location.reload()} style={{ border: '1px solid #c9a84c', background: 'none', color: '#c9a84c', padding: '0.75rem 2rem', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Recharger
          </button>
          {isDev && (
            <pre style={{ marginTop: '2rem', fontSize: '0.68rem', color: '#555', textAlign: 'left', maxWidth: '640px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {this.state.error.message}{'\n\n'}{this.state.error.stack}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  const { i18n } = useTranslation()

  // Met à jour l'attribut lang du <html> quand la langue change
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <ErrorBoundary>
      <Navbar />
      <CookieBanner />
      <main>
        <Hero />
        <About />
        <Menu />
        <Cocktails />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}

export default App
