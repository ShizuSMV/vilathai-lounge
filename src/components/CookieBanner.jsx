import { useState } from 'react'
import './CookieBanner.scss'

const KEY = 'vt-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(KEY)
    } catch {
      // localStorage indisponible (navigation privée) : pas de bandeau, donc pas d'écriture non plus
      return false
    }
  })

  const accept = () => { localStorage.setItem(KEY, 'accepted'); setVisible(false) }
  const refuse = () => { localStorage.setItem(KEY, 'refused');  setVisible(false) }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="alertdialog" aria-label="Cookies">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          Ce site utilise des cookies tiers (Google Fonts, ZenChef) nécessaires à son fonctionnement.
          Aucun cookie publicitaire n'est utilisé.{' '}
          <button className="cookie-banner__link" onClick={() => window.dispatchEvent(new CustomEvent('open-privacy'))}>
            En savoir plus
          </button>
        </p>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__refuse" onClick={refuse}>Refuser</button>
          <button className="cookie-banner__accept" onClick={accept}>Accepter</button>
        </div>
      </div>
    </div>
  )
}
