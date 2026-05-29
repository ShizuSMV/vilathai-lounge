import { Component, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar        from './components/Navbar'
import CookieBanner  from './components/CookieBanner'
import Hero          from './components/Hero'
import Inauguration  from './components/Inauguration'
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
    if (this.state.error) return (
      <div style={{ color: '#c9a84c', background: '#0f0f0f', padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
        <b>Erreur React :</b>{'\n'}{this.state.error.message}{'\n\n'}{this.state.error.stack}
      </div>
    )
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
        <Inauguration />
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
