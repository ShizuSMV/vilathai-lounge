import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { END_TIME } from '../config/event'
import './Navbar.scss'

const ALL_LINKS = [
  { href: '#accueil',   key: 'nav.home' },
  { href: '#evenement', key: 'nav.event',     eventOnly: true },
  { href: '#apropos',   key: 'nav.about' },
  { href: '#cuisine',   key: 'nav.cuisine' },
  { href: '#cocktails', key: 'nav.cocktails' },
  { href: '#galerie',   key: 'nav.gallery' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [eventOver,  setEventOver]  = useState(() => new Date() >= END_TIME)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (eventOver) return
    const id = setInterval(() => {
      if (new Date() >= END_TIME) { setEventOver(true); clearInterval(id) }
    }, 5000)
    return () => clearInterval(id)
  }, [eventOver])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close      = () => setMenuOpen(false)
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  const links      = ALL_LINKS.filter(l => !l.eventOnly || !eventOver)

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#accueil" className="nav__logo" onClick={close}>
            Vila Thaï<span>Lounge</span>
          </a>

          <div className="nav__right">
            <button className="nav__lang" onClick={toggleLang} aria-label="Changer de langue">
              {i18n.language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
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
      </ul>
    </>
  )
}
