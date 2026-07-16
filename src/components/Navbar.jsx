import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'

const ALL_LINKS = [
  { href: '#accueil',   key: 'nav.home' },
  { href: '#apropos',   key: 'nav.about' },
  { href: '#cuisine',   key: 'nav.cuisine' },
  { href: '#cocktails', key: 'nav.cocktails' },
  { href: '#galerie',   key: 'nav.gallery' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [theme,     setTheme]     = useState(() => {
    try {
      const saved = localStorage.getItem('vila-theme')
      if (saved) return saved
    } catch { /* localStorage indisponible (navigation privée) : on retombe sur la préférence système */ }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'dark' ? '#0f0f0f' : '#faf3e8'
    try { localStorage.setItem('vila-theme', theme) } catch { /* le thème reste appliqué, il ne sera juste pas mémorisé */ }
  }, [theme])

  const close       = () => setMenuOpen(false)
  const toggleLang  = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const links       = ALL_LINKS

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#accueil" className="nav__logo" onClick={close}>
            Vila Thaï
          </a>

          <div className="nav__right">
            <button className="nav__lang" onClick={toggleLang} aria-label="Changer de langue">
              {i18n.language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
            </button>
            <button
              className="nav__theme"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? '☀' : '☽'}
            </button>
            <button
              className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay et panel EN DEHORS du <nav> — évite le bug fixed-in-fixed sur iOS */}
      <div
        className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}
        onClick={close}
      />
      <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
        {links.map(({ href, key }) => (
          <li key={href}>
            <a href={href} onClick={close}>{t(key)}</a>
          </li>
        ))}
        <li>
          <a href="#reservation" className="nav__cta" onClick={close}>
            {t('nav.reserve')}
          </a>
        </li>
        <li className="nav__lang-mobile">
          <button onClick={toggleLang}>
            {i18n.language === 'fr' ? '🇬🇧 English' : '🇫🇷 Français'}
          </button>
        </li>
        <li className="nav__theme-mobile">
          <button onClick={() => { toggleTheme(); close() }}>
            {theme === 'dark' ? '☀ Mode clair' : '☽ Mode sombre'}
          </button>
        </li>
      </ul>
    </>
  )
}
