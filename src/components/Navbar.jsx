import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'

const LINKS = [
  { href: '#accueil',     key: 'nav.home' },
  { href: '#evenement',   key: 'nav.event' },
  { href: '#apropos',     key: 'nav.about' },
  { href: '#cuisine',     key: 'nav.cuisine' },
  { href: '#cocktails',   key: 'nav.cocktails' },
  { href: '#galerie',     key: 'nav.gallery' },
  { href: '#reservation', key: 'nav.reservation' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')

  return (
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

        <div className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`} onClick={close} />

        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {LINKS.map(({ href, key }) => (
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
      </div>
    </nav>
  )
}
