import { useEffect } from 'react'
import './LegalModal.scss'

export default function LegalModal({ title, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="legal-modal" role="dialog" aria-modal="true">
      <div className="legal-modal__overlay" onClick={onClose} />
      <div className="legal-modal__box">
        <div className="legal-modal__header">
          <h2 className="legal-modal__title">{title}</h2>
          <button className="legal-modal__close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>
        <div className="legal-modal__body">{children}</div>
      </div>
    </div>
  )
}
